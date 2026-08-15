"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/lib/content-context";
import CinematicImage from "./ui/CinematicImage";
import { useIsDesktop } from "@/hooks/useMediaQuery";

/**
 * MENU — an editorial list, never a card grid.
 *
 * The nine categories run HORIZONTALLY across the full width, sitting on a
 * hairline like the tabs of a printed carte, each carrying its item count. The
 * previous vertical rail stacked all nine into a narrow right-hand column and
 * left the dishes in a single file — with 17 starters that meant a very long
 * scroll and a cramped rail at the same time.
 *
 * The dishes then flow in two CSS columns on large screens, so a category is
 * read down the left and continued down the right, the way a menu actually
 * works. `break-inside-avoid` keeps a dish from splitting across the fold.
 *
 * On desktop, hovering a row summons a small macro preview that trails the
 * cursor with lag; the row itself lifts and its price shifts. On mobile it
 * collapses to one clean, highly legible column with no preview.
 */
export default function MenuSection() {
  const { menu, ui } = useContent();
  const [active, setActive] = useState(menu.categories[0].id);
  const [preview, setPreview] = useState<number | null>(null);
  const isDesktop = useIsDesktop();
  const cursor = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const category = menu.categories.find((c) => c.id === active) ?? menu.categories[0];

  const onMove = (e: React.MouseEvent) => {
    if (!isDesktop || !cursor.current) return;
    const x = e.clientX;
    const y = e.clientY;
    if (!raf.current) {
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        if (cursor.current)
          cursor.current.style.transform = `translate(${x + 28}px, ${y - 130}px)`;
      });
    }
  };

  return (
    <section
      id="menu"
      className="relative bg-sand/95 px-6 py-28 md:px-10 md:py-40"
      onMouseMove={onMove}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
              {menu.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-display-sm font-light leading-[0.95] tracking-editorial text-ink">
            {menu.title.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>

        {/* Category tabs — full width, sitting on a hairline. Bleeds to the
            screen edges on small viewports so the row can be swiped. */}
        <nav
          className="-mx-6 mb-12 overflow-x-auto border-b border-ink/10 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
          aria-label={ui.menu.categoriesAria}
        >
          <ul className="flex w-max min-w-full gap-8 md:gap-10">
            {menu.categories.map((c) => (
              <li key={c.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActive(c.id)}
                  aria-current={active === c.id ? "true" : undefined}
                  data-cursor="link"
                  className={`group relative flex items-baseline gap-1.5 whitespace-nowrap pb-4 pt-1 text-sm uppercase tracking-wide2 transition-colors duration-500 ${
                    active === c.id ? "text-ink" : "text-ink/40 hover:text-ink/75"
                  }`}
                >
                  {c.label}
                  <span
                    className={`font-sans text-[10px] tabular-nums transition-colors duration-500 ${
                      active === c.id ? "text-gold-deep" : "text-ink/25"
                    }`}
                  >
                    {c.items.length}
                  </span>
                  {/* Active indicator rides the hairline. */}
                  <span
                    className={`absolute -bottom-px left-0 h-px bg-gold transition-all duration-500 ease-lux ${
                      active === c.id ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Items — keyed on category so switching remounts and replays the
            enter animation. No AnimatePresence/exit (which can hang), so the
            new category always renders immediately. */}
        <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {category.note && (
              <p className="mb-8 max-w-md font-serif text-lg italic text-bone-muted">
                {category.note}
              </p>
            )}

            {/* Two columns from lg up: read down the left, continue down the
                right. `columns` rather than a grid so the flow is vertical
                per column, which is how a carte is scanned. */}
            <ul className="columns-1 gap-x-16 lg:columns-2 xl:gap-x-24">
              {category.items.map((item, i) => (
                <li
                  key={item.id}
                  onMouseEnter={() => setPreview(i)}
                  onMouseLeave={() => setPreview(null)}
                  data-cursor="link"
                  data-cursor-label={ui.menu.cursorLabel}
                  className="group grid break-inside-avoid grid-cols-[auto_1fr_auto] items-baseline gap-x-3 gap-y-1 border-b border-ink/10 py-5 transition-colors duration-500 hover:bg-ink/[0.02] md:py-6"
                >
                  <h3 className="font-serif text-xl font-light tracking-editorial text-ink transition-transform duration-500 ease-lux md:text-2xl md:group-hover:translate-x-1.5">
                    {item.name}
                  </h3>
                  {/* Dotted leader, as on a printed carte — it carries the eye
                      from the dish to its price across whatever gap is left. */}
                  <span
                    aria-hidden="true"
                    className="mb-1.5 self-end border-b border-dotted border-ink/20"
                  />
                  <span
                    className={`font-sans tabular-nums transition-colors duration-500 group-hover:text-gold-deep ${
                      item.price
                        ? "text-base text-ink/70 md:text-lg"
                        : "text-[11px] uppercase tracking-wide2 text-bone-faint"
                    }`}
                  >
                    {item.price ?? ui.menu.onRequest}
                  </span>
                  <p className="col-span-3 text-sm leading-relaxed text-bone-muted transition-transform duration-500 ease-lux md:group-hover:translate-x-1.5">
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
        </motion.div>
      </div>

      {/* Cursor-following preview (desktop only) */}
      {isDesktop && (
        <div
          ref={cursor}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 will-change-transform"
        >
          <div
            className={`h-64 w-52 overflow-hidden rounded-sm shadow-2xl transition-all duration-500 ease-lux ${
              preview !== null
                ? "scale-100 opacity-100"
                : "scale-90 opacity-0"
            }`}
          >
            {preview !== null && (
              <CinematicImage
                src={category.items[preview]?.image}
                alt={category.items[preview]?.name ?? ""}
                tint={["#1c1a1e", "#4a4048"]}
                kicker={ui.menu.kicker}
                label={category.items[preview]?.name}
                interactive={false}
                sizes="220px"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
