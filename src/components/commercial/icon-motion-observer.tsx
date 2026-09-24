"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function IconMotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const icons = document.querySelectorAll<HTMLElement>(".nitro-icon-mark");

    if (!("IntersectionObserver" in window)) {
      icons.forEach((icon) => icon.classList.add("nitro-icon-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("nitro-icon-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.45 }
    );

    icons.forEach((icon) => observer.observe(icon));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
