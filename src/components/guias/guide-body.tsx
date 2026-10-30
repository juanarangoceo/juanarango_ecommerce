import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import { ComparisonTable } from "@/components/blog/ComparisonTable";
import { urlForImage } from "@/sanity/lib/image";

type Block = PortableTextBlock & { style?: string; children?: { text?: string }[] };

export function headingId(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function blockText(block: Block) {
  return (block.children ?? []).map((child) => child.text ?? "").join("");
}

export function guideOutline(body: PortableTextBlock[] = []) {
  return (body as Block[])
    .filter((block) => block._type === "block" && block.style === "h2")
    .map((block) => ({ id: headingId(blockText(block)), text: blockText(block) }))
    .filter((item) => item.text);
}

type Conversation = { tienda: string; mensajes: { _key: string; autor: "comprador" | "tienda"; texto: string }[] };

function ConversationExample({ value }: { value: Conversation }) {
  return (
    <figure className="my-10 rounded-[1.75rem] border border-white/9 bg-[#0d110e] p-5 sm:p-7">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/8 pb-4">
        <span className="text-sm font-semibold text-white">{value.tienda}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">Conversación ilustrativa · tienda ficticia</span>
      </figcaption>
      <ol className="mt-5 space-y-3">
        {value.mensajes?.map((message) => (
          <li key={message._key} className={`flex ${message.autor === "tienda" ? "justify-end" : "justify-start"}`}>
            <p className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-[15px] leading-6 ${message.autor === "tienda" ? "rounded-br-md bg-primary/14 text-white" : "rounded-bl-md bg-white/[0.06] text-white/82"}`}>
              <span className="sr-only">{message.autor === "tienda" ? "Tienda: " : "Comprador: "}</span>
              {message.texto}
            </p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="my-5 text-[17px] leading-8 text-white/76">{children}</p>,
    h2: ({ children, value }) => (
      <h2 id={headingId(blockText(value as Block))} className="mt-14 scroll-mt-28 text-balance text-3xl font-semibold leading-tight tracking-[-0.035em] text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="mt-10 text-xl font-semibold tracking-[-0.02em] text-white">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="my-8 rounded-r-2xl border-l-4 border-primary bg-[#0d110e] px-6 py-4 text-[17px] leading-8 text-white/80">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="my-6 list-disc space-y-2 pl-6 text-[17px] leading-8 text-white/76 marker:text-primary">{children}</ul>,
    number: ({ children }) => <ol className="my-6 list-decimal space-y-2 pl-6 text-[17px] leading-8 text-white/76 marker:font-semibold marker:text-primary">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    link: ({ children, value }) => {
      const href = String(value?.href ?? "");
      const className = "font-medium text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary";
      return href.startsWith("/")
        ? <Link href={href} className={className}>{children}</Link>
        : <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="relative my-10 aspect-video overflow-hidden rounded-2xl border border-white/8">
          <Image src={urlForImage(value).width(1400).url()} alt={value.alt ?? ""} fill sizes="(min-width: 1024px) 720px, 100vw" className="object-cover" />
        </figure>
      );
    },
    comparisonTable: ({ value }) => <ComparisonTable title={value.title} headers={value.headers ?? []} rows={value.rows ?? []} />,
    conversacionEjemplo: ({ value }) => <ConversationExample value={value as Conversation} />,
  },
};

export function GuideBody({ body }: { body: PortableTextBlock[] }) {
  return <PortableText value={body} components={components} />;
}
