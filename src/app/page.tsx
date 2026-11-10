import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Portfolio />
        <About />
        <FinalCTA variant="booking" />
      </main>
      <Footer />
    </>
  );
}
