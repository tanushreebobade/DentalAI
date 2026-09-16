import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;

    // validate required fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // check if Resend is configured
    if (
      !process.env.RESEND_API_KEY ||
      process.env.RESEND_API_KEY === "re_..." ||
      process.env.RESEND_API_KEY.startsWith("re_...")
    ) {
      console.warn("Skipping email send: RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { message: "Email skipped: RESEND_API_KEY not configured", skipped: true },
        { status: 200 }
      );
    }

    // send the email
    const { data, error } = await resend.emails.send({
      from: "DentalAI <no-reply@resend.dev>",
      to: [userEmail],
      subject: "Appointment Confirmation - DentalAI",
      react: AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price,
      }),
    });

    if (error) {
      console.warn("Resend email warning:", error);
      return NextResponse.json({ message: "Email failed to send", error }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Email sent successfully", emailId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.warn("Email sending error:", error);
    return NextResponse.json({ message: "Internal error sending email", error }, { status: 200 });
  }
}
