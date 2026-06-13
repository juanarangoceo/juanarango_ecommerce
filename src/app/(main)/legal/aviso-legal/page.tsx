import { constructMetadata } from "@/lib/utils";
import { LegalShell, LEGAL_ENTITY } from "@/components/legal/legal-shell";

export const metadata = constructMetadata({
  title: "Aviso Legal",
  description:
    "Información legal e identificación del responsable del sitio web de Juan Arango (NITRO ECOM).",
  canonical: "https://www.juanarangoecommerce.com/legal/aviso-legal",
});

export default function AvisoLegalPage() {
  return (
    <LegalShell
      title="Aviso Legal"
      intro="Información identificativa del responsable de este sitio web y las condiciones generales que rigen su uso."
    >
      <h2>1. Identificación del responsable</h2>
      <p>
        En cumplimiento del deber de información, se indican los datos del titular de este sitio web:
      </p>
      <ul>
        <li><strong>Titular:</strong> {LEGAL_ENTITY.name}</li>
        <li><strong>Marca comercial:</strong> {LEGAL_ENTITY.brand}</li>
        <li><strong>Domicilio:</strong> {LEGAL_ENTITY.location}</li>
        <li>
          <strong>Correo electrónico:</strong>{" "}
          <a href={`mailto:${LEGAL_ENTITY.email}`}>{LEGAL_ENTITY.email}</a>
        </li>
        <li><strong>Sitio web:</strong> {LEGAL_ENTITY.site}</li>
      </ul>

      <h2>2. Objeto</h2>
      <p>
        Este sitio funciona como hub de contenido y presentación de los servicios de {LEGAL_ENTITY.name}{" "}
        ({LEGAL_ENTITY.brand}): consultoría en comercio electrónico, automatización e inteligencia
        artificial aplicada, además de un blog, guías y recursos formativos.
      </p>

      <h2>3. Condiciones de uso</h2>
      <p>
        El acceso al sitio es gratuito, salvo en lo relativo al coste de la conexión a internet. El uso
        del sitio implica la aceptación de las condiciones recogidas en este Aviso Legal y en nuestros{" "}
        <a href="/legal/terminos">Términos y Condiciones</a>. El usuario se compromete a hacer un uso
        adecuado de los contenidos y a no emplearlos para actividades ilícitas.
      </p>

      <h2>4. Propiedad intelectual e industrial</h2>
      <p>
        Todos los derechos sobre los contenidos del sitio (textos, imágenes, diseño, marcas, logotipos
        y código fuente) pertenecen a {LEGAL_ENTITY.name} ({LEGAL_ENTITY.brand}) o a sus respectivos
        titulares. Queda prohibida su reproducción, distribución o transformación con fines comerciales
        sin autorización expresa.
      </p>

      <h2>5. Exclusión de responsabilidad</h2>
      <p>
        {LEGAL_ENTITY.brand} no se hace responsable de los daños que pudieran derivarse de la falta de
        disponibilidad temporal del sitio por causas técnicas, ni del mal uso que terceros hagan de los
        contenidos. Tampoco se responsabiliza del contenido de sitios externos enlazados.
      </p>

      <h2>6. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales recogidos a través de este sitio se rige por nuestra{" "}
        <a href="/legal/privacidad">Política de Privacidad</a>, conforme a la Ley 1581 de 2012 de
        Colombia.
      </p>

      <h2>7. Legislación aplicable</h2>
      <p>
        El presente Aviso Legal se rige por la legislación de la República de Colombia. Para la
        resolución de cualquier controversia, las partes se someterán a los tribunales competentes del
        país.
      </p>
    </LegalShell>
  );
}
