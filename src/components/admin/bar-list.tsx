import Link from "next/link";

// Lista ordenada con barra horizontal de magnitud (un solo tono). Sirve para
// orígenes, páginas de entrada, formularios y el embudo de etapas.
export function BarList({
  items,
  empty = "Sin datos todavía.",
  tone = "green",
}: {
  items: { label: string; value: number; href?: string; hint?: string }[];
  empty?: string;
  tone?: "green" | "white";
}) {
  if (!items.length) return <p className="py-6 text-center text-sm text-white/45">{empty}</p>;
  const max = Math.max(...items.map((i) => i.value), 1);
  const bar = tone === "green" ? "bg-[#B7FF2A]/[0.16] group-hover:bg-[#B7FF2A]/[0.26]" : "bg-white/[0.08] group-hover:bg-white/[0.13]";

  return (
    <ul className="space-y-1.5">
      {items.map((item) => {
        const inner = (
          <>
            <span aria-hidden className={`absolute inset-y-0 left-0 rounded-lg transition-[width,background-color] duration-700 ease-out ${bar}`} style={{ width: `${Math.max(2, (item.value / max) * 100)}%` }} />
            <span className="relative min-w-0 truncate">
              {item.label}
              {item.hint ? <span className="ml-1.5 text-white/40">{item.hint}</span> : null}
            </span>
            <span className="relative font-medium tabular-nums text-white">{item.value.toLocaleString("es-CO")}</span>
          </>
        );
        const className = "group relative flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-white/75";
        return (
          <li key={item.label}>
            {item.href ? (
              <Link href={item.href} className={`${className} hover:text-white`}>
                {inner}
              </Link>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
