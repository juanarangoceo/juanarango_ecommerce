import { constructMetadata } from "@/lib/utils";
import { LegalShell, LEGAL_ENTITY } from "@/components/legal/legal-shell";

export const metadata = constructMetadata({
  title: "Política de Cookies",
  description:
    "Qué cookies usa el sitio de Juan Arango (NITRO ECOM), para qué sirven y cómo puedes controlarlas o eliminarlas.",
  canonical: "https://www.juanarangoecommerce.com/legal/cookies",
});

export default function CookiesPage() {
  return (
    <LegalShell
      title="Política de Cookies"
      intro="Usamos cookies para que el sitio funcione bien y para entender cómo se usa. Aquí te contamos cuáles, para qué y cómo controlarlas."
    >
      <h2>1. Qué son las cookies</h2>
      <p>
        Las cookies son pequeños archivos de texto que un sitio web guarda en tu dispositivo cuando lo
        visitas. Sirven para recordar información sobre tu visita y mejorar tu experiencia de
        navegación.
      </p>

      <h2>2. Tipos de cookies que utilizamos</h2>
      <h3>Cookies esenciales</h3>
      <p>
        Son necesarias para el funcionamiento básico del sitio (por ejemplo, seguridad y carga
        correcta de las páginas). Sin ellas, el sitio no funcionaría adecuadamente. No requieren
        consentimiento.
      </p>
      <h3>Cookies de analítica</h3>
      <p>
        Nos ayudan a entender, de forma agregada y anónima, cómo interactúan los visitantes con el
        sitio: qué páginas se visitan más, de dónde llega el tráfico y cómo mejorar el contenido.
        Usamos <strong>Google Analytics</strong> para esta finalidad.
      </p>
      <h3>Cookies de funcionalidad</h3>
      <p>
        Permiten recordar preferencias (como si ya cerraste un aviso o un formulario) para no
        mostrártelos repetidamente.
      </p>

      <h2>3. Cookies de terceros</h2>
      <p>
        Algunos servicios externos que integramos (como la analítica de Google o vídeos incrustados de
        YouTube) pueden instalar sus propias cookies. Estas se rigen por las políticas de privacidad de
        cada proveedor.
      </p>

      <h2>4. Cómo controlar o eliminar las cookies</h2>
      <p>
        Puedes controlar y eliminar las cookies como prefieras. La mayoría de navegadores te permiten:
      </p>
      <ul>
        <li>Ver qué cookies tienes guardadas y eliminarlas individualmente.</li>
        <li>Bloquear las cookies de terceros.</li>
        <li>Bloquear las cookies de sitios concretos.</li>
        <li>Bloquear todas las cookies.</li>
        <li>Eliminar todas las cookies al cerrar el navegador.</li>
      </ul>
      <p>
        Ten en cuenta que si bloqueas o eliminas las cookies esenciales, algunas funciones del sitio
        podrían no operar correctamente. Consulta la sección de ayuda de tu navegador (Chrome, Safari,
        Firefox, Edge) para gestionar estas opciones.
      </p>

      <h2>5. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta Política de Cookies cuando cambien las herramientas que utilizamos.
        Publicaremos siempre la versión vigente en esta página. Para cualquier duda, escríbenos a{" "}
        <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>.
      </p>
    </LegalShell>
  );
}
