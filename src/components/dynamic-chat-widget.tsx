"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ChatWidget = dynamic(
  () => import("@/components/chat-widget").then((mod) => mod.ChatWidget),
  { ssr: false }
);

export function DynamicChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer chat widget loading by 5 seconds to avoid competing with LCP
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;
  return <ChatWidget />;
}
