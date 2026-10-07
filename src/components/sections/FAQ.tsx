"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const faqs = [
  {
    q: "Preciso ter experiência para entrar no curso ETM?",
    a: "Não! O curso é desenhado do básico ao avançado. Se você é iniciante, vai aprender as bases com segurança. Se já tem experiência, vai aperfeiçoar técnicas e aprender a precificar e usar o digital a seu favor.",
  },
  {
    q: "Como funcionam as aulas do ETM?",
    a: "São 24h totais, divididas em 3 aulas por semana com 8h de duração cada. O atendimento é 100% personalizado — você tem atenção total, sem turma lotada e sem dúvida ignorada.",
  },
  {
    q: "O que está incluído no curso?",
    a: "Técnicas de tranças (box braids, boho braids, nagô, twiste), módulos de marketing digital, gestão financeira, criação de conteúdo, apostila digital e mais 2 e-books como bônus exclusivo.",
  },
  {
    q: "E o e-book de Gestão Financeira, para quem é?",
    a: "Para qualquer profissional da beleza que trabalha muito mas sente que o dinheiro some. O e-book ensina precificação, organização financeira e como separar as finanças do negócio das pessoais — de forma simples e prática.",
  },
  {
    q: "Tem garantia?",
    a: "Sim! O e-book tem garantia de 7 dias. Se você sentir que não valeu, é só entrar em contato e eu devolvo seu dinheiro sem burocracia.",
  },
  {
    q: "Como entro em contato para mais informações?",
    a: "É só clicar em qualquer botão de WhatsApp nessa página. Respondo pessoalmente e explico tudo sobre o curso ou o e-book.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-5" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight">
            Ficou alguma{" "}
            <span className="text-gold-gradient italic">dúvida?</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.07 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(20,28,36,0.9)",
                border: `1px solid ${open === i ? "rgba(201,160,82,0.35)" : "rgba(255,255,255,0.07)"}`,
                transition: "border-color 0.3s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-base text-white/90">{faq.q}</span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all text-sm font-black"
                  style={{
                    background: open === i ? "linear-gradient(135deg, #c9a052, #9a7a38)" : "rgba(255,255,255,0.08)",
                    color: open === i ? "#0e1318" : "rgba(255,255,255,0.6)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
