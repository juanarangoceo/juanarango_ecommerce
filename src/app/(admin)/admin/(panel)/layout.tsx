import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { isAdmin } from "@/lib/admin-guard";

// Todo lo que cuelga de aquí exige sesión (middleware + requireAdmin en las
// acciones) y siempre lee datos frescos.
export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Segunda barrera además del middleware (que en `next dev` no siempre corre).
  if (!(await isAdmin())) redirect("/admin/login");
  const nitroBot = process.env.NITROBOT_API_URL?.replace(/\/$/, "");
  return (
    <div className="min-h-dvh md:flex">
      <AdminNav nitroBotLeadsUrl={nitroBot ? `${nitroBot}/admin/leads` : null} />
      <main className="min-w-0 flex-1 pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">{children}</main>
    </div>
  );
}
