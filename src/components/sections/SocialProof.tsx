"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "7+", label: "Anos de Experiência" },
  { number: "30+", label: "Alunas Ativas" },
  { number: "25+", label: "Vidas Transformadas" },
  { number: "100%", label: "Personalizado" },
];

export default function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-10 border-y border-white/10"
      style={{ background: "rgba(201,160,82,0.06)" }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 py-4 px-6 text-center"
            >
              <span
                className="font-serif font-black text-4xl text-gold-gradient leading-none"
              >
                {s.number}
              </span>
              <span className="text-white/60 text-sm font-medium tracking-wide">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
