"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(
  () => import("@/components/chat-widget").then((mod) => mod.ChatWidget),
  { ssr: false }
);

export function DynamicChatWidget() {
  const pathname = usePathname();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/demos")) return;

    // Defer the visual so it never competes with the route's primary content.
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (pathname?.startsWith("/demos")) return null;
  if (!shouldLoad) return null;

  return <ChatWidget />;
}
