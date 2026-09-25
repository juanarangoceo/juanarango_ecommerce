import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

// Layout raíz del panel /admin. Aislado del sitio: sin header, footer,
// analítica, píxel ni asistente. Se instala como app en el celular con un
// manifest estático (`public/admin.webmanifest`); en Todópolis y Nitro Bot un
// manifest dinámico impidió que Android generara la WebAPK.

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Nitro Admin", template: "%s · Nitro Admin" },
  robots: { index: false, follow: false },
  applicationName: "Nitro Admin",
  manifest: "/admin.webmanifest",
  appleWebApp: { capable: true, title: "Nitro Admin", statusBarStyle: "black-translucent" },
  icons: {
    icon: [{ url: "/icons/admin-192.png", sizes: "192x192" }],
    apple: [{ url: "/icons/admin-apple-touch-icon.png", sizes: "180x180" }],
  },
  formatDetection: { telephone: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0B0D0B",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-[#0B0D0B] font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
