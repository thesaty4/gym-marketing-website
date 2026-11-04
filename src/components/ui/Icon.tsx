type IconName =
  | "dumbbell"
  | "bolt"
  | "target"
  | "heart-pulse"
  | "pin"
  | "whatsapp"
  | "phone"
  | "plus"
  | "minus"
  | "close"
  | "menu"
  | "expand"
  | "instagram"
  | "facebook"
  | "youtube"
  | "qr"
  | "chevron-right";

export function Icon({
  name,
  className,
  "aria-hidden": ariaHidden = true,
}: {
  name: IconName;
  className?: string;
  "aria-hidden"?: boolean;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": ariaHidden,
    focusable: false as const,
  };

  switch (name) {
    case "dumbbell":
      return (
        <svg {...common}>
          <path d="M4 9v6M2 10.5v3M20 9v6M22 10.5v3M7 12h10" />
          <rect x="4.5" y="7.5" width="3" height="9" rx="1" />
          <rect x="16.5" y="7.5" width="3" height="9" rx="1" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "heart-pulse":
      return (
        <svg {...common}>
          <path d="M20.8 8.6c0 5-8.8 10.4-8.8 10.4S3.2 13.6 3.2 8.6a4.8 4.8 0 0 1 8.8-2.6 4.8 4.8 0 0 1 8.8 2.6Z" />
          <path d="M5 12h3l1.5-3L12 15l1.5-3H17" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} fill="currentColor" stroke="none" viewBox="0 0 32 32">
          <path d="M16 2.9A13.1 13.1 0 0 0 4.5 21.9L2.9 29l7.3-1.5A13.1 13.1 0 1 0 16 2.9Zm0 24a11 11 0 0 1-5.6-1.5l-.4-.3-4.3.9.9-4.2-.3-.4A11 11 0 1 1 16 26.9Zm6-8.3c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.5-.5-2.8-1.7a10.4 10.4 0 0 1-1.9-2.4c-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-1-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.1.2 2.2 3.4 5.3 4.7.7.3 1.3.5 1.8.6.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "minus":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case "expand":
      return (
        <svg {...common}>
          <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M14 22v-8h2.7l.4-3.1H14V8.9c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H8.2V14H10.8v8Z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M10 9l6 3-6 3Z" />
        </svg>
      );
    case "qr":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <path d="M14 14h3v3h-3zM19 14h2v2h-2zM14 19h2v2h-2zM19 19h2v2h-2z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
