"use client"

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
    if (pathname !== "/") return;

    // Defer chat widget loading by 5 seconds to avoid competing with LCP
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (pathname !== "/") return null;
  if (!shouldLoad) return null;

  return <ChatWidget />;
}
