# Media assets

Drop real files here to replace the built-in cinematic placeholders. **No code
changes are required** — set the matching path in `src/lib/content/shared.ts`
and the `CinematicImage` / `ScrollFrameBackground` components pick it up
automatically. Until a file exists, a labelled placeholder renders in its place,
so the site is always complete and navigable.

Because asset paths live in `shared.ts`, adding a photograph updates the
Portuguese, English and Spanish versions at once.

## The background

The site's background is a **single photograph**, set by `film.image` in
`src/lib/content/shared.ts`. It is fixed behind every section and drifts slowly
as you scroll. Pick a frame that is calm in the middle — every headline on the
site is read on top of it.

It used to be a scrubbed WebP frame sequence driven by video. That was removed:
the technique needs one continuous, high-resolution camera move of 10–20s, and
the available footage was vertical 720p Reels cut every couple of seconds, which
upscaled ~2.7× on desktop and read as a stretched phone video. The photographs
are 1365–2048px, so the still is both sharper and ~8 MB lighter. The old frames
and their source video are in `/archive` if ever needed.

**If you want the moving film back**, shoot it properly:

- **Horizontal**, not vertical. 1080p minimum.
- **15–25 seconds with no cuts** — one continuous move (a slow walk down the
  deck, or a slow pan from the sea to the tables).
- Late afternoon light, not midday — no hard shadows.
- No people in the foreground, no logo, no text.

Then follow the ffmpeg commands in the comment above `film` in `shared.ts`.

## Photography (macro, editorial, campaign-grade)

| Field in `shared.ts`       | Suggested file                     | Used in            |
| -------------------------- | ---------------------------------- | ------------------ |
| `ingredients[].image`      | `sapateira.jpg`, `ostra.jpg`, …    | "Do Mar" strip     |
| `chef.image`               | `cozinha.jpg`                      | Kitchen section    |
| `menu … items[].image`     | `dish-*.jpg`                       | Menu hover preview |
| `gallery[].image`          | `gallery-*.jpg`                    | Gallery            |
| `finalCta.video`           | `closing.mp4`                      | Closing frame      |

### "Do Mar" — the eight-panel strip

A photograph is only attached where the product is unmistakably the subject of
the frame: the caption doubles as the image's alt text, so a loose match would
be a wrong description, not just a weak picture.

| Panel | Status |
| ----- | ------ |
| `sapateira` | `prato-sapateira-recheada.jpg` (Sapateira Recheada) |
| `lagosta`   | `prato-lagosta-grelhada.jpg` (Lagosta Grelhada na Brasa) |
| `camarao`   | `prato-surf-and-turf.jpg` (Camarão Tigre Grelhado) |
| `ostra`     | `prato-marisco-gelo.jpg` (Ostras Frescas) |
| `ameijoa`   | `prato-cataplana.jpg` (Cataplana de Amêijoas) |
| `maguro`    | `prato-atum-tataki.jpg` (Tataki de Atum com Sésamo) |
| `salmao`    | `prato-salmao-sashimi.jpg` (Sashimi de Salmão Fresco) |
| `bacalhau`  | `prato-lombo-bacalhau.jpg` (Lombo de Bacalhau com Broa) |

Each panel is a full-height frame, so shoot or crop with room around the
product. Set the path on the matching entry in `shared.ts` and it applies to
all three languages at once.

Recommended: 2000px on the long edge, WebP/AVIF or high-quality JPG, dark and
high-contrast so images sit naturally against the near-black UI.
