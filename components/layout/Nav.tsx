import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-te-bg/75 backdrop-blur-lg border-b border-white/6 flex items-center">
      <div className="w-full max-w-[1280px] mx-auto px-8 flex items-center justify-between">
        {/* Logo / Wordmark */}
        <Link href="/" className="flex items-center gap-2 md:gap-2.5 font-display text-xl md:text-2xl font-extrabold tracking-tight select-none group">
          <div className="relative w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-105 shrink-0">
            <Image
              src="/images/taller-express-icon.png"
              alt="Taller Express Icon"
              fill
              sizes="(max-width: 768px) 32px, 36px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center">
            <span className="text-white">Taller</span>
            <span className="text-te-orange">Express</span>
          </div>
        </Link>

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/blog" className="font-body text-[14.4px] font-medium text-te-muted hover:text-white transition-colors duration-200">
            Artículos
          </Link>
          <Link href="/guia" className="font-body text-[14.4px] font-medium text-te-muted hover:text-white transition-colors duration-200">
            La Guía
          </Link>
          <Link href="/blog?cat=comunidad" className="font-body text-[14.4px] font-medium text-te-muted hover:text-white transition-colors duration-200">
            Comunidad
          </Link>
        </nav>


        {/* Action Button */}
        <div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-gradient-to-r from-te-orange to-te-orange-hover text-te-bg-alt font-body font-bold text-[14px] px-5 py-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-102 hover:shadow-te-orange/20"
          >
            Síguenos
          </a>
        </div>
      </div>
    </header>
  );
}
