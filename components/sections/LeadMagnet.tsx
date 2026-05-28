import EmailCapture from "@/components/ui/EmailCapture";
import PDFPlaceholder from "@/components/pdf-placeholder/PDFPlaceholder";

export default function LeadMagnet() {
  return (
    <section className="py-[120px] px-8 bg-te-bg overflow-hidden">
      <div className="max-w-[1280px] mx-auto w-full">
        {/* Floating gradient container card */}
        <div className="relative w-full bg-gradient-to-br from-[#16243b] to-[#0f1728] border border-white/[0.08] rounded-[40px] p-8 md:p-[70px] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Abstract vector line design background element (Top-Right) */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none select-none opacity-[0.06] text-white">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none" stroke="currentColor" strokeWidth="0.5">
              <circle cx="100" cy="0" r="80" />
              <circle cx="100" cy="0" r="60" />
              <circle cx="100" cy="0" r="40" />
              <circle cx="100" cy="0" r="20" />
            </svg>
          </div>

          {/* Left Block (Copy & EmailCapture) */}
          <div className="te-anime-left flex-grow max-w-xl flex flex-col gap-6 z-10">
            {/* Eyebrow */}
            <span className="font-body text-[12px] font-bold uppercase tracking-wider text-te-orange">
              Próximamente &middot; Gratis
            </span>

            {/* Headline */}
            <h2 className="font-display font-bold text-3xl md:text-[2.35rem] leading-tight tracking-tight text-te-text">
              Todo lo que necesitas saber antes de tu próxima visita al taller.
            </h2>

            {/* Subheading */}
            <p className="font-body text-[0.95rem] leading-relaxed text-te-muted">
              Estamos preparando una guía práctica para dueños de vehículo en El Salvador. Sin tecnicismos. Sin letra chica. Déjanos tu correo y eres el primero en recibirla.
            </p>

            {/* Email capture with Name enabled */}
            <div className="mt-2 w-full">
              <EmailCapture
                tag="leadmagnet-home"
                placeholder="Tu correo electrónico"
                cta="Quiero la guía"
                variant="light"
                showName={true}
              />
            </div>

            {/* Disclaimer */}
            <span className="font-body text-[11.5px] text-te-subtle">
              Sin spam. Solo te escribimos cuando la guía esté lista.
            </span>
          </div>

          {/* Right Block (Book Mockup) */}
          <div className="te-anime-top shrink-0 flex items-center justify-center py-6 px-12 z-10">
            <PDFPlaceholder />
          </div>

        </div>
      </div>
    </section>
  );
}
