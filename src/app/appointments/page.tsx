"use client";

import { AppointmentConfirmationModal } from "@/components/appointments/AppointmentConfirmationModal";
import { CancelAppointmentModal } from "@/components/appointments/CancelAppointmentModal";
import BookingConfirmationStep from "@/components/appointments/BookingConfirmationStep";
import DoctorSelectionStep from "@/components/appointments/DoctorSelectionStep";
import ProgressSteps from "@/components/appointments/ProgressSteps";
import TimeSelectionStep from "@/components/appointments/TimeSelectionStep";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookAppointment, useUserAppointments } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";
import { XCircleIcon } from "lucide-react";

function AppointmentsPage() {
  // state management for the booking process - this could be done with something like Zustand for larger apps
  const [selectedDentistId, setSelectedDentistId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // 1: select dentist, 2: select time, 3: confirm
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookedAppointment, setBookedAppointment] = useState<any>(null);
  const [cancellingAppointment, setCancellingAppointment] = useState<any>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const bookAppointmentMutation = useBookAppointment();
  const { data: userAppointments = [] } = useUserAppointments();

  const handleSelectDentist = (dentistId: string) => {
    setSelectedDentistId(dentistId);

    // reset the state when dentist changes
    setSelectedDate("");
    setSelectedTime("");
    setSelectedType("");
  };

  const handleBookAppointment = async () => {
    if (!selectedDentistId || !selectedDate || !selectedTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

    bookAppointmentMutation.mutate(
      {
        doctorId: selectedDentistId,
        date: selectedDate,
        time: selectedTime,
        reason: appointmentType?.name,
      },
      {
        onSuccess: async (appointment) => {
          // store the appointment details to show in the modal
          setBookedAppointment(appointment);

          try {
            const emailResponse = await fetch("/api/send-appointment-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail: appointment.patientEmail,
                doctorName: appointment.doctorName,
                appointmentDate: format(new Date(appointment.date), "EEEE, MMMM d, yyyy"),
                appointmentTime: appointment.time,
                appointmentType: appointmentType?.name,
                duration: appointmentType?.duration,
                price: appointmentType?.price,
              }),
            });

            if (!emailResponse.ok) console.warn("Failed to send confirmation email");
          } catch (error) {
            console.warn("Error sending confirmation email:", error);
          }

          // show the success modal
          setShowConfirmationModal(true);

          // reset form
          setSelectedDentistId(null);
          setSelectedDate("");
          setSelectedTime("");
          setSelectedType("");
          setCurrentStep(1);
        },
        onError: (error) => toast.error(`Failed to book appointment: ${error.message}`),
      }
    );
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Clinic Appointments
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Find and schedule visits with licensed dentists in your area.
          </p>
        </div>

        <ProgressSteps currentStep={currentStep} />

        {currentStep === 1 && (
          <DoctorSelectionStep
            selectedDentistId={selectedDentistId}
            onContinue={() => setCurrentStep(2)}
            onSelectDentist={handleSelectDentist}
          />
        )}

        {currentStep === 2 && selectedDentistId && (
          <TimeSelectionStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            onBack={() => setCurrentStep(1)}
            onContinue={() => setCurrentStep(3)}
            onDateChange={setSelectedDate}
            onTimeChange={setSelectedTime}
            onTypeChange={setSelectedType}
          />
        )}

        {currentStep === 3 && selectedDentistId && (
          <BookingConfirmationStep
            selectedDentistId={selectedDentistId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedType={selectedType}
            isBooking={bookAppointmentMutation.isPending}
            onBack={() => setCurrentStep(2)}
            onModify={() => setCurrentStep(2)}
            onConfirm={handleBookAppointment}
          />
        )}
      </div>

      {bookedAppointment && (
        <AppointmentConfirmationModal
          open={showConfirmationModal}
          onOpenChange={setShowConfirmationModal}
          appointmentDetails={{
            doctorName: bookedAppointment.doctorName,
            appointmentDate: format(new Date(bookedAppointment.date), "EEEE, MMMM d, yyyy"),
            appointmentTime: bookedAppointment.time,
            userEmail: bookedAppointment.patientEmail,
          }}
        />
      )}

      {/* SHOW EXISTING APPOINTMENTS FOR THE CURRENT USER */}
      {userAppointments.length > 0 && (
        <div className="mb-12 max-w-7xl mx-auto px-6">
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Active & Past Appointments</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`bg-card border rounded-xl p-5 shadow-xs flex flex-col justify-between transition-all ${
                    appointment.status === "CANCELLED" ? "opacity-75 border-destructive/20 bg-muted/20" : "border-border"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-border bg-muted">
                          <img
                            src={appointment.doctorImageUrl}
                            alt={appointment.doctorName}
                            className="size-10 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{appointment.doctorName}</p>
                          <p className="text-muted-foreground text-xs">{appointment.reason || "General Consultation"}</p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      {appointment.status === "CONFIRMED" && (
                        <Badge className="bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 text-xs font-medium">
                          Confirmed
                        </Badge>
                      )}
                      {appointment.status === "COMPLETED" && (
                        <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-medium">
                          Completed
                        </Badge>
                      )}
                      {appointment.status === "CANCELLED" && (
                        <Badge variant="destructive" className="text-xs font-medium">
                          Cancelled
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground pt-1">
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">Date:</span>
                        {format(new Date(appointment.date), "MMM d, yyyy")}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="font-medium text-foreground">Time:</span>
                        {appointment.time}
                      </p>
                    </div>

                    {/* Show cancellation reason if cancelled */}
                    {appointment.status === "CANCELLED" && appointment.cancellationReason && (
                      <div className="mt-3 p-2.5 rounded-lg bg-destructive/5 border border-destructive/15 text-xs">
                        <span className="font-semibold text-destructive">Cancellation Reason:</span>{" "}
                        <span className="text-muted-foreground">{appointment.cancellationReason}</span>
                      </div>
                    )}
                  </div>

                  {/* Cancel Action Button */}
                  {appointment.status === "CONFIRMED" && (
                    <div className="mt-4 pt-3 border-t border-border/70">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive text-xs h-8"
                        onClick={() => {
                          setCancellingAppointment({
                            id: appointment.id,
                            doctorName: appointment.doctorName,
                            date: format(new Date(appointment.date), "MMM d, yyyy"),
                            time: appointment.time,
                            reason: appointment.reason,
                          });
                          setShowCancelModal(true);
                        }}
                      >
                        <XCircleIcon className="w-3.5 h-3.5 mr-1.5" />
                        Cancel Appointment
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CANCEL APPOINTMENT MODAL */}
      <CancelAppointmentModal
        open={showCancelModal}
        onOpenChange={setShowCancelModal}
        appointment={cancellingAppointment}
      />
    </>
  );
}

export default AppointmentsPage;
