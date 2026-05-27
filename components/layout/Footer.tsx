import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-te-bg-alt border-t border-white/6 py-16 mt-auto">
      <div className="max-w-[1280px] mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-col gap-2">
          {/* Logo / Wordmark */}
          <Link href="/" className="flex items-center gap-2 md:gap-2.5 font-display text-xl md:text-2xl font-extrabold tracking-tight select-none group w-fit">
            <div className="relative w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-105 shrink-0">
              <Image
                src="/images/taller-express-icon.png"
                alt="Taller Express Icon"
                fill
                sizes="(max-width: 768px) 32px, 36px"
                className="object-contain"
              />
            </div>
            <div className="flex items-center">
              <span className="text-white">Taller</span>
              <span className="text-te-orange">Express</span>
            </div>
          </Link>
          <p className="font-body text-[14.4px] text-te-muted">
            Tu Agente Automotriz
          </p>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 w-full md:w-auto">
          {/* Contact & WhatsApp */}
          <div className="flex flex-col gap-1">
            <span className="font-body text-[12px] font-bold uppercase tracking-wider text-te-muted">Contacto</span>
            <a
              href="https://wa.me/50370000000"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[14.4px] font-semibold text-white hover:text-te-orange transition-colors duration-200"
            >
              WhatsApp Agent
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col gap-2">
            <span className="font-body text-[12px] font-bold uppercase tracking-wider text-te-muted">Síguenos</span>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-te-muted hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-te-muted hover:text-white transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1280px] mx-auto px-8 mt-12 pt-8 border-t border-white/6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="font-body text-[12.8px] text-te-subtle">
          &copy; {new Date().getFullYear()} Taller Express. Todos los derechos reservados.
        </p>
        <Link href="/privacidad" className="font-body text-[12.8px] text-te-subtle hover:text-white transition-colors duration-200">
          Política de Privacidad
        </Link>
      </div>
    </footer>
  );
}
