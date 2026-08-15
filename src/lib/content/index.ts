/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENT ENTRY POINT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Components never import a locale file directly. They call `getContent(locale)`
 *  (server) or `useContent()` (client) and receive one `Content` object with the
 *  same shape in every language.
 *
 *  The merge below is the whole trick: language-independent data from ./shared.ts
 *  is joined by id onto the translated strings from ./pt | ./en | ./es. Because
 *  every id is a literal union, a locale file that forgets a dish will not build.
 *
 *  Wiring this to a CMS later means replacing the dictionary imports with a fetch
 *  — `build()` and every component stay exactly as they are.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Locale } from "@/i18n/config";
import { shared } from "./shared";
import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";
import type { Content, Copy } from "./types";

export type {
  Content,
  Copy,
  Ingredient,
  MenuItem,
  MenuCategory,
  GalleryItem,
  NavLink,
} from "./types";

const dictionaries: Record<Locale, Copy> = { pt, en, es };

function build(copy: Copy): Content {
  return {
    site: { ...shared.site, ...copy.site },

    nav: {
      links: shared.nav.links.map((link) => ({
        ...link,
        label: copy.nav.links[link.id],
      })),
      cta: { href: shared.nav.cta.href, label: copy.nav.cta },
    },

    hero: copy.hero,

    film: { ...shared.film, ...copy.film },

    intro: copy.intro,

    art: {
      eyebrow: copy.art.eyebrow,
      dishName: copy.art.dishName,
      dishTagline: copy.art.dishTagline,
      title: copy.art.title,
      body: copy.art.body,
      image: shared.artImage,
      steps: shared.artSteps.map((id) => ({ id, ...copy.art.steps[id] })),
    },

    ingredients: {
      eyebrow: copy.ingredients.eyebrow,
      title: copy.ingredients.title,
      items: shared.ingredients.map((ing) => ({
        ...ing,
        ...copy.ingredients.items[ing.id],
      })),
    },

    chef: {
      eyebrow: copy.chef.eyebrow,
      name: copy.chef.name,
      role: copy.chef.role,
      philosophy: copy.chef.philosophy,
      paragraphs: copy.chef.paragraphs,
      image: shared.chef.image,
      stats: shared.chef.stats.map((stat) => ({
        ...stat,
        label: copy.chef.stats[stat.id],
      })),
    },

    menu: {
      eyebrow: copy.menu.eyebrow,
      title: copy.menu.title,
      categories: shared.menu.map((category) => ({
        id: category.id,
        label: copy.menu.categories[category.id].label,
        note: copy.menu.categories[category.id].note,
        items: category.items.map((item) => ({
          ...item,
          description: copy.menu.items[item.id],
        })),
      })),
    },

    gallery: {
      eyebrow: copy.gallery.eyebrow,
      title: copy.gallery.title,
      items: shared.gallery.map((item) => ({
        ...item,
        caption: copy.gallery.captions[item.id],
      })),
    },

    reservations: { ...shared.reservations, ...copy.reservations },

    finalCta: copy.finalCta,

    contact: {
      address: shared.contact.address,
      phone: shared.contact.phone,
      whatsapp: shared.contact.whatsapp,
      email: shared.contact.email,
      social: shared.contact.social,
      hours: copy.contact.hours,
      legal: shared.contact.legal.map((entry) => ({
        ...entry,
        label: copy.contact.legal[entry.id],
      })),
    },

    ui: copy.ui,
  };
}

/** Built once per locale, then reused for every request. */
const cache = new Map<Locale, Content>();

export function getContent(locale: Locale): Content {
  const hit = cache.get(locale);
  if (hit) return hit;
  const built = build(dictionaries[locale]);
  cache.set(locale, built);
  return built;
}

/** Fills `{name}` placeholders — used by the few strings that take values. */
export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
