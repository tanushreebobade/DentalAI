import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CalendarIcon, CheckCircle2Icon, ClockIcon, MessageSquareIcon, MicIcon, ShieldCheckIcon, UserIcon } from "lucide-react";
import Image from "next/image";

function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">


              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.15]">
                Dental care that <br className="hidden sm:inline" />
                fits your life.
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
                Got a toothache at 2 AM? Talk to Riley, our voice assistant, for quick guidance — then book a dentist when you're ready.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <SignUpButton mode="modal">
                <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-6 py-2.5 h-auto shadow-xs">
                  <MicIcon className="mr-2 size-4" />
                  Try Voice Assistant
                </Button>
              </SignUpButton>

              <SignUpButton mode="modal">
                <Button size="lg" variant="outline" className="font-medium px-6 py-2.5 h-auto border-border hover:bg-muted text-foreground">
                  <CalendarIcon className="mr-2 size-4" />
                  Book an Appointment
                </Button>
              </SignUpButton>
            </div>

            {/* TRUST INDICATORS */}
            <div className="pt-4 border-t border-border flex flex-wrap gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Licensed dentists only</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ClockIcon className="size-4 text-primary" />
                <span>Available anytime, day or night</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Book appointments in minutes</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT - REALISTIC CLINICAL INTERFACE PREVIEW */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border rounded-xl shadow-lg p-6 space-y-5">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-xs">
                    D<span className="text-accent-warm">A</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Voice Assistant</h3>
                    <p className="text-xs text-muted-foreground">Riley • <span className="text-accent-warm font-medium">Dental Triage</span></p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Active
                </span>
              </div>

              {/* Consultation Dialogue Preview */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div className="bg-muted/50 border border-border/70 rounded-lg p-3">
                  <span className="font-semibold text-foreground block mb-1">You:</span>
                  <p className="text-muted-foreground">
                    "My lower right molar hurts when I drink cold water. Is that something I should worry about?"
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/15 rounded-lg p-3">
                  <span className="font-semibold text-primary block mb-1">Riley:</span>
                  <p className="text-muted-foreground">
                    "That could be minor enamel wear or a small crack. Try a sensitivity toothpaste for now, skip acidic drinks, and I'd recommend booking a checkup just to be safe."
                  </p>
                </div>
              </div>

              {/* Next Available Booking Slot */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  Suggested Next Step
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center shrink-0 border border-border">
                      <Image
                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120"
                        alt="Dr. Ananya Sharma"
                        width={36}
                        height={36}
                        className="size-9 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Dr. Ananya Sharma</p>
                      <p className="text-[11px] text-muted-foreground">General & Cosmetic • Today 2:30 PM</p>
                    </div>
                  </div>
                  <SignUpButton mode="modal">
                    <Button size="sm" variant="secondary" className="text-xs h-7 px-3 font-medium">
                      Select
                    </Button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
