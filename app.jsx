/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSlider, useTweaks */

// ─── TICKETING ──────────────────────────────────────────────
// Live Alpha Eleven ticketing URL. Pasted into every "Get Tickets" /
// "Reserve" / "Book Now" button on the page. One URL for all tiers and
// packages — the buyer picks what they want on the checkout page.
const MEGATIX_URL = "https://tickets.alpha11.co/events/alphaeleven/2414867";

// ─── WAITLIST (Brevo) ──────────────────────────────────────
// The door-ticket waitlist feeds a Brevo contact list ("OSCBKK Waitlist").
// We keep the site's own custom-styled form and POST it into Brevo's
// serve endpoint through a hidden iframe — so visitors never leave the
// page and still get the inline "You're on the list" success state.
//
// WAITLIST_ENDPOINT below is derived from the Brevo embed's iframe URL
// (the /v2/serve/ part becomes /serve/). The email field Brevo expects
// is named EMAIL.
//
// To verify it's live: submit a real email on the site, then check
// Brevo → Contacts → list "OSCBKK Waitlist" — the address should appear.
// If it doesn't, fall back to pasting Brevo's raw HTML embed and we'll
// match the exact field names. Set to "" to run in offline DEMO mode.
const WAITLIST_ENDPOINT = "https://5b489cb7.sibforms.com/serve/MUIFADb7ygpzNtT0RfeJOE5eLLUNy35Ijw0CJOdMYyIfBNzhVGsazqNnYklI5sYlvmU0tHaybERBFVO82RtuGfd4uzBKdymMVFHZJwU_B4xR1ehV10yFxRU7S8tDFIfKkmA6MppHkjrRYy9FEoyd6mcSQV4TbLE3INhDDvN4d9LBpG5bP1cItXTiwoLvpvWqqb5rSdy_52QAw7jz";
// The checkout is one shared page with a quantity stepper per tier and
// package, so every CTA routes to the same URL.
const MEGATIX_URLS = {
  early: MEGATIX_URL,
  ga:    MEGATIX_URL,
  final: MEGATIX_URL,
  door:  MEGATIX_URL,
  table: MEGATIX_URL,
  newjack:  MEGATIX_URL,
  sosodef:  MEGATIX_URL,
};

// Table & booth packages are sold through the same ticketing platform.
// Full inclusions are shown on our own page; the CTA hands off to checkout.
const VENUE_PACKAGES_URL = MEGATIX_URL;

// ─── DIRECT MESSAGING ──────────────────────────────────────
// Every CTA that says "message us" routes through one of these.
// Update here = updates everywhere (nav, floating bubble, lounges,
// dedicated Contact section, footer).
const CONTACT = {
  // LINE: official BUSINESS account add-friend link (Aug 2026). Use the lin.ee
  // short form — it works in-browser and deep-links into the app. Do NOT swap
  // back to line.me/R/ti/p/@id or page.line.me, both 404 for this account.
  line:      "https://lin.ee/qjkaN1d",
  whatsapp:  "https://wa.me/61427155999",
  messenger: "https://m.me/oscbkk",
  instagram: "https://instagram.com/oscbkk",
  email:     "mailto:info@oscbkk.com",
  // Display strings
  whatsappDisplay: "+61 427 155 999",
  igDisplay:       "@oscbkk",
  fbDisplay:       "@oscbkk",
  emailDisplay:    "info@oscbkk.com",
};
// ────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#f3b53b",
  "density": "standard",
  "motion": "subtle"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#f3b53b", // temple gold (Vol. 02 default)
  "#ff3d8b", // hot magenta (Vol. 01)
  "#ff6a3d", // sunset orange
  "#4cc3ff"  // electric cyan
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.motion = t.motion;
  }, [t.accent, t.density, t.motion]);

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <TheNight />
      <Tickets />
      <Lounges />
      <Gallery />
      <Jams />
      <VenuePhotos />
      <Rules />
      <Contact />
      <Foot />

      <ChatFloats />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Accent color">
          <TweakColor
            label="Neon"
            value={t.accent}
            options={ACCENT_OPTIONS}
            onChange={v => setTweak("accent", v)}
          />
        </TweakSection>

        <TweakSection title="Layout density">
          <TweakRadio
            label="Spacing"
            value={t.density}
            options={[
              { value: "compact", label: "Compact" },
              { value: "standard", label: "Standard" },
              { value: "spacious", label: "Spacious" },
            ]}
            onChange={v => setTweak("density", v)}
          />
        </TweakSection>

        <TweakSection title="Motion">
          <TweakRadio
            label="Intensity"
            value={t.motion}
            options={[
              { value: "off", label: "Off" },
              { value: "subtle", label: "Subtle" },
              { value: "heavy", label: "Heavy" },
            ]}
            onChange={v => setTweak("motion", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

/* ===================== FLOATING CHAT ===================== */
// Three stacked circular buttons, bottom-left. One tap = straight to chat.
// LINE / WhatsApp / Instagram — no popup, no Messenger.
const ChatIcon = {
  line: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  messenger: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 6.5h18v11H3z"/>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3.5 7l8.5 6.5L20.5 7"/>
    </svg>
  ),
};

function ChatFloats() {
  const floats = [
    { k: "LINE",     icon: ChatIcon.line,     href: CONTACT.line,     cls: "chat-float--line"     },
    { k: "WhatsApp", icon: ChatIcon.whatsapp, href: CONTACT.whatsapp, cls: "chat-float--whatsapp" },
    { k: "Email",    icon: ChatIcon.email,    href: CONTACT.email,    cls: "chat-float--email"    },
  ];
  return (
    <div className="chat-floats" role="complementary" aria-label="Quick contact">
      {floats.map(f => (
        <a
          key={f.k}
          href={f.href}
          target={f.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={f.href.startsWith("mailto:") ? undefined : "noopener"}
          className={`chat-float ${f.cls}`}
          aria-label={`Contact us via ${f.k}`}
        >
          <span className="chat-float__icon">{f.icon}</span>
          <span className="chat-float__label">{f.k}</span>
        </a>
      ))}
    </div>
  );
}

/* ===================== NAV ===================== */
const NAV_LINKS = [
  ["#night", "Next Event"],
  ["#lounges", "Bookings"],
  ["gallery.html", "Gallery"],
  ["#jams", "OSC Radio"],
  ["#venue", "Venue"],
  ["#rules", "Rules"],
  ["#contact", "Contact"],
];
function Nav() {
  const [open, setOpen] = React.useState(false);
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <nav className="nav">
      <a className="nav__brand" href="#top">
        <img className="nav__logo" src="assets/OSC-logo-nav.png" alt="Old School &amp; Chill" />
        <span className="sub">First Saturday Monthly</span>
      </a>
      <div className="nav__links">
        {NAV_LINKS.map(([href, label]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </div>
      <div className="nav__end">
      <div className={"nav__burger" + (open ? " is-open" : "")} ref={wrapRef}>
        <button type="button" className="nav__burger-btn" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(v => !v)}>
          <span className="nav__menu-bars" aria-hidden="true"><i></i><i></i><i></i></span>
        </button>
        <div className="nav__panel" role="menu" hidden={!open}>
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} role="menuitem" onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      </div>
      <div className="nav__socials" aria-label="Follow us">
        <a className="nav__social" href="https://instagram.com/oscbkk" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a className="nav__social" href="https://facebook.com/oscbkk" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5H16.5V4.3a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4v2.3H7.5v3h2.6V21h3.4z" />
          </svg>
        </a>
        <a className="nav__social" href="https://youtube.com/@alpha11co" target="_blank" rel="noopener" aria-label="YouTube">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.28 5 12 5 12 5s-6.28 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.75 1.77C5.72 19 12 19 12 19s6.28 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
          </svg>
        </a>
        <a className="nav__social" href="https://tiktok.com/@oscbkk" target="_blank" rel="noopener" aria-label="TikTok">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 3h-2.6v12.1c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1-2.8 0-5.1 2.3-5.1 5.1S8.6 20.1 11.4 20.1s5.1-2.3 5.1-5.1V9.4c1 .7 2.2 1.1 3.5 1.1V7.9c-1.9 0-3.5-1.6-3.5-3.5V3z" />
          </svg>
        </a>
      </div>
      <a className="nav__cta" href={MEGATIX_URL} target="_blank" rel="noopener">Tickets</a>
      </div>
    </nav>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  return (
    <header className="hero hero--art">
      <div className="hero__frame">
        <img className="hero__photo" src="assets/hero-header-oct.jpg" alt="Old School & Chill Bangkok — Saturday 3 October" />
        <div className="hero__scrim" aria-hidden="true"></div>
      </div>

      <div className="hero__cta">
        <a className="hero__btn hero__btn--primary" href={MEGATIX_URL} target="_blank" rel="noopener">Get Tickets</a>
        <a className="hero__btn hero__btn--ghost" href="#night">Next Event</a>
      </div>
    </header>
  );
}

/* ===================== MARQUEE ===================== */
function Marquee() {
  const items = [
    { en: "Good Music", th: "เพลงดี" },
    { en: "Good People", th: "คนดี" },
    { en: "Good Vibes", th: "บรรยากาศดี" },
    { en: "Good Music", th: "เพลงดี" },
    { en: "Strictly Pre-2010", th: "ก่อนปี 2010" },
  ];
  // duplicate for seamless loop
  const loop = [...items, ...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {loop.map((it, i) => (
          <span className="marquee__item" key={i}>
            <span className={i % 2 ? "alt" : ""}>{it.en}</span>
            <span className="star">✦</span>
            <span className="thai" style={{ color: "var(--ink-dim)", fontSize: "0.6em", letterSpacing: "0.1em" }}>{it.th}</span>
            <span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ===================== THE EVENT ===================== */
function TheNight() {
  return (
    <section className="section" id="night">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">Next <em>Event</em></div>
            <div className="thai">งานต่อไป · รายละเอียดคืนนี้</div>
          </div>
        </div>

        <div className="ne">
          <div className="ne__main">
            <p className="ne__lede">
              Another dose of '90s &amp; 2000s R&amp;B and Hip Hop in Bangkok.
            </p>
            <p className="ne__body">
              Bangkok's old-school night returns on <strong>Saturday 3 October</strong>.
              The focus stays on timeless R&amp;B — the singalong records everyone knows by heart —
              with Hip Hop in the mix as the party starter between the big moments.
              Strictly '90s and '00s, nothing after 2010.
            </p>
            <p className="ne__thai">
              คืนเพลงเก่าที่จริงจังเรื่องเพลง · เพลงยุค 90s–2000s ตลอดคืน ที่ Aces Nightclub สุขุมวิท ซอย 11
            </p>

            <div className="ne__table">
              <div className="row">
                <span className="k">When</span>
                <span className="v">Sat 3 October · 22:00 — 03:00</span>
              </div>
              <div className="row">
                <span className="k">Where</span>
                <span className="v">
                  Aces Nightclub
                  <small>ดิ แอมบาสเดอร์ · สุขุมวิท ซอย 11</small>
                </span>
              </div>
              <div className="row">
                <span className="k">Music</span>
                <span className="v">
                  Strictly pre-2010
                  <small>'90s &amp; '00s R&amp;B and Hip Hop · nothing after 2010</small>
                </span>
              </div>
              <div className="row">
                <span className="k">Guests</span>
                <span className="v">
                  DJ Tara · MC Timmy
                  <small>แขกรับเชิญพิเศษ</small>
                </span>
              </div>
              <div className="row">
                <span className="k">Residents</span>
                <span className="v">
                  Jordan Adam · Young G
                  <small>เปิดเพลงยุค 90s–2000s ตลอดคืน</small>
                </span>
              </div>
              <div className="row">
                <span className="k">Host</span>
                <span className="v">MC Timmy</span>
              </div>
              <div className="row">
                <span className="k">Age</span>
                <span className="v">
                  20+ · ID at door
                  <small>อายุ 20 ปีขึ้นไป · กรุณาแสดงบัตรประชาชน</small>
                </span>
              </div>
              <div className="row">
                <span className="k">Curated by</span>
                <span className="v">Alpha Eleven Asia<small>events &amp; music curation</small></span>
              </div>
            </div>

            <div className="ne__actions">
              <a className="intro__btn" href={MEGATIX_URL} target="_blank" rel="noopener">Book Now ↗</a>
              <a className="ne__link" href="#lounges">Table &amp; booth bookings</a>
            </div>
          </div>

          <aside className="ne__art">
            <div className="ne__frame">
              <img className="ne__poster" src="assets/poster.png" alt="Old School & Chill — Bangkok · 3 October 2026 — official poster" />
            </div>
            <div className="ne__share">
              <span className="ne__share-k">Share</span>
              <div className="ne__share-row">
                <a className="poster-section__share-btn" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foscbkk.com" target="_blank" rel="noopener">Facebook</a>
                <button className="poster-section__share-btn poster-section__share-btn--copy" onClick={(e) => {
                  navigator.clipboard?.writeText('https://oscbkk.com').then(() => {
                    const b = e.currentTarget;
                    const orig = b.textContent;
                    b.textContent = 'Copied ✓';
                    setTimeout(() => { b.textContent = orig; }, 1600);
                  });
                }}>Copy link</button>
              </div>
              <a className="ne__rsvp" href="https://www.facebook.com/events/2473054509847949" target="_blank" rel="noopener">RSVP on Facebook ↗</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ===================== OUR FAVE JAMS ===================== */
function Jams() {
  return (
    <section className="section jams" id="jams">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">OSC Radio · <em>Our Flavour</em></div>
            <div className="thai">เพลย์ลิสต์ของเรา · เพลงที่เราเปิดจริง</div>
          </div>
        </div>

        <div className="jams__body">
          <div className="jams__copy">
            <p className="jams__lede">
              Want a taste of what you will hear at Old School &amp; Chill — here is a selection
              of some of our flavour.
            </p>
            <p className="jams__thai">ฟังก่อนมางาน · เพลงยุค 90s–2000s ที่เราเปิดในคืนนั้น</p>
            <a className="jams__link" href="https://open.spotify.com/playlist/7hv2tt8L8e32X6FyRGLZwd" target="_blank" rel="noopener">Open in Spotify ↗</a>
          </div>
          <div className="jams__embed">
            <iframe
              title="Old School &amp; Chill — Spotify playlist"
              src="https://open.spotify.com/embed/playlist/7hv2tt8L8e32X6FyRGLZwd?utm_source=generator"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== TICKETS ===================== */
function Tickets() {
  const tiers = [
    {
      key: "early",
      name: "Early Bird", thai: "บัตรล่วงหน้า",
      bar: "TIER 01 / LIMITED",
      price: "500",
      light: true,
      perks: [
        "General Admission entry",
        "Guaranteed entry · pre-sale only",
        "Ticket includes one drink",
        "Limited numbers · first come, first served",
      ],
    },
    {
      key: "ga",
      name: "General Admission", thai: "บัตรทั่วไป",
      bar: "TIER 02 / GENERAL",
      price: "600",
      dark: true,
      perks: [
        "General Admission entry",
        "Guaranteed entry · pre-sale only",
        "Ticket includes one drink",
        "Limited numbers · advance only",
      ],
    },
    {
      key: "final",
      name: "Final Release", thai: "รอบสุดท้าย",
      bar: "TIER 03 / FINAL",
      price: "700",
      featured: true,
      dark: true,
      perks: [
        "General Admission entry",
        "Guaranteed entry · pre-sale only",
        "Ticket includes one drink",
        "Limited numbers · advance only",
      ],
    },
  ];

  return (
    <section className="section" id="tickets">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title"><em>Tickets</em></div>
            <div className="thai">บัตรเข้างาน · 3 ระดับ</div>
          </div>
        </div>

        <div className="tickets">
          {tiers.map((tk, i) => (
            <article key={i} className={`ticket ${tk.featured ? "ticket--featured" : ""} ${tk.light ? "ticket--light" : ""} ${tk.dark ? "ticket--dark" : ""} ${tk.soldOut ? "ticket--soldout" : ""} ${tk.locked ? "ticket--locked" : ""}`}>
              {tk.soldOut && (
                <div className="ticket__soldout-ribbon" aria-hidden="true">
                  <span>Sold Out</span>
                </div>
              )}
              {tk.locked && (
                <div className="ticket__soldout-ribbon ticket__soldout-ribbon--soon" aria-hidden="true">
                  <span>Next Release</span>
                </div>
              )}
              <div className="ticket__top">
                <div className="ticket__name">
                  {tk.name}
                  <small>{tk.thai}</small>
                </div>
                <div className="ticket__bar">
                  {tk.bar}
                </div>
              </div>
              <div className="ticket__price">
                <span className="amt">฿{tk.price}</span>
                <span className="cur">THB / per person</span>
              </div>
              <ul className="ticket__perks">
                {tk.perks.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
              {tk.soldOut ? (
                <span className="ticket__cta ticket__cta--disabled" aria-disabled="true">Sold Out · บัตรหมดแล้ว</span>
              ) : tk.locked ? (
                <span className="ticket__cta ticket__cta--disabled" aria-disabled="true">Not on sale yet · ยังไม่เปิดขาย</span>
              ) : (
                <a className="ticket__cta" href={MEGATIX_URLS[tk.key] || MEGATIX_URL} target="_blank" rel="noopener">Book Now</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== WAITLIST + DOOR NOTE ===================== */
function Waitlist() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("idle"); // idle | sending | ok | error
  const submittedRef = React.useRef(false);

  function onSubmit(e) {
    const value = email.trim();
    if (!value || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      e.preventDefault();
      setStatus("error");
      return;
    }
    // DEMO mode — no endpoint configured: don't actually navigate/post.
    if (!WAITLIST_ENDPOINT) {
      e.preventDefault();
      setStatus("sending");
      setTimeout(() => setStatus("ok"), 500);
      return;
    }
    // Live: let the native POST flow into the hidden Brevo iframe.
    // We flip to success when that iframe reports back (onLoad).
    submittedRef.current = true;
    setStatus("sending");
  }

  function onSinkLoad() {
    // The hidden iframe fires load once on mount (about:blank) — ignore
    // until a real submission has happened.
    if (submittedRef.current) {
      submittedRef.current = false;
      setStatus("ok");
    }
  }

  return (
    <div className="waitlist" id="waitlist">
      <div className="waitlist__door">
        <span className="waitlist__door-k">Door Tickets</span>
        <p className="waitlist__door-en">
          We cannot guarantee there will be any door tickets available. We will
          announce any availability in the days leading up to the event.
          <strong> Waitlist receives priority access.</strong>
        </p>
        <p className="waitlist__door-th">
          ไม่รับประกันว่าจะมีบัตรหน้างาน · หากมีจะประกาศในช่วงไม่กี่วันก่อนงาน · ผู้ที่ลงชื่อในลิสต์รอจะได้สิทธิ์ก่อน
        </p>
      </div>

      <div className="waitlist__form-wrap">
        {status === "ok" ? (
          <div className="waitlist__success" role="status">
            <span className="waitlist__success-mark" aria-hidden="true">✓</span>
            <div>
              <strong>You're on the list.</strong>
              <span>We'll email you first if door tickets open up. · คุณอยู่ในลิสต์รอแล้ว</span>
            </div>
          </div>
        ) : (
          <form
            className="waitlist__form"
            onSubmit={onSubmit}
            action={WAITLIST_ENDPOINT || undefined}
            method="POST"
            target="oscbkk_waitlist_sink"
            noValidate
          >
            <label className="waitlist__label" htmlFor="waitlist-email">
              Join the waitlist
              <small>ลงชื่อรอบัตรหน้างาน · รับสิทธิ์ก่อนใคร</small>
            </label>
            <div className="waitlist__row">
              <input
                id="waitlist-email"
                name="EMAIL"
                className={`waitlist__input ${status === "error" ? "waitlist__input--error" : ""}`}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                aria-invalid={status === "error"}
                required
              />
              <button className="waitlist__btn" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Adding…" : "Notify me"}
              </button>
            </div>
            {/* Brevo honeypot + locale (hidden) */}
            <input type="text" name="email_address_check" defaultValue="" tabIndex="-1" autoComplete="off" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }} aria-hidden="true" />
            <input type="hidden" name="locale" value="en" />
            {status === "error" && (
              <span className="waitlist__hint">Please enter a valid email address. · กรุณากรอกอีเมลให้ถูกต้อง</span>
            )}
          </form>
        )}
      </div>

      {/* Hidden sink so the Brevo POST never navigates the page away */}
      <iframe name="oscbkk_waitlist_sink" title="" onLoad={onSinkLoad} style={{ display: "none" }} aria-hidden="true"></iframe>
    </div>
  );
}

/* ===================== LOUNGES (minimum-spend packages) ===================== */
function Lounges() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [termsOpen, setTermsOpen] = React.useState(false);

  // Table & booth packages — OSC label names over the venue's tiers.
  // Every one is a minimum spend on the Aces menu and includes VIP entry
  // for the whole group. Sold through the ticketing platform, same as tickets.
  const packages = [
    {
      key: "newjack", label: "New Jack", sub: "Standing Table", venue: "Standing Table",
      pax: "Max 4", price: "5,000", priceLabel: "THB / min spend",
      accent: "#ff3d8b", entry: true,
      incl: ["฿5,000 menu spend", "Reserved standing table", "VIP entry × 4"],
    },
    {
      key: "sosodef", label: "So So Def", sub: "Reserved Booth", venue: "Reserved Booth",
      pax: "Max 6", price: "10,000", priceLabel: "THB / min spend",
      accent: "#4cc3ff", entry: true,
      incl: ["฿10,000 menu spend", "Reserved area all night", "VIP entry × 6", "VIP host"],
    },
    {
      key: "badboy", label: "Bad Boy", sub: "Reserved Booth", venue: "Reserved Booth",
      pax: "Max 8", price: "15,000", priceLabel: "THB / min spend",
      accent: "#f3b53b", entry: true,
      incl: ["฿15,000 menu spend", "Reserved area", "VIP entry × 8", "VIP host"],
    },
    {
      key: "rocafella", label: "Roc-A-Fella", sub: "VVIP Booth", venue: "VVIP Reserved Booth",
      pax: "Max 12", price: "20,000", priceLabel: "THB / min spend",
      accent: "#f3b53b", entry: true, featured: true,
      incl: ["฿20,000 menu spend", "VVIP reserved area", "VIP entry × 12", "VIP host"],
    },
    {
      key: "defjam", label: "Def Jam", sub: "VVIP Booth", venue: "VVIP Reserved Booth",
      pax: "Max 20", price: "45,000", priceLabel: "THB / min spend",
      accent: "#4cc3ff", entry: true, featured: true,
      incl: ["฿45,000 menu spend", "VVIP reserved area", "VIP entry × 20", "VIP host", "Catwalk dance floor", "LED screen"],
    },
  ];

  return (
    <section className="section" id="lounges">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">Table &amp; Booth <em>Bookings</em></div>
            <div className="thai">จองโต๊ะ · บูธ · งานปาร์ตี้</div>
          </div>
        </div>

        <div className="pkgs__intro">
          <p className="pkgs__lede">
            Reserve your own area for the night. Each package is held exclusively for your group
            and includes VIP priority entry for everyone on the booking.
          </p>
          <p className="pkgs__lede">
            All packages carry a minimum spend, redeemable against food and drinks from our venue menu.
          </p>
          <p className="pkgs__lede">
            Each package has a maximum guest capacity, shown on the package. Guests beyond that
            number are subject to standard entry.
          </p>
          <p className="pkgs__lede">
            Custom packages available on request. Book via our ticketing platform.
          </p>
          <p className="pkgs__thai">จองพื้นที่ส่วนตัวสำหรับกลุ่มของคุณ · รวมบัตรเข้างาน VIP สำหรับทุกคนในกลุ่ม · ทุกแพ็กเกจมียอดใช้จ่ายขั้นต่ำที่ใช้กับอาหารและเครื่องดื่มจากเมนูของเรา</p>
          <div className="pkgs__intro-links">
            <button type="button" className="pkgs__link" onClick={() => setMenuOpen(true)}>View the menu</button>
            <button type="button" className="pkgs__link" onClick={() => setTermsOpen(true)}>Terms &amp; conditions</button>
          </div>
        </div>

        <div className="pkgs">
          {packages.map((p) => (
            <article
              key={p.key}
              className={`pkg ${p.featured ? "pkg--featured" : ""} ${p.soldOut ? "pkg--soldout" : ""}`}
              style={{ "--pkg-accent": p.accent }}
            >
              <div className="pkg__top">
                <div className="pkg__id">
                  <div className="pkg__venue">{p.venue}</div>
                  <h3 className="pkg__label">
                    {p.label} <span className="pkg__sub">{p.sub}</span>
                  </h3>
                  <div className="pkg__tags">
                    <span className="pkg__tag">{p.pax} guests</span>
                    <span className={`pkg__tag ${p.entry ? "is-yes" : "is-no"}`}>
                      {p.entry ? "VIP entry included" : "No entry tickets"}
                    </span>
                  </div>
                </div>
                <div className="pkg__money">
                  <div className="pkg__price"><span className="cur">฿</span>{p.price}</div>
                  <div className="pkg__min">{p.priceLabel}</div>
                </div>
              </div>

              {p.note && <p className="pkg__note">{p.note}</p>}

              {p.incl && (
                <ul className="pkg__incl">
                  {p.incl.map((line, li) => <li key={li}>{line}</li>)}
                </ul>
              )}

              {p.options && (
                <div className="pkg__opts">
                  {p.options.map((opt, oi) => (
                    <div key={oi} className="pkg__opt">
                      <div className="pkg__opt-k">Option {oi === 0 ? "A" : "B"}</div>
                      <ul>{opt.map((line, li) => <li key={li}>{line}</li>)}</ul>
                    </div>
                  ))}
                </div>
              )}

              {p.soldOut ? (
                <span className="pkg__cta pkg__cta--disabled" aria-disabled="true">Sold Out · บัตรหมดแล้ว</span>
              ) : (
                <a className="pkg__cta" href={VENUE_PACKAGES_URL} target="_blank" rel="noopener">
                  Book Now
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="pkgs__foot">
          <a className="pkgs__all" href={VENUE_PACKAGES_URL} target="_blank" rel="noopener">See all packages &amp; book ↗</a>
          <button className="pkgs__menu" onClick={() => setMenuOpen(true)}>View the menu</button>
        </div>

        <div className="bookings" id="lounges-contact">
          <div className="bookings__copy">
            <p className="bookings__kicker">Reserve ahead</p>
            <h3 className="bookings__title">Customise Your <em>Party Package</em></h3>
            <p className="bookings__body">
              Whatever your group size or budget, tell us what you need and we'll build a package
              around it. Birthdays, work functions, bucks and hens, or a big night out with mates.
            </p>
            <p className="bookings__thai">จัดแพ็กเกจปาร์ตี้ตามที่คุณต้องการ · ไม่ว่างบเท่าไหร่หรือกลุ่มใหญ่แค่ไหน</p>
            <p className="bookings__contactline">Get in touch and we'll put something together.</p>
          </div>

          <div className="bookings__grid">
            <a className="bookings__card bookings__card--line" href={CONTACT.line} target="_blank" rel="noopener">
              <span className="k">LINE</span>
              <img className="bookings__card-linebtn" src="https://scdn.line-apps.com/n/line_add_friends/btn/en.png" alt="Add friend on LINE" height="36" />
            </a>
            <a className="bookings__card bookings__card--whatsapp" href={CONTACT.whatsapp} target="_blank" rel="noopener">
              <span className="k">WhatsApp</span>
              <span className="v">{CONTACT.whatsappDisplay}</span>
            </a>
            <a className="bookings__card" href={CONTACT.messenger} target="_blank" rel="noopener">
              <span className="k">Messenger</span>
              <span className="v">{CONTACT.fbDisplay}</span>
            </a>
            <a className="bookings__card" href={CONTACT.email}>
              <span className="k">Email</span>
              <span className="v">info@oscbkk.com</span>
            </a>
          </div>
        </div>
      </div>

      {menuOpen && <MenuModal onClose={() => setMenuOpen(false)} />}
      {termsOpen && <TermsModal onClose={() => setTermsOpen(false)} />}
    </section>
  );
}
/* Reusable modal shell (Menu / Terms) */
function Modal({ kicker, title, sub, onClose, children, footer }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__sheet" onClick={(e) => e.stopPropagation()}>
        <header className="modal__head">
          <div>
            {kicker && <div className="modal__kicker">{kicker}</div>}
            <h2 className="modal__title">{title}</h2>
            {sub && <div className="modal__sub">{sub}</div>}
          </div>
          <button className="modal__x" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

function MenuModal({ onClose }) {
  return (
    <Modal
      kicker="Drinks &amp; Food · Aces Nightclub"
      title={<>The <em>Menu</em></>}
      sub="Anything on the menu counts toward your minimum spend"
      onClose={onClose}
      footer={<>
        <button className="modal__btn modal__btn--ghost" onClick={onClose}>Close</button>
        <a className="modal__btn modal__btn--primary" href="https://acesnightclub.com/menu/" target="_blank" rel="noopener">View full menu ↗</a>
      </>}
    >
      <p className="modal__lede">
        Order anything on the Aces menu — bottles, cocktails, champagne, beer, bar bites — and
        your server keeps a running tab as you go. Once you've reached your minimum spend,
        they'll let you know. Beyond that, standard menu pricing applies.
      </p>
      <p className="modal__thai">
        สั่งได้ทุกอย่างจากเมนูของ Aces · เซิร์ฟเวอร์จะแจ้งเมื่อยอดถึงขั้นต่ำ
      </p>

      <div className="modal__menucats">
        <div className="modal__menucat">
          <span className="modal__menucat-k">Spirits</span>
          <span className="modal__menucat-v">Whisky · Tequila · Vodka · Cognac · Gin · Rum</span>
        </div>
        <div className="modal__menucat">
          <span className="modal__menucat-k">Champagne &amp; Sparkling</span>
          <span className="modal__menucat-v">Moët · Chandon · Dom Pérignon · Armand de Brignac</span>
        </div>
        <div className="modal__menucat">
          <span className="modal__menucat-k">Cocktails</span>
          <span className="modal__menucat-v">House cocktails · including the OSC Thug Passion</span>
        </div>
        <div className="modal__menucat">
          <span className="modal__menucat-k">Beer &amp; More</span>
          <span className="modal__menucat-v">Beer · ciders · seltzers · soft drinks</span>
        </div>
        <div className="modal__menucat">
          <span className="modal__menucat-k">Bar Bites</span>
          <span className="modal__menucat-v">Wings · sliders · satay · fries · snacks</span>
        </div>
      </div>

      <p className="modal__note">
        <em>Pricing &amp; availability set by Aces Nightclub.</em> Full menu, current pricing
        and any seasonal specials live on the venue site — tap below to view it in full.
      </p>
    </Modal>
  );
}

function TermsModal({ onClose }) {
  return (
    <Modal
      kicker="Lounge &amp; Table Reservations"
      title={<>Terms &amp; <em>Conditions</em></>}
      sub="Old School &amp; Chill · 3 October 2026"
      onClose={onClose}
      footer={<>
        <a className="modal__btn modal__btn--ghost" href="mailto:info@oscbkk.com?subject=Lounge%20Booking%20%E2%80%94%20Question">Question? Email us</a>
        <button className="modal__btn modal__btn--primary" onClick={onClose}>Got it</button>
      </>}
    >
      <h3 className="modal__h">Reservations &amp; Payment</h3>
      <ul className="modal__ul">
        <li>Reservations are confirmed upon receipt of the full minimum spend, paid in advance via bank transfer or QR.</li>
        <li>Your minimum spend covers anything from the Aces drinks &amp; food menu — bottles, cocktails, champagne, beer, bar bites.</li>
        <li>Your server keeps a running tab on the night and will let you know once you've reached your minimum. Beyond that, standard menu pricing applies.</li>
        <li>Minimum spend is not a deposit or a cover charge and is not refundable if unspent.</li>
        <li>Each package has a maximum guest capacity, shown on the package. Guests beyond that number are subject to standard entry.</li>
      </ul>

      <h3 className="modal__h">Service Charge &amp; Tax</h3>
      <ul className="modal__ul">
        <li>10% service charge and 7% VAT apply to all consumption, as standard for the venue.</li>
      </ul>

      <h3 className="modal__h">Cancellations &amp; Changes</h3>
      <ul className="modal__ul">
        <li>Full refund or credit transfer up to <strong>14 days</strong> before the event.</li>
        <li><strong>50% refund</strong> or full credit transfer between 7 and 14 days before.</li>
        <li>No refunds within 7 days of the event. Credit transfer to a future Old School &amp; Chill event possible, subject to availability.</li>
        <li>Applies to all pre-paid reservations, including those purchased online and enquiry-confirmed packages.</li>
      </ul>

      <h3 className="modal__h">Arrival</h3>
      <ul className="modal__ul">
        <li>Lounges and tables are held for 60 minutes past our opening time only, which is 10pm. After that the spot may be released.</li>
        <li>Running late? Drop us a message — we'll do our best to hold it for you.</li>
      </ul>

      <h3 className="modal__h">Entry &amp; Conduct</h3>
      <ul className="modal__ul">
        <li>All guests must be 20+ with valid ID — Thai ID card or passport.</li>
        <li>House dress code applies (see "House Rules" on the main page).</li>
        <li>Door staff and venue management reserve the right to refuse entry.</li>
        <li>No outside food, drinks or unauthorised promotional materials.</li>
        <li>No drugs, no weapons, no exceptions.</li>
      </ul>

      <p className="modal__note">
        By making a reservation you agree to these terms. Questions before booking?
        Message us at <a href="mailto:info@oscbkk.com">info@oscbkk.com</a> or via the chat
        bubble in the corner of this page.
      </p>
    </Modal>
  );
}

/* ===================== VENUE PHOTOS ===================== */
function VenuePhotos() {
  const slots = [
    { id: 1, label: "Main room · birdcage", src: "assets/venue-1.jpg", aspect: "wide" },
    { id: 2, label: "Lounge banquettes", src: "assets/venue-2.jpg", aspect: "tall" },
    { id: 3, label: "Mezzanine bar", src: "assets/venue-3.jpg", aspect: "square" },
    { id: 4, label: "Mirror room · the bar", src: "assets/venue-4.jpg", aspect: "wide" },
  ];
  return (
    <section className="section venue" id="venue">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">Our <em>Venue</em></div>
            <div className="thai">บรรยากาศในร้าน · เอซ ไนต์คลับ</div>
          </div>
        </div>

        <p className="venue__lede">
          <strong>Aces Nightclub</strong> · at the Ambassador Hotel,
          Sukhumvit Soi 11 — in the heart of Bangkok's lower Sukhumvit nightlife.
          Velvet booths, mirror walls, the floor itself. Show up dressed.
        </p>

        <div className="venue__grid">
          {slots.map(s => (
            <figure key={s.id} className={`venue__cell venue__cell--${s.aspect}`}>
              <img className="venue__img" src={s.src} alt={s.label} />
              <span className="venue__cap-tag">{String(s.id).padStart(2, "0")}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== RECAP =====================
   Front-page teaser for the MOST RECENT edition only: a handful of photos, the
   recap video, and a link through to the full archive on gallery.html.
   Everything comes from window.OSC_EDITIONS (editions.js) — the newest entry is
   first, so this section updates itself when a new edition is added there. */
const TEASER_COUNT = 6;

function Gallery() {
  const eds = window.OSC_EDITIONS || [];
  const ed = eds[0];
  const [open, setOpen] = React.useState(null);
  if (!ed) return null;
  const shots = editionShots(ed);
  const teaser = shots.slice(0, TEASER_COUNT);

  return (
    <section className="section recap" id="gallery">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">Last Month · <em>5 September 2026</em></div>
            <div className="thai">ภาพและวิดีโอจากคืนที่ผ่านมา</div>
          </div>
        </div>

        <div className="recap__body">
          <div className="recap__left">
            <span className="recap__eyebrow">{ed.date}</span>
            {ed.blurb && <p className="recap__blurb">{ed.blurb}</p>}
            {ed.blurbTh && <p className="recap__blurb-th">{ed.blurbTh}</p>}

            <div className="recap__grid">
              {teaser.map((s, i) => (
                <button key={s.n} type="button" className="recap__cell" onClick={() => setOpen(i)} aria-label={`Open photo ${s.n}`}>
                  <img className="recap__img" src={s.src} alt={s.alt} loading="lazy" />
                </button>
              ))}
            </div>

            <div className="recap__actions">
              <a className="recap__all" href={`gallery.html#${ed.slug}`}>See More ↗</a>
              <a className="recap__all recap__all--alt" href="gallery.html">Other Galleries ↗</a>
            </div>
          </div>

          <div className="recap__right">
            {ed.video ? (
              <div className="recap__video">
                <iframe
                  src={ed.video}
                  title={`${ed.label} recap video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            ) : (
              <div className="recap__video recap__video--empty">
                <span className="recap__play" aria-hidden="true">▶</span>
                <span className="recap__video-k">Recap Video</span>
                <p className="recap__video-note">Dropping soon · เร็ว ๆ นี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {open !== null && (
        <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </section>
  );
}

/* ===================== RULES ===================== */
function Rules() {
  const rules = [
    { i: "01", en: "20+ only — bring valid ID", th: "อายุ 20 ปีขึ้นไป · พกบัตรประชาชนหรือพาสปอร์ต" },
    { i: "02", en: "Respect everyone. No exceptions.", th: "ให้เกียรติทุกคน ไม่มีข้อยกเว้น" },
    { i: "03", en: "Door staff word is final", th: "การตัดสินของพนักงานหน้าประตูถือเป็นที่สุด" },
    { i: "04", en: "Lost & found at the coat check", th: "ของหายแจ้งที่จุดฝากเสื้อ" },
  ];

  return (
    <section className="section" id="rules">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">House <em>Rules</em></div>
            <div className="thai">กฎของบ้าน · แต่งตัวยังไงดี</div>
          </div>
        </div>

        <div className="rules">
          <ul className="rules__list">
            {rules.map((r, i) => (
              <li key={i}>
                <div className="icon">{r.i}</div>
                <div className="body">
                  <div className="en">{r.en}</div>
                  <div className="th">{r.th}</div>
                </div>
              </li>
            ))}
          </ul>

          <div className="dresscode">
            <h3>
              Dress Code: Grown &amp; Sexy
              <small>ชุดผู้ใหญ่ ดูดี ไม่ต้องหรูเกินเหตุ</small>
            </h3>
            <div className="dresscode__grid">
              <div className="dresscode__col">
                <h4 className="yes">✓ Yes / ใส่ได้</h4>
                <ul>
                  <li>Smart casual, vintage tees</li>
                  <li>Sneakers (clean ones)</li>
                  <li>Throwback fits — Jordans, jerseys, denim</li>
                  <li>Dress shorts</li>
                  <li>Dress to be remembered</li>
                </ul>
              </div>
              <div className="dresscode__col">
                <h4 className="no">✕ No / ห้าม</h4>
                <ul>
                  <li>No beach wear</li>
                  <li>Flip-flops, slides, beach shorts</li>
                  <li>Tank tops on the boys</li>
                  <li>Sports shorts &amp; gym wear</li>
                  <li>Anything you wore to work this morning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== CONTACT ===================== */
function Contact() {
  const channels = [
    {
      k: "WhatsApp",
      v: CONTACT.whatsappDisplay,
      href: CONTACT.whatsapp,
      cls: "contact__card--whatsapp",
      icon: ChatIcon.whatsapp,
    },
    {
      k: "Messenger",
      v: CONTACT.fbDisplay,
      href: CONTACT.messenger,
      cls: "contact__card--messenger",
      icon: ChatIcon.messenger,
    },
    {
      k: "Instagram DM",
      v: CONTACT.igDisplay,
      href: CONTACT.instagram,
      cls: "contact__card--ig",
      icon: ChatIcon.instagram,
    },
    {
      k: "Email",
      v: CONTACT.emailDisplay,
      href: CONTACT.email,
      cls: "contact__card--email",
      icon: ChatIcon.email,
    },
  ];
  return (
    <section className="section section--contact" id="contact">
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">Talk <em>to us</em></div>
            <div className="thai">ติดต่อทีมงาน · กดเลือกช่องทางที่สะดวก</div>
          </div>
        </div>

        <div className="contact__lede">
          <p>Got a question, a private party or special occasion to book, or a lounge to lock in? Tap any channel — it'll open the app and put you straight in our inbox.</p>
          <p className="contact__lede-th">มีคำถาม · อยากจัดงานส่วนตัว · หรือจองโต๊ะ — กดเลือกช่องทางด้านล่าง เปิดแอปทักได้เลย</p>
        </div>

        <div className="contact__grid">
          {channels.map(c => (
            <a key={c.k} className={`contact__card ${c.cls}`} href={c.href} target="_blank" rel="noopener">
              <span className="contact__mark" aria-hidden="true">{c.icon}</span>
              <div className="contact__body">
                <span className="contact__k">{c.k}</span>
                <span className="contact__v">{c.v}</span>
              </div>
              <span className="contact__arrow" aria-hidden="true">→</span>
            </a>
          ))}
        </div>

        <div className="contact__line">
          <span className="contact__line-mark" aria-hidden="true">{ChatIcon.line}</span>
          <div className="contact__line-copy">
            <span className="contact__line-k">Official LINE</span>
            <p className="contact__line-body">Fastest reply for table bookings, guestlist and questions.</p>
            <p className="contact__line-th">แอดไลน์เพื่อสอบถามและจองโต๊ะ — ตอบเร็วที่สุด</p>
          </div>
          <a className="contact__line-btn" href={CONTACT.line} target="_blank" rel="noopener">
            <img src="https://scdn.line-apps.com/n/line_add_friends/btn/en.png" alt="Add friend on LINE" height="36" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===================== PAST EVENTS ===================== */
/* ===================== FOOTER ===================== */
function Foot() {
  return (
    <footer className="foot">
      <div className="foot__top">
        <div className="foot__brand">
          <div className="mark">Old School &amp; Chill</div>
          <p>A '90s &amp; '00s R&amp;B and hip hop night in Bangkok. Good music, good people, good vibes.</p>
        </div>
        <div className="foot__col">
          <h4>Find Us</h4>
          <ul>
            <li><a href="https://instagram.com/oscbkk" target="_blank" rel="noopener">Instagram ↗</a></li>
            <li><a href="https://facebook.com/oscbkk" target="_blank" rel="noopener">Facebook ↗</a></li>
            <li><a href="https://tiktok.com/@oscbkk" target="_blank" rel="noopener">TikTok ↗</a></li>
            <li><a href="https://youtube.com/@alpha11co" target="_blank" rel="noopener">YouTube ↗</a></li>
            <li><a href={CONTACT.line} target="_blank" rel="noopener">LINE ↗</a></li>
            <li><a href="https://open.spotify.com/user/31qnnw4ys3tpcc7eltq3dhosqcsq" target="_blank" rel="noopener">Spotify ↗</a></li>
          </ul>
        </div>
        <div className="foot__col">
          <h4>The Venue</h4>
          <ul>
            <li>Aces Nightclub</li>
            <li>The Ambassador Hotel</li>
            <li>Sukhumvit Soi 11, BKK</li>
            <li>BTS Nana — 4 min walk</li>
            <li><a href="#">View on map ↗</a></li>
          </ul>
        </div>
        <div className="foot__col">
          <h4>Contact</h4>
          <ul>
            <li><a href={CONTACT.line} target="_blank" rel="noopener">LINE ↗</a></li>
            <li><a href="mailto:info@oscbkk.com">info@oscbkk.com</a></li>
            <li><a href="#contact">All channels →</a></li>
            <li><a href="mailto:info@oscbkk.com?subject=Press%20%26%20PR%20Enquiry">Press &amp; PR</a></li>
            <li><a href="mailto:info@oscbkk.com?subject=Partner%20%2F%20Sponsor%20Enquiry">Partner / Sponsor</a></li>
          </ul>
        </div>
      </div>
      <div className="foot__bottom">
        <span>© 2026 · Old School &amp; Chill BKK · All rights reserved</span>
        <span>Made with ❤ in Bangkok · ทำด้วยใจในกรุงเทพฯ</span>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
