// ============================================================
// SPACEDOG — motion system
// GSAP + ScrollTrigger. Loaded as a module from the layout.
// Respects prefers-reduced-motion: fades only, no transforms,
// and the knife section deploys instantly without pinning.
// ============================================================
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("gsap-ready");

const BLADE_ORDER = [
  "branding", "social", "campaigns", "commercials",
  "music", "editorial", "docu", "interview",
];

/* ---------- 1. Generic scroll reveals ---------- */
function initReveals() {
  const items = gsap.utils.toArray("[data-reveal]");
  items.forEach((el) => {
    const delay = parseFloat(el.dataset.delay || 0);
    if (REDUCED) {
      gsap.to(el, {
        opacity: 1, duration: 0.4, delay,
        scrollTrigger: { trigger: el, start: "top 85%" },
        onStart: () => el.classList.add("is-in"),
      });
      return;
    }
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.6, delay, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
      onStart: () => el.classList.add("is-in"),
    });
  });
}

/* ---------- 2. Hero entrance ---------- */
function initHero() {
  const hero = document.querySelector("[data-hero]");
  if (!hero) return;
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const targets = hero.querySelectorAll("[data-hero-item]");
  if (REDUCED) {
    tl.from(targets, { opacity: 0, duration: 0.5, stagger: 0.1 });
  } else {
    tl.from(targets, { opacity: 0, y: 24, duration: 0.9, stagger: 0.15 });
  }
  // Scroll hint fades after 3s
  const hint = hero.querySelector("[data-scroll-hint]");
  if (hint) gsap.to(hint, { opacity: 0, delay: 3, duration: 0.8 });
}

/* ---------- 3. THE KNIFE — signature pinned deployment ---------- */
function initKnife() {
  const section = document.querySelector("#toolkit-section");
  const knife = document.querySelector("#knife");
  if (!section || !knife) return;

  const blades = BLADE_ORDER
    .map((id) => knife.querySelector(`[data-blade="${id}"]`))
    .filter(Boolean);
  const labels = BLADE_ORDER
    .map((id) => knife.querySelector(`[data-label="${id}"]`))
    .filter(Boolean);
  const toolbox = section.querySelector("[data-toolbox]");
  const chaos   = section.querySelector("[data-chaos]");
  const headline = section.querySelector("[data-knife-headline]");
  const dogMark = knife.querySelector(".dog-mark");

  // Open angles come from the data attribute set in markup (rotation target).
  const angleFor = (el) => parseFloat(el.dataset.angle || 0);

  // ---- Reduced motion: no pin, just reveal the finished knife ----
  if (REDUCED) {
    section.style.minHeight = "100vh";
    blades.forEach((b) => gsap.set(b, { opacity: 1, scale: 1, rotate: angleFor(b) }));
    gsap.set(labels, { opacity: 1 });
    labels.forEach((l) => l.classList.add("is-in"));
    if (toolbox) gsap.set(toolbox, { opacity: 0, display: "none" });
    if (chaos) gsap.set(chaos, { opacity: 0, display: "none" });
    if (headline) gsap.to(headline, {
      opacity: 1, duration: 0.5,
      scrollTrigger: { trigger: headline, start: "top 85%" },
    });
    return;
  }

  // ---- Full experience: pin + scrub timeline ----
  // initial states
  gsap.set(knife, { opacity: 0, scale: 0.92 });
  gsap.set(blades, { opacity: 0, scale: 0.04, rotate: 0 });
  gsap.set(labels, { opacity: 0, y: 6 });
  if (headline) gsap.set(headline, { opacity: 0, y: 20 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=280%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // PHASE 1 (0–25%): toolbox + chaos visible, then fades
  if (toolbox) tl.to(toolbox, { opacity: 1, scale: 1, duration: 0.5 }, 0);
  if (chaos) {
    const tags = chaos.querySelectorAll("[data-chaos-tag]");
    tl.fromTo(tags,
      { opacity: 0, scale: 0.6, rotate: () => gsap.utils.random(-25, 25) },
      { opacity: 1, scale: 1, duration: 0.4, stagger: 0.04 }, 0.1);
    tl.to([toolbox, chaos], { opacity: 0, duration: 0.5 }, 0.9);
  }

  // PHASE 2 (25–40%): the knife appears, centered, calm
  tl.to(knife, { opacity: 1, scale: 1, duration: 0.5 }, 1.0);

  // PHASE 3 (40–100%): deploy each blade + its label, dog mark pulses
  blades.forEach((blade, i) => {
    const at = 1.5 + i * 0.5;          // stagger along the scrubbed timeline
    tl.to(blade, {
      opacity: 1, scale: 1, rotate: angleFor(blade),
      duration: 0.4, ease: "power3.out",
      onStart: () => blade.classList.add("is-active"),
      onReverseComplete: () => blade.classList.remove("is-active"),
    }, at)
      .to(labels[i], { opacity: 1, y: 0, duration: 0.3,
        onStart: () => labels[i] && labels[i].classList.add("is-in"),
      }, at + 0.05)
      // dog mark pulse on each deploy
      .to(dogMark, { scale: 1.12, duration: 0.12, transformOrigin: "510px 300px" }, at)
      .to(dogMark, { scale: 1.0, duration: 0.18 }, at + 0.12);
  });

  // Headline after full deployment
  if (headline) {
    tl.to(headline, { opacity: 1, y: 0, duration: 0.5 }, 1.5 + blades.length * 0.5 + 0.2);
  }
}

/* ---------- 4. Selected mission card hover (JS for touch parity is CSS) ---------- */
function initParallax() {
  if (REDUCED) return;
  const layers = gsap.utils.toArray("[data-parallax]");
  layers.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || 0.6);
    gsap.to(el, {
      yPercent: -(1 - speed) * 100,
      ease: "none",
      scrollTrigger: { trigger: el.closest("section") || el, start: "top bottom", end: "bottom top", scrub: true },
    });
  });
}

/* ---------- 5. Nav solid-on-scroll ---------- */
function initNav() {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;
  ScrollTrigger.create({
    start: "80px top",
    onUpdate: (self) => nav.classList.toggle("is-solid", self.scroll() > 80),
    onToggle: () => {},
  });
  // fallback immediate check
  nav.classList.toggle("is-solid", window.scrollY > 80);
}

/* ---------- boot ---------- */
function boot() {
  initNav();
  initHero();
  initReveals();
  initKnife();
  initParallax();
  ScrollTrigger.refresh();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

// keep triggers accurate when assets/fonts settle
window.addEventListener("load", () => ScrollTrigger.refresh());
