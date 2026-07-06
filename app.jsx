/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSlider, useTweaks */

// ─── TICKETING ──────────────────────────────────────────────
// Live Megatix event URL. Pasted into every "Get Tickets" / "Reserve"
// button on the page. Same URL for all tiers — Megatix lets the buyer
// pick their tier on its checkout page.
const MEGATIX_URL = "https://megatix.in.th/events/august-old-school-chill-bangkok";

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
const MEGATIX_URLS = {
  early: MEGATIX_URL + "?aid=EARLYBIRD",
  ga:    MEGATIX_URL + "?aid=GA",
  door:  MEGATIX_URL,
  table: MEGATIX_URL,
  // Lounge packages — pre-paid via Megatix as a "minimum spend reservation".
  // The amount paid here goes onto the customer's tab on the night.
  newjack:  MEGATIX_URL + "?aid=NEWJACK",
  sosodef:  MEGATIX_URL + "?aid=SOSODEF",
};

// ─── DIRECT MESSAGING ──────────────────────────────────────
// Every CTA that says "message us" routes through one of these.
// Update here = updates everywhere (nav, floating bubble, lounges,
// dedicated Contact section, footer).
const CONTACT = {
  line:      "https://line.me/R/ti/p/@oldschoolchillbkk",
  whatsapp:  "https://wa.me/61488846198",
  messenger: "https://m.me/oldschoolchillbkk",
  instagram: "https://instagram.com/oldschoolchillbkk",
  email:     "mailto:info@oscbkk.com",
  // Display strings
  whatsappDisplay: "+61 488 846 198",
  lineDisplay:     "@oldschoolchillbkk",
  igDisplay:       "@oldschoolchillbkk",
  fbDisplay:       "@oldschoolchillbkk",
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
      <Lineup motion={t.motion} />
      <Poster />
      <Tickets />
      <Lounges />
      <VenuePhotos />
      <Rules />
      <Contact />
      <PastEvents />
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
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
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
function Nav() {
  return (
    <nav className="nav">
      <div className="nav__brand">
        <span className="mark">Old School &amp; Chill</span>
        <span className="sub">BKK · Vol. 02</span>
      </div>
      <div className="nav__links">
        <a href="#night">Event</a>
        <a href="#lineup">Lineup</a>
        <a href="#tickets">Tickets</a>
        <a href="#lounges">Bookings</a>
        <a href="#rules">Rules</a>
        <a href="#past">Past</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nav__socials" aria-label="Follow us">
        <a className="nav__social" href="https://instagram.com/oldschoolchillbkk" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </a>
        <a className="nav__social" href="https://facebook.com/oldschoolchillbkk" target="_blank" rel="noopener" aria-label="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.6-1.5H16.5V4.3a22 22 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4v2.3H7.5v3h2.6V21h3.4z" />
          </svg>
        </a>
        <a className="nav__social" href="https://tiktok.com/@oldschoolchillbkk" target="_blank" rel="noopener" aria-label="TikTok">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.5 3h-2.6v12.1c0 1.4-1.1 2.5-2.5 2.5s-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V10c-.3 0-.5-.1-.8-.1-2.8 0-5.1 2.3-5.1 5.1S8.6 20.1 11.4 20.1s5.1-2.3 5.1-5.1V9.4c1 .7 2.2 1.1 3.5 1.1V7.9c-1.9 0-3.5-1.6-3.5-3.5V3z" />
          </svg>
        </a>
      </div>
      <a className="nav__cta" href={MEGATIX_URL} target="_blank" rel="noopener">Tickets</a>
    </nav>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  return (
    <header className="hero hero--art">
      <img className="hero__photo" src="assets/hero-photo.png" alt="Old School & Chill Bangkok — the crew at Aces" />
      <div className="hero__scrim" aria-hidden="true"></div>
      <img className="hero__logo" src="assets/logo.png" alt="Old School & Chill · Bangkok" />

      <div className="hero__cta">
        <a className="hero__btn hero__btn--primary" href={MEGATIX_URL} target="_blank" rel="noopener">Get Tickets</a>
        <a className="hero__btn hero__btn--ghost" href="#lineup">See the Lineup</a>
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
          <div className="num">01</div>
          <div className="titles">
            <div className="title">The <em>Event</em></div>
            <div className="thai">เกี่ยวกับงาน · สิ่งที่กรุงเทพฯ รอมานาน</div>
          </div>
        </div>

        <div className="intro">
          <div className="intro__body">
            <p className="intro__lede">
              Another dose of '90s &amp; 2000s R&amp;B and Hip Hop in Bangkok.
            </p>
            <p>
              Following a sold-out debut in June, Bangkok's newest old-school experience
              returns on <strong>Saturday 1 August</strong>. In June, Old School &amp; Chill
              sold out its first event before most people even knew the brand existed — no
              influencer push, no gimmicks, just a room full of people singing every word
              to records they grew up on.
            </p>
            <p>
              August brings more of exactly that. The focus tightens onto timeless R&amp;B,
              the singalong records everyone knows by heart, with Hip Hop staying in the mix
              as the party starter between the big moments. Strictly '90s and '00s — nothing
              after 2010.
            </p>
            <p>
              The sounds come courtesy of Australia's <strong>DJ Jordan Adam</strong>,
              <strong> DJ Young G</strong> (Philippines) and <strong>Junior</strong> (Thailand),
              all of whom boast decades of experience playing this exact genre with a
              fan-first approach that'll have you buzzing and singing along from the moment
              you arrive. Our host will once again be <strong>El Rafa</strong>, one of
              Australia's most experienced and in-demand party starters.
            </p>
            <p>
              This event isn't built for people chasing social-media moments or VIP culture.
              It's for a mature crowd after real music, real nostalgia and a room that sings
              along rather than just watches.
            </p>

            <p className="thai">
              คืนเพลงเก่าที่จริงจังเรื่องเพลง · บรรยากาศดี ผู้ใหญ่ดี ๆ ที่รักดนตรียุค 90s–2000s
              จัดที่ Aces Nightclub สุขุมวิท ซอย 11
            </p>

            <p className="intro__book">Buy your tickets early. Contact us for party, table and booth bookings.</p>
            <div className="intro__actions">
              <a className="intro__btn" href={MEGATIX_URL} target="_blank" rel="noopener">Get Tickets ↗</a>
            </div>

            <div className="intro__pull">Real music. Real nostalgia.</div>
          </div>

          <div className="intro__card">
            <div className="row">
              <span className="k">Vol.</span>
              <span className="v">02 / 2026</span>
            </div>
            <div className="row">
              <span className="k">Curated by</span>
              <span className="v">
                Alpha Eleven Asia
                <small>events &amp; music curation</small>
              </span>
            </div>
            <div className="row">
              <span className="k">For</span>
              <span className="v">
                Grown music heads
                <small>real music · real nostalgia · genuine atmosphere</small>
              </span>
            </div>
            <div className="row">
              <span className="k">Frequency</span>
              <span className="v">Monthly</span>
            </div>
            <div className="row">
              <span className="k">Age</span>
              <span className="v">
                20+ · ID at door
                <small>อายุ 20 ปีขึ้นไป · กรุณาแสดงบัตรประชาชน</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Press release modal — full copy lives here.
   Swap the <PressBody/> contents when the final presser arrives. */
function PressModal({ onClose }) {
  return (
    <div className="press-modal" role="dialog" aria-modal="true" aria-labelledby="press-title" onClick={onClose}>
      <div className="press-modal__sheet" onClick={(e) => e.stopPropagation()}>
        <header className="press-modal__head">
          <div>
            <div className="press-modal__kicker">Press Release · For Immediate Release</div>
            <h2 id="press-title" className="press-modal__title">Old School &amp; Chill <em>Vol. 02</em></h2>
            <div className="press-modal__sub">Aces Nightclub · Bangkok · Saturday 1 August 2026</div>
          </div>
          <button className="press-modal__x" onClick={onClose} aria-label="Close">×</button>
        </header>

        <div className="press-modal__body">
          <PressBody />
        </div>

        <footer className="press-modal__foot">
          <a className="press-modal__btn press-modal__btn--ghost" href="mailto:info@oscbkk.com?subject=Press%20%26%20PR%20Enquiry%20%E2%80%94%20OSCBKK">Press &amp; PR contact</a>
          <button className="press-modal__btn press-modal__btn--primary" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}

/* Press release body — updated copy (May 2026).
   Title/tagline reflect the formal release; full press contact in press__details. */
function PressBody() {
  return (
    <>
      <p className="press-modal__tagline">A new home for '90s &amp; 2000s R&amp;B + Hip Hop culture in Bangkok.</p>

      <p className="press-modal__lede">
        Bangkok is about to get something it has been missing for a very long time.
      </p>

      <p>
        Old School &amp; Chill is a brand new nightlife concept built around one thing
        above all else: <strong>the music</strong>.
      </p>

      <p>
        Not just any music — this event is focused exclusively on curated '90s and 2000s
        R&amp;B and Hip Hop. Old School &amp; Chill is not another commercial nightclub
        event chasing trends, bottle parades or influencer culture. It is a music and
        culture-driven experience designed for people who genuinely lived this era, loved
        this music and still connect to it emotionally today.
      </p>

      <p>
        Old School &amp; Chill is created and curated by <strong>Alpha Eleven Asia</strong>, a
        new events entity specialising in classic R&amp;B and Hip Hop culture and nightlife, with
        long-standing ties to some of the biggest names in R&amp;B and Hip Hop internationally. With
        decades of combined experience in the genre as promoters and music curators,
        the vision behind Old School &amp; Chill has always been to build a genuine
        community around nostalgic music culture rather than simply create another
        nightclub event.
      </p>

      <p>
        The night brings together one of Australia's finest hosts and mic controllers, another
        familiar face in Australian nightlife and R&amp;B and Hip Hop folklore: the
        incomparable <strong>El Rafa</strong>.
      </p>

      <p>
        With the focus on the music comes a carefully selected group of experienced
        DJs — <strong>Young G, Junior and Jordan Adam</strong> — music
        commanders who not only know their stuff, they live it, breathe it, and will play
        records you thought you would never hear in a Bangkok club.
      </p>

      <p>
        Before the first event has even launched, the response online has already confirmed
        what many people have been quietly waiting for: a mature, stylish and authentic
        nightlife experience centred around timeless R&amp;B and Hip Hop records. Within
        weeks of launching its social platforms, Old School &amp; Chill attracted thousands
        of followers and significant engagement from locals, expats and tourists alike — many
        asking the same question:
      </p>

      <p className="press-modal__quote">"When is this finally happening?"</p>

      <p>
        Unlike generic nightlife concepts, Old School &amp; Chill is designed to feel
        intentional. The music is curated carefully. The atmosphere matters. The crowd
        matters. The culture matters.
      </p>

      <p>
        This is not intended to be a venue for kids chasing social media moments or a place
        built around pretentious VIP culture. While all music lovers are welcome, the core
        audience is a more mature demographic looking for:
      </p>

      <div className="press-modal__expect">
        <span className="press-modal__expect-k">For</span>
        <ul>
          <li>Real music</li>
          <li>Real nostalgia</li>
          <li>Genuine atmosphere</li>
          <li>Dancing</li>
          <li>Connection</li>
          <li>Hospitality</li>
          <li>Energy</li>
          <li>Community</li>
        </ul>
      </div>

      <p>
        It is a place where the soundtrack matters just as much as the environment itself.
      </p>

      <p>
        The event launches at <strong>Aces</strong> on Sukhumvit Soi 11 — a visually
        striking venue in the heart of Bangkok's lower Sukhumvit nightlife, and the ideal
        backdrop for a premium R&amp;B and Hip Hop experience.
      </p>

      <hr className="press-modal__rule" />

      <div className="press-modal__details">
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Event</span>
          <span className="press-modal__detail-v">Old School &amp; Chill — Vol. 02</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Date</span>
          <span className="press-modal__detail-v">Saturday 1 August 2026 · 10pm — Late</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Venue</span>
          <span className="press-modal__detail-v">Aces Nightclub, The Ambassador Hotel, Sukhumvit Soi 11, Bangkok</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Genre</span>
          <span className="press-modal__detail-v">'90s &amp; '00s R&amp;B and Hip Hop · strictly pre-2010</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">DJs</span>
          <span className="press-modal__detail-v">Young G · Junior · Jordan Adam</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Host</span>
          <span className="press-modal__detail-v">El Rafa (AUS)</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Curated by</span>
          <span className="press-modal__detail-v">Alpha Eleven Asia</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Tickets</span>
          <span className="press-modal__detail-v">megatix.in.th/events/oscbkk</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Press</span>
          <span className="press-modal__detail-v">info@oscbkk.com</span>
        </div>
      </div>

      <p className="press-modal__note">
        <em>Note to editors:</em> high-res images, logos and the official poster
        available on request. Interview opportunities with El Rafa
        available in the lead-up to the event.
      </p>
    </>
  );
}

/* ===================== LINEUP ===================== */
function Lineup({ motion }) {
  return (
    <section className="section" id="lineup">
      <div className="container">
        <div className="section__head">
          <div className="num">02</div>
          <div className="titles">
            <div className="title">The <em>Lineup</em></div>
            <div className="thai">รายชื่อดีเจ · ประกาศเร็ว ๆ นี้</div>
          </div>
        </div>

        <div className="lineup">
          <div className="lineup__tease">
            <div className="lineup__stamp">
              <span className="lineup__stamp-row">Vol.</span>
              <span className="lineup__stamp-row lineup__stamp-row--accent">02</span>
            </div>

            <div className="lineup__copy">
              <p className="lineup__kicker">The Selectors &amp; Host</p>
              <h3 className="lineup__hero">
                The Selectors <em>&amp;</em> Your Host.
              </h3>
              <p className="lineup__body">
                All night on pre-2010. Set times drop closer to the date.
              </p>
              <p className="lineup__thai">
                ดีเจตัวจริง 5 คน พร้อมโฮสต์ MC · เปิดเพลงยุค 90s–2000s ตลอดคืน
              </p>

              <ul className="lineup__roster">
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">01</span>
                  <span className="lineup__roster-name">Jordan Adam</span>
                  <span className="lineup__roster-flag" title="Australia" aria-label="Australia">🇦🇺</span>
                </li>
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">02</span>
                  <span className="lineup__roster-name">Young G</span>
                  <span className="lineup__roster-flag" title="Philippines" aria-label="Philippines">🇵🇭</span>
                </li>
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">03</span>
                  <span className="lineup__roster-name">Junior</span>
                  <span className="lineup__roster-flag" title="Thailand" aria-label="Thailand">🇹🇭</span>
                </li>
                <li className="lineup__roster-item lineup__roster-item--mc">
                  <span className="lineup__roster-n">MC</span>
                  <span className="lineup__roster-name">Hosted by El Rafa</span>
                  <span className="lineup__roster-flag" title="Australia" aria-label="Australia">🇦🇺</span>
                </li>
              </ul>

              <div className="lineup__actions">
                <a className="lineup__btn lineup__btn--primary" href={MEGATIX_URL} target="_blank" rel="noopener">Get Tickets</a>
              </div>
            </div>
          </div>

          <div className="mixtape" aria-label="Old School &amp; Chill — Spotify playlist">
            <div className="mixtape__header">
              <span className="mixtape__kicker">▶ The Mixtape</span>
              <span className="mixtape__meta">Side A · '90s &amp; '00s</span>
            </div>
            <div className="mixtape__embed">
              <iframe
                title="Old School &amp; Chill — Spotify playlist"
                src="https://open.spotify.com/embed/playlist/7hv2tt8L8e32X6FyRGLZwd?utm_source=generator"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
            <p className="mixtape__caption">A taste of what's coming. Press play.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== POSTER ===================== */
function Poster() {
  return (
    <section className="poster-section" id="poster">
      <div className="container poster-section__wrap">
        <aside className="poster-section__copy">
          <p className="poster-section__kicker">The Artwork</p>
          <h3 className="poster-section__title">
            The <em>Poster</em>.
          </h3>
          <p className="poster-section__body">
            Vol. 02 · Saturday 1 August. The official flyer — screenshot it,
            share it, send it to every friend you've ever made a mixtape for.
          </p>
          <p className="poster-section__thai">
            แชร์ให้เพื่อนที่รักเพลงเก่าเหมือนกัน · เจอกันวันที่ 1 สิงหาคม
          </p>

          <div className="poster-section__share">
            <span className="poster-section__share-k">Share</span>
            <div className="poster-section__share-row">
              <a className="poster-section__share-btn" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foscbkk.com" target="_blank" rel="noopener" aria-label="Share on Facebook">Facebook</a>
              <a className="poster-section__share-btn" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Foscbkk.com&text=Old%20School%20%26%20Chill%20BKK%20%E2%80%94%20Vol.%2002%20%E2%80%94%201%20August%202026" target="_blank" rel="noopener" aria-label="Share on X">X / Twitter</a>
              <button className="poster-section__share-btn poster-section__share-btn--copy" onClick={(e) => {
                navigator.clipboard?.writeText('https://oscbkk.com').then(() => {
                  const b = e.currentTarget;
                  const orig = b.textContent;
                  b.textContent = 'Copied ✓';
                  setTimeout(() => { b.textContent = orig; }, 1600);
                });
              }}>Copy link</button>
            </div>
            <p className="poster-section__share-tag">Tag us <a href="https://instagram.com/oldschoolchillbkk" target="_blank" rel="noopener">@oldschoolchillbkk</a> · #oscbkk</p>
          </div>
        </aside>

        <div className="poster-section__frame">
          <img className="poster-section__img" src="assets/poster.png" alt="Old School & Chill Vol. 02 — Bangkok · 1 August 2026 — official poster" />
          <span className="poster-section__corner poster-section__corner--tl" />
          <span className="poster-section__corner poster-section__corner--tr" />
          <span className="poster-section__corner poster-section__corner--bl" />
          <span className="poster-section__corner poster-section__corner--br" />
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
      locked: true,
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
          <div className="num">03</div>
          <div className="titles">
            <div className="title">The <em>Tickets</em></div>
            <div className="thai">บัตรเข้างาน · 2 ระดับ</div>
          </div>
        </div>

        <div className="tickets">
          {tiers.map((tk, i) => (
            <article key={i} className={`ticket ${tk.featured ? "ticket--featured" : ""} ${tk.light ? "ticket--light" : ""} ${tk.soldOut ? "ticket--soldout" : ""} ${tk.locked ? "ticket--locked" : ""}`}>
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
                <span className="ticket__cta ticket__cta--disabled" aria-disabled="true">Opens when Early Bird sells out</span>
              ) : (
                <a className="ticket__cta" href={MEGATIX_URLS[tk.key] || MEGATIX_URL} target="_blank" rel="noopener">Reserve</a>
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

  const packages = [
    {
      key: "newjack", label: "New Jack", type: "table",
      sofa: "Reserved Standing Table",
      pax: "Up to 4 pax",
      price: "4,000",
      tier: "Table",
      accent: "#ff3d8b",
      soldOut: true,
      megatix: MEGATIX_URLS.newjack,
      inclusions: [
        "Event entry for up to 4 guests",
        "฿4,000 bar credit · spend on the menu",
        "Reserved standing table",
        "Dedicated server",
      ],
    },
    {
      key: "sosodef", label: "So So Def", type: "lounge",
      sofa: "Base Lounge",
      pax: "Up to 4 pax",
      price: "8,000",
      tier: "Lounge",
      accent: "#ff3d8b",
      soldOut: true,
      megatix: MEGATIX_URLS.sosodef,
      inclusions: [
        "Event entry for up to 4 guests",
        "฿8,000 bar credit · spend on the menu",
        "Reserved lounge",
        "VIP Priority Admission",
        "Dedicated server",
      ],
    },
    {
      key: "deathrow", label: "Death Row", type: "lounge",
      sofa: "Standard Lounge",
      pax: "Up to 6 pax",
      price: "12,000",
      tier: "Lounge",
      accent: "#ff3d8b",
      megatix: MEGATIX_URL,
      inclusions: [
        "Event entry for up to 6 guests",
        "Reserved lounge",
        "VIP Priority Admission",
        "Dedicated server",
        "Thug Passion welcome shots",
      ],
    },
    {
      key: "badboy", label: "Bad Boy", type: "lounge",
      sofa: "Prime Lounge",
      pax: "Up to 8 pax",
      price: "16,000",
      tier: "Premium",
      accent: "#f3b53b",
      megatix: MEGATIX_URL,
      inclusions: [
        "Event entry for up to 8 guests",
        "Reserved lounge",
        "VIP Priority Admission",
        "Dedicated server",
        "Thug Passion welcome shots",
      ],
    },
    {
      key: "rocafella", label: "Roc-A-Fella", type: "lounge",
      sofa: "VVIP Lounge",
      pax: "Up to 10 pax",
      price: "20,000",
      tier: "VVIP",
      accent: "#4cc3ff",
      featured: true,
      megatix: MEGATIX_URL,
      inclusions: [
        "Event entry for up to 10 guests",
        "Reserved lounge",
        "Escorted VIP Priority Admission",
        "All-night priority entry",
        "Dedicated host",
        "Thug Passion welcome shots",
        "Private photo session · pics emailed direct",
        "Bar bites",
      ],
    },
    {
      key: "defjam", label: "Def Jam", type: "lounge",
      sofa: "Ultra VVIP Lounge",
      pax: "Up to 15 pax",
      price: "30,000",
      tier: "Ultra",
      accent: "#ff6a3d",
      featured: true,
      soldOut: true,
      megatix: MEGATIX_URL,
      inclusions: [
        "Event entry for up to 15 guests",
        "Reserved lounge",
        "Escorted VIP Priority Admission",
        "All-night priority entry",
        "Dedicated host",
        "Thug Passion welcome shots",
        "Private photo session · pics emailed direct",
        "Personalised LED banner",
        "Bar bites",
      ],
    },
  ];

  return (
    <section className="section" id="lounges">
      <div className="container">
        <div className="section__head">
          <div className="num">04</div>
          <div className="titles">
            <div className="title">Table &amp; Booth <em>Bookings</em></div>
            <div className="thai">จองโต๊ะ · บูธ · งานปาร์ตี้</div>
          </div>
        </div>

        <div className="bookings" id="lounges-contact">
          <div className="bookings__copy">
            <p className="bookings__kicker">Reserve ahead</p>
            <h3 className="bookings__title">Table &amp; Booth <em>Bookings</em></h3>
            <p className="bookings__body">
              Want a table, a booth, or the whole crew sorted for the night? Private parties,
              birthdays and group bookings all welcome. Message us and we'll build the night
              around you — packages, availability and pricing confirmed within the day.
            </p>
            <p className="bookings__thai">สนใจจองโต๊ะ บูธ หรือจัดงานปาร์ตี้ · ทักหาเราได้เลย</p>
            <p className="bookings__contactline">Contact us — we'll sort you out.</p>
          </div>

          <div className="bookings__grid">
            <a className="bookings__card bookings__card--line" href={CONTACT.line} target="_blank" rel="noopener">
              <span className="k">LINE</span>
              <span className="v">{CONTACT.lineDisplay}</span>
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
      sub="Old School &amp; Chill · Vol. 02 · 1 August 2026"
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
        <li>Applies to all pre-paid reservations, including those purchased via Megatix and enquiry-confirmed packages.</li>
      </ul>

      <h3 className="modal__h">Arrival</h3>
      <ul className="modal__ul">
        <li>Lounges and tables held for 30 minutes past your reservation time, after which the spot may be released.</li>
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
          <div className="num">05</div>
          <div className="titles">
            <div className="title">The <em>Venue</em></div>
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
          <div className="num">06</div>
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
                  <li>Dress to be remembered</li>
                </ul>
              </div>
              <div className="dresscode__col">
                <h4 className="no">✕ No / ห้าม</h4>
                <ul>
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
      k: "LINE",
      v: CONTACT.lineDisplay,
      href: CONTACT.line,
      cls: "contact__card--line",
      icon: ChatIcon.line,
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
  ];
  return (
    <section className="section section--contact" id="contact">
      <div className="container">
        <div className="section__head">
          <div className="num">07</div>
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

        <div className="contact__email">
          <span className="contact__email-k">Or email</span>
          <a className="contact__email-v" href={CONTACT.email}>info@oscbkk.com</a>
          <span className="contact__email-th">— สำหรับเรื่องเป็นทางการ ส่งอีเมลได้</span>
        </div>
      </div>
    </section>
  );
}

/* ===================== PAST EVENTS ===================== */
/* Archive of previous editions. Vol. 01 (20 June 2026) preserved here with
   its original poster art. Add newer entries to the top of `editions`. */
function PastEvents() {
  const editions = [
    {
      vol: "Vol. 01",
      date: "Saturday 20 June 2026",
      dateTh: "วันเสาร์ที่ 20 มิถุนายน 2569",
      venue: "Aces Nightclub · Sukhumvit Soi 11",
      poster: "assets/poster-vol01.png",
      status: "Sold Out",
      djs: ["K9", "Young G", "Travellin' Matt", "Jordan Adam", "Junior"],
      host: "El Rafa",
      note: "The inaugural night. Strictly pre-2010 R&B and Hip Hop — sold out in advance across every tier.",
      noteTh: "คืนแรกของ Old School & Chill · บัตรหมดทุกระดับก่อนวันงาน",
      photos: ["assets/venue-1.jpg", "assets/venue-4.jpg"],
    },
  ];

  return (
    <section className="section past" id="past">
      <div className="container">
        <div className="section__head">
          <div className="num">08</div>
          <div className="titles">
            <div className="title">Previous <em>Events</em></div>
            <div className="thai">อีเวนต์ที่ผ่านมา</div>
          </div>
        </div>

        <div className="past__list">
          {editions.map((e, i) => (
            <article key={i} className="past-card">
              <div className="past-card__frame">
                <img className="past-card__img" src={e.poster} alt={`Old School & Chill ${e.vol} — official poster`} />
                {e.status && <span className="past-card__stamp" aria-hidden="true">{e.status}</span>}
                <span className="past-card__corner past-card__corner--tl" />
                <span className="past-card__corner past-card__corner--tr" />
                <span className="past-card__corner past-card__corner--bl" />
                <span className="past-card__corner past-card__corner--br" />
              </div>

              <div className="past-card__body">
                <div className="past-card__vol">{e.vol}</div>
                <div className="past-card__meta">
                  <div className="past-card__row">
                    <span className="k">When</span>
                    <span className="v">{e.date}<small>{e.dateTh}</small></span>
                  </div>
                  <div className="past-card__row">
                    <span className="k">Where</span>
                    <span className="v">{e.venue}</span>
                  </div>
                  <div className="past-card__row">
                    <span className="k">Status</span>
                    <span className="v past-card__soldout">{e.status} · บัตรหมด</span>
                  </div>
                </div>

                <p className="past-card__note">{e.note}</p>
                <p className="past-card__note thai">{e.noteTh}</p>

                <div className="past-card__lineup">
                  <span className="past-card__lineup-k">On the decks</span>
                  <div className="past-card__djs">
                    {e.djs.map((d, j) => <span key={j} className="past-card__dj">{d}</span>)}
                  </div>
                  <span className="past-card__host">Hosted by {e.host}</span>
                </div>

                <div className="past-card__photos">
                  {e.photos.map((src, j) => (
                    <figure key={j} className="past-card__photo">
                      <img src={src} alt={`${e.vol} — venue`} />
                    </figure>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            <li><a href="https://instagram.com/oldschoolchillbkk" target="_blank" rel="noopener">Instagram ↗</a></li>
            <li><a href="https://facebook.com/oldschoolchillbkk" target="_blank" rel="noopener">Facebook ↗</a></li>
            <li><a href="https://tiktok.com/@oldschoolchillbkk" target="_blank" rel="noopener">TikTok ↗</a></li>
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
