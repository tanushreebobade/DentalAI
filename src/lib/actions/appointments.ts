"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";
import resend from "../resend";
import AppointmentCancellationEmail from "@/components/emails/AppointmentCancellationEmail";
import { AppointmentStatus } from "@prisma/client";

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.log("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
}

export async function getUserAppointments() {
  try {
    // get authenticated user from Clerk
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to view appointments");

    // find user by clerkId from authenticated session
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found. Please ensure your account is properly set up.");

    const appointments = await prisma.appointment.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    });

    return appointments.map(transformAppointment);
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Failed to fetch user appointments");
  }
}

export async function getUserAppointmentStats() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be authenticated");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error("User not found");

    // these calls will run in parallel, instead of waiting each other
    const [totalCount, completedCount] = await Promise.all([
      prisma.appointment.count({
        where: { userId: user.id },
      }),
      prisma.appointment.count({
        where: {
          userId: user.id,
          status: "COMPLETED",
        },
      }),
    ]);

    return {
      totalAppointments: totalCount,
      completedAppointments: completedCount,
    };
  } catch (error) {
    console.error("Error fetching user appointment stats:", error);
    return { totalAppointments: 0, completedAppointments: 0 };
  }
}

export async function getBookedTimeSlots(doctorId: string, date: string) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        date: new Date(date),
        status: {
          in: ["CONFIRMED", "COMPLETED"], // consider both confirmed and completed appointments as blocking
        },
      },
      select: { time: true },
    });

    return appointments.map((appointment) => appointment.time);
  } catch (error) {
    console.error("Error fetching booked time slots:", error);
    return []; // return empty array if there's an error
  }
}

interface BookAppointmentInput {
  doctorId: string;
  date: string;
  time: string;
  reason?: string;
}

export async function bookAppointment(input: BookAppointmentInput) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to book an appointment");

    if (!input.doctorId || !input.date || !input.time) {
      throw new Error("Doctor, date, and time are required");
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found. Please ensure your account is properly set up.");

    const appointment = await prisma.appointment.create({
      data: {
        userId: user.id,
        doctorId: input.doctorId,
        date: new Date(input.date),
        time: input.time,
        reason: input.reason || "General consultation",
        status: "CONFIRMED",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    return transformAppointment(appointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw new Error("Failed to book appointment. Please try again later.");
  }
}

export async function updateAppointmentStatus(input: { id: string; status: AppointmentStatus }) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: input.id },
      data: { status: input.status },
    });

    return appointment;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw new Error("Failed to update appointment");
  }
}

export async function cancelAppointment(input: { id: string; reason: string }) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("You must be logged in to cancel an appointment");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) throw new Error("User not found");

    const appointment = await prisma.appointment.findUnique({
      where: { id: input.id },
      include: { user: true },
    });

    if (!appointment) throw new Error("Appointment not found");

    // Check ownership or admin privilege
    const adminEmail = process.env.ADMIN_EMAIL;
    const isOwner = appointment.userId === user.id;
    const isAdmin = adminEmail && user.email === adminEmail;

    if (!isOwner && !isAdmin) {
      throw new Error("You are not authorized to cancel this appointment");
    }

    const updated = await prisma.appointment.update({
      where: { id: input.id },
      data: {
        status: "CANCELLED",
        cancellationReason: input.reason || "Cancelled by patient",
      },
      include: {
        user: { select: { firstName: true, lastName: true, email: true } },
        doctor: { select: { name: true, imageUrl: true } },
      },
    });

    // Send cancellation email if Resend is configured
    if (
      process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.startsWith("re_...") &&
      updated.user.email
    ) {
      try {
        const appointmentDate = new Date(updated.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        await resend.emails.send({
          from: "DentalAI <no-reply@resend.dev>",
          to: [updated.user.email],
          subject: "Appointment Cancelled - DentalAI",
          react: AppointmentCancellationEmail({
            patientName: `${updated.user.firstName || ""} ${updated.user.lastName || ""}`.trim() || undefined,
            doctorName: updated.doctor.name,
            appointmentDate,
            appointmentTime: updated.time,
            cancellationReason: input.reason || "Cancelled by patient",
          }),
        });
      } catch (emailErr) {
        console.warn("Failed to send cancellation email:", emailErr);
      }
    }

    return transformAppointment(updated);
  } catch (error: any) {
    console.error("Error cancelling appointment:", error);
    throw new Error(error.message || "Failed to cancel appointment");
  }
}
