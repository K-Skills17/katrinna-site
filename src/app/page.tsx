import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Problem from "@/components/sections/Problem";
import Benefits from "@/components/sections/Benefits";
import About from "@/components/sections/About";
import Courses from "@/components/sections/Courses";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Problem />
        <Benefits />
        <About />
        <Courses />
        <Portfolio />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
