"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WA_GENERAL, driveImageUrl } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import DecoFrame from "@/components/ui/DecoFrame";

const credentials = [
  "Trancista há 7 anos",
  "Fundadora do Studio Afro Rosa's",
  "Formada em Gestão Financeira — IE University",
  "Especialista em Marketing Digital",
  "Criadora de conteúdo e empreendedora",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="sobre" className="py-24 px-5" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="absolute -inset-3 rounded-3xl opacity-30"
              style={{
                background: "linear-gradient(135deg, #c9a052 0%, transparent 60%)",
              }}
            />
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src={driveImageUrl("1oaG5lwDMr8iDrEuhFehtbnG81i3ihAZf", 800)}
                alt="Katrinna — Especialista em Tranças"
                className="w-full object-cover"
                style={{ aspectRatio: "4/5", objectPosition: "top" }}
              />
              {/* Art Deco corner frame overlay */}
              <div className="absolute inset-3">
                <DecoFrame size={28} opacity={0.55} />
              </div>
            </div>
            {/* Badge */}
            <div
              className="absolute -bottom-4 -right-2 md:-right-6 rounded-2xl px-5 py-4 text-center"
              style={{
                background: "linear-gradient(135deg, #c9a052, #9a7a38)",
              }}
            >
              <p className="font-serif font-black text-3xl text-[#0e1318] leading-none">7+</p>
              <p className="text-[#0e1318] text-xs font-bold mt-1">anos de<br />experiência</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <SectionLabel align="left">Quem sou eu</SectionLabel>
              <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight">
                Olá, eu sou{" "}
                <span className="text-gold-gradient italic">Katrinna</span>
              </h2>
            </div>

            <p className="text-white/70 text-base leading-relaxed">
              Comecei a trançar com 11 anos, aprendendo com minha mãe. Com o
              tempo fui me aperfeiçoando, mas por anos trabalhei muito e via
              pouco resultado financeiro — exatamente como você pode estar
              vivendo hoje.
            </p>

            <p className="text-white/70 text-base leading-relaxed">
              Decidi mudar isso. Me formei em{" "}
              <span className="text-[#c9a052] font-semibold">
                Gestão Financeira pela IE University
              </span>
              , investi em conhecimento de marketing digital e transformei meu
              negócio. Hoje sou fundadora do{" "}
              <span className="text-[#c9a052] font-semibold">Studio Afro Rosa&apos;s</span>{" "}
              e ensino outras profissionais a fazerem o mesmo.
            </p>

            {/* Credentials */}
            <ul className="flex flex-col gap-2.5">
              {credentials.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm text-white/75">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                    style={{ background: "rgba(201,160,82,0.2)", color: "#c9a052" }}
                  >
                    ✓
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-7 py-4 rounded-full font-bold text-sm w-fit"
            >
              Falar com Katrinna
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
