"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Camera,
  CheckCheck,
  ChevronLeft,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  RotateCcw,
  Smile,
  Sparkles,
  Video,
} from "lucide-react";

type ChatMessage = {
  from: "cliente" | "negocio";
  text: string;
  time: string;
  waitMs: number;
  delayLabel?: string;
};

type Conversation = {
  badge: string;
  title: string;
  description: string;
  contactName: string;
  avatar: string;
  automated: boolean;
  messages: ChatMessage[];
};

type RenderedItem =
  | { key: string; type: "delay"; text: string }
  | { key: string; type: "message"; message: ChatMessage };

type ActiveMessage = {
  message: ChatMessage;
  text: string;
};

const conversations: Conversation[] = [
  {
    badge: "Sin NitroBot",
    title: "La venta depende de que alguien esté disponible",
    description:
      "El equipo busca el producto, responde, copia los datos y corrige errores a mano.",
    contactName: "Tu tienda",
    avatar: "T",
    automated: false,
    messages: [
      {
        from: "cliente",
        text: "Hola 👋 Busco un trípode para grabar con el celular. ¿Cuál me recomiendas?",
        time: "9:12",
        waitMs: 450,
      },
      {
        from: "negocio",
        text: "¡Hola! Claro, dame un momento y reviso el catálogo.",
        time: "10:47",
        waitMs: 2500,
        delayLabel: "1 h 35 min después",
      },
      {
        from: "negocio",
        text: "Sí tenemos una opción con soporte para celular. ¿Quieres que te envíe la foto y el precio?",
        time: "11:03",
        waitMs: 1700,
        delayLabel: "16 min después",
      },
      {
        from: "cliente",
        text: "Sí. Quiero 2 y el envío es para Medellín.",
        time: "11:28",
        waitMs: 1200,
        delayLabel: "25 min después",
      },
      {
        from: "negocio",
        text: "Perfecto. Compárteme tu nombre, dirección y barrio para preparar el pedido.",
        time: "11:41",
        waitMs: 1500,
        delayLabel: "13 min después",
      },
      {
        from: "cliente",
        text: "Soy Laura. Calle 10 #20-30, barrio Laureles.",
        time: "11:43",
        waitMs: 650,
      },
      {
        from: "negocio",
        text: "Listo: 2 unidades para Cali, barrio Laureles. Voy a registrar el pedido.",
        time: "12:01",
        waitMs: 1700,
        delayLabel: "18 min después",
      },
      {
        from: "cliente",
        text: "No 😕 Te dije Medellín, no Cali. Llevo horas esperando.",
        time: "12:02",
        waitMs: 500,
      },
      {
        from: "negocio",
        text: "Perdón, Laura. Déjame corregirlo y vuelvo a confirmar todo.",
        time: "12:16",
        waitMs: 1600,
        delayLabel: "14 min después",
      },
      {
        from: "cliente",
        text: "Mejor lo dejo así. Ya compré en otro lado. 😤",
        time: "12:17",
        waitMs: 650,
      },
    ],
  },
  {
    badge: "NitroBot en acción",
    title: "La conversación avanza hasta cerrar el pedido",
    description:
      "Consulta el catálogo, cotiza, verifica la entrega y registra la venta en el mismo chat.",
    contactName: "Tu tienda · NitroBot",
    avatar: "NB",
    automated: true,
    messages: [
      {
        from: "cliente",
        text: "Hola 👋 Busco un trípode para grabar con el celular. ¿Cuál me recomiendas?",
        time: "9:12",
        waitMs: 450,
      },
      {
        from: "negocio",
        text: "Encontré una opción del catálogo que incluye soporte para celular 📱 ¿Te envío la foto y el precio?",
        time: "9:12",
        waitMs: 320,
      },
      {
        from: "cliente",
        text: "Sí 🙌 Quiero 2 y el envío es para Medellín.",
        time: "9:13",
        waitMs: 550,
      },
      {
        from: "negocio",
        text: "Perfecto. Cotizo 2 unidades con el precio del catálogo. Para registrar el pedido, compárteme tu nombre, dirección y barrio.",
        time: "9:13",
        waitMs: 320,
      },
      {
        from: "cliente",
        text: "Soy Laura. Calle 10 #20-30, barrio Laureles.",
        time: "9:14",
        waitMs: 550,
      },
      {
        from: "negocio",
        text: "Confirmo antes de cerrar: 2 trípodes · Medellín · barrio Laureles. ¿Todo correcto?",
        time: "9:14",
        waitMs: 320,
      },
      {
        from: "cliente",
        text: "Sí, todo correcto ✅",
        time: "9:14",
        waitMs: 450,
      },
      {
        from: "negocio",
        text: "¡Listo, Laura! Tu pedido quedó registrado ✅ Tu compra ya está en manos del equipo. 🚀",
        time: "9:14",
        waitMs: 280,
      },
    ],
  },
];

function completeTimeline(messages: ChatMessage[]): RenderedItem[] {
  return messages.flatMap((message, index) => {
    const messageItem: RenderedItem = {
      key: `message-${index}`,
      type: "message",
      message,
    };

    return message.delayLabel
      ? [
          { key: `delay-${index}`, type: "delay" as const, text: message.delayLabel },
          messageItem,
        ]
      : [messageItem];
  });
}

function useConversationPlayback(
  messages: ChatMessage[],
  started: boolean,
  playbackKey: number
) {
  const reducedMotion = useReducedMotion();
  const [items, setItems] = useState<RenderedItem[]>([]);
  const [active, setActive] = useState<ActiveMessage | null>(null);

  useEffect(() => {
    if (!started || reducedMotion) return;

    let cancelled = false;
    const wait = (milliseconds: number) =>
      new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

    async function play() {
      setItems([]);
      setActive(null);
      await wait(350);

      for (const [index, message] of messages.entries()) {
        if (cancelled) return;

        if (message.delayLabel) {
          setItems((current) => [
            ...current,
            { key: `delay-${index}`, type: "delay", text: message.delayLabel! },
          ]);
        }

        await wait(message.waitMs);
        if (cancelled) return;

        setActive({ message, text: "" });
        const typeSpeed = message.from === "negocio" ? 14 : 11;

        for (let length = 1; length <= message.text.length; length += 1) {
          await wait(typeSpeed);
          if (cancelled) return;
          setActive({ message, text: message.text.slice(0, length) });
        }

        await wait(180);
        if (cancelled) return;
        setItems((current) => [
          ...current,
          { key: `message-${index}`, type: "message", message },
        ]);
        setActive(null);
      }
    }

    void play();
    return () => {
      cancelled = true;
    };
  }, [messages, playbackKey, reducedMotion, started]);

  return {
    active: reducedMotion ? null : active,
    items: reducedMotion ? completeTimeline(messages) : items,
  };
}

function MessageBubble({ message, text }: { message: ChatMessage; text: string }) {
  return (
    <div className={`flex ${message.from === "cliente" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-lg px-2.5 pb-1.5 pt-2 text-[12px] leading-[1.45] text-white shadow-md ${
          message.from === "cliente"
            ? "rounded-tr-sm bg-[#005c4b]"
            : "rounded-tl-sm bg-[#202c33]"
        }`}
      >
        <span>{text}</span>
        {text === message.text ? (
          <span className="ml-2 inline-flex translate-y-1 items-center gap-0.5 text-[9px] text-white/78">
            {message.time}
            {message.from === "cliente" ? (
              <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" aria-label="Leído" />
            ) : null}
          </span>
        ) : (
          <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-white/10 align-middle motion-reduce:animate-none" />
        )}
      </div>
    </div>
  );
}

function WhatsAppChat({
  conversation,
  started,
  playbackKey,
}: {
  conversation: Conversation;
  started: boolean;
  playbackKey: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { active, items } = useConversationPlayback(
    conversation.messages,
    started,
    playbackKey
  );

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (scrollArea) scrollArea.scrollTop = scrollArea.scrollHeight;
  }, [active?.text, items.length]);

  const businessTyping = active?.message.from === "negocio";
  let deviceTime = "9:12";
  for (const item of items) {
    if (item.type === "message") deviceTime = item.message.time;
  }
  if (active) deviceTime = active.message.time;

  return (
    <article
      className={`relative flex h-full flex-col transition-[transform,opacity] duration-500 ${
        conversation.automated
          ? "z-10 md:-translate-y-4 md:scale-[1.03]"
          : "opacity-85 md:scale-[0.96]"
      }`}
    >
      {conversation.automated ? (
        <div
          className="pointer-events-none absolute inset-x-8 top-24 h-3/4 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
      ) : null}

      <div className="relative mb-4 flex min-h-[132px] flex-col items-center text-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-[family-name:var(--font-dm-mono)] text-[10px] font-bold uppercase tracking-[0.16em] ${
            conversation.automated
              ? "border-primary/50 bg-primary/15 text-orange-300 shadow-lg shadow-primary/15"
              : "border-white/15 bg-[#0d110e] text-white/58"
          }`}
        >
          {conversation.automated ? <Sparkles className="h-3 w-3" aria-hidden="true" /> : null}
          {conversation.badge}
        </span>
        <h3 className="mt-3 text-xl font-bold text-foreground">{conversation.title}</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm leading-relaxed text-white/58">
          {conversation.description}
        </p>
      </div>

      <div
        className={`relative mx-auto flex h-[560px] min-h-[560px] max-h-[560px] w-full max-w-[430px] flex-none flex-col overflow-hidden rounded-[2rem] border-[5px] bg-[#0b141a] shadow-2xl sm:h-[590px] sm:min-h-[590px] sm:max-h-[590px] ${
          conversation.automated
            ? "border-primary/80 shadow-primary/25 ring-1 ring-primary/40"
            : "border-white/10 shadow-black/50 grayscale-[0.15]"
        }`}
        aria-hidden="true"
      >
        <div className="flex h-7 shrink-0 items-center justify-between bg-[#111b21] px-5 text-[10px] font-semibold text-white/78">
          <span>{deviceTime}</span>
          <span className="tracking-[0.18em]">● ● ●</span>
        </div>

        <div className="flex shrink-0 items-center gap-2 bg-[#202c33] px-2 py-2.5 shadow-md">
          <ChevronLeft className="h-5 w-5 text-white/78" />
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
              conversation.automated ? "bg-primary" : "bg-white/10"
            }`}
          >
            {conversation.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {conversation.contactName}
            </p>
            <p className="h-4 text-[10px] text-white/78">
              {businessTyping ? "escribiendo…" : "en línea"}
            </p>
          </div>
          <Video className="h-5 w-5 text-white/78" />
          <Phone className="h-4 w-4 text-white/78" />
          <MoreVertical className="h-5 w-5 text-white/78" />
        </div>

        <div
          ref={scrollRef}
          className="relative min-h-0 flex-1 overflow-y-auto bg-[#0b141a] px-3 py-4 scroll-smooth [background-image:radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:14px_14px]"
        >
          <div className="mx-auto mb-4 w-fit max-w-[90%] rounded-lg bg-[#182229] px-3 py-1.5 text-center text-[9px] leading-relaxed text-[#8696a0] shadow">
            Los mensajes están protegidos de extremo a extremo.
          </div>

          <div className="space-y-2.5">
            {items.map((item) =>
              item.type === "delay" ? (
                <div
                  key={item.key}
                  className="mx-auto w-fit rounded-full border border-amber-500/20 bg-amber-950/50 px-2.5 py-1 text-[9px] font-medium text-amber-300/80"
                >
                  ⏳ {item.text}
                </div>
              ) : (
                <MessageBubble
                  key={item.key}
                  message={item.message}
                  text={item.message.text}
                />
              )
            )}

            {active ? <MessageBubble message={active.message} text={active.text} /> : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 bg-[#111b21] px-2 py-2.5">
          <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-[#202c33] px-3 text-[#8696a0]">
            <Smile className="h-5 w-5" />
            <span className="flex-1 text-xs">Mensaje</span>
            <Paperclip className="h-5 w-5" />
            <Camera className="h-5 w-5" />
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884]">
            <Mic className="h-5 w-5 text-white" />
          </span>
        </div>
      </div>

      <ol className="sr-only">
        {conversation.messages.map((message, index) => (
          <li key={`${message.time}-${index}`}>
            {message.delayLabel ? `${message.delayLabel}. ` : ""}
            {message.from === "cliente" ? "Cliente" : conversation.contactName}: {message.text}
          </li>
        ))}
      </ol>
    </article>
  );
}

export function VslConversations() {
  const playbackRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [playbackKey, setPlaybackKey] = useState(0);

  useEffect(() => {
    const playback = playbackRef.current;
    if (!playback) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    observer.observe(playback);
    return () => observer.disconnect();
  }, []);

  const replay = () => {
    setStarted(true);
    setPlaybackKey((key) => key + 1);
  };

  return (
    <section
      className="mx-auto mt-16 max-w-6xl lg:mt-20"
      aria-labelledby="chat-examples-title"
    >
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-2 font-[family-name:var(--font-dm-mono)] text-xs uppercase tracking-[0.18em] text-primary">
          Míralo conversar y cerrar
        </p>
        <h2 id="chat-examples-title" className="text-2xl font-bold text-foreground md:text-4xl">
          El mismo cliente. Dos finales muy distintos.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/58 md:text-base">
          Cuando el proceso es manual, una espera o un dato mal copiado puede enfriar la
          venta. NitroBot consulta tu catálogo, confirma la entrega y deja el pedido
          registrado sin perder el hilo de la conversación.
        </p>
        <p className="mt-2 text-[11px] text-white/38">
          Simulación ilustrativa basada en capacidades reales del producto; no es un chat
          de un cliente real.
        </p>
        <button
          type="button"
          onClick={replay}
          className="mx-auto mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-orange-200 transition-colors hover:bg-primary/20"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          Repetir comparación
        </button>
      </div>

      <div
        ref={playbackRef}
        className="grid items-stretch gap-10 md:grid-cols-[0.9fr_1.1fr] lg:gap-12"
      >
        {conversations.map((conversation) => (
          <WhatsAppChat
            key={conversation.badge}
            conversation={conversation}
            started={started}
            playbackKey={playbackKey}
          />
        ))}
      </div>
    </section>
  );
}
