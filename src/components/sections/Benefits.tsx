"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Users,
  Target,
  Scissors,
  Lightbulb,
  Award,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const benefits = [
  {
    Icon: TrendingUp,
    label: "01 · FINANÇAS",
    title: "Você trabalha muito. Mas quanto realmente fica no seu bolso?",
    desc: "Aprenda a calcular seus custos, definir preços com estratégia e descobrir quanto cada atendimento deixa de lucro. Pare de confundir dinheiro entrando com dinheiro sobrando.",
  },
  {
    Icon: Users,
    label: "02 · CLIENTES",
    title: "Cansada de depender da indicação para conseguir clientes?",
    desc: "Aprenda a divulgar seu trabalho de forma estratégica, alcançar pessoas que ainda não conhecem você e criar oportunidades para transformar interesse em agendamentos.",
  },
  {
    Icon: Target,
    label: "03 · MARKETING",
    title: "Seu Instagram mostra o valor do seu trabalho ou só publica fotos?",
    desc: "Aprenda a criar conteúdos que despertam desejo, demonstram sua habilidade e ajudam potenciais clientes a entender por que escolher você.",
  },
  {
    Icon: Scissors,
    label: "04 · TÉCNICA",
    title: "Não deixe a falta de técnica limitar o seu crescimento.",
    desc: "Aprimore seus acabamentos e amplie seu repertório com estilos como Box Braids, Boho Braids, Nagô e Twist, para oferecer mais possibilidades às suas clientes.",
  },
  {
    Icon: Lightbulb,
    label: "05 · ORGANIZAÇÃO",
    title: "Seu negócio não pode depender de você resolver tudo na correria.",
    desc: "Aprenda a separar suas finanças pessoais das profissionais, organizar sua rotina e tomar decisões com mais clareza, sem precisar improvisar a cada novo desafio.",
  },
  {
    Icon: Award,
    label: "06 · POSICIONAMENTO",
    title: "Pare de disputar clientes apenas pelo preço.",
    desc: "Desenvolva sua técnica, valorize sua experiência e aprenda a comunicar seus diferenciais para que suas clientes entendam o valor do seu trabalho — além do preço cobrado.",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="beneficios" className="py-24 px-5" ref={ref}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <SectionLabel>O que você ganha</SectionLabel>
          <h2 className="font-serif font-black text-4xl md:text-5xl leading-tight mb-5">
            Não é só aprender tranças.
            <br />
            <span className="text-gold-gradient italic">É mudar sua vida.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
            Aqui você aprende o que as escolas de beleza não ensinam: como
            transformar seu talento em um negócio que cresce e te dá liberdade.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl p-6 flex flex-col gap-4 card-top-gold hover:border-[#c9a052]/50 transition-all group"
              style={{
                background: "rgba(28,42,56,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center transition-colors group-hover:bg-[#c9a052]/20"
                style={{ background: "rgba(201,160,82,0.1)", border: "1px solid rgba(201,160,82,0.2)" }}
              >
                <b.Icon size={22} color="#c9a052" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-mono tracking-widest text-[#c9a052]/70 uppercase">
                {b.label}
              </span>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#c9a052] transition-colors leading-snug">
                {b.title}
              </h3>
              <p className="text-white/65 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
