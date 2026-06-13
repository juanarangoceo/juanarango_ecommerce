import { constructMetadata } from "@/lib/utils";
import { LegalShell, LEGAL_ENTITY } from "@/components/legal/legal-shell";

export const metadata = constructMetadata({
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio web y los servicios de Juan Arango (NITRO ECOM): contenidos, servicios, propiedad intelectual y responsabilidad.",
  canonical: "https://www.juanarangoecommerce.com/legal/terminos",
});

export default function TerminosPage() {
  return (
    <LegalShell
      title="Términos y Condiciones"
      intro="Estas son las reglas del juego para usar este sitio, sus contenidos y solicitar nuestros servicios. Al navegar por el sitio, las aceptas."
    >
      <h2>1. Aceptación de los términos</h2>
      <p>
        Al acceder y utilizar el sitio <strong>{LEGAL_ENTITY.site}</strong> aceptas estos términos y
        condiciones, así como todas las leyes y regulaciones aplicables. Si no estás de acuerdo con
        alguno de ellos, te pedimos no utilizar el sitio.
      </p>

      <h2>2. Quiénes somos</h2>
      <p>
        Este sitio es operado por <strong>{LEGAL_ENTITY.name}</strong> bajo la marca{" "}
        <strong>{LEGAL_ENTITY.brand}</strong>, con domicilio en {LEGAL_ENTITY.location}. Puedes
        contactarnos en <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>.
      </p>

      <h2>3. Servicios</h2>
      <p>
        {LEGAL_ENTITY.brand} ofrece servicios de consultoría en comercio electrónico, automatización,
        inteligencia artificial aplicada, desarrollo de soluciones digitales y contenido formativo.
        Los alcances, plazos, precios y condiciones específicas de cada servicio se definen en una
        propuesta o contrato individual acordado con cada cliente. La información del sitio tiene
        carácter orientativo y no constituye una oferta vinculante por sí sola.
      </p>

      <h2>4. Uso del sitio y contenidos</h2>
      <p>
        El contenido del sitio (artículos, guías, prompts, comparativas y demás recursos) se ofrece
        con fines informativos y educativos. Te comprometes a usar el sitio de forma lícita y a no:
      </p>
      <ul>
        <li>Realizar acciones que dañen, sobrecarguen o inutilicen el sitio.</li>
        <li>Intentar acceder sin autorización a áreas restringidas o a datos de terceros.</li>
        <li>Reproducir o redistribuir el contenido con fines comerciales sin autorización.</li>
        <li>Usar el sitio para difundir contenido ilícito, ofensivo o engañoso.</li>
      </ul>

      <h2>5. Propiedad intelectual</h2>
      <p>
        Todos los textos, gráficos, logotipos, marcas, código y demás materiales del sitio son
        propiedad de {LEGAL_ENTITY.name} ({LEGAL_ENTITY.brand}) o se utilizan con la debida
        autorización, y están protegidos por las leyes de propiedad intelectual. Puedes consultar y
        compartir el contenido para uso personal, citando la fuente, pero no reproducirlo de forma
        masiva ni comercial sin permiso previo por escrito.
      </p>

      <h2>6. Enlaces a terceros</h2>
      <p>
        El sitio puede incluir enlaces a páginas o servicios de terceros (por ejemplo, herramientas
        recomendadas o enlaces de afiliados). No controlamos ni nos hacemos responsables del contenido
        ni de las políticas de esos sitios externos.
      </p>

      <h2>7. Boletín y comunicaciones</h2>
      <p>
        Al suscribirte a nuestro boletín aceptas recibir correos con noticias, contenido y
        promociones. Tu información se trata conforme a nuestra{" "}
        <a href="/legal/privacidad">Política de Privacidad</a>. Puedes cancelar tu suscripción en
        cualquier momento con un clic desde cualquiera de nuestros correos.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        Nos esforzamos por ofrecer información precisa y actualizada, pero el contenido se proporciona
        "tal cual", sin garantías de resultados específicos. {LEGAL_ENTITY.brand} no será responsable
        por daños indirectos, incidentales o consecuentes derivados del uso del sitio o de la
        aplicación de la información publicada. Las decisiones de negocio que tomes son de tu
        responsabilidad.
      </p>

      <h2>9. Protección al consumidor</h2>
      <p>
        Cuando contrates servicios, se aplicarán las disposiciones del Estatuto del Consumidor
        (<strong>Ley 1480 de 2011</strong>) en lo que corresponda, además de las condiciones pactadas
        en el contrato respectivo.
      </p>

      <h2>10. Modificaciones</h2>
      <p>
        Podemos actualizar estos términos en cualquier momento. La versión vigente será siempre la
        publicada en esta página, con su fecha de actualización. El uso continuado del sitio implica
        la aceptación de los cambios.
      </p>

      <h2>11. Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se
        someterá a la jurisdicción de los tribunales competentes del país.
      </p>
    </LegalShell>
  );
}
