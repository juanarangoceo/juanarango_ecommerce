type NitroMarkProps = {
  className?: string;
};

export function NitroMark({ className }: NitroMarkProps) {
  return (
    <svg
      viewBox="0 0 32 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M18.4 2.8 5.9 21.1h8.8l-2.3 16.1 13.7-20.8h-9l3.2-13.6h-1.9Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <path
        d="m17.9 5.5-8.7 13h4.2l5.8-13h-1.3Z"
        fill="white"
        opacity="0.28"
      />
    </svg>
  );
}
