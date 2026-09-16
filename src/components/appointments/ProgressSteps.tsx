import { CheckIcon, ChevronRightIcon } from "lucide-react";

const PROGRESS_STEPS = ["Select Doctor", "Select Date & Time", "Review & Confirm"];

function ProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
      {PROGRESS_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;

        return (
          <div key={stepNumber} className="flex items-center gap-2 shrink-0">
            {/* Step badge */}
            <div
              className={`size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                isCompleted
                  ? "bg-emerald-600 text-white"
                  : isCurrent
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/20"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isCompleted ? <CheckIcon className="size-3.5" /> : stepNumber}
            </div>

            {/* Step name */}
            <span
              className={`text-xs font-medium ${
                isCurrent
                  ? "text-foreground font-semibold"
                  : isCompleted
                  ? "text-foreground/80"
                  : "text-muted-foreground"
              }`}
            >
              {stepName}
            </span>

            {/* Separator */}
            {stepNumber < PROGRESS_STEPS.length && (
              <ChevronRightIcon className="size-3.5 text-muted-foreground/60 mx-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressSteps;
