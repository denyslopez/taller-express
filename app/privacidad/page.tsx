import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de Privacidad de Taller Express El Salvador.",
};

export default function PrivacidadPage() {
  return (
    <section className="py-20 px-8 bg-te-bg min-h-screen">
      <div className="max-w-[680px] mx-auto w-full flex flex-col items-start gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h1 className="font-display font-extrabold text-[32px] md:text-[40px] leading-tight text-white tracking-tight">
            Política de Privacidad
          </h1>
          <p className="font-body text-te-subtle text-[12.8px]">
            Última actualización: 27 de mayo, 2026
          </p>
        </div>

        <hr className="w-full border-t border-white/5" />

        {/* Prose Content */}
        <div className="prose text-zinc-300 flex flex-col gap-6 text-[14.4px] leading-relaxed">
          <p>
            En <strong>Taller Express</strong>, valoramos y respetamos tu privacidad. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos tu información personal cuando te registras en nuestras listas de espera, descargas nuestras guías o navegas por nuestro sitio web.
          </p>

          <h2 className="font-display font-bold text-xl text-white mt-4">
            1. Información que recopilamos
          </h2>
          <p>
            Recopilamos únicamente la información que nos proporcionas directamente de forma voluntaria a través de nuestros formularios:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li><strong>Dirección de correo electrónico:</strong> Recopilada para enviarte notificaciones del lanzamiento del servicio e información del blog.</li>
            <li><strong>Nombre completo:</strong> Recopilado en el formulario de la Guía Ebook para personalizar las comunicaciones.</li>
          </ul>

          <h2 className="font-display font-bold text-xl text-white mt-4">
            2. Uso de la información
          </h2>
          <p>
            Utilizamos los datos recopilados para:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Enviarte la guía práctica (Ebook) prometida una vez esté disponible.</li>
            <li>Enviarte actualizaciones del blog, contenido de utilidad y noticias importantes sobre Taller Express.</li>
            <li>Avisarte del lanzamiento oficial de nuestra plataforma de servicios.</li>
          </ul>

          <h2 className="font-display font-bold text-xl text-white mt-4">
            3. Protección de tus datos
          </h2>
          <p>
            Tus datos se procesan de forma segura a través de nuestro proveedor de servicios de email marketing (Brevo). Nunca venderemos, alquilaremos ni compartiremos tu información personal con terceros bajo ningún concepto, excepto para cumplir con obligaciones legales.
          </p>

          <h2 className="font-display font-bold text-xl text-white mt-4">
            4. Control sobre tu información
          </h2>
          <p>
            Puedes cancelar tu suscripción en cualquier momento haciendo clic en el enlace "Darse de baja" que se encuentra al final de cualquiera de nuestros correos electrónicos, o enviándonos un mensaje directo.
          </p>
        </div>

      </div>
    </section>
  );
}
