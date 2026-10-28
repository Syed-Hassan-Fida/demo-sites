import type { ReactNode } from "react";

type Props = {
  href?: string;
  label?: string;
  detail?: string;
  variant?: "light" | "forest";
};

export function CtaBook({
  href = "sms:+15127661712",
  label = "Text to book",
  detail = "512-766-1712 · usually same-day reply",
  variant = "light",
}: Props) {
  return (
    <a className={`cta-book cta-book--${variant}`} href={href}>
      <span className="cta-book__pulse" aria-hidden />
      <span className="cta-book__icon" aria-hidden>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M8.5 4.5h2.2l1.1 3.3-1.4 1.4a12.5 12.5 0 0 0 4.9 4.9l1.4-1.4 3.3 1.1v2.2c0 .9-.7 1.7-1.6 1.8-7.2.8-13.3-5.3-12.5-12.5.1-.9.9-1.6 1.8-1.6Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="cta-book__copy">
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>
      <span className="cta-book__arrow" aria-hidden>
        →
      </span>
    </a>
  );
}

export function CtaGhost({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a className={light ? "cta-ghost cta-ghost--light" : "cta-ghost"} href={href}>
      {children}
      <span className="cta-ghost__arrow" aria-hidden>
        →
      </span>
    </a>
  );
}
