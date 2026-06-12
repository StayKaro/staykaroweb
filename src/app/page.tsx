import Navbar              from "@/components/layout/Navbar";
import Footer              from "@/components/layout/Footer";
import Hero                from "@/components/sections/Hero";
import TrustBar            from "@/components/sections/TrustBar";
import About               from "@/components/sections/About";
import AIEcosystem         from "@/components/sections/AIEcosystem";
import Products            from "@/components/sections/Products";
import AIAutomation        from "@/components/sections/AIAutomation";
import QuoteEngine         from "@/components/sections/QuoteEngine";
import HowItWorks          from "@/components/sections/HowItWorks";
import CaseStudies         from "@/components/sections/CaseStudies";
import Testimonials        from "@/components/sections/Testimonials";
import FutureVision        from "@/components/sections/FutureVision";
import StudentComingSoon   from "@/components/sections/StudentComingSoon";
import FAQ                 from "@/components/sections/FAQ";
import TwoMissions         from "@/components/sections/TwoMissions";
import FinalCTA            from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="staykaro-shell">
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <AIEcosystem />
      <Products />
      <AIAutomation />
      <QuoteEngine />
      <HowItWorks />
      <CaseStudies />
      <Testimonials />
      <FutureVision />
      <StudentComingSoon />
      <FAQ />
      <TwoMissions />
      <FinalCTA />
      <Footer />
    </main>
  );
}
