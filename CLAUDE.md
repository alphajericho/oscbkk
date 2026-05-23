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
- **Host:** El Rafa 🇦🇺
- **Curator / music director:** DJ Jordan Adam (real name Danny Bazzi — used in press release)

## Important IDs / URLs

- **Domain:** https://oscbkk.com
- **Ticketing (Megatix):** https://megatix.in.th/events/oscbkk
  - Early Bird tier: `?aid=EARLYBIRD` · GA tier: `?aid=GA`
  - New Jack lounge: `?aid=NEWJACK` · So So Def lounge: `?aid=SOSODEF` (the two base lounge tiers sold direct via Megatix; rest are enquiry-only)
- **Meta Pixel ID:** `1342318294454589`
- **Email:** info@oscbkk.com
- **LINE Official:** `@oldschoolchillbkk` — deep link `https://line.me/R/ti/p/@oldschoolchillbkk`
- **WhatsApp (Aussie virtual):** +61 488 846 198 — deep link `https://wa.me/61488846198`
- **Socials:** IG / FB / TikTok all `@oldschoolchillbkk` · Messenger `m.me/oldschoolchillbkk`

## Tickets

| Tier | Price | Notes |
|---|---|---|
| Early Bird | ฿500 | Pre-sale only, 2 drinks included |
| General Admission | ฿600 | Pre-sale only, 2 drinks included |

## Lounge packages (minimum-spend model)

All packages are a **minimum spend** — order anything from the Aces menu, server tracks the tab.
Beyond the minimum, standard menu pricing.

| Package | Pax | Min Spend (฿) | Type | Notes |
|---|---|---|---|---|
| New Jack | up to 4 | 4,000 | Table | Standing table, ฿4,000 bar credit, dedicated server |
| So So Def | up to 4 | 8,000 | Lounge | ฿8,000 bar credit, VIP Priority Admission |
| Death Row | up to 6 | 14,000 | Lounge | + Thug Passion welcome shots |
| Bad Boy | up to 8 | 18,000 | Premium | + Thug Passion welcome shots |
| Roc-A-Fella ⭐ | up to 10 | 30,000 | VVIP | Escorted entry · host · photo session · bar bites |
| Def Jam ⭐ | up to 18 | 40,000 | Ultra | All of above + Personalised LED banner |

**Menu lives at:** https://acesnightclub.com/menu/ (linked from the Menu modal in the Lounges section)
**T&Cs:** drafted in `<TermsModal>` in `app.jsx` — review before going live (cancellation windows, service charge, etc.)

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
11. `<Contact>` (#contact) — dedicated direct-message hub (LINE · WhatsApp · Messenger · Instagram + email)
12. `<Foot>` — brand, socials, venue, contact
13. `<ChatFloats>` — three stacked floating direct-link bubbles bottom-left (LINE · WhatsApp · Email). No popup card; socials live in the regular links.

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
- Tweaks: accent color · density (compact/standard/spacious) · motion (off/subtle/heavy)

---

## Decisions locked in (don't re-litigate)

- **Sriracha** is the Thai font. Already evaluated alternatives in `Thai Font Picker.html`.
- **Pacifico** stays for script flourishes — paired with Archivo Black, not replaced.
- **No emoji** except country flags in the lineup roster.
- **All copy is bilingual** — every section has Thai under English. Default for new sections too.
- **Lounge packages are named after labels** (New Jack, So So Def, Death Row, Bad Boy, Roc-A-Fella, Def Jam). Don't rename to generic "Silver/Gold/Platinum".
- **Packages are minimum-spend, not all-inclusive.** Don't list bottles/shots/mixers as included unless explicitly in the inclusions array. The server tracks the tab on the night.
- **Venue photos are filtered** (saturate 0.45, hue-rotate -12deg) to cool down Aces' heavy red lighting. Keep the filter.
- **Megatix is the only ticketing platform.** All CTAs route there.

## Open threads / TODO

- [ ] **Legacy CSS cleanup** — `.tables`, `.receipt`, `.lounge`, `.venue__ph` etc. all `display:none`. Safe to delete on a quiet pass.
- [ ] **Press release** — updated May 2026 with new copy (El Rafa, Danny Bazzi credit, audience bullet list, quote callout). Last paragraph completion ("ideal backdrop for a premium R&B and Hip Hop experience") was written by Claude to close the user's truncated paste — confirm or rewrite.
- [ ] **Real set times** — lineup roster says "Set times drop closer to the date"
- [ ] **T&Cs review** — `<TermsModal>` has draft terms (cancellation windows, service charge %, etc.) — confirm with venue/legal before going live.

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
2. **Always bundle the updated files as a single ZIP** for download — the user prefers one zip over individual file cards.
3. User downloads / extracts the zip into their local repo folder, replacing the originals.
4. User commits + pushes via GitHub Desktop.
5. Vercel picks up the push and auto-deploys to oscbkk.com.

When listing changed files, be explicit (path + one-line reason) so the user knows exactly what's in the zip. Don't assume they know git terminology.

## Workflow for handing off to a new chat

1. At end of session, say "update CLAUDE.md" — I'll edit this file with what changed.
2. Open a new chat in the same project — this file loads automatically.
3. New chat gets the recap for free; pick up where you left off.
