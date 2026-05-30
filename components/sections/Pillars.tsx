import SectionTitle from "@/components/ui/SectionTitle";

export default function Pillars() {
  const pillars = [
    {
      title: "Entiende tu vehículo",
      desc: "Mantenimiento preventivo, señales de alerta y qué revisar antes de que sea urgente.",
      icon: (
        <svg className="w-8 h-8 text-te-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
          <path d="M12 2v2"/>
          <path d="M12 20v2"/>
          <path d="m4.93 4.93 1.41 1.41"/>
          <path d="m17.66 17.66 1.41 1.41"/>
          <path d="M2 12h2"/>
          <path d="M20 12h2"/>
          <path d="m6.34 17.66-1.41 1.41"/>
          <path d="m19.07 4.93-1.41 1.41"/>
        </svg>
      ),
    },
    {
      title: "Habla con confianza",
      desc: "Cómo comunicarte mejor, qué preguntar y cómo leer lo que te dicen.",
      icon: (
        <svg className="w-8 h-8 text-te-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
          <path d="m9 12 2 2 4-4"/>
        </svg>
      ),
    },
    {
      title: "Conoce los precios",
      desc: "Rangos reales del mercado salvadoreño. Por qué varían y qué es razonable esperar.",
      icon: (
        <svg className="w-8 h-8 text-te-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
          <path d="M7 7h.01"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-te-bg-alt py-[120px] px-8 border-y border-te-glass-border">
      <div className="max-w-[1280px] mx-auto w-full">
        
        {/* Title without view more */}
        <SectionTitle
          title="En qué nos enfocamos."
          description="Nuestros pilares editoriales para empoderarte como dueño de vehículo."
        />

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="te-anime-top bg-te-glass-bg border border-te-glass-border rounded-[28px] p-[35px] hover:border-te-orange/30 hover:bg-te-glass-bg/20 transition-all duration-300 flex flex-col gap-6"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-[18px] bg-te-glass-bg border border-te-glass-border flex items-center justify-center">
                {p.icon}
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display font-normal text-[1.375rem] tracking-tight text-te-text leading-tight">
                  {p.title}
                </h3>
                <p className="font-body text-[0.95rem] text-te-muted leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
