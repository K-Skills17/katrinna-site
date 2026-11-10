import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import PageHero from "@/components/sections/PageHero";
import Problem from "@/components/sections/Problem";
import Benefits from "@/components/sections/Benefits";
import Courses from "@/components/sections/Courses";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Curso ETM | Katrinna — Studio Afro Rosa's",
  description:
    "ETM — Especialista em Tranças e E-book de Gestão Financeira. Transforme seu talento em um negócio lucrativo.",
};

export default function CursoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Meus produtos"
          title="Escolha seu"
          titleAccent="próximo passo."
          subtitle="Do zero ao avançado — técnicas, negócio e presença digital em um só lugar."
          bgImageIndex={0}
        />
        <Problem />
        <Benefits />
        <Courses />
        <FAQ />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
