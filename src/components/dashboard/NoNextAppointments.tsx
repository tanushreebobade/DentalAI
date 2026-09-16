import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

function NoNextAppointments() {
  return (
    <Card className="border border-border rounded-xl shadow-xs bg-card flex flex-col justify-between">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
          <CalendarIcon className="size-4 text-primary" />
          Next Scheduled Visit
        </CardTitle>
      </CardHeader>
      <CardContent className="py-6">
        <div className="text-center space-y-3">
          <div className="size-10 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <CalendarIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">No upcoming visits</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              You currently have no scheduled appointments.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/appointments">
              <Button size="sm" variant="outline" className="w-full text-xs font-medium border-border hover:bg-muted">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoNextAppointments;
