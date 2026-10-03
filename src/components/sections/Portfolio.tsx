"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { DRIVE_IMAGE_IDS, driveImageUrl, WA_GENERAL } from "@/lib/constants";

const categories = ["Todos", "Box Braids", "Boho Braids", "Nagô", "Outros"];

// Map IDs to categories (rough assignment — all will show in "Todos")
const portfolio = DRIVE_IMAGE_IDS.map((id, i) => ({
  id,
  url: driveImageUrl(id, 600),
  category: categories[(i % 4) + 1] as string,
}));

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("Todos");

  const filtered =
    active === "Todos" ? portfolio : portfolio.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-24 px-5" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="text-[#c9a052] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Meus trabalhos
          </span>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight mb-5">
            O trabalho fala
            <br />
            <span className="text-gold-gradient italic">por si só.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            Cada trança é uma história de cuidado, técnica e arte. Veja o que
            sai das minhas mãos.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 flex-wrap justify-center mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                active === cat
                  ? {
                      background: "linear-gradient(135deg, #e8c87a, #c9a052)",
                      color: "#0e1318",
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }
              }
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * (i % 8) }}
              className="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-pointer"
            >
              <img
                src={item.url}
                alt={`Trabalho de tranças — ${item.category}`}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(201,160,82,0.9)", color: "#0e1318" }}
                >
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA below grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-white/55 mb-5 text-base">
            Gostou do que viu? Vamos conversar sobre o que posso fazer por você.
          </p>
          <a
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-4 rounded-full font-black text-sm inline-flex items-center gap-2"
          >
            Agendar Horário
          </a>
        </motion.div>
      </div>
    </section>
  );
}
