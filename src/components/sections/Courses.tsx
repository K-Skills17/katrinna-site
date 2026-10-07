"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { WA_ETM, WA_EBOOK } from "@/lib/constants";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const etmModules = [
  "Box Braids — básico ao avançado",
  "Boho Braids com cachos naturais",
  "Nagô e tranças africanas tradicionais",
  "Twiste com cachos e acabamentos",
  "Marketing digital para trancistas",
  "Tráfego e captação de clientes",
  "Gestão financeira do negócio",
  "Como transformar lead em cliente",
  "Apostila 100% digital inclusa",
];

const ebookItems = [
  "Como organizar entradas e saídas sem complicação",
  "Precificação correta — nunca mais cobrar no chute",
  "Identificar custos fixos, variáveis e operacionais",
  "Como montar sua reserva de emergência",
  "Módulo bônus: rotina financeira passo a passo",
];

export default function Courses() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cursos" className="py-24 px-5" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <SectionLabel>Meus produtos</SectionLabel>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight mb-5">
            Escolha seu{" "}
            <span className="text-gold-gradient italic">próximo passo</span>
          </h2>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Do zero ao avançado — em técnicas, negócio e presença digital.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* ETM Course — main product */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(20,28,36,0.95)",
              border: "1px solid rgba(201,160,82,0.3)",
              boxShadow: "0 20px 60px rgba(201,160,82,0.1)",
            }}
          >
            {/* Best seller tag */}
            <div
              className="absolute top-5 right-5 text-xs font-black px-3 py-1 rounded-full z-10"
              style={{ background: "linear-gradient(135deg, #c9a052, #9a7a38)", color: "#0e1318" }}
            >
              + COMPLETO
            </div>

            {/* Header gradient */}
            <div
              className="px-7 pt-8 pb-6"
              style={{ background: "linear-gradient(135deg, rgba(201,160,82,0.15) 0%, transparent 100%)" }}
            >
              <span className="text-[#c9a052] text-xs font-bold tracking-[0.25em] uppercase">
                Curso completo
              </span>
              <h3 className="font-serif font-black text-3xl mt-2 leading-tight">
                ETM — Especialista em
                <br />
                Tranças
              </h3>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">
                24h de aulas práticas e personalizadas, do básico ao avançado
                — com técnicas, marketing e gestão financeira em um único
                programa.
              </p>
            </div>

            <div className="px-7 pb-8 flex flex-col gap-6 flex-1">
              {/* Details row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "24h", label: "de aulas" },
                  { val: "3x", label: "por semana" },
                  { val: "8h", label: "por aula" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="rounded-xl p-3 text-center"
                    style={{ background: "rgba(201,160,82,0.08)" }}
                  >
                    <p className="font-serif font-black text-xl text-[#c9a052]">{d.val}</p>
                    <p className="text-white/50 text-xs mt-0.5">{d.label}</p>
                  </div>
                ))}
              </div>

              {/* Modules */}
              <ul className="flex flex-col gap-2">
                {etmModules.map((m) => (
                  <li key={m} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-[#c9a052] mt-0.5 flex-shrink-0">✦</span>
                    {m}
                  </li>
                ))}
              </ul>

              {/* Bonus */}
              <div
                className="rounded-xl p-4"
                style={{ background: "rgba(196,99,122,0.1)", border: "1px solid rgba(196,99,122,0.2)" }}
              >
                <p className="text-[#c4637a] text-xs font-bold uppercase tracking-wider mb-1.5">
                  Bônus Exclusivo
                </p>
                <p className="text-white/70 text-sm">
                  E-book Gestão Financeira (R$80 → GRÁTIS) + E-book Marketing
                  Digital (R$70 → GRÁTIS)
                </p>
              </div>

              <a
                href={WA_ETM}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-4 rounded-2xl font-black text-base text-center flex items-center justify-center gap-2 mt-auto"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quero Me Inscrever Agora
              </a>
            </div>
          </motion.div>

          {/* E-book */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl overflow-hidden flex flex-col"
            style={{
              background: "rgba(20,28,36,0.95)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="px-7 pt-8 pb-6">
              <span className="text-[#c9a052] text-xs font-bold tracking-[0.25em] uppercase">
                E-book
              </span>
              <h3 className="font-serif font-black text-3xl mt-2 leading-tight">
                Gestão Financeira
                <br />
                para Trancistas
              </h3>
              <p className="text-white/60 text-sm mt-3 leading-relaxed">
                Um guia direto ao ponto para organizar sua vida financeira,
                precificar corretamente e ter lucro real — sem fórmulas complicadas.
              </p>
            </div>

            <div className="px-7 pb-8 flex flex-col gap-6 flex-1">
              {/* Items */}
              <ul className="flex flex-col gap-2.5">
                {ebookItems.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-white/70">
                    <span className="text-[#c9a052] mt-0.5 flex-shrink-0">✦</span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div
                className="rounded-2xl p-5 text-center"
                style={{ background: "rgba(201,160,82,0.08)", border: "1px solid rgba(201,160,82,0.15)" }}
              >
                <p className="text-white/40 text-sm line-through">de R$80,00</p>
                <p className="font-serif font-black text-4xl text-gold-gradient mt-1">R$27,96</p>
                <p className="text-white/50 text-xs mt-2">Acesso imediato · Garantia de 7 dias</p>
              </div>

              {/* Guarantee */}
              <div className="flex items-start gap-3 text-sm text-white/55">
                <span className="text-xl flex-shrink-0">🔒</span>
                <p>
                  Compre sem medo. Se em 7 dias o e-book não te ajudar, eu devolvo
                  seu dinheiro. Sem burocracia.
                </p>
              </div>

              <a
                href={WA_EBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full py-4 rounded-2xl font-black text-base text-center flex items-center justify-center gap-2 mt-auto"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quero Começar Agora
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
