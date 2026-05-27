import { Metadata } from "next";
import EmailCapture from "@/components/ui/EmailCapture";
import PDFPlaceholder from "@/components/pdf-placeholder/PDFPlaceholder";

export const metadata: Metadata = {
  title: "La Guía Inteligente para tu Carro",
  description:
    "Todo lo que necesitas saber antes de tu próxima visita al taller en El Salvador. Sin tecnicismos. Sin letra chica.",
};

export default function GuiaPage() {
  return (
    <section className="py-20 px-8 bg-te-bg min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Glow radial light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#ff8c1a]/5 blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left column - Book Mockup */}
        <div className="te-anime-top shrink-0 flex items-center justify-center py-6 px-12 md:pl-0">
          <PDFPlaceholder />
        </div>

        {/* Right column - Copy & Sign Up */}
        <div className="te-anime-left flex-grow max-w-xl flex flex-col gap-6">
          <span className="font-body text-[12px] font-bold uppercase tracking-widest text-te-orange">
            Próximamente &middot; Recurso Gratuito
          </span>
          
          <h1 className="font-display font-extrabold text-[2.25rem] md:text-[3rem] leading-tight text-white tracking-tight">
            La guía que todo dueño de vehículo en El Salvador necesita.
          </h1>

          <p className="font-body text-zinc-400 text-sm md:text-[0.97rem] leading-relaxed">
            Estamos terminando de redactar un manual definitivo que te ahorrará cientos de dólares en repuestos y mantenimiento. Aprenderás a comunicarte mejor con tu mecánico, qué preguntas hacer para evitar cobros sorpresa y cómo interpretar las verdaderas prioridades de reparación de tu carro.
          </p>

          <div className="h-0.5 w-16 bg-te-orange/30 rounded my-2" />

          {/* Form */}
          <div className="w-full flex flex-col gap-4">
            <EmailCapture
              tag="guia-page"
              placeholder="Tu correo electrónico"
              cta="Recibir la guía"
              variant="light"
              showName={true}
            />
            
            <p className="font-body text-[11px] text-te-subtle">
              Sin spam. Solo te enviaremos el manual cuando esté completamente redactado y aprobado.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
