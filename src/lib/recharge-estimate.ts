type Pack = { units: number; priceCop: number };

/** Paquete de compra real que cubre la referencia; nunca prorratea un precio. */
export function estimateRecharge(chats: number, turns: number, packs: readonly Pack[]) {
  if (!Number.isFinite(chats) || chats <= 0 || !Number.isFinite(turns) || turns <= 0 || !packs.length) throw new Error("Referencia de consumo inválida");
  const units = Math.ceil(chats * turns);
  const sorted = [...packs].sort((a, b) => a.units - b.units);
  const pack = sorted.find((p) => p.units >= units) ?? sorted[sorted.length - 1];
  const packCount = Math.ceil(units / pack.units);
  return { units, pack, packCount, totalCop: pack.priceCop * packCount };
}
