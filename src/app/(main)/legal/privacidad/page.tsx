import { constructMetadata } from "@/lib/utils";
import { LegalShell, LEGAL_ENTITY } from "@/components/legal/legal-shell";

export const metadata = constructMetadata({
  title: "Política de Privacidad",
  description:
    "Cómo Juan Arango (NITRO ECOM) recopila, usa y protege tus datos personales conforme a la Ley 1581 de 2012 de Colombia.",
  canonical: "https://www.juanarangoecommerce.com/legal/privacidad",
});

export default function PrivacidadPage() {
  return (
    <LegalShell
      title="Política de Privacidad"
      intro="Tu privacidad nos importa. Aquí te explicamos, sin letra pequeña, qué datos recopilamos, para qué los usamos y qué derechos tienes sobre ellos."
    >
      <h2>1. Responsable del tratamiento</h2>
      <p>
        El responsable del tratamiento de tus datos personales es <strong>{LEGAL_ENTITY.name}</strong>,
        quien opera bajo la marca <strong>{LEGAL_ENTITY.brand}</strong>, con domicilio en{" "}
        {LEGAL_ENTITY.location}. Para cualquier asunto relacionado con tus datos puedes escribir a{" "}
        <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>.
      </p>
      <p>
        Esta política se rige por la <strong>Ley 1581 de 2012</strong> (Régimen General de Protección
        de Datos Personales de Colombia), el <strong>Decreto 1377 de 2013</strong> y demás normas
        concordantes.
      </p>

      <h2>2. Qué datos recopilamos</h2>
      <p>Recopilamos únicamente los datos necesarios para prestarte un buen servicio:</p>
      <ul>
        <li>
          <strong>Datos de contacto:</strong> nombre, correo electrónico, empresa y teléfono cuando
          completas un formulario de contacto, de diagnóstico o de propuesta.
        </li>
        <li>
          <strong>Datos de suscripción:</strong> tu correo electrónico cuando te suscribes al
          boletín (newsletter).
        </li>
        <li>
          <strong>Datos de navegación:</strong> información técnica como dirección IP, tipo de
          dispositivo, navegador y páginas visitadas, recogida mediante cookies y herramientas de
          analítica (ver nuestra <a href="/legal/cookies">Política de Cookies</a>).
        </li>
      </ul>

      <h2>3. Para qué usamos tus datos</h2>
      <ul>
        <li>Responder tus solicitudes de contacto y diagnóstico.</li>
        <li>Prestar y gestionar los servicios que nos contrates.</li>
        <li>Enviarte el contenido y las comunicaciones a las que te suscribiste.</li>
        <li>Mejorar el sitio, nuestros contenidos y la experiencia de usuario.</li>
        <li>Cumplir obligaciones legales y contractuales.</li>
      </ul>
      <p>
        No tomamos decisiones automatizadas que produzcan efectos jurídicos sobre ti, ni vendemos tus
        datos personales a terceros.
      </p>

      <h2>4. Encargados y terceros que tratan tus datos</h2>
      <p>
        Para operar este sitio nos apoyamos en proveedores tecnológicos que actúan como encargados del
        tratamiento, aplicando sus propias medidas de seguridad:
      </p>
      <ul>
        <li><strong>Supabase</strong> — almacenamiento de base de datos y formularios.</li>
        <li><strong>Vercel</strong> — alojamiento (hosting) e infraestructura del sitio.</li>
        <li><strong>Sanity</strong> — gestión de contenidos.</li>
        <li><strong>Resend</strong> — envío de correos electrónicos transaccionales y boletines.</li>
        <li><strong>Google Analytics</strong> — analítica de uso del sitio de forma agregada.</li>
        <li>
          Modelos de inteligencia artificial (<strong>OpenAI</strong> y <strong>Google Gemini</strong>)
          para funciones de contenido y asistencia, sin usar tus datos personales para entrenar modelos.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores pueden estar ubicados fuera de Colombia. En esos casos la
        transferencia se realiza con garantías adecuadas de seguridad y confidencialidad.
      </p>

      <h2>5. Conservación de los datos</h2>
      <p>
        Conservamos tus datos mientras exista una relación contigo, mientras estés suscrito o durante
        el tiempo necesario para cumplir obligaciones legales. Cuando dejan de ser necesarios, los
        eliminamos o anonimizamos de forma segura.
      </p>

      <h2>6. Tus derechos (Habeas Data)</h2>
      <p>Como titular de los datos, en cualquier momento puedes:</p>
      <ul>
        <li><strong>Conocer y acceder</strong> a los datos que tenemos sobre ti.</li>
        <li><strong>Actualizar y rectificar</strong> datos inexactos o desactualizados.</li>
        <li><strong>Solicitar la supresión</strong> de tus datos cuando proceda.</li>
        <li><strong>Revocar la autorización</strong> otorgada para su tratamiento.</li>
        <li><strong>Presentar quejas</strong> ante la Superintendencia de Industria y Comercio (SIC).</li>
      </ul>
      <p>
        Para ejercer cualquiera de estos derechos, escríbenos a{" "}
        <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>. Atenderemos tu solicitud en
        los plazos previstos por la ley.
      </p>

      <h2>7. Seguridad de la información</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, incluyendo
        cifrado en tránsito y en reposo, control de accesos y proveedores con altos estándares de
        seguridad. Ningún sistema es 100% infalible, pero trabajamos para minimizar cualquier riesgo.
      </p>

      <h2>8. Baja del boletín</h2>
      <p>
        Puedes darte de baja del boletín en cualquier momento con un clic, mediante el enlace de
        cancelación que aparece al final de cada correo. También puedes solicitarlo escribiéndonos.
      </p>

      <h2>9. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta política para reflejar cambios legales o de nuestros servicios.
        Publicaremos siempre la versión vigente en esta página con su fecha de actualización.
      </p>
    </LegalShell>
  );
}
