import { useGetDoctors } from "@/hooks/use-doctors";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { EditIcon, MailIcon, PhoneIcon, PlusIcon, StethoscopeIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@prisma/client";

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <>
      <Card className="mb-8 border border-border rounded-xl shadow-xs bg-card">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
              <StethoscopeIcon className="size-4 text-primary" />
              Clinical Practitioners
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              Manage doctor profiles, active roster, and clinic credentials
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            size="sm"
            className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium shadow-xs h-8 px-3 text-xs"
          >
            <PlusIcon className="mr-1.5 size-3.5" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/20 hover:bg-muted/40 transition-colors rounded-xl border border-border/70"
              >
                <div className="flex items-center gap-3.5">
                  <Image
                    src={doctor.imageUrl}
                    alt={doctor.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-lg object-cover border border-border shrink-0"
                  />

                  <div>
                    <div className="font-semibold text-sm text-foreground">{doctor.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <span>{doctor.speciality}</span>
                      <span>•</span>
                      <span className="capitalize">{doctor.gender.toLowerCase()}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MailIcon className="size-3" />
                        <span>{doctor.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <PhoneIcon className="size-3" />
                        <span>{doctor.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
                  <div className="text-left sm:text-right pr-2">
                    <div className="font-semibold text-sm text-foreground">{doctor.appointmentCount}</div>
                    <div className="text-[11px] text-muted-foreground">Bookings</div>
                  </div>

                  {doctor.isActive ? (
                    <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-medium text-xs">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Inactive
                    </Badge>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs border-border hover:bg-muted"
                    onClick={() => handleEditDoctor(doctor)}
                  >
                    <EditIcon className="size-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />

      <EditDoctorDialog
        key={selectedDoctor?.id} // advanced react
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}
export default DoctorsManagement;
