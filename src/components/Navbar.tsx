"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, HomeIcon, MicIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "./ThemeToggle";

function Navbar() {
  const { user } = useUser();
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/appointments", label: "Appointments", icon: CalendarIcon },
    { href: "/voice", label: "Voice Consultation", icon: MicIcon },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 border-b border-border bg-background/90 backdrop-blur-md h-16 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LEFT: LOGO & NAV */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-0">
            <Image src="/logo.png" alt="DentalAI" width={32} height={32} className="w-8 h-8 rounded-md" />
            <span className="font-semibold text-base tracking-tight text-foreground">Dental<span className="text-accent-warm">AI</span></span>
          </Link>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT: THEME TOGGLE & PATIENT USER PROFILE */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <div className="hidden sm:flex flex-col items-end leading-tight text-right">
            <span className="text-sm font-semibold text-foreground">
              {user?.firstName ? `${user.firstName} ${user?.lastName || ""}`.trim() : "Patient"}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.emailAddresses?.[0]?.emailAddress}
            </span>
          </div>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
