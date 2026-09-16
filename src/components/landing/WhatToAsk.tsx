import { AlertCircleIcon, CheckCircleIcon, ClockIcon, HelpCircleIcon, MessageSquareIcon, ShieldAlertIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

function WhatToAsk() {
  const commonInquiries = [
    {
      question: "It hurts when I bite down or chew",
      concern: "Could be a cracked tooth, cavity, or inflamed nerve",
      urgency: "See a dentist soon",
      urgencyColor: "text-accent-warm bg-accent-warm/10 border-accent-warm/20",
      guidance: "Try not to chew on that side for now. Over-the-counter pain relief can help — but book an appointment within a day or two.",
    },
    {
      question: "My gums bleed when I brush or floss",
      concern: "Usually early gum disease or plaque buildup",
      urgency: "Worth a checkup",
      urgencyColor: "text-blue-600 bg-blue-500/10 border-blue-500/20 dark:text-blue-400",
      guidance: "Keep brushing gently with a soft toothbrush and don't skip flossing. A professional cleaning can make a big difference.",
    },
    {
      question: "My face is swollen and I have a fever",
      concern: "Likely a dental abscess or spreading infection",
      urgency: "Go now — this is urgent",
      urgencyColor: "text-red-600 bg-red-500/10 border-red-500/20 dark:text-red-400",
      guidance: "Don't wait on this one. Skip hot compresses and head to a dentist or emergency room as soon as possible.",
    },
  ];

  return (
    <section id="triage-guide" className="py-20 md:py-28 px-6 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
            What people ask about most
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Not sure if your symptoms are serious? Here are the kinds of things Riley helps with every day.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Clinical Case Inquiries */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Real Questions, Real Answers
            </h3>

            {commonInquiries.map((item, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-3 transition-all hover:border-border/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-lg bg-muted text-foreground flex items-center justify-center shrink-0 mt-0.5">
                      <HelpCircleIcon className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.question}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Possible cause: {item.concern}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${item.urgencyColor}`}>
                    {item.urgency}
                  </span>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/50 leading-relaxed">
                  <span className="font-medium text-foreground">Riley's advice: </span>
                  {item.guidance}
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Triage Urgency Protocol Card */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border rounded-xl shadow-xs p-6 space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-border">
                <ShieldAlertIcon className="size-5 text-primary" />
                <div>
                  <h3 className="text-sm font-semibold text-foreground">How we prioritize your care</h3>
                  <p className="text-xs text-muted-foreground">The levels Riley uses to assess your situation</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="size-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">Routine</span>
                    <p className="text-muted-foreground mt-0.5">Regular cleanings, mild sensitivity, routine checkups.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="size-2 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">Needs attention soon</span>
                    <p className="text-muted-foreground mt-0.5">Ongoing toothache, a loose filling, or a chipped tooth.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                  <span className="size-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="font-semibold text-foreground block">Get help right away</span>
                    <p className="text-muted-foreground mt-0.5">Swelling in your face, heavy bleeding, or a knocked-out tooth.</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <SignUpButton mode="modal">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium py-2 h-auto shadow-xs">
                    <MessageSquareIcon className="mr-2 size-3.5" />
                    Talk to Riley Now
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatToAsk;
