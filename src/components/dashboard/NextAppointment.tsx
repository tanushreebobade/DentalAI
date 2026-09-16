import { getUserAppointments } from "@/lib/actions/appointments";
import { format, isAfter, isSameDay, parseISO } from "date-fns";
import NoNextAppointments from "./NoNextAppointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

async function NextAppointment() {
  const appointments = await getUserAppointments();

  // filter for upcoming CONFIRMED appointments only (today or future)
  const upcomingAppointments =
    appointments?.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      const today = new Date();
      const isUpcoming = isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
      return isUpcoming && appointment.status === "CONFIRMED";
    }) || [];

  const nextAppointment = upcomingAppointments[0];

  if (!nextAppointment) return <NoNextAppointments />;

  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
  const isToday = isSameDay(appointmentDate, new Date());

  return (
    <Card className="border border-border rounded-xl shadow-xs bg-card flex flex-col justify-between">
      <div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <CalendarIcon className="size-4 text-primary" />
              Next Scheduled Visit
            </CardTitle>
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                isToday
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
              }`}
            >
              {isToday ? "Today" : "Confirmed"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 pt-1">
          {/* Appointment Details */}
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/70">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 text-primary">
                <UserIcon className="size-4" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{nextAppointment.doctorName}</p>
                <p className="text-muted-foreground mt-0.5">{nextAppointment.reason || "General Consultation"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-muted/30 rounded-lg border border-border/70">
                <span className="text-muted-foreground block text-[11px]">Date</span>
                <span className="font-medium text-foreground">
                  {format(appointmentDate, "MMM d, yyyy")}
                </span>
              </div>
              <div className="p-2.5 bg-muted/30 rounded-lg border border-border/70">
                <span className="text-muted-foreground block text-[11px]">Time</span>
                <span className="font-medium text-foreground flex items-center gap-1">
                  <ClockIcon className="size-3 text-primary" />
                  {nextAppointment.time}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <div className="p-4 pt-0">
        <Link
          href="/appointments"
          className="text-xs font-medium text-primary hover:underline flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
        >
          <span>Manage or reschedule appointment</span>
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </Card>
  );
}

export default NextAppointment;
