import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon, CalendarIcon, FileTextIcon, MicIcon } from "lucide-react";
import { Button } from "../ui/button";

function HowItWorks() {
  const steps = [
    {

      icon: MicIcon,
      title: "Tell us what's wrong",
      description:
        "Just describe what you're feeling — a sore tooth, bleeding gums, whatever it is. Riley will listen and help you figure out what to do next.",
      tag: "Quick answers",
    },
    {

      icon: FileTextIcon,
      title: "Get clear advice",
      description:
        "Find out if it's something you can handle at home or if you should see a dentist soon. No confusing medical jargon — just straightforward guidance.",
      tag: "Easy to understand",
    },
    {

      icon: CalendarIcon,
      title: "Book your dentist",
      description:
        "Pick a dentist that works for you, choose a time slot, and you're done. You'll get an email confirmation right away.",
      tag: "Hassle-free booking",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 border-t border-border bg-muted/20">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            How DentalAI works
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            From your first concern to a confirmed appointment — it's as simple as three steps.
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}

                className="bg-card border border-border rounded-xl p-6 shadow-xs hover:border-border/80 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/15">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground font-mono">

                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60">
                  <span className="inline-block text-xs font-medium text-foreground/80 bg-muted px-2.5 py-1 rounded-md">
                    {step.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-12">
          <SignUpButton mode="modal">
            <Button size="lg" className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-6 py-2.5 h-auto shadow-xs">
              Start a Free Consultation
              <ArrowRightIcon className="ml-2 size-4" />
            </Button>
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
