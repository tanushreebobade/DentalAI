import { APPOINTMENT_TYPES } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, Loader2Icon, ShieldCheckIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DoctorInfo from "./DoctorInfo";

interface BookingConfirmationStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  isBooking: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onModify: () => void;
}

function BookingConfirmationStep({
  selectedDentistId,
  selectedDate,
  selectedTime,
  selectedType,
  isBooking,
  onBack,
  onConfirm,
  onModify,
}: BookingConfirmationStepProps) {
  const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-xs font-medium text-muted-foreground hover:text-foreground">
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h2 className="text-xl font-semibold text-foreground">Review & Confirm Appointment</h2>
      </div>

      <Card className="max-w-2xl border border-border rounded-xl shadow-xs bg-card">
        <CardHeader className="p-6 pb-4 border-b border-border/70">
          <CardTitle className="text-base font-semibold text-foreground">Appointment Summary</CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-5">
          {/* Doctor Info */}
          <DoctorInfo doctorId={selectedDentistId} />

          {/* Appointment Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-border/70 text-xs">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/70">
              <span className="text-muted-foreground block text-[11px]">Service</span>
              <span className="font-semibold text-foreground text-sm mt-0.5 block">{appointmentType?.name}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/70">
              <span className="text-muted-foreground block text-[11px]">Duration</span>
              <span className="font-semibold text-foreground text-sm mt-0.5 block">{appointmentType?.duration}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/70">
              <span className="text-muted-foreground block text-[11px]">Estimated Cost</span>
              <span className="font-semibold text-primary text-sm mt-0.5 block">{appointmentType?.price}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/70">
              <span className="text-muted-foreground block text-[11px]">Date</span>
              <span className="font-semibold text-foreground text-sm mt-0.5 block">
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/70">
              <span className="text-muted-foreground block text-[11px]">Time</span>
              <span className="font-semibold text-foreground text-sm mt-0.5 block">{selectedTime}</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/70">
              <span className="text-muted-foreground block text-[11px]">Location</span>
              <span className="font-semibold text-foreground text-sm mt-0.5 block">DentalAI Partner Clinic</span>
            </div>
          </div>

          <div className="p-3 bg-muted/30 rounded-lg border border-border/60 text-xs text-muted-foreground flex items-center gap-2">
            <ShieldCheckIcon className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Confirmation and reminders will be emailed upon booking. Free cancellation available.</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onModify} className="border-border hover:bg-muted font-medium text-xs h-9">
          Modify Details
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-xs h-9 px-6 shadow-xs"
          disabled={isBooking}
        >
          {isBooking ? (
            <>
              <Loader2Icon className="mr-2 size-3.5 animate-spin" />
              Confirming Booking...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </Button>
      </div>
    </div>
  );
}

export default BookingConfirmationStep;
