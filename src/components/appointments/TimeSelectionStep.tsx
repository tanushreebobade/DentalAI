import { useBookedTimeSlots } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES, getAvailableTimeSlots, getNext5Days } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ClockIcon, CheckCircle2Icon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface TimeSelectionStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onTypeChange: (type: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

function TimeSelectionStep({
  onBack,
  onContinue,
  onDateChange,
  onTimeChange,
  onTypeChange,
  selectedDate,
  selectedDentistId,
  selectedTime,
  selectedType,
}: TimeSelectionStepProps) {
  const { data: bookedTimeSlots = [] } = useBookedTimeSlots(selectedDentistId, selectedDate);

  const availableDates = getNext5Days();
  const availableTimeSlots = getAvailableTimeSlots();

  const handleDateSelect = (date: string) => {
    onDateChange(date);
    onTimeChange("");
  };

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="text-xs font-medium text-muted-foreground hover:text-foreground">
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Back to Doctors
        </Button>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Select Service, Date & Time</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Appointment Type Selection */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">1. Select Appointment Type</h3>
          <div className="space-y-2.5">
            {APPOINTMENT_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all border rounded-xl shadow-xs bg-card hover:border-border/80 ${
                    isSelected ? "ring-2 ring-primary border-primary bg-primary/[0.02]" : "border-border"
                  }`}
                  onClick={() => onTypeChange(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-foreground">{type.name}</h4>
                          {isSelected && <CheckCircle2Icon className="size-3.5 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{type.duration}</p>
                      </div>
                      <span className="font-semibold text-sm text-primary">{type.price}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="space-y-5">
          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold text-foreground">2. Select Date</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableDates.map((date) => {
                const isSelected = selectedDate === date;
                const d = new Date(date);
                return (
                  <Button
                    key={date}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleDateSelect(date)}
                    className={`h-auto py-2.5 px-3 flex flex-col items-center justify-center border text-xs ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    <span className="font-semibold">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                    <span className="text-[11px] opacity-80">{d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="space-y-2.5 pt-2 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground">3. Select Time Slot</h3>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((time) => {
                  const isBooked = bookedTimeSlots.includes(time);
                  const isSelected = selectedTime === time;
                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => !isBooked && onTimeChange(time)}
                      size="sm"
                      disabled={isBooked}
                      className={`text-xs h-9 ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : isBooked
                          ? "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                          : "border-border bg-card text-foreground hover:bg-muted"
                      }`}
                    >
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {time}
                      {isBooked && " (Full)"}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Button */}
      {selectedType && selectedDate && selectedTime && (
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            onClick={onContinue}
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-6 shadow-xs"
          >
            Review & Confirm
          </Button>
        </div>
      )}
    </div>
  );
}

export default TimeSelectionStep;
