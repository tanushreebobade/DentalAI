import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ActivityIcon, CalendarIcon, ClipboardCheckIcon, MicIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

async function DentalHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  return (
    <Card className="lg:col-span-2 border border-border rounded-xl shadow-xs bg-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <ClipboardCheckIcon className="size-4 text-primary" />
              Patient Care Summary
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Historical visits and active medical records
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* STATS TILES */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted/30 border border-border/70 rounded-lg text-left">
            <span className="text-xs font-medium text-muted-foreground block mb-1">Completed Visits</span>
            <span className="text-2xl font-semibold text-foreground tracking-tight">
              {appointmentStats.completedAppointments}
            </span>
          </div>
          <div className="p-4 bg-muted/30 border border-border/70 rounded-lg text-left">
            <span className="text-xs font-medium text-muted-foreground block mb-1">Total Bookings</span>
            <span className="text-2xl font-semibold text-foreground tracking-tight">
              {appointmentStats.totalAppointments}
            </span>
          </div>
          <div className="p-4 bg-muted/30 border border-border/70 rounded-lg text-left">
            <span className="text-xs font-medium text-muted-foreground block mb-1">Member Since</span>
            <span className="text-lg font-semibold text-foreground tracking-tight">
              {user?.createdAt ? format(new Date(user.createdAt), "MMM yyyy") : "Recent"}
            </span>
          </div>
        </div>

        {/* CLINIC CARE BANNER */}
        <div className="p-4 bg-muted/40 rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ActivityIcon className="size-4 text-primary" />
              Need a preventive routine cleaning?
            </h3>
            <p className="text-xs text-muted-foreground">
              Dental associations recommend professional checkups every 6 months to maintain optimal gum health.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/appointments">
              <Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-xs h-8 px-3 shadow-xs">
                <CalendarIcon className="mr-1.5 size-3.5" />
                Book Cleaning
              </Button>
            </Link>
            <Link href="/voice">
              <Button size="sm" variant="outline" className="border-border hover:bg-muted font-medium text-xs h-8 px-3 text-foreground">
                <MicIcon className="mr-1.5 size-3.5" />
                Ask Riley
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;
