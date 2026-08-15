"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import RevealText from "./RevealText";

/**
 * Editorial section header: a small tracked eyebrow with an animated hairline,
 * above a large masked-reveal headline. Used to open most sections so the whole
 * site shares one typographic rhythm.
 */
type SectionTitleProps = {
  eyebrow?: string;
  lines: readonly string[];
  serif?: boolean;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  accentIndex?: number;
  accentRender?: (line: string) => ReactNode;
};

export default function SectionTitle({
  eyebrow,
  lines,
  serif = false,
  align = "left",
  className = "",
  titleClassName = "",
  accentIndex,
  accentRender,
}: SectionTitleProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/50" />
          <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
            {eyebrow}
          </span>
        </motion.div>
      )}

      <RevealText
        lines={lines}
        as="h2"
        accentIndex={accentIndex}
        accentRender={accentRender}
        className={`${
          serif ? "font-serif" : "font-sans"
        } text-display-sm font-light tracking-editorial text-ink ${titleClassName}`}
      />
    </div>
  );
}
