import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ConversionCtaProps = {
  title: string;
  description: string;
  label?: string;
  href?: string;
};

export function ConversionCta({
  title,
  description,
  label = "Encontrar mi mejor opción",
  href = "/diagnostico",
}: ConversionCtaProps) {
  return (
    <section className="px-5 py-10 lg:px-8 lg:py-16">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/18 bg-[#0b0f0c] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.26)] sm:p-12 lg:p-14">
        <div className="pointer-events-none absolute -right-20 -top-28 size-80 rounded-full bg-primary/[0.09] blur-[90px]" />
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="text-center lg:text-left">
            <h2 className="max-w-4xl text-balance font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/55 lg:mx-0">
              {description}
            </p>
          </div>
          <Button asChild size="lg" className="group h-14 rounded-full px-8 text-base font-bold">
            <Link href={href}>
              {label} <ArrowRight className="nitro-cta-arrow" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
