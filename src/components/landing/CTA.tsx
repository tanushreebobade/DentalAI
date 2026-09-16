import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, MicIcon, ShieldCheckIcon } from "lucide-react";

function CTA() {
  return (
    <section className="py-20 px-6 border-t border-border bg-muted/20">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl text-center md:text-left">


            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Ready to address your dental concerns?
            </h2>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Start an instant voice consultation to triage symptoms, or schedule an in-clinic exam with our licensed dental partners.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                Licensed Doctors
              </span>
              <span>•</span>
              <span>No Referral Needed</span>
              <span>•</span>
              <span>Instant Confirmation</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
            <SignUpButton mode="modal">
              <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-6 py-2.5 h-auto shadow-xs w-full">
                <MicIcon className="mr-2 size-4" />
                Start Voice Consultation
              </Button>
            </SignUpButton>

            <SignUpButton mode="modal">
              <Button size="lg" variant="outline" className="font-medium px-6 py-2.5 h-auto border-border hover:bg-muted text-foreground w-full">
                <CalendarIcon className="mr-2 size-4" />
                Book an Appointment
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
