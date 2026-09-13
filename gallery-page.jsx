/* Standalone gallery archive. One block per edition, newest first, each with
   its own anchor id (gallery.html#vol-01) so a single edition can be linked
   directly. Content comes entirely from window.OSC_EDITIONS in editions.js. */

function EditionBlock({ ed, n }) {
  const shots = editionShots(ed);
  const [open, setOpen] = React.useState(null);

  return (
    <section className="section ged" id={ed.slug}>
      <div className="container">
        <div className="section__head">
          <div className="titles">
            <div className="title">{ed.label} <em>Gallery</em></div>
            <div className="thai">{ed.dateTh}</div>
          </div>
        </div>

        <div className="ged__meta">
          <div className="ged__meta-col">
            <span className="ged__k">Date</span>
            <span className="ged__v">{ed.date}</span>
          </div>
          <div className="ged__meta-col">
            <span className="ged__k">Venue</span>
            <span className="ged__v">{ed.venue}</span>
          </div>
          <div className="ged__meta-col">
            <span className="ged__k">Photos</span>
            <span className="ged__v">{ed.count}</span>
          </div>
          <a className="ged__share" href={`#${ed.slug}`} aria-label={`Direct link to the ${ed.label} gallery`}>
            Link to this gallery
          </a>
        </div>

        <div className="ged__body">
        <div className="ged__side">
        {ed.art && (
          <div className="ged__art">
            <img src={ed.art} alt={`${ed.label} — event artwork`} loading="lazy" />
          </div>
        )}
        {ed.video ? (
          <div className={"ged__video" + (ed.videoVertical ? " ged__video--vertical" : "")}>
            <iframe
              src={ed.video}
              title={`${ed.label} recap video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ) : (
          <div className="ged__video ged__video--empty">
            <span className="recap__play" aria-hidden="true">▶</span>
            <span className="recap__video-k">Recap Video</span>
            <p className="recap__video-note">Dropping soon · เร็ว ๆ นี้</p>
          </div>
        )}
        </div>

        <div className="gallery__grid">
          {shots.map((s, i) => (
            <button
              key={s.n}
              type="button"
              className={`gallery__cell ${s.portrait ? "gallery__cell--tall" : ""}`}
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${s.n} full size`}
            >
              <img className="gallery__img" src={s.src} alt={s.alt} loading="lazy" />
              <span className="gallery__tag">{s.n}</span>
            </button>
          ))}
        </div>
        </div>
      </div>

      {open !== null && (
        <Lightbox shots={shots} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </section>
  );
}

const GNAV_LINKS = [
  ["index.html#night", "Next Event"],
  ["index.html#lounges", "Bookings"],
  ["gallery.html", "Gallery"],
  ["index.html#jams", "OSC Radio"],
  ["index.html#venue", "Venue"],
  ["index.html#rules", "Rules"],
  ["index.html#contact", "Contact"],
];

/* Edition picker — dropdown of dates that jumps to that edition's gallery. */
function EditionMenu({ eds }) {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState(() => (location.hash || "").slice(1));
  const wrapRef = React.useRef(null);
  React.useEffect(() => {
    const onHash = () => setCurrent((location.hash || "").slice(1));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  const active = eds.find((e) => e.slug === current);
  return (
    <div className={"nav__menu" + (open ? " is-open" : "")} ref={wrapRef}>
      <button type="button" className="nav__menu-btn" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)}>
        {active ? active.label : "Choose a date"}
        <span className="nav__menu-caret" aria-hidden="true"></span>
      </button>
      <div className="nav__panel" role="menu" hidden={!open}>
        {eds.map((e) => (
          <a
            key={e.slug}
            href={`#${e.slug}`}
            role="menuitem"
            className={e.slug === current ? "is-current" : ""}
            onClick={() => setOpen(false)}
          >{e.label}</a>
        ))}
      </div>
    </div>
  );
}

function GalleryPage() {
  const eds = window.OSC_EDITIONS || [];
  const [navOpen, setNavOpen] = React.useState(false);
  const burgerRef = React.useRef(null);
  React.useEffect(() => {
    if (!navOpen) return;
    const onDown = (e) => { if (burgerRef.current && !burgerRef.current.contains(e.target)) setNavOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setNavOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [navOpen]);

  return (
    <>
      <nav className="nav">
        <a className="nav__brand" href="index.html">
          <img className="nav__logo" src="assets/OSC-logo-nav.png" alt="Old School &amp; Chill" />
          <span className="sub">First Saturday Monthly</span>
        </a>
        <div className="nav__links">
          {GNAV_LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>
        <div className="nav__end">
          <div className={"nav__burger" + (navOpen ? " is-open" : "")} ref={burgerRef}>
            <button type="button" className="nav__burger-btn" aria-expanded={navOpen} aria-label="Menu" onClick={() => setNavOpen(v => !v)}>
              <span className="nav__menu-bars" aria-hidden="true"><i></i><i></i><i></i></span>
            </button>
            <div className="nav__panel" role="menu" hidden={!navOpen}>
              {GNAV_LINKS.map(([href, label]) => (
                <a key={href} href={href} role="menuitem" onClick={() => setNavOpen(false)}>{label}</a>
              ))}
            </div>
          </div>
          <a className="nav__cta" href="index.html#tickets">Tickets</a>
        </div>
      </nav>

      <header className="ghead">
        <div className="container">
          <span className="ghead__eyebrow">Photos &amp; Recap Videos</span>
          <h1 className="ghead__title">The <em>Galleries</em></h1>
          <p className="ghead__thai">ภาพและวิดีโอจากทุกคืน</p>
          <p className="ghead__lede">
            Every edition, every night, in order. Click any photo to open it
            full size.
          </p>
          <EditionMenu eds={eds} />
        </div>
      </header>

      {eds.length ? (
        eds.map((ed, i) => <EditionBlock key={ed.slug} ed={ed} n={eds.length - i} />)
      ) : (
        <section className="section">
          <div className="container"><p className="gallery__lede">Galleries are on the way.</p></div>
        </section>
      )}

      <footer className="foot">
        <div className="foot__top">
          <a className="foot__brand" href="index.html">Old School &amp; Chill</a>
          <a className="foot__back" href="index.html">← Back to the site</a>
        </div>
      </footer>
    </>
  );
}

/* Jump to the deep-linked edition once the page has painted. */
function scrollToHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
}

ReactDOM.createRoot(document.getElementById("root")).render(<GalleryPage />);
requestAnimationFrame(() => setTimeout(scrollToHash, 60));
window.addEventListener("hashchange", scrollToHash);
