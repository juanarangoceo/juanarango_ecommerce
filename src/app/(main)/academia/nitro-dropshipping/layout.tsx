import { Bebas_Neue, Space_Mono } from "next/font/google";
import "./landing.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export default function NitroDropshippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bebasNeue.variable} ${spaceMono.variable} nitro-landing-scope`}>
      {children}
    </div>
  );
}
