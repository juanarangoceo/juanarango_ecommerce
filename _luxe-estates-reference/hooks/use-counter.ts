"use client";

import { useState, useEffect, useRef } from "react";

interface UseCounterProps {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export function useCounter({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
}: UseCounterProps) {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = start + (end - start) * easeOutCubic;
      
      setCount(currentValue);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration, start]);

  const formattedValue = `${prefix}${count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`;

  return { ref, formattedValue, count };
}
