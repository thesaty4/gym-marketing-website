import type { ReactNode } from "react";

const colorClass = {
  yellow: "bg-brand-yellow text-brand-black",
  black: "bg-brand-black text-brand-yellow",
  red: "bg-brand-red text-brand-white",
  white: "bg-brand-white text-brand-black",
} as const;

/**
 * Renders content inside the signature brush-stroke clip-path shape, used
 * for tag chips, price strips, the "Fixed price"/"No bargaining" strips, the
 * trainer role badge and the hero price sticker.
 */
export function BrushStrip({
  color,
  rotate = 0,
  className,
  children,
}: {
  color: keyof typeof colorClass;
  rotate?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`brush-strip inline-flex items-center justify-center px-6 py-3 ${colorClass[color]} ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}
