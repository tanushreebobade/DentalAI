import Navbar from "@/components/Navbar";
import FeatureCards from "@/components/voice/FeatureCards";
import VapiWidget from "@/components/voice/VapiWidget";
import WelcomeSection from "@/components/voice/WelcomeSection";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function VoicePage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeSection />
        <FeatureCards />
      </div>

      <VapiWidget />
    </div>
  );
}

export default VoicePage;
