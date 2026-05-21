# OSCBKK — Old School & Chill Bangkok

Single-page event site for a '90s/'00s R&B + hip hop night in Bangkok.
Edit this file freely — it's loaded as context at the start of every new chat in this project.

---

## Event facts (single source of truth)

- **Name:** Old School & Chill · Vol. 01
- **Date:** Saturday 20 June 2026 · 22:00 — 03:00
- **Venue:** Aces Nightclub, The Ambassador Hotel, Sukhumvit Soi 11, Bangkok
- **Genre:** Strictly pre-2010 — '90s & '00s R&B and Hip Hop
- **Age:** 20+ (ID at door)
- **DJs:** K9 🇹🇭 · Young G 🇵🇭 · Travellin' Matt 🇹🇭🇺🇸 · Jordan Adam 🇦🇺 · Junior 🇹🇭
- **Host:** MC Rafa 🇦🇺
- **Curator / music director:** DJ Jordan Adam

## Important IDs / URLs

- **Domain:** https://oscbkk.com
- **Ticketing (Megatix):** https://megatix.in.th/events/oscbkk
  - Early Bird tier: `?aid=EARLYBIRD` · GA tier: `?aid=GA`
- **Meta Pixel ID:** `406472183038561`
- **Email:** info@oscbkk.com
- **Socials:** IG / FB / TikTok all `@oldschoolchillbkk` · Messenger `m.me/oldschoolchillbkk`
- **LINE:** pending — handle TBD (marked "Soon" everywhere)

## Tickets

| Tier | Price | Notes |
|---|---|---|
| Early Bird | ฿500 | Pre-sale only, 2 drinks included |
| General Admission | ฿600 | Pre-sale only, 2 drinks included |

## Lounge packages (named after labels)

| Package | Sofa / Pax | Price (฿) | Tier |
|---|---|---|---|
| So So Def | Base / 2–4 | 8,000 | Standard |
| Death Row | Standard / 6–8 | 14,000 | Standard |
| Ruff Ryders | Prime / 8–10 | 20,000 | Premium |
| Bad Boy | VVIP / 10–15 | 40,000 | VVIP ⭐ |
| Roc-A-Fella | Any VVIP / 10–15 | 65,000 | Luxury |
| Def Jam | VVIP / 10–15 | 150,000 | Ultra ⭐ |

---

## File map

- `index.html` — shell, meta tags (OG, Twitter, Meta Pixel), Google Fonts loader, mounts React
- `app.jsx` — entire React app, all sections (~1070 lines)
- `styles.css` — design system + all section styles (~2000 lines)
- `tweaks-panel.jsx` — tweaks UI scaffold
- `Thai Font Picker.html` — separate utility page for picking Thai fonts
- `assets/` — production images: `hero.png`, `poster.png`, `social-1x1.png`, `social-9x16.png`, `venue-1..4.jpg`
- `uploads/` — source material, screenshots, drafts (do not link to from prod)

## Section order (in `app.jsx`)

1. `<Nav>` — sticky, brand + links + socials + Get Tickets CTA
2. `<Hero>` — full-bleed `hero.png` + 4-cell fact strip (When/Where/Sound/Doors) + CTAs. Has `variant` prop (`neon` / `poster` / `minimal`) wired but only image render is used today
3. `<Marquee>` — "Good Music · Good People · Good Vibes" + Thai, animated
4. `<TheNight>` (#night) — intro copy + press release modal trigger + meta card
5. `<Lineup>` (#lineup) — 5 DJs + MC roster + cassette mixtape teaser
6. `<Poster>` (#poster) — IG download (1:1 + 9:16) + share buttons
7. `<Tickets>` (#tickets) — Early Bird + GA tier cards
8. `<Lounges>` (#lounges) — 6 packages + custom enquiry CTA + contact grid
9. `<VenuePhotos>` (#venue) — 4-photo grid (filtered to neutralise Aces' red lighting)
10. `<Rules>` (#rules) — 4 house rules + Dress Code "Grown & Sexy"
11. `<Foot>` — brand, socials, venue, contact
12. `<MessengerBubble>` — floating bottom-left chat launcher

## Design system

**Palette** (CSS vars on `:root` in `styles.css`):
- `--bg` `#0b0814` — deep purple-black
- `--ink` `#f4eedd` — warm off-white
- `--ink-dim` `#9a92b5` — muted lavender
- `--accent` `#ff3d8b` — hot magenta (tweakable; also `#ff6a3d` sunset, `#f3b53b` gold, `#4cc3ff` cyan)
- `--accent-2` `#4cc3ff` — cyan neon
- `--gold` `#f3b53b`

**Type pairing:**
- **Archivo Black** — display / headlines / button labels / data values (uppercase)
- **Pacifico** — script accent for `<em>` inside titles + brand mark ("Old School & Chill")
- **JetBrains Mono** — eyebrows, labels, meta rows (uppercase, wide letter-spacing)
- **Sriracha** — all Thai copy

**Recurring patterns:**
- Section header = big outline number (`section__head .num`) + Archivo Black title with Pacifico `<em>` swap + Sriracha Thai subline
- Bilingual EN/TH everywhere — never ship a section without Thai
- Neon glow via `text-shadow` + `color-mix(in srgb, var(--accent) X%, transparent)`
- SVG grain overlay on body (mix-blend overlay)
- Dashed borders for soft dividers, solid `--line` for section breaks
- Tweaks: accent color · density (compact/standard/spacious) · hero variant · motion (off/subtle/heavy)

---

## Decisions locked in (don't re-litigate)

- **Sriracha** is the Thai font. Already evaluated alternatives in `Thai Font Picker.html`.
- **Pacifico** stays for script flourishes — paired with Archivo Black, not replaced.
- **No emoji** except country flags in the lineup roster.
- **All copy is bilingual** — every section has Thai under English. Default for new sections too.
- **Lounge packages are named after labels** (So So Def → Def Jam). Don't rename to generic "Silver/Gold/Platinum".
- **Venue photos are filtered** (saturate 0.45, hue-rotate -12deg) to cool down Aces' heavy red lighting. Keep the filter.
- **Megatix is the only ticketing platform.** All CTAs route there.

## Open threads / TODO

- [ ] **LINE Official** — handle TBD, "Soon" pills in: Messenger bubble, Lounges contact grid, Footer
- [ ] **Spotify mixtape playlist** — "Coming Soon" in cassette caption + footer; needs a URL
- [ ] **Footer "View on map" link** — currently `href="#"`, needs Google Maps URL for Aces / Ambassador Hotel Soi 11
- [ ] **Hero `variant` prop** — `neon`/`poster`/`minimal` wired in JSX but only image variant renders. Decide: build the other two or remove the tweak.
- [ ] **Legacy CSS cleanup** — `.tables`, `.receipt`, `.lounge`, `.venue__ph` etc. all `display:none`. Safe to delete on a quiet pass.
- [ ] **Press release** — current copy in `<PressBody>` is the draft. Replace when final lands.
- [ ] **Real set times** — lineup roster says "Set times drop closer to the date"

## Don'ts

- Don't introduce a new font family without asking — type system is locked at 4.
- Don't add gradient-heavy hero backgrounds — the brand is photographic, not webby.
- Don't use rounded-corner-with-left-border-accent containers (the AI slop trope).
- Don't draw illustrative SVGs — use real photography or mono-text placeholders.
- Don't add emoji to body copy.
- Don't link to anything in `uploads/` from prod — that's the scratch folder.

---

## Deployment workflow

The live site is on **Vercel**, fed from a **GitHub repo** that the user maintains via **GitHub Desktop** on their local machine. This project workspace is NOT connected to GitHub — files here are just edited copies.

**To ship changes:**
1. At end of session, tell the user exactly which files changed.
2. User downloads / copies those files into their local repo folder, replacing the originals.
3. User commits + pushes via GitHub Desktop.
4. Vercel picks up the push and auto-deploys to oscbkk.com.

When listing changed files, be explicit (path + one-line reason) so the user knows exactly what to drop in. Don't assume they know git terminology.

## Workflow for handing off to a new chat

1. At end of session, say "update CLAUDE.md" — I'll edit this file with what changed.
2. Open a new chat in the same project — this file loads automatically.
3. New chat gets the recap for free; pick up where you left off.
