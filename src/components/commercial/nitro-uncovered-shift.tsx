import { ArrowDown, Clock3, MessageCircleOff, UserPlus } from "lucide-react";
import { WhatsAppJuanButton } from "@/components/commercial/whatsapp-juan-button";
import { nitroCompleteMonthly as plan } from "@/lib/commercial-content";

// «El turno que nadie cubre» (12-nov-2026): el problema antes que el producto.
// Mismo código de color que el video del estudio: naranja = lo que hoy espera
// sin respuesta; verde = lo que cambia cuando Nitro cubre ese turno.
// Sin cifras de ventas ni de ahorro: no hay datos reales que las respalden.
const shifts = [
  {
    icon: MessageCircleOff,
    goal: "Más clientes",
    today: "Quien te escribe de noche o en domingo espera hasta que abras. Mientras tanto, puede comprarle a otro.",
    nitro: "Recibe respuesta a cualquier hora, con tu catálogo real, y el pedido queda creado.",
  },
  {
    icon: UserPlus,
    goal: "Sin más personal",
    today: "Para cubrir noches y fines de semana tendrías que contratar a alguien o quedarte tú pegado al celular.",
    nitro: `Nitro cubre ese turno por ${plan.price} al mes. Sin contrato y sin turnos que organizar.`,
  },
  {
    icon: Clock3,
    goal: "Tu tiempo de vuelta",
    today: "Respondes lo mismo todo el día: precio, envío, tallas, formas de pago.",
    nitro: "Lo responde Nitro. A ti te llegan los casos que de verdad necesitan una persona.",
  },
] as const;

export function NitroUncoveredShift() {
  return (
    <section id="turno" className="scroll-mt-24 border-y border-alert/15 bg-cafe px-5 py-16 lg:px-8 lg:py-24" data-nitro-orb="flow">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <h2 className="text-balance text-center text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-left">
            Mientras duermes,<br /><span className="text-alert">alguien quiere comprarte.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-center text-lg leading-8 text-white/75 lg:mx-0 lg:text-left">
            Ese es el turno que nadie cubre. Esto cambia cuando alguien lo atiende.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {shifts.map(({ icon: Icon, goal, today, nitro }) => (
            <li key={goal} className="flex flex-col rounded-2xl border border-white/10 bg-black/25 p-6 lg:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-alert/15 text-alert"><Icon className="size-5" aria-hidden="true" /></span>
                <h3 className="text-xl font-semibold tracking-tight text-white">{goal}</h3>
              </div>
              <p className="mt-5 text-sm font-semibold text-alert">Hoy</p>
              <p className="mt-1 text-base leading-7 text-white/70">{today}</p>
              <ArrowDown className="my-4 size-4 text-white/30" aria-hidden="true" />
              <p className="text-sm font-semibold text-primary">Con Nitro</p>
              <p className="mt-1 text-base leading-7 text-white">{nitro}</p>
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <WhatsAppJuanButton context={{ kind: "hero" }} placement="product_turno" className="w-full sm:w-auto">Quiero cubrir ese turno</WhatsAppJuanButton>
          <WhatsAppJuanButton context={{ kind: "demo" }} placement="product_turno_demo" variant="outline" className="w-full sm:w-auto">Probarlo con mi tienda</WhatsAppJuanButton>
        </div>
      </div>
    </section>
  );
}
