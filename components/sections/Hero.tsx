import Image from "next/image";
import EmailCapture from "@/components/ui/EmailCapture";

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] md:min-h-[90vh] flex items-start md:items-center pt-24 md:py-20 pb-12 bg-te-bg overflow-hidden">
      
      {/* 1. Desktop Background Layer (hidden on mobile) */}
      <div className="absolute inset-0 z-0 hidden md:block select-none pointer-events-none">
        <Image
          src="/images/taller-express-hero-bg-001.jpg"
          alt="Car Dashboard Background Desktop"
          fill
          sizes="100vw"
          priority
          className="object-cover object-right-bottom opacity-[0.38] transition-all duration-500"
        />
        {/* Left-to-right gradient overlay to ensure strong text legibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-te-bg via-te-bg/90 via-te-bg/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-te-bg via-transparent to-transparent" />
      </div>

      {/* 2. Mobile Background Layer (visible on mobile only) */}
      <div className="absolute inset-0 z-0 block md:hidden select-none pointer-events-none">
        <Image
          src="/images/taller-express-hero-bg-mobilie-001.jpg"
          alt="Car Dashboard Background Mobile"
          fill
          sizes="100vw"
          priority
          className="object-cover object-bottom opacity-[0.7] scale-100 transition-all duration-500"
        />
        {/* Dark overlay at the top sky area for bulletproof legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#080f1f]/85 via-[#080f1f]/35 to-transparent" />
        {/* Bottom blending gradient to match page transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-te-bg via-transparent to-transparent" />
      </div>

      {/* Hero Content Container - Aligned to the Left, and placed at the Top on Mobile */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-8 flex flex-col items-start text-left gap-5 md:gap-6">
        
        {/* Eyebrow with orange dot */}
        <div className="te-anime-top inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-4 py-2 rounded-full shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-te-orange shrink-0" />
          <span className="font-body text-[12px] font-bold uppercase tracking-wider text-te-muted">
            Por Salvadoreños &middot; Para Salvadoreños
          </span>
        </div>

        {/* H1 Heading - Left Aligned and fluid text sizing to scale smoothly across any viewport */}
        <h1 className="te-anime-text font-display font-extrabold text-[clamp(1.6rem,6.8vw,4.5rem)] leading-[1.05] tracking-tight text-te-text max-w-[640px] font-sans text-left">
          <span className="whitespace-nowrap">El mantenimiento</span> de tu carro no debería ser tan <span className="text-te-orange">complicado.</span>
        </h1>

        {/* Subtitle - Left Aligned */}
        <p className="font-body text-base md:text-[1.08rem] md:leading-[1.66] text-te-muted max-w-[550px] font-light text-left">
          Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador.
        </p>

        {/* Form Capture Component - Left Aligned */}
        <div className="te-anime-top flex flex-col items-start gap-3 mt-2 md:mt-4 w-full">
          <EmailCapture
            tag="hero-home"
            placeholder="Tu correo electrónico"
            cta="Avisame →"
            variant="light"
          />
          
          {/* Disclaimer Copy */}
          <p className="font-body text-[12px] sm:text-[12.8px] text-te-subtle">
            Sin spam. Solo cuando haya algo que valga la pena.
          </p>
        </div>
      </div>
    </section>
  );
}
