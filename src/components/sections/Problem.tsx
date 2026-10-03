"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { XCircle } from "lucide-react";

const pains = [
  "Você trabalha o dia todo trançando, sente dor nas mãos e nas costas… mas no fim do mês mal sobra dinheiro.",
  "Você tem talento de sobra, mas as clientes não te encontram — e você fica dependendo de indicação.",
  "Seu Instagram existe, mas não gera clientes. Você posta, mas ninguém agenda.",
  "Você nunca sabe ao certo quanto cobrar — com medo de perder cliente por cobrar muito, ou trabalhar de graça por cobrar pouco.",
  "Você quer crescer, mas ninguém te ensinou a estruturar um negócio de beleza de verdade.",
];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problema" className="py-24 px-5" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[#c9a052] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            A realidade que ninguém fala
          </span>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight mb-5">
            Você tem o talento.
            <br />
            <span className="text-gold-gradient italic">E onde está o lucro?</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            A maioria das trancistas trabalha muito, mas nunca ninguém ensinou
            a parte que realmente faz o dinheiro sobrar e os clientes chegarem.
          </p>
        </motion.div>

        {/* Pain points */}
        <div className="flex flex-col gap-4">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex items-start gap-4 rounded-2xl p-5"
              style={{ background: "rgba(28,42,56,0.8)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <XCircle
                size={20}
                color="#c4637a"
                strokeWidth={2}
                className="mt-0.5 flex-shrink-0"
              />
              <p className="text-white/75 text-base leading-relaxed">{pain}</p>
            </motion.div>
          ))}
        </div>

        {/* Pivot line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-14 text-center"
        >
          <p className="text-2xl md:text-3xl font-serif font-bold leading-snug">
            Isso não é falta de esforço —{" "}
            <span className="text-gold-gradient italic">é falta de método.</span>
          </p>
          <p className="text-white/55 mt-4 text-base max-w-lg mx-auto">
            E foi exatamente isso que eu resolvi quando decidi parar de sobreviver
            e comecei a construir um negócio de verdade.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
