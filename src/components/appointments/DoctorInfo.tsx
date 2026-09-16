import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  return (
    <div className="flex items-center gap-3.5">
      <Image
        src={doctor.imageUrl!}
        alt={doctor.name}
        width={48}
        height={48}
        className="size-12 rounded-full object-cover border border-border bg-muted shrink-0"
      />
      <div>
        <h3 className="font-semibold text-sm text-foreground">{doctor.name}</h3>
        <p className="text-xs text-primary font-medium">{doctor.speciality || "General Dentistry"}</p>
      </div>
    </div>
  );
}

export default DoctorInfo;
