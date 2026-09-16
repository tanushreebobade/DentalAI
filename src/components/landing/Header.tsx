import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

import { ThemeToggle } from "../ThemeToggle";

function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 px-6 border-b border-border bg-background/90 backdrop-blur-md h-16 transition-colors">
      <div className="max-w-6xl mx-auto h-full flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="DentalAI" width={32} height={32} className="w-8 h-8 rounded-md" />
          <span className="font-semibold text-base tracking-tight text-foreground">Dental<span className="text-accent-warm">AI</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <a href="#how-it-works" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            How It Works
          </a>
          <a href="#triage-guide" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Clinical Triage
          </a>
          <a href="#faq" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            Care FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <SignInButton mode="modal">
            <Button variant="ghost" size="sm" className="text-sm font-medium text-foreground hover:bg-muted">
              Log in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm" className="text-sm font-medium bg-primary hover:bg-primary-hover text-primary-foreground shadow-xs">
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
}
export default Header;
