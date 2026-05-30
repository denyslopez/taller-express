import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ClientEffects from "@/components/layout/ClientEffects";
import Analytics from "@/components/ui/Analytics";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tallerexpress.one"),
  title: {
    default: "Taller Express — Tu Agente Automotriz en El Salvador",
    template: "%s | Taller Express",
  },
  description:
    "Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador.",
  openGraph: {
    type: "website",
    locale: "es_SV",
    siteName: "Taller Express",
    title: "Taller Express — Tu Agente Automotriz en El Salvador",
    description: "Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador.",
    images: [
      {
        url: "/images/taller-express-hero-bg-001.jpg",
        width: 1200,
        height: 630,
        alt: "Taller Express — Tu Agente Automotriz en El Salvador",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Taller Express — Tu Agente Automotriz en El Salvador",
    description: "Contenido práctico sobre mantenimiento, precios y cuidado de tu vehículo. Hecho para dueños de carro en El Salvador.",
    images: ["/images/taller-express-hero-bg-001.jpg"],
  },
  verification: {
    google: "I8Mr-QDvys8A1tpsNJoI2rrWHZ3diGWJfdpBeAK_TRU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geist.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-te-bg text-te-text font-body">
        <Analytics />
        <ClientEffects />
        <Nav />
        <main className="flex-grow pt-20 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

