import { constructMetadata } from "@/lib/utils";
import { LegalShell, NITRO_COMPLETE_ENTITY as E } from "@/components/legal/legal-shell";

// Instrucciones de eliminación de datos de Nitro Complete. Es la URL que se
// registra en la app de Meta («Eliminación de datos de usuario»). Cada dato de
// esta página describe lo que Nitro Complete guarda y hace HOY según
// /home/juan/nitro_bot; si el producto cambia, esta página cambia con él.

export const metadata = constructMetadata({
  title: "Eliminación de datos · Nitro Complete",
  description:
    "Cómo pedir que Nitro Complete elimine tus datos de conversaciones de WhatsApp e Instagram con las tiendas que usan el servicio.",
  canonical: "https://www.juanarangoecommerce.com/nitro-complete/eliminacion-de-datos",
});

export default function EliminacionDeDatosPage() {
  return (
    <LegalShell
      title="Eliminación de datos de usuario"
      intro="Si le escribiste por WhatsApp o Instagram a una tienda que usa Nitro Complete, puedes pedir que eliminemos tus datos. Aquí te explicamos qué guardamos, cómo pedirlo y qué pasa después."
      updated="28 de septiembre de 2026"
      entity={E}
      backHref="/nitro-complete"
      backLabel="Nitro Complete"
    >
      <h2>1. Quiénes somos</h2>
      <p>
        <strong>{E.brand}</strong> es un producto de <strong>{E.name}</strong>, NIT {E.nit}, con
        domicilio en {E.location}. Nitro Complete es el software con el que algunas tiendas en
        línea atienden a sus clientes por WhatsApp e Instagram con un asesor automatizado.
      </p>
      <p>
        Frente a tus datos, <strong>la tienda con la que conversaste es la responsable</strong> y{" "}
        {E.name} actúa como <strong>encargado</strong>: los tratamos por cuenta de la tienda y solo
        para prestarle el servicio. Puedes pedir la eliminación a la tienda o directamente a
        nosotros; en ambos casos la gestionamos.
      </p>

      <h2>2. Qué datos tuyos puede tener Nitro Complete</h2>
      <ul>
        <li>
          <strong>Si escribiste por WhatsApp:</strong> tu número, el nombre de tu perfil, los
          mensajes de la conversación (texto, notas de voz, imágenes y videos) y los datos que diste
          para un pedido, como nombre, dirección, ciudad y teléfono. Si la tienda lo usa, también
          las confirmaciones de pedido y los avisos de envío.
        </li>
        <li>
          <strong>Si escribiste por Instagram:</strong> el identificador que Instagram asigna a tu
          cuenta dentro de la conversación con esa tienda, los mensajes directos y los enlaces a
          los archivos que enviaste.
        </li>
      </ul>
      <p>
        No guardamos tu contraseña de Instagram ni de WhatsApp, y no usamos estos datos para
        publicidad propia ni los vendemos.
      </p>

      <h2>3. Cómo pedir la eliminación</h2>
      <p>Escríbenos por cualquiera de estos canales:</p>
      <ul>
        <li>
          Correo: <a href={`mailto:${E.email}?subject=Eliminaci%C3%B3n%20de%20datos%20-%20Nitro%20Complete`}>{E.email}</a>,
          con el asunto «Eliminación de datos – Nitro Complete».
        </li>
        <li>
          WhatsApp: <a href={E.whatsappLink}>{E.whatsapp}</a>.
        </li>
      </ul>
      <p>Incluye en tu solicitud:</p>
      <ol>
        <li>El número de WhatsApp o el usuario de Instagram con el que escribiste.</li>
        <li>El nombre de la tienda con la que conversaste.</li>
        <li>Qué quieres que eliminemos: toda la conversación o algún dato en particular.</li>
      </ol>
      <p>
        Para proteger tus datos podemos pedirte que confirmes la solicitud desde ese mismo número o
        esa misma cuenta, de modo que nadie pueda pedir la eliminación en tu nombre.
      </p>

      <h2>4. Qué hacemos con tu solicitud</h2>
      <ul>
        <li>
          Eliminamos de Nitro Complete la conversación, los mensajes, los archivos y los datos de
          contacto y de pedido asociados a ese número o esa cuenta en la tienda que indiques.
        </li>
        <li>
          Si ya se creó un pedido en el sistema de ventas de la tienda (por ejemplo, su tienda
          Shopify), ese registro pertenece a la tienda: le informamos tu solicitud para que ella lo
          atienda.
        </li>
        <li>
          Conservamos únicamente lo que una ley nos obligue a guardar, y te lo indicamos en la
          respuesta.
        </li>
        <li>Te confirmamos por el mismo medio cuando la eliminación esté hecha.</li>
      </ul>

      <h2>5. Plazo</h2>
      <p>
        Respondemos dentro del plazo que fija la <strong>Ley 1581 de 2012</strong> para los
        reclamos: <strong>15 días hábiles</strong> desde que recibimos la solicitud completa. Si no
        pudiéramos cumplirlo, te avisamos el motivo antes de que venza y la nueva fecha, que no
        superará 8 días hábiles adicionales.
      </p>

      <h2>6. Si eres una tienda que conectó su Instagram</h2>
      <p>
        Puedes retirar el acceso de Nitro Complete en cualquier momento desde Instagram
        (Configuración → Apps y sitios web) o pidiéndonos la desconexión. Al desconectar, borramos
        de inmediato el token de acceso de tu cuenta y dejamos de recibir tus mensajes. Las
        conversaciones ya guardadas se eliminan cuando lo solicites por los canales de arriba.
      </p>

      <h2>7. Tus demás derechos</h2>
      <p>
        Además de la eliminación, puedes conocer, actualizar y rectificar tus datos, y revocar la
        autorización para tratarlos. Si consideras que no atendimos bien tu solicitud, puedes acudir
        a la <strong>Superintendencia de Industria y Comercio</strong> (www.sic.gov.co).
      </p>
    </LegalShell>
  );
}
