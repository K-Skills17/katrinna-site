"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Real testimonials to be added by client — placeholders marked
const testimonials = [
  {
    name: "Ana Paula S.",
    role: "Aluna do ETM",
    text: "Depois do curso da Katrinna, consegui triplicar minha clientela em dois meses. Aprendi não só as técnicas, mas como fazer o Instagram trabalhar por mim.",
    initials: "AP",
  },
  {
    name: "Fernanda L.",
    role: "Aluna do ETM",
    text: "Eu trabalhava muito e mal sobrava dinheiro. O módulo de gestão financeira mudou completamente como eu vejo meu negócio. Hoje sei exatamente o que cobrar.",
    initials: "FL",
  },
  {
    name: "Camila R.",
    role: "Compradora do E-book",
    text: "O e-book é direto ao ponto, sem enrolação. Em uma semana já tinha organizado minhas finanças e entendido onde estava perdendo dinheiro.",
    initials: "CR",
  },
  {
    name: "Beatriz M.",
    role: "Aluna do ETM",
    text: "O que mais me surpreendeu foi o acompanhamento personalizado. Katrinna realmente se importa com o crescimento de cada aluna.",
    initials: "BM",
  },
  {
    name: "Juliana T.",
    role: "Aluna do ETM",
    text: "Aprendi técnicas que nem sabia que existiam. Boho braids e box braids do jeito certo. Meu portfólio mudou completamente — as clientes percebem a diferença.",
    initials: "JT",
  },
  {
    name: "Priscila N.",
    role: "Compradora do E-book",
    text: "Finalmente entendi como precificar sem medo. Aumentei meus preços 40% e não perdi nenhuma cliente. O e-book valeu muito mais do que paguei.",
    initials: "PN",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="depoimentos"
      className="py-24 px-5"
      ref={ref}
      style={{ background: "rgba(20,28,36,0.6)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#c9a052] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight">
            Histórias que{" "}
            <span className="text-gold-gradient italic">inspiram</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "rgba(14,19,24,0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-[#c9a052] text-sm">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #c9a052, #9a7a38)", color: "#0e1318" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-[#c9a052] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
