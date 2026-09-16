import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckCircle2Icon, ClockIcon, MicIcon, ShieldCheckIcon, UserCheckIcon } from "lucide-react";
import Link from "next/link";

export default function MainActions() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Voice Consultation Action Card */}
      <Card className="border border-border rounded-xl shadow-xs bg-card hover:border-border/80 transition-all flex flex-col justify-between">
        <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="size-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <MicIcon className="size-5" />
              </div>
              <span className="text-xs font-medium text-accent-warm bg-accent-warm/10 border border-accent-warm/20 px-2.5 py-0.5 rounded-full">
                Instant • 24/7
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Talk to Riley</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Have a question about tooth pain, sensitivity, or a dental concern? Riley can help you figure out what to do — anytime.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-3.5 text-primary shrink-0" />
                <span>Quick help for pain and discomfort</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-3.5 text-primary shrink-0" />
                <span>Advice on treatments and costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-3.5 text-primary shrink-0" />
                <span>Free, no sign-up required</span>
              </div>
            </div>
          </div>

          <Link href="/voice" className="block pt-2">
            <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-xs h-10">
              <MicIcon className="mr-2 size-4" />
              Start a Conversation
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Book Appointment Action Card */}
      <Card className="border border-border rounded-xl shadow-xs bg-card hover:border-border/80 transition-all flex flex-col justify-between">
        <CardContent className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="size-11 rounded-lg bg-muted text-foreground flex items-center justify-center shrink-0 border border-border">
                <CalendarIcon className="size-5" />
              </div>
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Verified Doctors
              </span>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Book an Appointment</h2>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                Need a cleaning, checkup, or something more specific? Pick a dentist and a time that works for you.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>All dentists are licensed and verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Choose from morning or afternoon slots</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2Icon className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Email confirmation — cancel anytime</span>
              </div>
            </div>
          </div>

          <Link href="/appointments" className="block pt-2">
            <Button variant="outline" className="w-full border-border hover:bg-muted font-medium text-foreground h-10">
              <CalendarIcon className="mr-2 size-4" />
              Book a Visit
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
