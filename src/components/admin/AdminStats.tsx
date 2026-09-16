import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Clock } from "lucide-react";

interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

function AdminStats({
  activeDoctors,
  totalDoctors,
  completedAppointments,
  totalAppointments,
}: AdminStatsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="border border-border rounded-xl shadow-xs bg-card">
        <CardContent className="p-5">
          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Users className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground tracking-tight">{totalDoctors}</div>
              <div className="text-xs text-muted-foreground">Total Practitioners</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border rounded-xl shadow-xs bg-card">
        <CardContent className="p-5">
          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <UserCheck className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground tracking-tight">{activeDoctors}</div>
              <div className="text-xs text-muted-foreground">Active On Duty</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border rounded-xl shadow-xs bg-card">
        <CardContent className="p-5">
          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Calendar className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground tracking-tight">{totalAppointments}</div>
              <div className="text-xs text-muted-foreground">Total Bookings</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border rounded-xl shadow-xs bg-card">
        <CardContent className="p-5">
          <div className="flex items-center gap-3.5">
            <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Clock className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-semibold text-foreground tracking-tight">{completedAppointments}</div>
              <div className="text-xs text-muted-foreground">Completed Consultations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default AdminStats;
