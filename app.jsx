/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakSlider, useTweaks */

// ─── TICKETING ──────────────────────────────────────────────
// Live Megatix event URL. Pasted into every "Get Tickets" / "Reserve"
// button on the page. Same URL for all tiers — Megatix lets the buyer
// pick their tier on its checkout page.
const MEGATIX_URL = "https://megatix.in.th/events/oscbkk";
const MEGATIX_URLS = {
  early: "https://megatix.in.th/events/oscbkk?aid=EARLYBIRD",
  ga:    "https://megatix.in.th/events/oscbkk?aid=GA",
  door:  MEGATIX_URL,
  table: MEGATIX_URL,
};
// ────────────────────────────────────────────────────────────

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff3d8b",
  "density": "standard",
  "hero": "neon",
  "motion": "subtle"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#ff3d8b", // hot magenta (default)
  "#ff6a3d", // sunset orange
  "#f3b53b", // temple gold
  "#4cc3ff"  // electric cyan (uses cyan as primary)
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.motion = t.motion;
    document.documentElement.dataset.hero = t.hero;
  }, [t.accent, t.density, t.motion, t.hero]);

  return (
    <>
      <Nav />
      <Hero variant={t.hero} />
      <Marquee />
      <TheNight />
      <Lineup motion={t.motion} />
      <Poster />
      <Tickets />
      <Lounges />
      <VenuePhotos />
      <Rules />
      <Foot />

      <MessengerBubble />

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

        <TweakSection title="Hero treatment">
          <TweakRadio
            label="Style"
            value={t.hero}
            options={[
              { value: "neon", label: "Neon" },
              { value: "poster", label: "Poster" },
              { value: "minimal", label: "Minimal" },
            ]}
            onChange={v => setTweak("hero", v)}
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

/* ===================== NAV ===================== */
function MessengerBubble() {
  const [open, setOpen] = React.useState(false);
  return (
    <div className={`msg-bubble ${open ? "msg-bubble--open" : ""}`}>
      {open && (
        <div className="msg-bubble__card" role="dialog" aria-label="Message us">
          <div className="msg-bubble__head">
            <div>
              <div className="msg-bubble__title">Message us</div>
              <div className="msg-bubble__sub">Reply within the day · Mon–Sun</div>
            </div>
            <button className="msg-bubble__x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <p className="msg-bubble__body">
            Quickest way to reach the team — Messenger, LINE, or Instagram DM. Pick your spot:
          </p>
          <div className="msg-bubble__channels">
            <a href="https://m.me/oldschoolchillbkk" target="_blank" rel="noopener" className="msg-bubble__chan msg-bubble__chan--messenger">
              <span className="msg-bubble__chan-k">Messenger</span>
              <span className="msg-bubble__chan-v">@oldschoolchillbkk →</span>
            </a>
            <a href="#" className="msg-bubble__chan msg-bubble__chan--line msg-bubble__chan--soon" aria-disabled="true" onClick={(e) => e.preventDefault()}>
              <span className="msg-bubble__chan-k">LINE <span className="msg-bubble__soon">Soon</span></span>
              <span className="msg-bubble__chan-v">@oscbkk</span>
            </a>
            <a href="https://instagram.com/oldschoolchillbkk" target="_blank" rel="noopener" className="msg-bubble__chan msg-bubble__chan--ig">
              <span className="msg-bubble__chan-k">Instagram</span>
              <span className="msg-bubble__chan-v">@oldschoolchillbkk →</span>
            </a>
          </div>
        </div>
      )}
      <button className="msg-bubble__btn" onClick={() => setOpen(o => !o)} aria-label={open ? "Close chat" : "Open chat"}>
        {open ? (
          <span style={{fontSize: 22, lineHeight: 1}}>×</span>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.04 2 11c0 2.84 1.51 5.36 3.86 7L5 22l4.2-2.18C10.07 19.94 11.02 20 12 20c5.52 0 10-4.04 10-9s-4.48-9-10-9zM7.1 13.97l3.31-5.27 3.45 2.7L17.1 8 13.8 13.27l-3.45-2.7-3.25 3.4z" fill="currentColor"/>
          </svg>
        )}
      </button>
    </div>
  );
}

/* ===================== NAV ===================== */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav__brand">
        <span className="mark">Old School &amp; Chill</span>
        <span className="sub">BKK · Vol. 01</span>
      </div>
      <div className="nav__links">
        <a href="#night">The Event</a>
        <a href="#lineup">Lineup</a>
        <a href="#tickets">Tickets</a>
        <a href="#lounges">Lounges</a>
        <a href="#rules">House Rules</a>
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
      <a className="nav__cta" href={MEGATIX_URL} target="_blank" rel="noopener">Get Tickets</a>
    </nav>
  );
}

/* ===================== HERO ===================== */
function Hero({ variant }) {
  return (
    <header className="hero" data-variant={variant}>
      <img className="hero__image" src="assets/hero.png" alt="Old School & Chill Bangkok — the crew, Sukhumvit at night" />

      <div className="hero__bottom">
        <div className="cell">
          <span className="k">When</span>
          <span className="v">Sat, 20.06.26</span>
          <span className="vth">วันเสาร์ที่ 20 มิถุนายน</span>
        </div>
        <div className="cell">
          <span className="k">Where</span>
          <span className="v">Aces — Sukhumvit Soi 11</span>
          <span className="vth">เอซ · สุขุมวิท ซอย 11</span>
        </div>
        <div className="cell">
          <span className="k">Sound</span>
          <span className="v">'90s · '00s R&amp;B + Hip&nbsp;Hop</span>
          <span className="vth">อาร์แอนด์บีและฮิปฮอปยุค 90s–2000s</span>
        </div>
        <div className="cell">
          <span className="k">Doors</span>
          <span className="v">22:00 — 03:00</span>
          <span className="vth">เปิดประตูสี่ทุ่ม · ลากยาว</span>
        </div>
      </div>

      <div className="hero__cta">
        <a className="hero__btn hero__btn--primary" href={MEGATIX_URLS.early} target="_blank" rel="noopener">Get Tickets</a>
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
  const [pressOpen, setPressOpen] = React.useState(false);

  React.useEffect(() => {
    if (!pressOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setPressOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [pressOpen]);

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
              Bangkok is about to get something it has been missing for a very long time.
            </p>
            <p>
              Old School &amp; Chill is a new nightlife concept built around one thing
              above all else: <strong>the music</strong>. Curated exclusively to '90s and
              2000s R&amp;B and hip hop — this is not another commercial nightclub chasing
              trends, bottle parades or influencer culture, but a music and culture-driven
              night for the people who lived this era, loved this music, and still connect
              to it.
            </p>
            <p>
              It is also for those who have discovered it later and have not yet
              experienced the magic of the likes of Aaliyah, TLC, Montell Jordan, 112
              or Blackstreet on the dance floor. If you ever want to feel like you
              stepped back onto a dance floor sometime between 1990 — 2010, then
              this is the spot to be.
            </p>

            <p className="thai">
              คืนเพลงเก่าที่จริงจังเรื่องเพลง · บรรยากาศดี ผู้ใหญ่ดี ๆ ที่รักดนตรียุค 90s–2000s
              จัดที่ Aces Nightclub สุขุมวิท ซอย 11
            </p>

            <button className="intro__toggle" onClick={() => setPressOpen(true)} aria-haspopup="dialog">
              Read the full press release ↗
            </button>

            <div className="intro__pull">Real music. Real nostalgia.</div>
          </div>

          <div className="intro__card">
            <div className="row">
              <span className="k">Vol.</span>
              <span className="v">01 / 2026</span>
            </div>
            <div className="row">
              <span className="k">Curated by</span>
              <span className="v">
                DJ Jordan Adam
                <small>creator &amp; music director</small>
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

      {pressOpen && <PressModal onClose={() => setPressOpen(false)} />}
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
            <h2 id="press-title" className="press-modal__title">Old School &amp; Chill <em>Vol. 01</em></h2>
            <div className="press-modal__sub">Aces Nightclub · Bangkok · Saturday 20 June 2026</div>
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

/* Press release body — full version provided.
   This is the placeholder copy until the final press release lands. */
function PressBody() {
  return (
    <>
      <p className="press-modal__lede">
        Bangkok is about to get something it has been missing for a very long time.
      </p>
      <p>
        Old School &amp; Chill is a new nightlife concept built around one thing above
        all else: <strong>the music</strong>.
      </p>
      <p>
        Curated exclusively around '90s and 2000s R&amp;B and Hip Hop, this is not
        another commercial nightclub chasing trends, bottle parades or influencer
        culture. It is a music and culture-driven night created for the people who
        lived this era, loved this music and still feel something when those records
        come on. It is also for those who discovered the era later and never had the
        chance to experience the magic of hearing artists like Aaliyah, TLC, Montell
        Jordan, 112 and Blackstreet properly, on a real dance floor, in a real
        nightclub environment.
      </p>
      <p>
        The concept comes from <strong>DJ Jordan Adam</strong>, a specialist in classic
        R&amp;B and Hip Hop culture with long-standing ties to some of the biggest
        names in the genre internationally. After decades immersed in the scene as
        both a promoter and music curator throughout Australia, the vision has
        always been to build a genuine community around nostalgic music culture, not
        simply another nightclub event.
      </p>
      <p>
        Joining him is a familiar voice from the culture itself, one of Australia's
        finest hosts and long-time ambassadors of R&amp;B and Hip Hop nightlife
        culture, the incomparable <strong>MC Rafa</strong>.
      </p>
      <p>
        The soundtrack for the night comes courtesy of an experienced lineup of
        DJs who do not simply know the music, they live it.
        DJs <strong>K9, Young G, Travellin' Matt, Junior and Jordan Adam</strong> are
        all on a mission to make you feel like you just stepped onto a dance floor in 1997 again.
      </p>

      <div className="press-modal__expect">
        <span className="press-modal__expect-k">Expect</span>
        <ul>
          <li>Timeless records</li>
          <li>Deep cuts</li>
          <li>Club anthems</li>
          <li>Singalongs</li>
          <li>Slow grinds</li>
          <li>And songs you never thought you would hear played properly in a Bangkok nightclub</li>
        </ul>
      </div>

      <hr className="press-modal__rule" />

      <div className="press-modal__details">
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Event</span>
          <span className="press-modal__detail-v">Old School &amp; Chill — Vol. 01</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Date</span>
          <span className="press-modal__detail-v">Saturday 20 June 2026 · 10pm — Late</span>
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
          <span className="press-modal__detail-v">K9 · Young G · Travellin' Matt · Junior · Jordan Adam</span>
        </div>
        <div className="press-modal__detail">
          <span className="press-modal__detail-k">Host</span>
          <span className="press-modal__detail-v">MC Rafa (AUS)</span>
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
        available on request. Interview opportunities with DJ Jordan Adam and MC Rafa
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
              <span className="lineup__stamp-row lineup__stamp-row--accent">01</span>
            </div>

            <div className="lineup__copy">
              <p className="lineup__kicker">The Sound Crew + Your Host</p>
              <h3 className="lineup__hero">
                Five selectors <em>+</em> one MC.
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
                  <span className="lineup__roster-name">K9</span>
                  <span className="lineup__roster-flag" title="Thailand" aria-label="Thailand">🇹🇭</span>
                </li>
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">02</span>
                  <span className="lineup__roster-name">Young G</span>
                  <span className="lineup__roster-flag" title="Philippines" aria-label="Philippines">🇵🇭</span>
                </li>
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">03</span>
                  <span className="lineup__roster-name">Travellin' Matt</span>
                  <span className="lineup__roster-flag" title="Thai / USA" aria-label="Thai / USA">🇹🇭&nbsp;🇺🇸</span>
                </li>
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">04</span>
                  <span className="lineup__roster-name">Jordan Adam</span>
                  <span className="lineup__roster-flag" title="Australia" aria-label="Australia">🇦🇺</span>
                </li>
                <li className="lineup__roster-item">
                  <span className="lineup__roster-n">05</span>
                  <span className="lineup__roster-name">Junior</span>
                  <span className="lineup__roster-flag" title="Thailand" aria-label="Thailand">🇹🇭</span>
                </li>
                <li className="lineup__roster-item lineup__roster-item--mc">
                  <span className="lineup__roster-n">MC</span>
                  <span className="lineup__roster-name">Hosted by MC Rafa</span>
                  <span className="lineup__roster-flag" title="Australia" aria-label="Australia">🇦🇺</span>
                </li>
              </ul>

              <div className="lineup__actions">
                <a className="lineup__btn lineup__btn--primary" href="https://instagram.com/oldschoolchillbkk" target="_blank" rel="noopener">Follow on Instagram</a>
                <a className="lineup__btn lineup__btn--ghost" href={MEGATIX_URL} target="_blank" rel="noopener">Get tickets</a>
              </div>
            </div>
          </div>

          <div className="cassette" aria-label="Mixtape placeholder — Spotify playlist coming soon">
            <div className="cassette__label">
              <div className="side">SIDE A · 60 MIN · DOLBY</div>
              <div className="title">Old School &amp; Chill</div>
              <div className="runtime">MIXTAPE · COMING SOON</div>
            </div>
            <div className="cassette__reels">
              <div className={`reel ${motion !== "off" ? "spin" : ""}`} />
              <div className={`reel ${motion !== "off" ? "spin rev" : ""}`} />
            </div>
            <div className="cassette__strip" />
            <p className="cassette__caption">▶ Spotify playlist drops with the lineup</p>
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
          <p className="poster-section__kicker">Spread the word</p>
          <h3 className="poster-section__title">
            The <em>First</em> Edition.
          </h3>
          <p className="poster-section__body">
            Vol. 01 · the inaugural night. Save it, share it, print it, stick it
            on the fridge of every friend you've ever made a mixtape for.
          </p>
          <p className="poster-section__thai">
            บันทึก · แชร์ · พิมพ์ออกมา · ส่งให้เพื่อนที่รักเพลงเก่าเหมือนกัน
          </p>

          <div className="poster-section__downloads">
            <div className="poster-section__dlrow">
              <span className="poster-section__dl-k">IG Post · 1:1</span>
              <a className="poster-section__dl" href="assets/social-1x1.png" download="OSCBKK-Vol01-IG-Post.png">
                <span className="poster-section__dl-fmt">1080 × 1080 · Square</span>
                <span className="poster-section__dl-cta">Download ↓</span>
              </a>
            </div>
            <div className="poster-section__dlrow">
              <span className="poster-section__dl-k">IG Reel / Story · 9:16</span>
              <a className="poster-section__dl" href="assets/social-9x16.png" download="OSCBKK-Vol01-IG-Story.png">
                <span className="poster-section__dl-fmt">1080 × 1920 · Portrait</span>
                <span className="poster-section__dl-cta">Download ↓</span>
              </a>
            </div>
          </div>

          <div className="poster-section__share">
            <span className="poster-section__share-k">Share</span>
            <div className="poster-section__share-row">
              <a className="poster-section__share-btn" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Foscbkk.com" target="_blank" rel="noopener" aria-label="Share on Facebook">Facebook</a>
              <a className="poster-section__share-btn" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Foscbkk.com&text=Old%20School%20%26%20Chill%20BKK%20%E2%80%94%20Vol.%2001%20%E2%80%94%2020%20June%202026" target="_blank" rel="noopener" aria-label="Share on X">X / Twitter</a>
              <a className="poster-section__share-btn" href="https://api.whatsapp.com/send?text=Old%20School%20%26%20Chill%20BKK%20%E2%80%94%2020%20June%202026%20%E2%80%94%20https%3A%2F%2Foscbkk.com" target="_blank" rel="noopener" aria-label="Share on WhatsApp">WhatsApp</a>
              <a className="poster-section__share-btn" href="mailto:?subject=Old%20School%20%26%20Chill%20BKK%20%E2%80%94%20Vol.%2001&body=Catch%20me%20at%20the%20first%20Old%20School%20%26%20Chill%20Bangkok%2C%2020%20June%202026.%20https%3A%2F%2Foscbkk.com" aria-label="Share by email">Email</a>
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
          <img className="poster-section__img" src="assets/poster.png" alt="Old School & Chill Vol. 01 — Bangkok · 20 June 2026 — official poster" />
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
        "Ticket includes two drinks",
        "Limited numbers · first come, first served",
      ],
    },
    {
      key: "ga",
      name: "General Admission", thai: "บัตรทั่วไป",
      bar: "TIER 02 / LIMITED",
      price: "600",
      perks: [
        "General Admission entry",
        "Guaranteed entry · pre-sale only",
        "Ticket includes two drinks",
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
            <div className="thai">บัตรเข้างาน · 3 ระดับ</div>
          </div>
        </div>

        <div className="tickets">
          {tiers.map((tk, i) => (
            <article key={i} className={`ticket ${tk.featured ? "ticket--featured" : ""} ${tk.light ? "ticket--light" : ""}`}>
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
              <a className="ticket__cta" href={MEGATIX_URLS[tk.key] || MEGATIX_URL} target="_blank" rel="noopener">Reserve</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== LOUNGES (drinks packages) ===================== */
function Lounges() {
  const packages = [
    {
      key: "sosodef",
      label: "So So Def",
      sofa: "Base Sofa",
      pax: "2 — 4 pax",
      price: "8,000",
      tier: "Standard",
      bottles: ["JW Black Label", "Chandon Brut"],
      shots: "4 welcome shots",
      mixers: "Standard mixers",
      host: "Dedicated server",
      extras: [],
      accent: "#ff3d8b",
    },
    {
      key: "deathrow",
      label: "Death Row",
      sofa: "Standard Sofa",
      pax: "6 — 8 pax",
      price: "14,000",
      tier: "Standard",
      bottles: ["Chivas Regal 12Y", "Grey Goose", "Chandon Rosé"],
      shots: "6 welcome shots",
      mixers: "Standard mixers",
      host: "Dedicated server",
      extras: [],
      accent: "#ff3d8b",
    },
    {
      key: "ruffryders",
      label: "Ruff Ryders",
      sofa: "Prime Sofa",
      pax: "8 — 10 pax",
      price: "20,000",
      tier: "Premium",
      bottles: ["JW Gold Label", "Belvedere", "Don Julio Blanco", "Chandon Rosé"],
      shots: "8 welcome shots",
      mixers: "Premium mixers",
      host: "Dedicated host",
      extras: ["Bar bites included"],
      accent: "#f3b53b",
    },
    {
      key: "badboy",
      label: "Bad Boy",
      sofa: "VVIP Sofa",
      pax: "10 — 15 pax",
      price: "40,000",
      tier: "VVIP",
      bottles: ["Macallan 12Y", "Grey Goose", "Don Julio Reposado", "Moët & Chandon Brut"],
      shots: "10 welcome shots",
      mixers: "Premium mixers",
      host: "Personal host",
      extras: ["Bar bites included", "Fast-track / VIP entry"],
      accent: "#f3b53b",
      featured: true,
    },
    {
      key: "rocafella",
      label: "Roc-A-Fella",
      sofa: "Any VVIP Sofa",
      pax: "10 — 15 pax",
      price: "65,000",
      tier: "Luxury",
      bottles: ["Don Julio 1942", "Armand de Brignac"],
      shots: "10 welcome shots",
      mixers: "Luxury mixers",
      host: "Personal host",
      extras: ["Bar bites included", "Fast-track / VIP entry"],
      accent: "#4cc3ff",
    },
    {
      key: "defjam",
      label: "Def Jam",
      sofa: "VVIP Sofa",
      pax: "10 — 15 pax",
      price: "150,000",
      tier: "Ultra",
      bottles: ["Don Julio 1942", "Dom Pérignon", "Armand de Brignac", "Macallan 18Y"],
      shots: "15 welcome shots",
      mixers: "Luxury mixers",
      host: "Dedicated team",
      extras: ["Bar bites included", "Personalised LED banner"],
      accent: "#4cc3ff",
      featured: true,
    },
  ];

  return (
    <section className="section" id="lounges">
      <div className="container">
        <div className="section__head">
          <div className="num">04</div>
          <div className="titles">
            <div className="title">The <em>Lounges</em></div>
            <div className="thai">เลานจ์ & แพ็กเกจเครื่องดื่ม · 2–15 คน</div>
          </div>
        </div>

        <div className="lounges__intro">
          <p>
            Our lounge packages — named after the labels that built the sound.
            Pick by group size, sofa type, and how hard you plan on going.
            All packages include reserved entry, your own bottles, mixers, and a server who'll actually find you.
          </p>
          <p className="thai">
            เลือกแพ็กเกจตามจำนวนคน · ตั้งแต่ 2 ถึง 15 ท่าน · จองล่วงหน้าผ่านทีมงาน
          </p>
        </div>

        <div className="packages">
          {packages.map(p => (
            <article key={p.key} className={`package ${p.featured ? "package--featured" : ""}`} style={{"--pkg-accent": p.accent}}>
              <div className="package__head">
                <div className="package__label-row">
                  <span className="package__label">{p.label}</span>
                  <span className="package__tier">{p.tier}</span>
                </div>
                <div className="package__sofa">{p.sofa}</div>
                <div className="package__pax">{p.pax} · VIP Admission</div>
              </div>

              <div className="package__price">
                <span className="package__price-amt">฿{p.price}</span>
                <span className="package__price-cur">THB</span>
              </div>

              <div className="package__bottles">
                {p.bottles.map((b, i) => (
                  <span key={i} className="package__bottle">{b}</span>
                ))}
              </div>

              <ul className="package__inc">
                <li><span className="package__inc-k">Shots</span><span className="package__inc-v">{p.shots}</span></li>
                <li><span className="package__inc-k">Mixers</span><span className="package__inc-v">{p.mixers}</span></li>
                <li><span className="package__inc-k">Service</span><span className="package__inc-v">{p.host}</span></li>
                {p.extras.map((e, i) => (
                  <li key={i} className="package__inc--extra"><span className="package__inc-k">+</span><span className="package__inc-v">{e}</span></li>
                ))}
              </ul>

              <a className="package__cta" href="#lounges-contact">Enquire</a>
            </article>
          ))}
        </div>

        <div className="packages__note">
          <span className="packages__note-k">All packages include</span>
          <span className="packages__note-v">Reserved seating · VIP entry · Dedicated service</span>
        </div>

        <div className="custom-cta">
          <div className="custom-cta__copy">
            <span className="custom-cta__kicker">Custom · Birthdays · Brand activations</span>
            <h3 className="custom-cta__title">
              Want something <em>custom?</em>
            </h3>
            <p className="custom-cta__body">
              Bigger group, milestone birthday, brand takeover, corporate night?
              We build packages around the night — anything from a private lounge
              with bespoke pours, to a full venue buyout with branding, photographer,
              and red carpet. Talk to us — we'll build something none of the templates cover.
            </p>
            <p className="custom-cta__thai">
              จัดงานวันเกิด · จัดงานบริษัท · จัดงานพิเศษ · ติดต่อทีมงาน
            </p>
          </div>
          <div className="custom-cta__actions">
            <a className="custom-cta__btn custom-cta__btn--primary" href="mailto:info@oscbkk.com?subject=Custom%20Package%20Enquiry%20%E2%80%94%20OSCBKK">Get in touch →</a>
            <a className="custom-cta__btn custom-cta__btn--ghost" href="https://m.me/oldschoolchillbkk" target="_blank" rel="noopener">Or message us on Messenger</a>
          </div>
        </div>

        <div className="lounges__contact" id="lounges-contact">
          <div className="lounges__contact-copy">
            <h4>Reserve a lounge</h4>
            <p>Drop us a message — we'll come back within the day with availability for 20 June and confirm your package.</p>
            <p className="thai">ติดต่อทีมงานเพื่อจองและสอบถามรายละเอียด</p>
          </div>
          <div className="lounges__contact-grid">
            <a className="lounges__contact-card lounges__contact-card--soon" href="#" aria-disabled="true" onClick={(e) => e.preventDefault()}>
              <span className="k">LINE <span className="lounges__soon">Soon</span></span>
              <span className="v">@oscbkk</span>
            </a>
            <a className="lounges__contact-card" href="https://m.me/oldschoolchillbkk" target="_blank" rel="noopener">
              <span className="k">Messenger</span>
              <span className="v">@oldschoolchillbkk</span>
            </a>
            <a className="lounges__contact-card" href="https://instagram.com/oldschoolchillbkk" target="_blank" rel="noopener">
              <span className="k">Instagram DM</span>
              <span className="v">@oldschoolchillbkk</span>
            </a>
            <a className="lounges__contact-card" href="mailto:info@oscbkk.com">
              <span className="k">Email</span>
              <span className="v">info@oscbkk.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
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
            <li className="foot__col-soon"><span>LINE Official</span><span className="foot__soon">Soon</span></li>
            <li className="foot__col-soon"><span>Spotify Mixtapes</span><span className="foot__soon">Soon</span></li>
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
            <li><a href="mailto:info@oscbkk.com">info@oscbkk.com</a></li>
            <li><a href="#lounges">Lounges / โต๊ะ</a></li>
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
