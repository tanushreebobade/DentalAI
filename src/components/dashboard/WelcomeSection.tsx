import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { CalendarIcon, ShieldCheckIcon } from "lucide-react";

export default async function WelcomeSection() {
  const user = await currentUser();
  const greeting =
    new Date().getHours() < 12
      ? "Good morning"
      : new Date().getHours() < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <div className="bg-card border border-border rounded-xl p-6 sm:p-8 shadow-xs mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Patient Portal
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3" />
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
            {greeting}, {user?.firstName || "Patient"}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Welcome back. Check your upcoming appointments, get dental tips, or talk to Riley if something's bothering you.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-2 p-3 bg-muted/40 rounded-lg border border-border/60 shrink-0 text-xs text-muted-foreground">
          <ShieldCheckIcon className="size-4 text-primary" />
          <span>Verified dentists</span>
        </div>
      </div>
    </div>
  );
}
