import { useAvailableDoctors } from "@/hooks/use-doctors";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { CheckCircle2Icon, MapPinIcon, PhoneIcon, ShieldCheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";

interface DoctorSelectionStepProps {
  selectedDentistId: string | null;
  onSelectDentist: (dentistId: string) => void;
  onContinue: () => void;
}

function DoctorSelectionStep({
  onContinue,
  onSelectDentist,
  selectedDentistId,
}: DoctorSelectionStepProps) {
  const { data: dentists = [], isLoading } = useAvailableDoctors();

  if (isLoading)
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Select a Dental Practitioner</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Licensed dentists available for in-clinic care</p>
        </div>
        <DoctorCardsLoading />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Select a Dental Practitioner</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Choose a verified dentist based on specialty and clinic availability.
          </p>
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-md self-start sm:self-auto">
          {dentists.length} practitioners available
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {dentists.map((dentist) => {
          const isSelected = selectedDentistId === dentist.id;
          return (
            <Card
              key={dentist.id}
              className={`cursor-pointer transition-all border rounded-xl shadow-xs bg-card hover:border-border/90 relative ${
                isSelected
                  ? "ring-2 ring-primary border-primary bg-primary/[0.02]"
                  : "border-border"
              }`}
              onClick={() => onSelectDentist(dentist.id)}
            >
              <CardHeader className="p-5 pb-3">
                <div className="flex items-start gap-3.5">
                  <div className="size-14 rounded-full overflow-hidden shrink-0 border border-border bg-muted">
                    <Image
                      src={dentist.imageUrl!}
                      alt={dentist.name}
                      width={56}
                      height={56}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base text-foreground truncate">{dentist.name}</h3>
                      {isSelected && (
                        <CheckCircle2Icon className="size-4 text-primary shrink-0 ml-1" />
                      )}
                    </div>
                    <p className="text-xs font-medium text-primary mt-0.5">
                      {dentist.speciality || "General Dentistry"}
                    </p>
                    <span className="text-[11px] text-muted-foreground block mt-1">
                      {dentist.appointmentCount} active bookings
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-5 pt-0 space-y-3">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {dentist.bio || "Experienced dental professional providing quality patient care."}
                </p>

                <div className="pt-2 border-t border-border/70 space-y-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="size-3.5 shrink-0 text-muted-foreground/70" />
                    <span className="truncate">DentalAI Clinic Partner</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="size-3.5 shrink-0 text-muted-foreground/70" />
                    <span>{dentist.phone}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/80 bg-muted px-2 py-0.5 rounded">
                    <ShieldCheckIcon className="size-3 text-emerald-600 dark:text-emerald-400" />
                    Licensed Provider
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedDentistId && (
        <div className="flex justify-end pt-2">
          <Button
            onClick={onContinue}
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-6 shadow-xs"
          >
            Continue to Date & Time
          </Button>
        </div>
      )}
    </div>
  );
}

export default DoctorSelectionStep;
