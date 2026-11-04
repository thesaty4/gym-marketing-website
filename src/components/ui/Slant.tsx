const tokenToVar: Record<string, string> = {
  paper: "var(--paper)",
  "paper-2": "var(--paper-2)",
  black: "var(--black)",
  yellow: "var(--yellow)",
};

/** A slanted section divider: `from` is the color above, `to` the color below. */
export function Slant({ from, to }: { from: keyof typeof tokenToVar; to: keyof typeof tokenToVar }) {
  return (
    <div
      aria-hidden="true"
      className="slant"
      style={{ "--slant-from": tokenToVar[from], "--slant-to": tokenToVar[to] } as React.CSSProperties}
    />
  );
}
