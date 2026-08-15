"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, X, Check } from "lucide-react";
import { interpolate } from "@/lib/content";
import { useContent } from "@/lib/content-context";
import MagneticButton from "./ui/MagneticButton";

/**
 * RESERVATIONS — presented as a premium product moment: enormous negative space,
 * one huge headline, one clear action. The button opens a restrained modal with
 * exactly three fields (date, time, guests). It is intentionally not a giant
 * form. Submission shows an in-place confirmation; wire `reservations.externalUrl`
 * or a server action to connect a real booking provider (Tock, Resy, …).
 */
export default function ReservationSection() {
  const { reservations, ui } = useContent();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<{ date: string; time: string; guests: string }>({
    date: "",
    time: reservations.times[0],
    guests: "2",
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Earliest bookable day. Resolved after mount so the server and the client
  // never disagree on today's date (and so it can never go stale).
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // move focus into the dialog
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  const openModal = () => {
    if (reservations.externalUrl) {
      window.open(reservations.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setDone(false);
    setOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end demo: surface a confirmation. Replace with a real booking call.
    setDone(true);
  };

  return (
    <section
      id="reservas"
      className="relative flex min-h-[90svh] items-center bg-sand-warm/70 px-6 py-32 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
              {reservations.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-display font-light leading-[0.9] tracking-editorial text-ink">
            {reservations.title.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col justify-end lg:col-span-4">
          <p className="mb-10 max-w-sm text-base leading-relaxed text-bone-muted">
            {reservations.body}
          </p>
          <MagneticButton
            variant="solid"
            size="lg"
            onClick={openModal}
            cursorLabel={ui.reserve.cursorLabel}
            ariaLabel={ui.reserve.openAria}
            className="self-start"
          >
            {reservations.cta}
          </MagneticButton>
        </div>
      </div>

      {/* Modal — plain conditional mount/unmount (guaranteed removal) with a
          Framer enter animation. No exit animation is used on purpose: it keeps
          the overlay from ever lingering in the DOM and blocking the page. */}
      {open && (
          <motion.div
            key="reserve-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-ink/40 backdrop-blur-md"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="reserve-title"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md overflow-hidden border border-ink/10 bg-surface p-8 shadow-xl rounded-lg md:p-10"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={ui.reserve.close}
                className="absolute right-5 top-5 text-ink/50 transition-colors hover:text-ink"
              >
                <X strokeWidth={1.2} className="h-5 w-5" />
              </button>

              {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-6 text-center"
                  >
                    <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
                      <Check strokeWidth={1.2} className="h-6 w-6 text-gold-deep" />
                    </span>
                    <h3 className="font-serif text-2xl font-light text-ink">
                      {ui.reserve.doneTitle}
                    </h3>
                    <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-bone-muted">
                      {interpolate(ui.reserve.doneBody, {
                        guests: form.guests,
                        date: form.date || ui.reserve.chosenDate,
                        time: form.time,
                      })}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-8 text-[11px] uppercase tracking-wide2 text-ink/60 underline-offset-4 hover:text-ink hover:underline"
                    >
                      {ui.reserve.close}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={onSubmit}
                  >
                    <p className="mb-2 text-[11px] uppercase tracking-wide3 text-gold-deep">
                      {reservations.eyebrow}
                    </p>
                    <h3
                      id="reserve-title"
                      className="mb-8 font-serif text-3xl font-light tracking-editorial text-ink"
                    >
                      {ui.reserve.title}
                    </h3>

                    <label className="mb-5 block">
                      <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-bone-muted">
                        <Calendar strokeWidth={1.4} className="h-3.5 w-3.5" />{" "}
                        {ui.reserve.date}
                      </span>
                      <input
                        ref={firstFieldRef}
                        type="date"
                        required
                        min={today || undefined}
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full border-b border-ink/15 bg-transparent pb-2 text-ink outline-none transition-colors focus:border-gold [color-scheme:light]"
                      />
                    </label>

                    <label className="mb-5 block">
                      <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-bone-muted">
                        <Clock strokeWidth={1.4} className="h-3.5 w-3.5" />{" "}
                        {ui.reserve.time}
                      </span>
                      <select
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full border-b border-ink/15 bg-transparent pb-2 text-ink outline-none transition-colors focus:border-gold [color-scheme:light]"
                      >
                        {reservations.times.map((t) => (
                          <option key={t} value={t} className="bg-surface">
                            {t}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="mb-9 block">
                      <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-bone-muted">
                        <Users strokeWidth={1.4} className="h-3.5 w-3.5" />{" "}
                        {ui.reserve.guests}
                      </span>
                      <select
                        value={form.guests}
                        onChange={(e) => setForm({ ...form, guests: e.target.value })}
                        className="w-full border-b border-ink/15 bg-transparent pb-2 text-ink outline-none transition-colors focus:border-gold [color-scheme:light]"
                      >
                        {Array.from({ length: reservations.maxGuests }, (_, i) => i + 1).map(
                          (n) => (
                            <option key={n} value={String(n)} className="bg-surface">
                              {n} {n === 1 ? ui.reserve.guestOne : ui.reserve.guestOther}
                            </option>
                          )
                        )}
                      </select>
                    </label>

                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-wide2 text-white transition-transform hover:bg-ocean-deep"
                    >
                      {ui.reserve.submit}
                    </button>
                    <p className="mt-4 text-center text-[11px] leading-relaxed text-bone-faint">
                      {ui.reserve.disclaimer}
                    </p>
                  </motion.form>
                )}
            </motion.div>
          </motion.div>
        )}
    </section>
  );
}
