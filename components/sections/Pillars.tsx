import SectionTitle from "@/components/ui/SectionTitle";

export default function Pillars() {
  const pillars = [
    {
      title: "Entiende tu vehículo",
      desc: "Mantenimiento preventivo, señales de alerta y qué revisar antes de que sea urgente.",
      icon: (
        <svg className="w-8 h-8 text-te-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
        </svg>
      ),
    },
    {
      title: "Habla con confianza",
      desc: "Cómo comunicarte mejor, qué preguntar y cómo leer lo que te dicen.",
      icon: (
        <svg className="w-8 h-8 text-te-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.678 20.89a9 9 0 005.505.215 9.74 9.74 0 003.577-2.187 9.704 9.704 0 002.528-3.762 9.07 9.07 0 00.384-2.733c-.001-1.016-.215-2.021-.631-2.958a9.716 9.716 0 00-1.743-2.685 9.716 9.716 0 00-2.684-1.743 9.071 9.071 0 00-2.958-.631 9.071 9.071 0 00-2.733.384 9.704 9.704 0 00-3.762 2.528 9.74 9.74 0 00-2.187 3.577 9 9 0 00.215 5.505A12.24 12.24 0 003 20c2.225-.244 4.49-.908 6.505-2.025a1.21 1.21 0 011.026.046c.925.433 1.942.662 2.969.662v-.002z" />
        </svg>
      ),
    },
    {
      title: "Conoce los precios",
      desc: "Rangos reales del mercado salvadoreño. Por qué varían y qué es razonable esperar.",
      icon: (
        <svg className="w-8 h-8 text-te-orange shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5h.007m-.007 3h.007m-.007 3h.007m-.007 3h.007m-.007 3h.007m0 3h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-te-bg-alt py-[120px] px-8 border-y border-white/5">
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
              className="te-anime-top bg-white/[0.02] border border-white/[0.05] rounded-[28px] p-[35px] hover:border-white/[0.1] hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-6"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-[18px] bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                {p.icon}
              </div>

              {/* Title & Desc */}
              <div className="flex flex-col gap-3">
                <h3 className="font-display font-bold text-[22px] tracking-tight text-white leading-tight">
                  {p.title}
                </h3>
                <p className="font-body text-[14.4px] text-te-muted leading-relaxed">
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
