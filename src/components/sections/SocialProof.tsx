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
      className="py-10"
      style={{
        background: "rgba(201,160,82,0.05)",
        borderTop: "1px solid rgba(201,160,82,0.2)",
        borderBottom: "1px solid rgba(201,160,82,0.2)",
      }}
    >
      <div className="max-w-5xl mx-auto px-5">
        <div className="flex items-center justify-center flex-wrap gap-0">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center gap-1.5 py-4 px-8 md:px-12 text-center"
              >
                <span className="font-serif font-black text-4xl md:text-5xl text-gold-gradient leading-none">
                  {s.number}
                </span>
                <span
                  className="text-white/50 font-medium tracking-widest uppercase"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}
                >
                  {s.label}
                </span>
              </motion.div>
              {i < stats.length - 1 && (
                <span className="stat-sep hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
