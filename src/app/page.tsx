import Hero from "@/components/Hero";
import RoiCalculator from "@/components/RoiCalculator";
import SolarFlow from "@/components/SolarFlow";
import Consultation from "@/components/Consultation";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <Hero />
      <RoiCalculator />
      <SolarFlow />
      <Consultation />
    </main>
  );
}
