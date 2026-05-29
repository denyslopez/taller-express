import EmailCapture from "@/components/ui/EmailCapture";

export default function Intriga() {
  return (
    <section className="relative py-[140px] px-8 bg-te-bg-alt overflow-hidden flex flex-col items-center justify-center border-t border-te-glass-border">
      {/* Grain overlay for premium texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: "url('/noise.svg')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Radial ambient light glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff8c1a]/5 blur-3xl pointer-events-none z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center text-center gap-8">
        
        {/* Geo eyebrow */}
        <span className="font-body text-[12px] font-bold uppercase tracking-widest text-te-orange">
          Empezamos en Santa Tecla y Antiguo Cuscatlán.
        </span>

        {/* Headline */}
        <h2 className="te-anime-text font-display font-semibold text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-te-text max-w-2xl">
          Llevamos meses entendiendo el problema.
        </h2>

        {/* Subhead */}
        <p className="font-body text-base md:text-[1.08rem] text-te-muted max-w-xl font-light leading-relaxed">
          La solución está en camino. Cuando esté lista, tú eres el primero en saberlo.
        </p>

        {/* Dark variant EmailCapture */}
        <div className="te-anime-top mt-4 w-full flex justify-center">
          <EmailCapture
            tag="intriga-home"
            placeholder="Tu correo electrónico"
            cta="Quiero saber →"
            variant="dark"
          />
        </div>

      </div>
    </section>
  );
}
