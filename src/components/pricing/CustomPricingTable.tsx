"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, CrownIcon, SparklesIcon, ExternalLinkIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

export default function CustomPricingTable() {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Essential access to book appointments with qualified dentists.",
      features: [
        "Browse verified dentist profiles",
        "Book & manage dental appointments",
        "Email confirmation & reminders",
        "Standard appointment dashboard",
      ],
      cta: "Current Plan",
      popular: false,
      disabled: true,
    },
    {
      id: "ai_basic",
      name: "AI Basic",
      price: "$9",
      period: "/month",
      description: "24/7 AI voice dental consultations and instant advice.",
      features: [
        "Everything in Free",
        "24/7 AI Voice Consultations with Riley",
        "Instant toothache & sensitivity triage",
        "Dental procedure & cost guidance",
        "Standard voice response speed",
      ],
      cta: "Upgrade to Basic",
      popular: true,
      badge: "Most Popular",
    },
    {
      id: "ai_pro",
      name: "AI Pro",
      price: "$29",
      period: "/month",
      description: "Unlimited premium AI voice care with priority booking.",
      features: [
        "Everything in AI Basic",
        "Unlimited AI Voice Consultations",
        "Emergency pain relief triage",
        "Priority dentist appointment slots",
        "Dedicated oral hygiene planning",
        "Family coverage (up to 4 members)",
      ],
      cta: "Upgrade to Pro",
      popular: false,
      badge: "Best Value",
    },
  ];

  return (
    <div className="space-y-12">
      {/* CLERK BILLING NOTICE BANNER */}
      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 shrink-0" />
          <span>
            To activate automated Stripe payments with Clerk, enable <strong>Billing</strong> in your Clerk Dashboard.
          </span>
        </div>
        <a
          href="https://dashboard.clerk.com/last-active?path=billing/settings"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold underline hover:opacity-80 shrink-0 text-xs sm:text-sm"
        >
          Open Clerk Billing <ExternalLinkIcon className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* PRICING CARDS */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
              plan.popular
                ? "border-primary shadow-lg ring-2 ring-primary/20 scale-105 md:-translate-y-2 bg-gradient-to-b from-primary/5 to-card"
                : "border-border bg-card"
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 shadow">
                  {plan.badge}
                </Badge>
              </div>
            )}

            <div>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    {plan.name}
                    {plan.id === "ai_pro" && <CrownIcon className="w-5 h-5 text-amber-500" />}
                    {plan.id === "ai_basic" && <SparklesIcon className="w-5 h-5 text-primary" />}
                  </CardTitle>
                </div>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-muted-foreground ml-1 text-sm font-medium">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 pt-2">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  What's included
                </div>
                <ul className="space-y-3 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="rounded-full p-0.5 bg-primary/10 text-primary mt-0.5 shrink-0">
                        <CheckIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-muted-foreground leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>

            <CardFooter className="pt-6">
              {plan.disabled ? (
                <Button variant="outline" className="w-full cursor-default opacity-70" disabled>
                  {plan.cta}
                </Button>
              ) : (
                <a
                  href="https://dashboard.clerk.com/last-active?path=billing/settings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    className={`w-full font-semibold shadow transition-all ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
