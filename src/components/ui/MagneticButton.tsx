"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Premium CTA. On desktop the label is subtly "magnetic" — it leans a few
 * pixels toward the cursor — and a bone-coloured fill wipes in from the left on
 * hover, inverting the text. On touch / reduced-motion it is a clean, static,
 * fully accessible button. Renders as <a> when `href` is set, else <button>.
 */
type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
  cursorLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "outline",
  size = "md",
  className = "",
  ariaLabel,
  cursorLabel = "Open",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const magnetic = isDesktop && !reduced;

  const onMove = (e: MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  const sizes = {
    sm: "px-5 py-2.5 text-[11px]",
    md: "px-7 py-3.5 text-xs",
    lg: "px-9 py-4 text-sm",
  }[size];

  const variants = {
    solid: "border-gold bg-gold text-ink",
    outline: "border-gold-deep/30 text-gold-deep hover:border-gold-deep/70",
    ghost: "border-transparent text-gold-deep",
  }[variant];

  const inner = (
    <>
      {/* fill wipe */}
      <span className="absolute inset-0 -z-0 origin-left scale-x-0 bg-gold-deep transition-transform duration-[650ms] ease-lux group-hover/btn:scale-x-100" />
      <span className="relative z-10 flex items-center gap-2.5 transition-colors duration-[650ms] ease-lux group-hover/btn:text-white">
        {children}
      </span>
    </>
  );

  const classes =
    `group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full border uppercase tracking-wide2 ` +
    `transition-[transform,border-color] duration-500 ease-lux will-change-transform ` +
    `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-sand ` +
    `${sizes} ${variants} ${className}`;

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        data-cursor="link"
        data-cursor-label={cursorLabel}
        className={classes}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      data-cursor="link"
      data-cursor-label={cursorLabel}
      className={classes}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
