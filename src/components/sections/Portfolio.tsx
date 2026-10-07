"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { DRIVE_IMAGE_IDS, driveImageUrl, WA_GENERAL } from "@/lib/constants";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

// Pick 8 images with varied aspect-ratio labels for the floating layout
const PICKS = [
  { id: DRIVE_IMAGE_IDS[1],  label: "Box Braids",  tall: true  },
  { id: DRIVE_IMAGE_IDS[4],  label: "Boho Braids", tall: false },
  { id: DRIVE_IMAGE_IDS[7],  label: "Nagô",        tall: true  },
  { id: DRIVE_IMAGE_IDS[10], label: "Box Braids",  tall: false },
  { id: DRIVE_IMAGE_IDS[13], label: "Boho Braids", tall: true  },
  { id: DRIVE_IMAGE_IDS[16], label: "Twiste",      tall: false },
  { id: DRIVE_IMAGE_IDS[19], label: "Nagô",        tall: true  },
  { id: DRIVE_IMAGE_IDS[22], label: "Box Braids",  tall: false },
];

// Slight tilt per card — alternates for a "scattered on table" feel
const tilts = [-2.5, 1.8, -1.2, 2.8, -2, 1.5, -3, 2.2];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-24 px-5 overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>Meus trabalhos</SectionLabel>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight mb-4">
            O trabalho fala{" "}
            <span className="text-gold-gradient italic">por si só.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            Cada trança é uma história de cuidado, técnica e arte.
          </p>
        </motion.div>

        {/* Floating card grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PICKS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, rotate: tilts[i] * 0.5 }}
              animate={
                inView
                  ? { opacity: 1, y: 0, rotate: tilts[i] }
                  : {}
              }
              whileHover={{
                rotate: 0,
                scale: 1.06,
                zIndex: 20,
                y: -8,
                boxShadow: "0 24px 60px rgba(0,0,0,0.5), 0 0 0 2px rgba(201,160,82,0.4)",
              }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: "easeOut" }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                aspectRatio: item.tall ? "3/4" : "4/3",
                transformOrigin: "center bottom",
              }}
            >
              <img
                src={driveImageUrl(item.id, 600)}
                alt={`Trança — ${item.label}`}
                className="w-full h-full object-cover object-top transition-transform duration-500"
                style={{ transform: hovered === i ? "scale(1.08)" : "scale(1)" }}
                loading="lazy"
              />

              {/* Gradient overlay — always subtle, more on hover */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(14,19,24,0.75) 0%, transparent 55%)",
                  opacity: hovered === i ? 1 : 0.6,
                }}
              />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
                <span className="flex flex-col gap-0.5">
                  <span
                    className="font-black leading-none"
                    style={{ color: "#c9a052", fontSize: "0.55rem", letterSpacing: "0.15em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white text-xs font-bold tracking-wide drop-shadow">
                    {item.label}
                  </span>
                </span>
                <motion.div
                  animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ExternalLink size={14} color="#c9a052" />
                </motion.div>
              </div>

              {/* Gold border flash on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                animate={{
                  boxShadow:
                    hovered === i
                      ? "inset 0 0 0 2px rgba(201,160,82,0.6)"
                      : "inset 0 0 0 0px rgba(201,160,82,0)",
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-white/55 mb-6 text-base">
            Gostou do que viu? Veja a galeria completa ou agende um horário.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/portfolio"
              className="border text-sm px-7 py-3.5 rounded-full font-bold transition-all inline-flex items-center gap-2 hover:bg-[#c9a052]/10"
              style={{ borderColor: "rgba(201,160,82,0.4)", color: "#c9a052" }}
            >
              Ver Galeria Completa →
            </Link>
            <a
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3.5 rounded-full font-black text-sm inline-flex items-center gap-2"
            >
              Agendar Horário
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
