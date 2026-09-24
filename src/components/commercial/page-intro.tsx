import type { ReactNode } from "react";

type PageIntroProps = {
  title: ReactNode;
  description: ReactNode;
  aside?: ReactNode;
  actions?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function PageIntro({
  title,
  description,
  aside,
  actions,
  align = "left",
  className = "",
}: PageIntroProps) {
  const centered = align === "center";

  return (
    <section
      className={`relative overflow-hidden px-5 pb-14 pt-32 sm:pb-18 lg:px-8 lg:pb-22 lg:pt-44 ${className}`}
    >
      <div className="pointer-events-none absolute left-[12%] top-24 size-72 rounded-full bg-primary/[0.055] blur-[110px]" />
      <div
        className={`relative mx-auto max-w-7xl ${
          aside
            ? "grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,.92fr)] lg:items-end lg:gap-14"
            : ""
        }`}
      >
        <div className={centered ? "mx-auto max-w-5xl text-center" : "min-w-0 max-w-5xl text-center lg:text-left"}>
          <h1 className="text-balance font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[.96] tracking-[-0.05em] text-white [overflow-wrap:anywhere]">
            {title}
          </h1>
          <div
            className={`mt-6 text-base leading-7 text-white/58 sm:text-lg sm:leading-8 ${
              centered ? "mx-auto max-w-2xl" : "mx-auto max-w-2xl lg:mx-0"
            }`}
          >
            {description}
          </div>
          {actions ? (
            <div className={`mt-8 flex flex-col gap-3 sm:flex-row ${centered ? "sm:justify-center" : "sm:justify-center lg:justify-start"}`}>
              {actions}
            </div>
          ) : null}
        </div>
        {aside ? <div className="min-w-0">{aside}</div> : null}
      </div>
    </section>
  );
}
