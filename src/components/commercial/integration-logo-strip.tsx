import Image from "next/image";
import { ShopifyLogo, WhatsAppLogo } from "@/components/commercial/brand-logos";

const paymentMethods = [
  ["pse", "PSE"], ["nequi", "Nequi"], ["bancolombia", "Bancolombia"],
  ["daviplata", "DaviPlata"], ["visa", "Visa"], ["mastercard", "Mastercard"], ["amex", "American Express"],
] as const;

const carriers = [
  ["inter-rapidisimo", "Inter Rapidísimo"], ["coordinadora", "Coordinadora"],
  ["envia", "Envía"], ["servientrega", "Servientrega"], ["tcc", "TCC"],
  ["deprisa", "Deprisa"], ["4-72", "4-72"],
] as const;

export function IntegrationLogoStrip() {
  return (
    <div className="border-b border-line bg-ground text-ink">
      <div
        id="logos-integraciones"
        role="region"
        aria-label="Canales, medios de pago de Confío y transportadoras para seguimiento. Desplaza horizontalmente para ver todos los logos."
        tabIndex={0}
        className="mx-auto max-w-7xl overflow-x-auto [scrollbar-width:thin] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nitro-text"
      >
        <ul className="flex w-max min-w-full items-center gap-4 px-5 py-2 lg:justify-between lg:gap-3 lg:px-8">
          <li title="WhatsApp" className="flex h-10 w-8 shrink-0 items-center justify-center"><WhatsAppLogo className="size-6" /></li>
          <li title="Shopify" className="flex h-10 w-8 shrink-0 items-center justify-center"><ShopifyLogo className="size-6" /></li>
          <li title="Confío" className="flex h-10 shrink-0 items-center gap-1.5"><Image src="/nitro/integraciones/confio.png" alt="" width={24} height={24} className="size-6 object-contain" /><span className="text-xs font-semibold">Confío</span></li>
          {paymentMethods.map(([id, name]) => (
            <li key={id} title={name} className="flex h-10 w-[70px] shrink-0 items-center justify-center"><Image src={`/nitro/integraciones/pagos/${id}.png`} alt={name} width={200} height={60} className="h-7 w-full object-contain" /></li>
          ))}
          <li title="17TRACK" className="flex h-10 shrink-0 items-center gap-1.5 border-l border-ink/15 pl-3"><Image src="/nitro/integraciones/17track.png" alt="" width={24} height={24} className="size-6 object-contain" /><span className="text-xs font-semibold">17TRACK</span></li>
          {carriers.map(([id, name]) => (
            <li key={id} title={name} className="flex h-10 w-8 shrink-0 items-center justify-center"><Image src={`/nitro/integraciones/transportadoras/${id}.png`} alt={name} width={28} height={28} className="size-7 object-contain" /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
