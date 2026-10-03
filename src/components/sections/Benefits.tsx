"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const benefits = [
  {
    icon: "💰",
    title: "Dinheiro sobrando no fim do mês",
    desc: "Aprenda a precificar cada serviço com lógica e segurança. Chega de cobrar no chute — você vai saber exatamente quanto custa cada cliente e quanto de lucro real você tem.",
  },
  {
    icon: "📲",
    title: "Clientes chegando até você",
    desc: "Pare de correr atrás de indicação. Com a presença digital certa, sua agenda enche porque as pessoas te encontram, confiam em você e já querem agendar.",
  },
  {
    icon: "🎯",
    title: "Conteúdo que vende, não só engaja",
    desc: "Aprenda a criar posts, stories e reels que transformam seguidoras em clientes pagantes — não apenas curtidas. Seu Instagram vira uma máquina de agendamentos.",
  },
  {
    icon: "✂️",
    title: "Técnicas que impressionam e diferenciam",
    desc: "Box braids, Boho braids, Nagô, Twiste com cachos e muito mais. Domine as técnicas mais pedidas e se posicione como referência no mercado.",
  },
  {
    icon: "🧠",
    title: "Mentalidade de empreendedora",
    desc: "Você aprende a ver seu negócio com outros olhos: separar as finanças pessoais das profissionais, criar rotinas que funcionam e tomar decisões com clareza.",
  },
  {
    icon: "🏆",
    title: "Reconhecida como especialista",
    desc: "Quando você domina técnica, negócio e presença digital ao mesmo tempo, você sai da concorrência por preço e entra na concorrência por valor e autoridade.",
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
          <span className="text-[#c9a052] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            O que você ganha
          </span>
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
              className="rounded-2xl p-6 flex flex-col gap-3 hover:border-[#c9a052]/40 transition-all group"
              style={{
                background: "rgba(20,28,36,0.9)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="text-3xl">{b.icon}</span>
              <h3 className="font-serif font-bold text-lg text-white group-hover:text-[#c9a052] transition-colors leading-snug">
                {b.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
