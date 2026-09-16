"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCancelAppointment } from "@/hooks/use-appointment";
import { toast } from "sonner";
import { AlertCircleIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

interface CancelAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: {
    id: string;
    doctorName: string;
    date: string;
    time: string;
    reason?: string;
  } | null;
}

const PREDEFINED_REASONS = [
  "Schedule conflict / Change of plans",
  "Feeling better / No longer experiencing symptoms",
  "Found another dental clinic / doctor",
  "Emergency or sudden illness",
  "Financial / Budget constraints",
  "Other",
];

export function CancelAppointmentModal({
  appointment,
  onOpenChange,
  open,
}: CancelAppointmentModalProps) {
  const [selectedReason, setSelectedReason] = useState(PREDEFINED_REASONS[0]);
  const [customReason, setCustomReason] = useState("");

  const cancelMutation = useCancelAppointment();

  if (!appointment) return null;

  const handleConfirmCancel = () => {
    const finalReason =
      selectedReason === "Other"
        ? customReason.trim() || "Other reason"
        : selectedReason;

    if (selectedReason === "Other" && !customReason.trim()) {
      toast.error("Please enter a reason for cancellation");
      return;
    }

    cancelMutation.mutate(
      { id: appointment.id, reason: finalReason },
      {
        onSuccess: () => {
          toast.success("Appointment cancelled successfully");
          onOpenChange(false);
          setSelectedReason(PREDEFINED_REASONS[0]);
          setCustomReason("");
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to cancel appointment");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircleIcon className="size-5" />
            <DialogTitle className="text-xl">Cancel Appointment</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Appointment summary card */}
        <div className="rounded-xl border bg-muted/40 p-4 space-y-2 text-sm">
          <div className="flex items-center gap-2 font-medium">
            <UserIcon className="size-4 text-primary" />
            <span>{appointment.doctorName}</span>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="size-3.5" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ClockIcon className="size-3.5" />
              <span>{appointment.time}</span>
            </div>
          </div>
          {appointment.reason && (
            <p className="text-xs text-muted-foreground pt-1 border-t">
              Reason: {appointment.reason}
            </p>
          )}
        </div>

        {/* Cancellation reasons */}
        <div className="space-y-3 py-2">
          <Label className="text-sm font-semibold">
            Please tell us why you are cancelling:
          </Label>

          <RadioGroup
            value={selectedReason}
            onValueChange={setSelectedReason}
            className="space-y-2"
          >
            {PREDEFINED_REASONS.map((reason) => (
              <div
                key={reason}
                className="flex items-center space-x-3 p-2.5 rounded-lg border hover:bg-muted/40 transition-colors cursor-pointer"
                onClick={() => setSelectedReason(reason)}
              >
                <RadioGroupItem value={reason} id={reason} />
                <Label
                  htmlFor={reason}
                  className="cursor-pointer text-sm font-normal flex-1"
                >
                  {reason}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Custom reason input if "Other" is selected */}
          {selectedReason === "Other" && (
            <div className="pt-2 space-y-1.5 animate-in fade-in duration-200">
              <Label htmlFor="customReason" className="text-xs text-muted-foreground">
                Please specify your reason:
              </Label>
              <Textarea
                id="customReason"
                placeholder="Type your reason here..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={cancelMutation.isPending}
          >
            Keep Appointment
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirmCancel}
            disabled={cancelMutation.isPending}
          >
            {cancelMutation.isPending ? "Cancelling..." : "Confirm Cancellation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
