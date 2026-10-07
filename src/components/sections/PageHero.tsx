"use client";
import { motion } from "framer-motion";
import { driveImageUrl, DRIVE_IMAGE_IDS } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

interface PageHeroProps {
  label: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  bgImageIndex?: number;
}

export default function PageHero({
  label,
  title,
  titleAccent,
  subtitle,
  bgImageIndex = 0,
}: PageHeroProps) {
  return (
    <section
      className="relative flex items-end justify-center overflow-hidden"
      style={{ minHeight: "46vh", paddingTop: "5rem" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${driveImageUrl(DRIVE_IMAGE_IDS[bgImageIndex], 1920)})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(14,19,24,0.75) 0%, rgba(14,19,24,0.55) 40%, rgba(14,19,24,0.97) 100%)",
        }}
      />

      {/* Subtle gold orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none opacity-10"
        style={{ background: "radial-gradient(ellipse, #c9a052 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 pb-14 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel>{label}</SectionLabel>
          <h1
            className="font-serif font-black leading-[1.1] tracking-tight mt-1"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
          >
            {title}{" "}
            {titleAccent && (
              <span className="text-gold-gradient italic">{titleAccent}</span>
            )}
          </h1>
          {subtitle && (
            <p className="text-white/55 text-base mt-4 max-w-md mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
