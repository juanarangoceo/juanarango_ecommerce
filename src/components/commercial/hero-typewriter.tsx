"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "Sistemas que convierten conversaciones en ventas.";
const HIGHLIGHT = "conversaciones";
const HIGHLIGHT_START = FULL_TEXT.indexOf(HIGHLIGHT);
const HIGHLIGHT_END = HIGHLIGHT_START + HIGHLIGHT.length;

function StyledTitle({ length }: { length: number }) {
  const before = FULL_TEXT.slice(0, Math.min(length, HIGHLIGHT_START));
  const highlighted =
    length > HIGHLIGHT_START
      ? FULL_TEXT.slice(HIGHLIGHT_START, Math.min(length, HIGHLIGHT_END))
      : "";
  const after = length > HIGHLIGHT_END ? FULL_TEXT.slice(HIGHLIGHT_END, length) : "";

  return (
    <>
      {before}
      <span className="text-primary">{highlighted}</span>
      {after}
    </>
  );
}

export function HeroTypewriter() {
  const [visibleLength, setVisibleLength] = useState(0);
  const [showCaret, setShowCaret] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      const frame = window.requestAnimationFrame(() => {
        setVisibleLength(FULL_TEXT.length);
        setShowCaret(false);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    let typedLength = 0;
    let typingTimer = 0;
    let caretTimer = 0;

    const typeNextCharacter = () => {
      typedLength += 1;
      setVisibleLength(typedLength);

      if (typedLength < FULL_TEXT.length) {
        typingTimer = window.setTimeout(typeNextCharacter, 28);
        return;
      }

      caretTimer = window.setTimeout(() => setShowCaret(false), 700);
    };

    typingTimer = window.setTimeout(typeNextCharacter, 140);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(caretTimer);
    };
  }, []);

  return (
    <h1 className="grid max-w-4xl font-display text-[2rem] font-bold leading-[.98] tracking-[-0.04em] text-white min-[360px]:text-[2.65rem] min-[360px]:leading-[.94] min-[360px]:tracking-[-0.045em] sm:text-[clamp(3rem,5.5vw,5.5rem)] sm:leading-[.92] sm:tracking-[-0.055em]">
      <span className="col-start-1 row-start-1 opacity-0">
        <StyledTitle length={FULL_TEXT.length} />
      </span>
      <span className="col-start-1 row-start-1" aria-hidden="true">
        <StyledTitle length={visibleLength} />
        {showCaret ? <span className="nitro-type-caret" /> : null}
      </span>
    </h1>
  );
}
