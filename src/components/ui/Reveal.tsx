"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fade + 22px rise reveal-on-scroll, used only for the pricing strips, the
 * "Fixed price" block, the first-month card and the trainer block. Content
 * is fully visible without JavaScript and under `prefers-reduced-motion`;
 * the hidden state is only applied once the observer is actually armed.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Set directly on the DOM node (not React state) so arming the reveal
    // doesn't itself trigger a synchronous render-in-effect cascade.
    node.dataset.revealReady = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`} data-reveal-visible={visible}>
      {children}
    </div>
  );
}
