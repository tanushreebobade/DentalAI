import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2Icon, ClipboardListIcon, HelpCircleIcon } from "lucide-react";

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Consultation Instructions */}
      <Card className="border border-border rounded-xl shadow-xs bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
            <ClipboardListIcon className="size-4 text-primary" />
            Consultation Instructions
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            How to get the most accurate clinical guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5 text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <CheckCircle2Icon className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>Click <strong>Connect Microphone</strong> below to initiate the secure audio stream.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2Icon className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>Describe the exact tooth or gum area, pain type (throbbing, sharp, dull), and trigger (cold, sweets, pressure).</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2Icon className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>Riley will evaluate urgency and provide safe temporary home-comfort recommendations.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2Icon className="size-3.5 text-primary shrink-0 mt-0.5" />
            <span>Review the real-time transcript below during or after your conversation.</span>
          </div>
        </CardContent>
      </Card>

      {/* Clinical Guidance Scope */}
      <Card className="border border-border rounded-xl shadow-xs bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
            <HelpCircleIcon className="size-4 text-primary" />
            Guidance Scope
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            What Riley can assist you with 24/7
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2.5 text-xs text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span><strong>Toothache & Sensitivity:</strong> Identification of potential enamel decay, hairline cracks, or exposed roots.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span><strong>Procedure Information:</strong> Detailed explanations of root canals, fillings, cleanings, and implants.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span><strong>Pricing & Duration:</strong> Transparent standard fee estimates and expected chair times.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="size-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            <span><strong>Doctor Booking:</strong> Guidance to book an appointment with verified clinic dentists when care is required.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeatureCards;
