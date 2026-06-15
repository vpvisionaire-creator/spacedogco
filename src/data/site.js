// ============================================================
// SPACEDOG — content data
// Replace `media` paths with real Spacedog assets (see ASSETS.md).
// All titles below are REAL portfolio references — no stock.
// ============================================================

export const NAV = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// The 8 blades of the Swiss Army knife — capability -> blade.
// `angle` = open angle in degrees from the closed (horizontal) position.
// Top blades fan up (negative), bottom blades fan down (positive).
export const BLADES = [
  { id: "branding",      name: "Branding",                     tip: "Identity systems, naming, and brand worlds built to last.", side: "top",    angle: -64 },
  { id: "social",        name: "Social + Live Experiential",   tip: "Social-first content and live activations that move culture.", side: "top",   angle: -32 },
  { id: "campaigns",     name: "Brand Campaigns",              tip: "End-to-end campaigns from concept through delivery.", side: "top",          angle: -8  },
  { id: "commercials",   name: "Commercials",                  tip: "Broadcast and digital spots, produced in-house.", side: "right", angle: 0   },
  { id: "music",         name: "Music Videos",                 tip: "Artist-driven films with cultural credibility.", side: "bottom", angle: 18  },
  { id: "editorial",     name: "Editorial Shoots — Photo + Video", tip: "Editorial photography and motion for brands and press.", side: "bottom", angle: 40 },
  { id: "docu",          name: "Docu-Style",                   tip: "Documentary storytelling, real and unscripted.", side: "bottom", angle: 62 },
  { id: "interview",     name: "Interview + In-House Production", tip: "Full in-house production and post, start to finish.", side: "left",  angle: 180 },
];

// Curated — "Selected Missions". Real Spacedog work.
export const PROJECTS = [
  { id: "greedy-unit",   title: "Greedy Unit x Nike",       category: "Brand Campaign",   descriptor: "A street-rooted campaign for Nike, built with Greedy Unit.", media: "/media/projects/greedy-unit.svg" },
  { id: "af1",           title: "Nike Air Force 1",         category: "Commercial",       descriptor: "A commercial honoring an icon of the city.",                media: "/media/projects/af1.svg" },
  { id: "trenches",      title: "Nike Dunks — The Trenches",category: "Commercial",       descriptor: "Dunks, shot raw, where the culture lives.",                 media: "/media/projects/trenches.svg" },
  { id: "hypebeast",     title: "Hypebeast x Facebook Gaming", category: "Branded Content", descriptor: "Gaming culture, framed for Hypebeast.",                  media: "/media/projects/hypebeast.svg" },
  { id: "barriers",      title: "Barriers x RUN DMC",       category: "Brand Campaign",   descriptor: "A heritage collab told through movement.",                  media: "/media/projects/barriers.svg" },
  { id: "nina-chanel",   title: "Nina Chanel x Jordan",     category: "Editorial",        descriptor: "Art and Jordan, in conversation.",                          media: "/media/projects/nina-chanel.svg" },
  { id: "c4-yachty",     title: "C4 Energy x Lil Yachty",   category: "Branded Content",  descriptor: "Energy, attitude, and Yachty.",                             media: "/media/projects/c4-yachty.svg" },
  { id: "snkrs",         title: "Nike SNKRS Feature",       category: "Branded Content",  descriptor: "A feature for the SNKRS platform.",                         media: "/media/projects/snkrs.svg" },
  { id: "boston-richey", title: "Boston Richey",            category: "Music Video",      descriptor: "Artist-driven visual, shot on location.",                   media: "/media/projects/boston-richey.svg" },
  { id: "tia-corine",    title: "Tia Corine",               category: "Music Video",      descriptor: "Color, energy, and identity.",                              media: "/media/projects/tia-corine.svg" },
  { id: "chainsmokers",  title: "Chainsmokers — Live",      category: "Music Video",      descriptor: "Live capture, cinematic edit.",                             media: "/media/projects/chainsmokers.svg" },
  { id: "flipp-dinero",  title: "Flipp Dinero",             category: "Music Video",      descriptor: "A music video built around the record.",                    media: "/media/projects/flipp-dinero.svg" },
];

export const FILTERS = ["All", "Commercials", "Music Videos", "Branded Content", "Editorial", "Docu"];

// CAPABILITIES — clean list, CAP IDs
export const CAPABILITIES = [
  "Branding",
  "Brand Campaigns",
  "Commercial Production",
  "Music Videos",
  "Docu-Style Storytelling",
  "Editorial Shoots",
  "Photography",
  "Social Campaigns",
  "Live Experiential",
  "Interviews",
  "In-House Production",
  "Creative Direction",
  "Production + Post",
];

// Credibility — REAL references only. Replace with logo files when available.
export const CLIENTS = [
  "Nike", "Jordan", "Hypebeast", "Facebook Gaming",
  "Barriers", "C4 Energy", "Romeo Santos", "Liquid I.V.",
];

export const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/spacedog" },
  { label: "Vimeo",     href: "https://vimeo.com/spacedog" },
  { label: "TikTok",    href: "https://tiktok.com/@spacedog" },
];
