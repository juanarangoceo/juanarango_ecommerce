import { constructMetadata } from "@/lib/utils";
import { LegalShell, NITRO_COMPLETE_ENTITY as E } from "@/components/legal/legal-shell";

// Política de privacidad de Nitro Complete: la URL que se registra en la app
// de Meta. Distinta de /legal/privacidad, que cubre el SITIO de Juan Arango.
// Cada tratamiento descrito aquí existe hoy en /home/juan/nitro_bot
// (verificado el 28-sep-2026); si el producto cambia, esta página cambia.

export const metadata = constructMetadata({
  title: "Política de privacidad · Nitro Complete",
  description:
    "Cómo Nitro Complete, de TODOPOLIS S.A.S., trata los datos de las conversaciones de WhatsApp e Instagram de las tiendas que usan el servicio.",
  canonical: "https://www.juanarangoecommerce.com/nitro-complete/privacidad",
});

export default function NitroCompletePrivacidadPage() {
  return (
    <LegalShell
      title="Política de privacidad de Nitro Complete"
      intro="Nitro Complete ayuda a tiendas en línea a atender a sus clientes por WhatsApp e Instagram. Aquí explicamos qué datos tratamos al hacerlo, para qué, con quién y cómo ejercer tus derechos."
      updated="29 de septiembre de 2026"
      entity={E}
      backHref="/nitro-complete"
      backLabel="Nitro Complete"
    >
      <h2>1. Quiénes somos</h2>
      <p>
        <strong>{E.brand}</strong> es un producto de <strong>{E.name}</strong>, NIT {E.nit}, con
        domicilio en {E.location}. Contacto para asuntos de datos personales:{" "}
        <a href={`mailto:${E.email}`}>{E.email}</a> o WhatsApp{" "}
        <a href={E.whatsappLink}>{E.whatsapp}</a>.
      </p>
      <p>Tratamos datos en dos calidades distintas:</p>
      <ul>
        <li>
          <strong>Como encargado</strong>, frente a los clientes de las tiendas que usan Nitro
          Complete (quienes les escriben por WhatsApp o Instagram). La <strong>tienda es la
          responsable</strong> de esos datos y nosotros los tratamos por su cuenta y según sus
          instrucciones, solo para prestarle el servicio.
        </li>
        <li>
          <strong>Como responsable</strong>, frente a las tiendas que contratan el servicio y las
          personas de su equipo que usan el panel (datos de cuenta, acceso y facturación).
        </li>
      </ul>
      <p>
        Esta política se rige por la <strong>Ley 1581 de 2012</strong>, el{" "}
        <strong>Decreto 1377 de 2013</strong> y demás normas colombianas de protección de datos.
      </p>

      <h2>2. Qué datos tratamos</h2>
      <h3>De quienes escriben a una tienda por WhatsApp</h3>
      <ul>
        <li>Número de teléfono y nombre del perfil de WhatsApp.</li>
        <li>Mensajes de la conversación: texto, notas de voz, imágenes y videos.</li>
        <li>
          Datos que la persona entrega para un pedido: nombre, dirección, ciudad, teléfono y los
          demás campos que pida la tienda.
        </li>
        <li>Estado de entrega de los mensajes que envía la tienda.</li>
      </ul>
      <h3>De quienes escriben a una tienda por Instagram</h3>
      <ul>
        <li>
          El identificador que Instagram asigna a la persona dentro de la conversación con esa
          tienda (no su contraseña ni su lista de contactos).
        </li>
        <li>Los mensajes directos y los enlaces a los archivos que envía.</li>
      </ul>
      <h3>De las tiendas que conectan sus cuentas</h3>
      <ul>
        <li>
          De la cuenta profesional de Instagram: identificador, nombre de usuario, tipo de cuenta,
          permisos concedidos y el token de acceso que entrega Instagram al autorizar.
        </li>
        <li>
          De WhatsApp Business: identificadores del número y de la cuenta, y el token de acceso.
        </li>
        <li>De la tienda en línea (por ejemplo, Shopify): catálogo de productos y pedidos.</li>
        <li>Datos de contacto, acceso al panel, consumo y facturación del servicio.</li>
      </ul>
      <p>
        Nunca pedimos ni guardamos contraseñas de Instagram, WhatsApp o Facebook: las cuentas se
        conectan mediante los flujos oficiales de autorización de Meta.
      </p>

      <h2>3. Para qué los usamos</h2>
      <ul>
        <li>
          Responder a los clientes de la tienda con un asesor automatizado que consulta el catálogo
          real de la tienda, y pasar la conversación a una persona del equipo cuando hace falta.
        </li>
        <li>
          Registrar en el sistema de la tienda los pedidos que el cliente confirma por WhatsApp y
          enviarle confirmaciones de pedido y avisos de envío.
        </li>
        <li>
          En Instagram, informar sobre productos y llevar al cliente al WhatsApp de la tienda cuando
          quiere comprar. Por Instagram no tomamos pedidos ni datos de entrega.
        </li>
        <li>
          Mostrarle a la tienda sus conversaciones, casos pendientes y métricas en su panel.
        </li>
        <li>Operar, proteger, medir el consumo y facturar el servicio a la tienda.</li>
      </ul>
      <p>
        <strong>
          No vendemos datos personales, no los usamos para publicidad propia ni los compartimos con
          terceros para sus propios fines.
        </strong>{" "}
        Los datos obtenidos de WhatsApp e Instagram se usan solo para prestar el servicio a la tienda
        con la que la persona conversó.
      </p>

      <h2>4. Inteligencia artificial</h2>
      <p>
        Las respuestas del asesor las genera un modelo de inteligencia artificial (Google Gemini) a
        partir de la conversación y del catálogo de la tienda. Los precios y totales de los pedidos
        los calcula nuestro sistema con los datos del catálogo, no el modelo. Cuando la tienda usa
        respuestas en nota de voz, el texto de la respuesta se convierte en audio con Mistral AI. No
        usamos las conversaciones para entrenar modelos propios.
      </p>
      <p>
        Para ordenar el tablero comercial de la tienda (en qué etapa de compra está cada
        conversación), un modelo de clasificación de TypeSafe AI analiza los últimos mensajes de la
        conversación. Antes de enviarlos se eliminan los mensajes con direcciones, documentos de
        identidad, datos bancarios o nombres, y se ocultan teléfonos, correos y enlaces. TypeSafe
        solo devuelve la etapa estimada, trata los datos como encargado y no los usa para entrenar
        sus modelos.
      </p>

      <h2>5. Con quién los compartimos</h2>
      <p>Solo con proveedores que actúan como encargados y en lo necesario para el servicio:</p>
      <ul>
        <li><strong>Meta Platforms</strong>: WhatsApp Business Platform e Instagram, por donde viajan los mensajes.</li>
        <li><strong>Supabase</strong>: base de datos y almacenamiento privado de archivos.</li>
        <li><strong>Vercel</strong>: alojamiento de la aplicación.</li>
        <li><strong>Google (Gemini)</strong> y <strong>Mistral AI</strong>: generación de respuestas y de voz.</li>
        <li><strong>TypeSafe AI</strong>: clasificación de la etapa comercial de las conversaciones, con los datos minimizados.</li>
        <li><strong>La plataforma de comercio de la tienda</strong> (por ejemplo, Shopify): donde se registran sus pedidos.</li>
        <li><strong>Resend</strong>: correos al equipo de la tienda cuando un caso necesita una persona.</li>
        <li><strong>Confío</strong>: solo cuando la tienda cobra un pedido por adelantado con enlace de pago.</li>
      </ul>
      <p>
        Varios de estos proveedores están fuera de Colombia. La transferencia se hace para prestar el
        servicio y con medidas de seguridad y confidencialidad adecuadas.
      </p>

      <h2>6. Seguridad</h2>
      <p>
        Los tokens de acceso de WhatsApp, Instagram y la tienda se guardan cifrados (AES-256-GCM) y
        solo los usa el servidor. Los datos de cada tienda están aislados de los de las demás, las
        comunicaciones viajan cifradas y el acceso al panel requiere autenticación. Ningún sistema es
        infalible, pero aplicamos medidas razonables para proteger la información.
      </p>

      <h2>7. Cuánto tiempo los conservamos</h2>
      <p>
        Conservamos los datos de las conversaciones mientras la tienda use Nitro Complete y los
        necesite para atender a sus clientes, o hasta que la tienda o la persona titular pidan su
        eliminación, salvo que una ley nos obligue a conservarlos. Cuando una tienda desconecta su
        cuenta de Instagram, borramos de inmediato el token de acceso.
      </p>

      <h2>8. Tus derechos y cómo ejercerlos</h2>
      <p>
        Puedes conocer, actualizar, rectificar y pedir la eliminación de tus datos, revocar la
        autorización para tratarlos y presentar quejas ante la{" "}
        <strong>Superintendencia de Industria y Comercio</strong>. Escríbenos a{" "}
        <a href={`mailto:${E.email}`}>{E.email}</a> o por WhatsApp al{" "}
        <a href={E.whatsappLink}>{E.whatsapp}</a>, o dirígete a la tienda con la que conversaste.
      </p>
      <p>
        Respondemos las consultas en un máximo de 10 días hábiles y los reclamos, incluidas las
        solicitudes de eliminación, en un máximo de 15 días hábiles, como fija la Ley 1581 de 2012.
        Los pasos para pedir la eliminación están en{" "}
        <a href="/nitro-complete/eliminacion-de-datos">Eliminación de datos de usuario</a>.
      </p>

      <h2>9. Menores de edad</h2>
      <p>
        Nitro Complete es un servicio para tiendas y no está dirigido a menores de edad. Si un
        menor escribió a una tienda y su representante quiere que eliminemos sus datos, puede pedirlo
        por los canales de arriba.
      </p>

      <h2>10. Cambios</h2>
      <p>
        Si cambiamos esta política, publicaremos aquí la versión vigente con su fecha de
        actualización.
      </p>
    </LegalShell>
  );
}
