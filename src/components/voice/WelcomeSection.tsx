import { MicIcon, ShieldCheckIcon } from "lucide-react";

function WelcomeSection() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-xs mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            Voice Consultation Console
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Speak directly with Riley to discuss toothache pain, sensitivity, post-treatment symptoms, or procedure costs. Real-time guidance is provided for triage and home comfort.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 p-3 bg-muted/40 rounded-lg border border-border/70 text-xs text-muted-foreground shrink-0">
          <ShieldCheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
          <span>Private & Encrypted Session</span>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
