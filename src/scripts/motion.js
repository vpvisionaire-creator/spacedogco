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

  // Toolbox = the trigger. Click smoothly scrolls into the pinned deploy section.
  const triggers = document.querySelectorAll("[data-toolbox-trigger]");
  const target = document.querySelector("#toolkit-section");
  triggers.forEach((t) =>
    t.addEventListener("click", () => {
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + 2, behavior: REDUCED ? "auto" : "smooth" });
    })
  );
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
  const handle = knife.querySelector(".knife-handle");

  // Each blade is rendered OPEN in the artwork. "open" attr = its natural angle.
  // CLOSED = folded into the handle: the back tool (interview) folds to the 180°
  // axis, every other blade folds to the 0° axis (tucked right into the handle).
  // We normalize the delta to the short way around so blades fold naturally.
  const openAngle = (el) => parseFloat(el.dataset.open || 0);
  const foldAxis  = (el) => (el.dataset.blade === "interview" ? 180 : 0);
  const closedDelta = (el) => {
    let d = foldAxis(el) - openAngle(el);
    while (d > 180) d -= 360;
    while (d < -180) d += 360;
    return d;
  };

  // ---- Reduced motion: no pin, show finished knife ----
  if (REDUCED) {
    section.style.minHeight = "100vh";
    gsap.set(knife, { opacity: 1, scale: 1 });
    gsap.set(blades, { opacity: 1, rotate: 0 });
    gsap.set(labels, { opacity: 1 });
    labels.forEach((l) => l.classList.add("is-in"));
    if (toolbox) gsap.set(toolbox, { autoAlpha: 0, display: "none" });
    if (chaos) gsap.set(chaos, { autoAlpha: 0, display: "none" });
    if (headline) gsap.to(headline, {
      opacity: 1, duration: 0.5,
      scrollTrigger: { trigger: headline, start: "top 85%" },
    });
    return;
  }

  // ---- Full experience ----
  // initial: knife hidden, blades folded closed + invisible
  gsap.set(knife, { opacity: 0, scale: 0.9 });
  gsap.set(blades, { opacity: 0, rotate: (i) => closedDelta(blades[i]), scale: 0.92 });
  gsap.set(labels, { opacity: 0, y: 6 });
  if (headline) gsap.set(headline, { opacity: 0, y: 20 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // PHASE 1 (problem): toolbox opens, chaos tags scatter, then fade
  if (toolbox) {
    tl.to(toolbox, { autoAlpha: 1, scale: 1, duration: 0.4 }, 0);
    tl.to(toolbox, { className: "+=is-open", duration: 0.01 }, 0.35);
  }
  if (chaos) {
    const tags = chaos.querySelectorAll("[data-chaos-tag]");
    tl.fromTo(tags,
      { autoAlpha: 0, scale: 0.6, rotate: () => gsap.utils.random(-25, 25), x: 0, y: 0 },
      { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.03 }, 0.15);
    tl.to(tags, { autoAlpha: 0, scale: 0.4, duration: 0.4, stagger: 0.02 }, 0.85);
    tl.to(toolbox, { autoAlpha: 0, duration: 0.4 }, 0.9);
  }

  // PHASE 2 (solution): knife fades to center, closed
  tl.to(knife, { opacity: 1, scale: 1, duration: 0.5 }, 1.0);

  // PHASE 3 (deploy): each blade rotates closed→open, label reveals,
  // handle (with dog mark) pulses on each deploy.
  blades.forEach((blade, i) => {
    const at = 1.5 + i * 0.45;
    tl.to(blade, {
      opacity: 1, rotate: 0, scale: 1,
      duration: 0.4, ease: "power3.out",
      onStart: () => blade.classList.add("is-active"),
      onComplete: () => blade.classList.remove("is-active"),
      onReverseComplete: () => blade.classList.remove("is-active"),
    }, at);
    if (labels[i]) {
      tl.to(labels[i], {
        opacity: 1, y: 0, duration: 0.3,
        onStart: () => labels[i].classList.add("is-in"),
        onReverseComplete: () => labels[i].classList.remove("is-in"),
      }, at + 0.05);
    }
    if (handle) {
      tl.to(handle, { scale: 1.06, duration: 0.1, ease: "power2.out" }, at)
        .to(handle, { scale: 1.0, duration: 0.18, ease: "power2.inOut" }, at + 0.1);
    }
  });

  // Headline after full deployment
  if (headline) {
    tl.to(headline, { opacity: 1, y: 0, duration: 0.5 }, 1.5 + blades.length * 0.45 + 0.2);
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
