/* Shared full-screen photo viewer. Used by the front-page recap teaser
   (app.jsx) and the standalone archive (gallery-page.jsx), so the viewer
   behaves identically in both places.

   Props: shots — [{ src, alt }], index — current position, onClose, onIndex. */
function Lightbox({ shots, index, onClose, onIndex }) {
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % shots.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + shots.length) % shots.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [index, shots.length, onClose, onIndex]);

  const step = (d) => (e) => { e.stopPropagation(); onIndex((index + d + shots.length) % shots.length); };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button className="lightbox__close" type="button" onClick={onClose} aria-label="Close">×</button>
      <button className="lightbox__nav lightbox__nav--prev" type="button" onClick={step(-1)} aria-label="Previous photo">‹</button>
      <img className="lightbox__img" src={shots[index].src} alt={shots[index].alt} onClick={(e) => e.stopPropagation()} />
      <button className="lightbox__nav lightbox__nav--next" type="button" onClick={step(1)} aria-label="Next photo">›</button>
      <span className="lightbox__count">
        {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
      </span>
    </div>
  );
}

/* Build the shot list for an edition from the registry entry in editions.js. */
function editionShots(ed) {
  return Array.from({ length: ed.count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      n,
      src: `assets/gallery/${ed.slug}/${n}.jpg`,
      alt: `Old School & Chill Bangkok — ${ed.label} — photo ${n}`,
      portrait: (ed.portrait || []).includes(i + 1),
    };
  });
}

Object.assign(window, { Lightbox, editionShots });
