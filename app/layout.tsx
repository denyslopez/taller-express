import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ClientEffects from "@/components/layout/ClientEffects";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
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
        <ClientEffects />
        <Nav />
        <main className="flex-grow pt-20 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

