/* ===================== EDITIONS REGISTRY =====================
   Single source of truth for every past edition's gallery + recap video.
   Loaded by BOTH index.html (front-page recap teaser) and gallery.html
   (the standalone archive), so an edition is only ever described once.

   To add a new edition:
   1. Drop the processed photos in assets/gallery/<slug>/ named 01.jpg, 02.jpg …
      (1600px long edge, watermarked — see the processing notes in CLAUDE.md).
   2. Add an entry to the TOP of OSC_EDITIONS below.
   3. Point `art` at that edition's poster artwork. Set `count` to how many photos are in the folder, and list any portrait
      frames in `portrait` so the grid gives them a taller span.
   4. Paste the recap video's YouTube/Vimeo embed URL into `video` (or leave
      null for a "coming soon" slot).

   Naming: each edition is identified by its DATE, not a volume number —
   `label` is the short form ("Sat 1 August 2026") used in titles and nav,
   `slug` is the folder + anchor ("1-august-2026").

   Deep links: gallery.html#20-june-2026 jumps straight to that edition. */
window.OSC_EDITIONS = [
  {
    slug: "5-september-2026",
    label: "Sat 5 September 2026",
    date: "Saturday 5 September 2026",
    dateTh: "วันเสาร์ที่ 5 กันยายน 2569",
    venue: "Aces Nightclub · Sukhumvit Soi 11",
    blurb: "",
    blurbTh: "",
    art: "assets/poster-5-september-2026.jpg",
    count: 51,
    portrait: [1,2,6,7,8,9,10,11,12,13,14,19,21,22,23,24,25,26,29,32,33,36,37,38,39,40,41,42,44,45,46,50,51],
    video: "https://www.youtube.com/embed/m7qHEFgU9IY?autoplay=1&mute=1&loop=1&playlist=m7qHEFgU9IY&playsinline=1&rel=0&modestbranding=1",
    videoVertical: true,
  },
  {
    slug: "1-august-2026",
    label: "Sat 1 August 2026",
    date: "Saturday 1 August 2026",
    dateTh: "วันเสาร์ที่ 1 สิงหาคม 2569",
    venue: "Aces Nightclub · Sukhumvit Soi 11",
    blurb: "",
    blurbTh: "",
    art: "assets/poster-1-august-2026.jpg",
    count: 54,
    portrait: [1, 6, 19, 24, 25, 26, 27, 28, 29, 31, 33, 34, 35, 36, 37, 38, 39, 40, 42, 44, 46, 47, 52],
    video: "https://www.youtube.com/embed/9xPwUC6DncA?autoplay=1&mute=1&loop=1&playlist=9xPwUC6DncA&playsinline=1&rel=0&modestbranding=1",
    videoVertical: true,
  },
  {
    slug: "20-june-2026",
    label: "Sat 20 June 2026",
    date: "Saturday 20 June 2026",
    dateTh: "วันเสาร์ที่ 20 มิถุนายน 2569",
    venue: "Aces Nightclub · Sukhumvit Soi 11",
    blurb: "The first one. Sold out before most people knew the brand existed.",
    blurbTh: "คืนแรกของ Old School & Chill · บัตรหมดก่อนใครจะรู้จักเราด้วยซ้ำ",
    art: "assets/poster-vol01.png",
    count: 57,
    portrait: [2, 6, 8, 14, 22, 23, 47],
    video: "https://www.youtube.com/embed/WcFnQ2VrepI?autoplay=1&mute=1&loop=1&playlist=WcFnQ2VrepI&playsinline=1&rel=0&modestbranding=1",
    videoVertical: true,
  },
];
