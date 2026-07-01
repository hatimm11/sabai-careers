import React, { useState, useEffect, useRef } from "react";
import {
  Shield, Star, Check, Sparkles, Phone,
  BadgeCheck, MessageCircle, TrendingUp, CalendarHeart,
  HandHeart, GraduationCap, Plane, Send, Camera, X, Share2
} from "lucide-react";

/* ===== Contact / integrations ===== */
const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || "966595552292";
const LICENSE = import.meta.env.VITE_LICENSE || "4334299910";
const SHEET_ENDPOINT = import.meta.env.VITE_SHEET_ENDPOINT || "https://script.google.com/macros/s/AKfycbylpULjsq5J7FcLhIbeQe8nTKfYAkcmAPNwW7EmKr1KtPt98NcohdgBvErShst4rgG6/exec";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Mulish:wght@300;400;500;600;700&family=El+Messiri:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700&family=Noto+Serif+Thai:wght@500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap');
.sb{
  --cream:#FFFFFF; --cream-2:#FBF4F6; --cream-3:#F2EEF6;
  --gold:#7E9B6E; --gold-lt:#A7C295; --gold-dk:#5C7A4C; --gold-soft:#DCE8D2;
  --rose:#E59AAC; --rose-lt:#F4C7D2; --rose-soft:#FCEEF2; --blossom:#F0AFC0;
  --magenta:#C25B7E; --coral:#E0879A; --sage:#8FAE82; --wa:#1faf55;
  --ink:#3F3350; --ink-2:#6E627C; --line:rgba(92,122,76,.22);
  --shadow:0 18px 50px -24px rgba(60,48,80,.40); --shadow-sm:0 8px 24px -14px rgba(60,48,80,.34);
  --r:22px;
  color:var(--ink); background:#fff;
  font-family:'Mulish',system-ui,sans-serif; line-height:1.7; -webkit-font-smoothing:antialiased; overflow-x:hidden; position:relative;
}
.sb[dir="rtl"]{ font-family:'Tajawal',system-ui,sans-serif; }
.sb[data-lang="th"]{ font-family:'Noto Sans Thai',system-ui,sans-serif; }
.sb *{ box-sizing:border-box; }
.sb h1,.sb h2,.sb h3,.sb .disp{ font-family:'Playfair Display',serif; font-weight:600; line-height:1.14; }
.sb[dir="rtl"] h1,.sb[dir="rtl"] h2,.sb[dir="rtl"] h3{ font-family:'El Messiri',serif; line-height:1.35; }
.sb[data-lang="th"] h1,.sb[data-lang="th"] h2,.sb[data-lang="th"] h3{ font-family:'Noto Serif Thai',serif; line-height:1.4; }
.sb button{ font-family:inherit; cursor:pointer; border:none; background:none; }
.sb a{ color:inherit; text-decoration:none; }
.wrap{ max-width:1100px; margin:0 auto; padding:0 22px; }
.sec{ padding:62px 0; }
@media(max-width:760px){ .sec{ padding:44px 0; } }
.eyebrow{ display:inline-flex; align-items:center; gap:10px; font-size:12px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:var(--gold-dk); }
.sb[dir="rtl"] .eyebrow,.sb[data-lang="th"] .eyebrow{ letter-spacing:.04em; text-transform:none; }
.eyebrow::before{ content:""; width:26px; height:1px; background:linear-gradient(90deg,transparent,var(--gold)); }
.title{ font-size:clamp(26px,4vw,42px); margin:12px 0 0; }
.lede{ color:var(--ink-2); font-size:clamp(15px,1.6vw,18px); }
.center{ text-align:center; }
.btn{ display:inline-flex; align-items:center; justify-content:center; gap:9px; padding:15px 28px; border-radius:999px; font-weight:700; font-size:15px; transition:transform .25s, box-shadow .25s; }
.btn-gold{ color:#fff; background:linear-gradient(135deg,var(--gold-lt),var(--gold) 55%,var(--gold-dk)); box-shadow:0 12px 26px -12px rgba(92,122,76,.5); }
.btn-gold:hover{ transform:translateY(-2px); }
.btn-wa{ color:#fff; background:#1faf55; background:linear-gradient(135deg,#25d366,#1faf55); box-shadow:0 12px 26px -12px rgba(31,175,85,.6); }
.btn-wa:hover{ transform:translateY(-2px); }
.btn-ghost{ color:var(--gold-dk); border:1.5px solid var(--line); background:#fff; }
.btn-ghost:hover{ border-color:var(--gold); }
.fil{ display:flex; align-items:center; justify-content:center; gap:14px; color:var(--rose); }
.fil span{ height:1px; width:80px; background:linear-gradient(90deg,transparent,var(--gold)); }
.fil span:last-child{ background:linear-gradient(270deg,transparent,var(--gold)); }
.card{ background:#fff; border:1px solid var(--line); border-radius:var(--r); box-shadow:var(--shadow-sm); transition:transform .3s, box-shadow .3s, border-color .3s; }
.card:hover{ transform:translateY(-4px); box-shadow:var(--shadow); border-color:var(--gold-lt); }
.women{ display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:999px; background:var(--rose-soft); color:var(--magenta); font-weight:700; font-size:13px; }

.nav{ position:sticky; top:0; z-index:50; backdrop-filter:blur(12px); background:rgba(255,255,255,.55); border-bottom:1px solid var(--line); }
.nav-in{ display:flex; align-items:center; gap:12px; height:70px; }
.logo{ display:flex; align-items:center; gap:10px; }
.logo .mk{ width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--rose-soft);border:1px solid var(--line);color:var(--rose); }
.logo .nm{ font-family:'Playfair Display',serif; font-weight:700; font-size:22px; }
.sb[dir="rtl"] .logo .nm{ font-family:'El Messiri',serif; }
.sb[data-lang="th"] .logo .nm{ font-family:'Noto Serif Thai',serif; }
.logo .su{ font-size:10px; color:var(--gold-dk); }
.nav-act{ margin-inline-start:auto; display:flex; gap:10px; align-items:center; }
.langs{ display:inline-flex; border:1px solid var(--line); border-radius:999px; overflow:hidden; background:#fff; }
.langs button{ padding:8px 12px; font-weight:700; font-size:12.5px; color:var(--ink-2); transition:all .2s; }
.langs button.on{ background:var(--gold-soft); color:var(--gold-dk); }
@media(max-width:620px){ .logo .su{ display:none; } .nav .desktop-cta{ display:none; } }

.top-wash{ position:absolute; inset-block-start:0; inset-inline:0; height:820px; z-index:-1; pointer-events:none;
  background:linear-gradient(118deg,#E6EFDE 0%,#F2F0E7 28%,#FBF6EF 50%,#FCEFF0 76%,#F7E5EB 100%);
  -webkit-mask-image:linear-gradient(180deg,#000 52%,transparent 100%); mask-image:linear-gradient(180deg,#000 52%,transparent 100%); }
.hero{ position:relative; padding:60px 0 66px; overflow:hidden; background:transparent; }
.hero-grid{ display:grid; grid-template-columns:1.15fr .85fr; gap:44px; align-items:center; }
@media(max-width:880px){ .hero-grid{ grid-template-columns:1fr; gap:30px; } }
.hero h1{ font-size:clamp(32px,5.4vw,54px); margin:16px 0 0; }
.hero h1 em{ font-style:italic; color:var(--gold-dk); }
.sb[dir="rtl"] .hero h1 em,.sb[data-lang="th"] .hero h1 em{ font-style:normal; color:var(--rose); }
.hero-cta{ display:flex; gap:12px; flex-wrap:wrap; margin-top:26px; }
.hero-mini{ display:flex; gap:20px; margin-top:24px; flex-wrap:wrap; font-size:13.5px; color:var(--ink-2); font-weight:600; }
.hero-mini div{ display:flex; align-items:center; gap:7px; } .hero-mini svg{ color:var(--gold); }
.hero-card{ aspect-ratio:4/5; border-radius:28px; overflow:hidden; border:1px solid var(--line); box-shadow:var(--shadow); position:relative; background:var(--rose-soft); }
.hero-photo{ width:100%; height:100%; object-fit:cover; object-position:center 18%; display:block; filter:saturate(1.06) contrast(1.02); animation:kenburns 22s ease-in-out infinite alternate; }
.hero-overlay{ position:absolute; inset:0; pointer-events:none; z-index:1; background:linear-gradient(180deg, rgba(217,138,151,.05) 0%, rgba(255,255,255,0) 36%, rgba(217,138,151,.16) 66%, rgba(46,36,56,.46)); box-shadow:inset 0 0 0 1px rgba(255,255,255,.55), inset 0 0 0 6px rgba(255,255,255,.12); }
.hero-card::after{ content:""; position:absolute; inset:0; border-radius:28px; pointer-events:none; box-shadow:inset 0 0 0 1px rgba(255,255,255,.22), inset 0 -60px 70px -40px rgba(46,36,56,.28); }
.hero-card .spark{ position:absolute; z-index:2; filter:drop-shadow(0 0 3px rgba(255,255,255,.9)); animation:twinkle 3s ease-in-out infinite; }
@keyframes kenburns{ from{ transform:scale(1.02) translate(0,0); } to{ transform:scale(1.12) translate(-1.5%,-2.4%); } }
@keyframes twinkle{ 0%,100%{ opacity:.35; transform:scale(.82) rotate(0deg); } 50%{ opacity:1; transform:scale(1) rotate(8deg); } }
.hero-cap{ position:absolute; z-index:3; inset-inline:14px; inset-block-end:14px; display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:18px; background:rgba(255,255,255,.8); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,.6); box-shadow:var(--shadow-sm); }
.hero-cap .mkbox{ width:42px;height:42px;border-radius:12px;flex:none;display:grid;place-items:center;background:var(--rose-soft);border:1px solid var(--line); }
.hero-cap-nm{ font-family:'Playfair Display',serif; font-weight:700; font-size:20px; color:var(--ink); line-height:1; }
.sb[dir="rtl"] .hero-cap-nm{ font-family:'El Messiri',serif; }
.sb[data-lang="th"] .hero-cap-nm{ font-family:'Noto Serif Thai',serif; }
.hero-cap-sub{ display:inline-flex; align-items:center; gap:6px; font-size:12.5px; font-weight:700; color:var(--magenta); margin-top:3px; }

.grid-3{ display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
.grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:18px; }
@media(max-width:880px){ .grid-3{ grid-template-columns:1fr 1fr; } }
@media(max-width:600px){ .grid-3,.grid-2{ grid-template-columns:1fr; } }
.perk{ padding:24px; }
.perk .ic{ width:48px;height:48px;border-radius:14px;display:grid;place-items:center;background:var(--gold-soft);color:var(--gold-dk);margin-bottom:14px; }
.perk h3{ font-size:18px; margin:0 0 6px; }
.perk p{ font-size:14px; color:var(--ink-2); margin:0; }

.stats{ background:#2E2438; color:#fff; border-radius:28px; padding:44px 34px; }
.stats-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:22px; }
@media(max-width:760px){ .stats-grid{ grid-template-columns:repeat(2,1fr); } }
.stat{ text-align:center; } .stat .ic{ color:var(--rose-lt); margin-bottom:6px; }
.stat .v{ font-family:'Playfair Display',serif; font-weight:700; font-size:clamp(26px,3.5vw,38px); color:#fff; }
.sb[dir="rtl"] .stat .v{ font-family:'El Messiri',serif; }
.stat .l{ font-size:13px; color:rgba(255,255,255,.72); margin-top:4px; }
.covers{ display:flex; flex-wrap:wrap; gap:10px; justify-content:center; margin-top:6px; }
.cover{ display:inline-flex; align-items:center; gap:8px; padding:9px 16px; border-radius:999px; background:rgba(255,255,255,.1); border:1px solid rgba(255,255,255,.2); color:#fff; font-weight:600; font-size:13.5px; }
.cover svg{ color:var(--rose-lt); }
.earn-amt{ font-family:'Playfair Display',serif; font-weight:700; font-size:clamp(34px,6vw,52px); color:#fff; }
.sb[dir="rtl"] .earn-amt{ font-family:'El Messiri',serif; }

.steps-card{ padding:20px; display:flex; gap:14px; align-items:flex-start; }
.steps-card .num{ width:40px;height:40px;border-radius:12px;flex:none;display:grid;place-items:center;color:#fff;font-weight:700;background:linear-gradient(135deg,var(--gold-lt),var(--gold-dk)); }

.apply{ display:grid; grid-template-columns:1fr; gap:24px; align-items:start; max-width:640px; margin:0 auto; }
@media(max-width:820px){ .apply{ grid-template-columns:1fr; } }
.form{ padding:30px; }
.field{ margin-bottom:14px; }
.field label{ font-size:13px; font-weight:700; display:block; margin-bottom:6px; }
.field input,.field textarea,.field select{ width:100%; padding:12px 14px; border-radius:12px; border:1.5px solid var(--line); background:#fff; font-family:inherit; font-size:14.5px; color:var(--ink); }
.field input:focus,.field textarea:focus,.field select:focus{ outline:2px solid var(--gold-lt); }
.spec{ display:flex; flex-wrap:wrap; gap:8px; }
.spec button{ padding:9px 14px; border-radius:999px; border:1.5px solid var(--line); background:#fff; font-weight:600; font-size:13px; transition:all .15s; }
.spec button.on{ border-color:var(--gold); background:var(--gold-soft); color:var(--gold-dk); }
.wa-side{ padding:28px; text-align:center; background:var(--rose-soft); }
.wa-ic{ width:70px;height:70px;border-radius:50%;margin:0 auto 14px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,#25d366,#1faf55); box-shadow:0 14px 30px -14px rgba(31,175,85,.7); }
.cta-band{ background:#fff; border:1px solid var(--line); border-radius:28px; padding:50px 34px; text-align:center; }
footer.ft{ background:#2E2438; color:#fff; padding:44px 0 24px; margin-top:20px; }
.ft a,.ft p{ color:rgba(255,255,255,.74); font-size:14px; }
.ft a:hover{ color:var(--rose-lt); }
.ft-top{ display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; align-items:center; }
.ft-bottom{ border-top:1px solid rgba(255,255,255,.14); margin-top:28px; padding-top:18px; font-size:13px; color:rgba(255,255,255,.6); text-align:center; }
.fab{ position:fixed; inset-block-end:22px; inset-inline-end:22px; z-index:70; width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#fff;
  background:linear-gradient(135deg,#25d366,#1faf55); box-shadow:0 14px 30px -10px rgba(31,175,85,.7); animation:wapulse 2.2s infinite; }
@keyframes wapulse{ 0%{ box-shadow:0 0 0 0 rgba(37,211,102,.5); } 70%{ box-shadow:0 0 0 16px rgba(37,211,102,0); } 100%{ box-shadow:0 0 0 0 rgba(37,211,102,0); } }
.spin{ width:17px;height:17px;border-radius:50%;border:2.5px solid rgba(255,255,255,.45);border-top-color:#fff; animation:sp .7s linear infinite; }
@keyframes sp{ to{ transform:rotate(360deg); } }
.reveal{ opacity:0; transform:translateY(20px); transition:.7s; } .reveal.in{ opacity:1; transform:none; }
@media (prefers-reduced-motion: reduce){ .sb *{ animation:none!important; transition:none!important; } }
:focus-visible{ outline:2.5px solid var(--gold); outline-offset:2px; border-radius:6px; }
`;

const Lotus = ({ s = 22 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 21c-4-1.5-7-4.5-7-8 0 0 3 .5 4.5 3M12 21c4-1.5 7-4.5 7-8 0 0-3 .5-4.5 3M12 21V8M12 8c-1.5-2-1.5-4 0-6 1.5 2 1.5 4 0 6Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 13c-2-1.5-4.5-1.5-6.5 0M12 13c2-1.5 4.5-1.5 6.5 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);
/* Original Sabai brand mark: pink lotus + sage leaves + stacked spa stones */
const SabaiMark = ({ s = 40 }) => (
  <svg width={s} height={s} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <path d="M32 48C20 50 9 44 7 34c10-1 19 5 25 14Z" fill="var(--sage)" opacity=".85"/>
    <path d="M32 48c12 2 23-4 25-14-10-1-19 5-25 14Z" fill="var(--sage)" opacity=".85"/>
    <path d="M22 47C14 40 12 29 17 21c6 6 9 17 5 26Z" fill="var(--magenta)" opacity=".5"/>
    <path d="M42 47c8-7 10-18 5-26-6 6-9 17-5 26Z" fill="var(--magenta)" opacity=".5"/>
    <path d="M32 50C22 50 12 44 10 35c10-1 18 5 22 15Z" fill="var(--blossom)"/>
    <path d="M32 50c10 0 20-6 22-15-10-1-18 5-22 15Z" fill="var(--blossom)"/>
    <path d="M32 49c-4-9-4-19 0-27 4 8 4 18 0 27Z" fill="var(--rose)"/>
    <ellipse cx="32" cy="45" rx="8" ry="3.4" fill="#fff"/>
    <ellipse cx="32" cy="39.2" rx="6.2" ry="3" fill="#fff"/>
    <ellipse cx="32" cy="34" rx="4.4" ry="2.5" fill="#fff"/>
  </svg>
);
const Fil = () => <div className="fil" aria-hidden="true"><span /><Lotus s={18} /><span /></div>;
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: .1 });
    els.forEach((el) => io.observe(el)); return () => io.disconnect();
  });
  return ref;
}
function Counter({ to, suf = "", lang }) {
  const [n, setN] = useState(0); const ref = useRef(null); const done = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting && !done.current) {
        done.current = true; const s = performance.now();
        const tick = (t) => { const p = Math.min((t - s) / 1400, 1); setN(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
      }
    }, { threshold: .5 });
    if (ref.current) io.observe(ref.current); return () => io.disconnect();
  }, [to]);
  const loc = lang === "ar" ? "ar-SA" : "en-US";
  return <span ref={ref}>{Math.round(n).toLocaleString(loc)}{suf}</span>;
}

/* ===================== CONTENT (EN / AR / TH) ===================== */
const T = {
  en: {
    dir: "ltr", brandSub: "Women's home wellness", womenOnly: "Female therapists only",
    hero: { eyebrow: "Careers · Thai massage specialists", h1a: "Bring your", h1b: "craft", h1c: "to Saudi Arabia",
      sub: "Sabai is hiring certified female Thai-massage therapists to join a premium, women-only home wellness brand across the Kingdom. Great earnings, a respectful clientele, and full relocation support.",
      apply: "Apply on WhatsApp", learn: "See benefits", m1: "Visa & relocation support", m2: "Female-only clients", m3: "Weekly payouts", card: "Now hiring · Thailand" },
    perksTitle: "Why join Sabai",
    perks: [
      { i: TrendingUp, t: "Strong, transparent income", d: "Rewarding per-session pay, regular payouts and full visibility in your dashboard." },
      { i: CalendarHeart, t: "Flexible schedule", d: "Choose your hours and areas — you set the rhythm of your work." },
      { i: Shield, t: "Safe, respectful environment", d: "Verified female clients only, session tracking and direct support throughout." },
      { i: Plane, t: "Relocation support", d: "We assist with visa sponsorship, travel and settling in when you arrive." },
      { i: GraduationCap, t: "Training & growth", d: "Ongoing skills development, professional tools and a clear path to grow." },
      { i: HandHeart, t: "Care both ways", d: "A team that respects your craft and supports your wellbeing every day." },
    ],
    statsTitle: "A real platform you can trust",
    stats: [{ v: 138, suf: "", l: "Sessions / day" }, { v: 47260, suf: "", l: "Happy clients" }, { v: 9, suf: "", l: "Branches" }, { v: 61, suf: "", l: "Therapists" }],
    lookTitle: "Who we're looking for",
    look: ["Certified Thai massage training (Wat Po or equivalent preferred)", "2+ years of professional experience", "Skilled in Thai, Swedish, deep-tissue, aromatherapy or hot-stone", "Female therapists, committed to professionalism and privacy", "Conversational English a plus; we support your onboarding"],
    howTitle: "How to apply",
    how: [{ t: "Send your details", d: "Fill the short form or message us directly on WhatsApp." }, { t: "Quick interview", d: "A short video call to know your experience and specialties." }, { t: "Offer & relocation", d: "We arrange your contract, sponsorship and travel to the Kingdom." }],
    formTitle: "Start your application",
    f: { name: "Full name", nat: "Nationality", nationality0: "Thailand", years: "Years of experience", expPlace: "Where did you work?", expHint: "Name of the spa / massage center where you worked \u2014 add a link if you have one.", expPh: "e.g. Lotus Spa, Bangkok \u2014 or a link", arabicLabel: "Arabic proficiency", englishLabel: "English proficiency", arabicLevels: ["Beginner", "Intermediate", "Fluent"], age: "Age", height: "Height (cm)", weight: "Weight (kg)", city: "Preferred city", spec: "Specialties", photo: "Personal photo (optional)", photoHint: "Up to 5 photos. They are uploaded securely with your application.", msg: "Anything to add (optional)", submit: "Send application", waSend: "Send via WhatsApp", sending: "Sending…", sentT: "Application received", sentD: "Thank you! Our recruitment team will be in touch soon.", err: "Couldn't send — please try WhatsApp instead.", another: "Send another", req: "Please complete the required fields.", waRefNote: "Tip: also send your details on WhatsApp so we can follow up with you directly.", intro: "Hello Sabai, I'd like to apply as a massage therapist.", choose: "Choose photo", select: "Select", photoAttached: "I'll attach my photo in the chat.", phone: "Mobile number", socials: "Social media", username: "Username / handle", add: "Add" },
    specs: ["Thai", "Swedish", "Deep Tissue", "Aromatherapy", "Hot Stone", "Reflexology"],
    extraLabel: "Other skills (optional)", extras: ["Pedicure", "Manicure", "Body care", "Hair styling", "Makeup"],
    cities: ["Riyadh", "Jeddah", "Dammam", "Madinah", "Khobar", "Any city"],
    waTitle: "Prefer to chat now?", waSub: "Message our recruitment team directly on WhatsApp — we reply within 24 hours.", waBtn: "Chat on WhatsApp",
    ctaTitle: "Your craft deserves a premium home", ctaSub: "Join Sabai and build your career with a brand that values your skill.",
    apply2: "Apply", applyNow: "Apply now", benefits: "Benefits", reqs: "Requirements", process: "Process",
    earnTitle: "What you'll earn", earnAmount: "~2,500 SAR", earnSub: "/ month", earnPlus: "+ performance bonuses & seasonal rewards", earnBaht: "\u2248 \u0e3f21,750 / month",
    covers: ["Housing provided", "Flights provided", "1 paid day off / week", "1-year contract \u00b7 licensed sponsorship"],
    safeEy: "Real & licensed", safeTitle: "Safe, legal, and real",
    safe: ["Licensed to operate in Saudi Arabia \u2014 License No. " + LICENSE, "Female clients only \u2014 every booking verified & tracked", "A formal contract with clear, protected rights", "A coordinator helps you settle in on arrival"],
    faqEy: "FAQ", faqTitle: "Questions Thai therapists ask",
    faq: [{ q: "How much will I earn?", a: "Around 2,500 SAR per month, plus performance bonuses and seasonal rewards." }, { q: "Is it safe?", a: "Yes \u2014 female clients only, every booking verified and tracked, with a coordinator supporting you." }, { q: "What's covered?", a: "Housing and flights are provided, with one paid day off every week." }, { q: "How long is the contract?", a: "Annual." }],
    share: "Share with a friend", shareMsg: "Sabai is hiring female Thai-massage therapists in Saudi Arabia \u2014 housing & flights provided. Take a look:",
    footRights: "© 2026 Sabai · ساباي — Premium women's home wellness, Saudi Arabia.",
  },
  ar: {
    dir: "rtl", brandSub: "عناية منزلية للسيدات", womenOnly: "معالِجات سيدات فقط",
    hero: { eyebrow: "وظائف · مختصّات المساج التايلندي", h1a: "احملي", h1b: "مهارتكِ", h1c: "إلى المملكة",
      sub: "ساباي توظّف معالِجات مساج تايلندي معتمدات للانضمام إلى علامة عناية منزلية فاخرة للسيدات في أنحاء المملكة. دخل ممتاز، عميلات محترمات، ودعم كامل للانتقال.",
      apply: "قدّمي عبر واتساب", learn: "تعرّفي على المزايا", m1: "كفالة ودعم انتقال", m2: "عميلات سيدات فقط", m3: "صرف أسبوعي", card: "التوظيف مفتوح · تايلند" },
    perksTitle: "لماذا ساباي",
    perks: [
      { i: TrendingUp, t: "دخل قوي وشفّاف", d: "أجر تنافسي لكل جلسة مع صرف أسبوعي ووضوح كامل في لوحة التحكّم." },
      { i: CalendarHeart, t: "جدول مرن", d: "اختاري أوقاتكِ ومناطقكِ — أنتِ من يحدّد إيقاع عملكِ." },
      { i: Shield, t: "بيئة آمنة ومحترمة", d: "عميلات سيدات موثّقات فقط، مع تتبّع للجلسة ودعم مباشر طوال الوقت." },
      { i: Plane, t: "دعم الانتقال", d: "نساعدكِ في الكفالة والتأشيرة والسفر والاستقرار عند وصولكِ." },
      { i: GraduationCap, t: "تدريب وتطوير", d: "تطوير مستمر للمهارات وأدوات احترافية ومسار واضح للترقّي." },
      { i: HandHeart, t: "عناية متبادلة", d: "فريق يحترم مهارتكِ ويهتمّ براحتكِ كل يوم." },
    ],
    statsTitle: "منصّة حقيقية تستحقّ ثقتكِ",
    stats: [{ v: 138, suf: "", l: "جلسة / يوم" }, { v: 47260, suf: "", l: "عميلة سعيدة" }, { v: 9, suf: "", l: "فروع" }, { v: 61, suf: "", l: "معالِجة" }],
    lookTitle: "من نبحث عنها",
    look: ["تدريب معتمد في المساج التايلندي (Wat Po أو ما يعادله يُفضّل)", "خبرة احترافية سنتان فأكثر", "إتقان التايلندي أو السويدي أو الأنسجة العميقة أو الروائح أو الأحجار", "معالِجات سيدات، ملتزمات بالاحتراف والخصوصية", "الإنجليزية البسيطة ميزة، وندعمكِ في الانضمام"],
    howTitle: "كيف تقدّمين",
    how: [{ t: "أرسلي بياناتكِ", d: "املئي النموذج المختصر أو راسلينا مباشرة على واتساب." }, { t: "مقابلة سريعة", d: "مكالمة فيديو قصيرة للتعرّف على خبرتكِ وتخصّصاتكِ." }, { t: "العرض والانتقال", d: "نرتّب العقد والكفالة والسفر إلى المملكة." }],
    formTitle: "ابدئي طلبكِ",
    f: { name: "الاسم الكامل", nat: "الجنسية", nationality0: "تايلند", years: "سنوات الخبرة", expPlace: "أين عملتِ سابقًا؟", expHint: "اسم السبا أو مركز المساج اللي اشتغلتِ فيه — وأضيفي رابطًا إن وُجد.", expPh: "مثال: Lotus Spa — أو رابط", arabicLabel: "إجادة اللغة العربية", englishLabel: "إجادة اللغة الإنجليزية", arabicLevels: ["مبتدئ", "متوسط", "بطلاقة"], age: "العمر", height: "الطول (سم)", weight: "الوزن (كجم)", city: "المدينة المفضّلة", spec: "التخصّصات", photo: "صورة شخصية (اختياري)", photoHint: "حتى ٥ صور. تُرفع بأمان مع طلبكِ.", msg: "أي إضافة (اختياري)", submit: "إرسال الطلب", waSend: "إرسال عبر واتساب", sending: "جارٍ الإرسال…", sentT: "تم استلام طلبكِ", sentD: "شكرًا لكِ! سيتواصل معكِ فريق التوظيف قريبًا.", err: "تعذّر الإرسال — جرّبي واتساب من فضلكِ.", another: "إرسال طلب آخر", req: "الرجاء إكمال الحقول المطلوبة.", waRefNote: "ملاحظة: أرسلي بياناتكِ عبر واتساب أيضًا لنتابع طلبكِ مباشرة.", intro: "مرحبًا ساباي، أرغب بالتقديم كمعالِجة مساج.", choose: "اختاري صورة", select: "اختاري", photoAttached: "سأرفق صورتي في المحادثة.", phone: "رقم الجوال", socials: "حسابات التواصل", username: "المعرّف (اليوزر)", add: "إضافة" },
    specs: ["تايلندي", "سويدي", "أنسجة عميقة", "روائح", "أحجار ساخنة", "انعكاسات"],
    extraLabel: "\u0645\u0647\u0627\u0631\u0627\u062a \u0623\u062e\u0631\u0649 (\u0627\u062e\u062a\u064a\u0627\u0631\u064a)", extras: ["\u0628\u0627\u062f\u064a\u0643\u064a\u0631", "\u0645\u0627\u0646\u064a\u0643\u064a\u0631", "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0627\u0644\u062c\u0633\u0645", "\u062a\u0635\u0641\u064a\u0641 \u0627\u0644\u0634\u0639\u0631", "\u0645\u0643\u064a\u0627\u062c"],
    cities: ["الرياض", "جدة", "الدمام", "المدينة المنورة", "الخبر", "أي مدينة"],
    waTitle: "تفضّلين المحادثة الآن؟", waSub: "راسلي فريق التوظيف مباشرة على واتساب — نردّ خلال ٢٤ ساعة.", waBtn: "محادثة واتساب",
    ctaTitle: "مهارتكِ تستحقّ بيتًا فاخرًا", ctaSub: "انضمّي إلى ساباي وابنِي مستقبلكِ مع علامة تقدّر مهارتكِ.",
    apply2: "التقديم", applyNow: "قدّمي الآن", benefits: "المزايا", reqs: "المعايير", process: "الخطوات",
    earnTitle: "\u0643\u0645 \u0633\u062a\u0643\u0633\u0628\u064a\u0646", earnAmount: "~\u0662\u066c\u0665\u0660\u0660 \u0631\u064a\u0627\u0644", earnSub: "/ \u0634\u0647\u0631\u064a\u0627\u064b", earnPlus: "+ \u062d\u0648\u0627\u0641\u0632 \u0623\u062f\u0627\u0621 \u0648\u0645\u0643\u0627\u0641\u0622\u062a \u0645\u0648\u0633\u0645\u064a\u0629", earnBaht: "\u2248 \u0e3f21,750 \u0628\u0627\u062e\u062a / \u0634\u0647\u0631\u064a\u0627\u064b",
    covers: ["\u0633\u0643\u0646 \u0645\u0624\u0645\u0651\u0646", "\u062a\u0630\u0627\u0643\u0631 \u0637\u064a\u0631\u0627\u0646", "\u064a\u0648\u0645 \u0625\u062c\u0627\u0632\u0629 \u0645\u062f\u0641\u0648\u0639 / \u0623\u0633\u0628\u0648\u0639\u064a\u0627\u064b", "\u0639\u0642\u062f \u0633\u0646\u0629 \u00b7 \u0643\u0641\u0627\u0644\u0629 \u0646\u0638\u0627\u0645\u064a\u0629"],
    safeEy: "\u0646\u0638\u0627\u0645\u064a \u0648\u0645\u0648\u062b\u0651\u0642", safeTitle: "\u0622\u0645\u0646 \u0648\u0646\u0638\u0627\u0645\u064a \u0648\u062d\u0642\u064a\u0642\u064a",
    safe: ["\u0645\u0631\u062e\u0651\u0635\u0629 \u0644\u0644\u0639\u0645\u0644 \u0641\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 \u2014 \u0631\u0642\u0645 \u0627\u0644\u062a\u0631\u062e\u064a\u0635 " + LICENSE, "\u0639\u0645\u064a\u0644\u0627\u062a \u0633\u064a\u062f\u0627\u062a \u0641\u0642\u0637 \u2014 \u0643\u0644 \u062d\u062c\u0632 \u0645\u0648\u062b\u0651\u0642 \u0648\u0645\u064f\u062a\u062a\u0628\u0651\u0639", "\u0639\u0642\u062f \u0631\u0633\u0645\u064a \u0628\u062d\u0642\u0648\u0642 \u0648\u0627\u0636\u062d\u0629 \u0648\u0645\u062d\u0641\u0648\u0638\u0629", "\u0645\u0646\u0633\u0651\u0642\u0629 \u062a\u0633\u0627\u0639\u062f\u0643\u0650 \u0639\u0644\u0649 \u0627\u0644\u0627\u0633\u062a\u0642\u0631\u0627\u0631 \u0639\u0646\u062f \u0648\u0635\u0648\u0644\u0643\u0650"],
    faqEy: "\u0623\u0633\u0626\u0644\u0629 \u0634\u0627\u0626\u0639\u0629", faqTitle: "\u0623\u0633\u0626\u0644\u0629 \u062a\u0647\u0645\u0651 \u0627\u0644\u0645\u0639\u0627\u0644\u0650\u062c\u0629",
    faq: [{ q: "\u0643\u0645 \u0633\u0623\u0643\u0633\u0628\u061f", a: "\u062d\u0648\u0627\u0644\u064a \u0662\u066c\u0665\u0660\u0660 \u0631\u064a\u0627\u0644 \u0634\u0647\u0631\u064a\u0627\u064b\u060c \u0625\u0636\u0627\u0641\u0629 \u0625\u0644\u0649 \u062d\u0648\u0627\u0641\u0632 \u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0627\u0644\u0645\u0643\u0627\u0641\u0622\u062a \u0627\u0644\u0645\u0648\u0633\u0645\u064a\u0629." }, { q: "\u0647\u0644 \u0627\u0644\u0639\u0645\u0644 \u0622\u0645\u0646\u061f", a: "\u0646\u0639\u0645 \u2014 \u0639\u0645\u064a\u0644\u0627\u062a \u0633\u064a\u062f\u0627\u062a \u0641\u0642\u0637\u060c \u0648\u0643\u0644 \u062d\u062c\u0632 \u0645\u0648\u062b\u0651\u0642 \u0648\u0645\u064f\u062a\u062a\u0628\u0651\u0639\u060c \u0645\u0639 \u0645\u0646\u0633\u0651\u0642\u0629 \u062a\u062f\u0639\u0645\u0643\u0650." }, { q: "\u0645\u0627\u0630\u0627 \u064a\u0634\u0645\u0644\u061f", a: "\u0633\u0643\u0646 \u0648\u062a\u0630\u0627\u0643\u0631 \u0637\u064a\u0631\u0627\u0646 \u0645\u0624\u0645\u0651\u0646\u0629\u060c \u0645\u0639 \u064a\u0648\u0645 \u0625\u062c\u0627\u0632\u0629 \u0645\u062f\u0641\u0648\u0639 \u0643\u0644 \u0623\u0633\u0628\u0648\u0639." }, { q: "\u0643\u0645 \u0645\u062f\u0629 \u0627\u0644\u0639\u0642\u062f\u061f", a: "\u0633\u0646\u0648\u064a." }],
    share: "\u0634\u0627\u0631\u0643\u064a \u0627\u0644\u0639\u0631\u0636 \u0645\u0639 \u0635\u062f\u064a\u0642\u0629", shareMsg: "\u0633\u0627\u0628\u0627\u064a \u062a\u0648\u0638\u0651\u0641 \u0645\u0639\u0627\u0644\u0650\u062c\u0627\u062a \u0645\u0633\u0627\u062c \u062a\u0627\u064a\u0644\u0646\u062f\u064a \u0641\u064a \u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629 \u2014 \u0633\u0643\u0646 \u0648\u0637\u064a\u0631\u0627\u0646 \u0645\u0624\u0645\u0651\u0646. \u0634\u0648\u0641\u064a \u0627\u0644\u0625\u0639\u0644\u0627\u0646:",
    footRights: "© ٢٠٢٦ ساباي · Sabai — عناية منزلية فاخرة للسيدات، السعودية.",
  },
  th: {
    dir: "ltr", brandSub: "ดูแลสุขภาพถึงบ้านสำหรับผู้หญิง", womenOnly: "นักบำบัดหญิงเท่านั้น",
    hero: { eyebrow: "ร่วมงาน · นักนวดบำบัดมืออาชีพ", h1a: "นำ", h1b: "ทักษะ", h1c: "ของคุณมาสู่ซาอุดีอาระเบีย",
      sub: "ซาบาย (Sabai) กำลังรับสมัครนักนวดบำบัดหญิงที่มีใบรับรอง เพื่อร่วมงานกับแบรนด์ดูแลสุขภาพถึงบ้านระดับพรีเมียมสำหรับผู้หญิงทั่วราชอาณาจักร รายได้ดี ลูกค้าให้เกียรติ และสนับสนุนการย้ายถิ่นฐานครบวงจร",
      apply: "สมัครผ่าน WhatsApp", learn: "ดูสวัสดิการ", m1: "สนับสนุนวีซ่าและการย้ายถิ่น", m2: "ลูกค้าหญิงเท่านั้น", m3: "จ่ายรายสัปดาห์", card: "กำลังรับสมัคร · ประเทศไทย" },
    perksTitle: "ทำไมต้องซาบาย",
    perks: [
      { i: TrendingUp, t: "รายได้ดีและโปร่งใส", d: "ค่าตอบแทนต่อครั้งที่คุ้มค่า จ่ายรายสัปดาห์ และแสดงรายได้ชัดเจนในแดชบอร์ดของคุณ" },
      { i: CalendarHeart, t: "ตารางงานยืดหยุ่น", d: "คุณเลือกเวลาและพื้นที่ให้บริการเอง จัดสมดุลงานกับชีวิตได้" },
      { i: Shield, t: "สภาพแวดล้อมปลอดภัยและให้เกียรติ", d: "ลูกค้าหญิงที่ผ่านการยืนยันเท่านั้น มีระบบติดตามและการสนับสนุนตลอดการทำงาน" },
      { i: Plane, t: "สนับสนุนการย้ายถิ่น", d: "เราช่วยเรื่องวีซ่า การเดินทาง และการตั้งถิ่นฐานเมื่อคุณมาถึงราชอาณาจักร" },
      { i: GraduationCap, t: "การฝึกอบรมและเติบโต", d: "พัฒนาทักษะต่อเนื่อง เครื่องมือระดับมืออาชีพ และเส้นทางเติบโตที่ชัดเจน" },
      { i: HandHeart, t: "ดูแลซึ่งกันและกัน", d: "ทีมที่เคารพในฝีมือของคุณและใส่ใจความเป็นอยู่ของคุณทุกวัน" },
    ],
    statsTitle: "แพลตฟอร์มจริงที่คุณวางใจได้",
    stats: [{ v: 138, suf: "", l: "ครั้ง / วัน" }, { v: 47260, suf: "", l: "ลูกค้าพึงพอใจ" }, { v: 9, suf: "", l: "สาขา" }, { v: 61, suf: "", l: "นักบำบัด" }],
    lookTitle: "เรากำลังมองหาใคร",
    look: ["ผ่านการอบรมนวดแผนไทยที่มีใบรับรอง (วัดโพธิ์หรือเทียบเท่าจะพิจารณาเป็นพิเศษ)", "มีประสบการณ์วิชาชีพ 2 ปีขึ้นไป", "เชี่ยวชาญนวดไทย สวีดิช เนื้อเยื่อลึก อโรมา หรือหินร้อน", "นักบำบัดหญิง มุ่งมั่นในความเป็นมืออาชีพและความเป็นส่วนตัว", "สื่อสารภาษาอังกฤษได้จะเป็นข้อดี เรามีการช่วยปรับตัวให้"],
    howTitle: "วิธีสมัคร",
    how: [{ t: "ส่งข้อมูลของคุณ", d: "กรอกฟอร์มสั้นๆ หรือทักหาเราโดยตรงทาง WhatsApp" }, { t: "สัมภาษณ์สั้นๆ", d: "วิดีโอคอลสั้นๆ เพื่อทำความรู้จักประสบการณ์และความเชี่ยวชาญของคุณ" }, { t: "ข้อเสนอและการย้ายถิ่น", d: "เราจัดการสัญญา การสนับสนุนวีซ่า และการเดินทางมายังราชอาณาจักร" }],
    formTitle: "เริ่มการสมัครของคุณ",
    f: { name: "ชื่อ-นามสกุล", nat: "สัญชาติ", nationality0: "ไทย", years: "ประสบการณ์ (ปี)", expPlace: "เคยทำงานที่ไหน?", expHint: "ชื่อสปา/ร้านนวดที่เคยทำงาน — ใส่ลิงก์ด้วยก็ได้", expPh: "เช่น Lotus Spa — หรือลิงก์", arabicLabel: "ระดับภาษาอาหรับ", englishLabel: "ระดับภาษาอังกฤษ", arabicLevels: ["เริ่มต้น", "ปานกลาง", "คล่องแคล่ว"], age: "อายุ", height: "ส่วนสูง (ซม.)", weight: "น้ำหนัก (กก.)", city: "เมืองที่ต้องการ", spec: "ความเชี่ยวชาญ", photo: "รูปถ่ายส่วนตัว (ไม่บังคับ)", photoHint: "สูงสุด 5 รูป รูปจะถูกอัปโหลดอย่างปลอดภัยพร้อมใบสมัคร", msg: "ข้อความเพิ่มเติม (ไม่บังคับ)", submit: "ส่งใบสมัคร", waSend: "ส่งผ่าน WhatsApp", sending: "กำลังส่ง…", sentT: "ได้รับใบสมัครแล้ว", sentD: "ขอบคุณค่ะ! ทีมรับสมัครจะติดต่อกลับเร็วๆ นี้", err: "ส่งไม่สำเร็จ — โปรดลองใช้ WhatsApp", another: "ส่งใบสมัครอีกครั้ง", req: "โปรดกรอกข้อมูลที่จำเป็นให้ครบ", waRefNote: "เคล็ดลับ: ส่งข้อมูลของคุณทาง WhatsApp ด้วย เพื่อให้เราติดตามคุณโดยตรง", intro: "สวัสดีค่ะ Sabai ฉันต้องการสมัครเป็นนักนวดบำบัด", choose: "เลือกรูปภาพ", select: "เลือก", photoAttached: "ฉันจะแนบรูปในแชท", phone: "เบอร์โทรศัพท์", socials: "โซเชียลมีเดีย", username: "ชื่อผู้ใช้", add: "เพิ่ม" },
    specs: ["นวดไทย", "สวีดิช", "เนื้อเยื่อลึก", "อโรมา", "หินร้อน", "กดจุดฝ่าเท้า"],
    extraLabel: "\u0e17\u0e31\u0e01\u0e29\u0e30\u0e2d\u0e37\u0e48\u0e19\u0e46 (\u0e44\u0e21\u0e48\u0e1a\u0e31\u0e07\u0e04\u0e31\u0e1a)", extras: ["\u0e40\u0e1e\u0e14\u0e34\u0e40\u0e04\u0e35\u0e22\u0e27", "\u0e17\u0e33\u0e40\u0e25\u0e47\u0e1a", "\u0e14\u0e39\u0e41\u0e25\u0e1c\u0e34\u0e27\u0e01\u0e32\u0e22", "\u0e08\u0e31\u0e14\u0e41\u0e15\u0e48\u0e07\u0e17\u0e23\u0e07\u0e1c\u0e21", "\u0e41\u0e15\u0e48\u0e07\u0e2b\u0e19\u0e49\u0e32"],
    cities: ["ริยาด", "เจดดาห์", "ดัมมาม", "เมดินา", "โคบาร์", "เมืองใดก็ได้"],
    waTitle: "อยากแชทตอนนี้เลยไหม", waSub: "ทักทีมรับสมัครโดยตรงทาง WhatsApp — เราตอบกลับภายใน 24 ชั่วโมง", waBtn: "แชททาง WhatsApp",
    ctaTitle: "ฝีมือของคุณสมควรได้บ้านระดับพรีเมียม", ctaSub: "ร่วมงานกับซาบายและสร้างอาชีพกับแบรนด์ที่ให้คุณค่ากับทักษะของคุณ",
    apply2: "สมัคร", applyNow: "สมัครเลย", benefits: "สวัสดิการ", reqs: "คุณสมบัติ", process: "ขั้นตอน",
    earnTitle: "\u0e23\u0e32\u0e22\u0e44\u0e14\u0e49\u0e02\u0e2d\u0e07\u0e04\u0e38\u0e13", earnAmount: "~2,500 \u0e23\u0e34\u0e22\u0e32\u0e25", earnSub: "/ \u0e40\u0e14\u0e37\u0e2d\u0e19", earnPlus: "+ \u0e42\u0e1a\u0e19\u0e31\u0e2a\u0e15\u0e32\u0e21\u0e1c\u0e25\u0e07\u0e32\u0e19\u0e41\u0e25\u0e30\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e15\u0e32\u0e21\u0e40\u0e17\u0e28\u0e01\u0e32\u0e25", earnBaht: "\u2248 \u0e3f21,750 / \u0e40\u0e14\u0e37\u0e2d\u0e19",
    covers: ["\u0e17\u0e35\u0e48\u0e1e\u0e31\u0e01\u0e43\u0e2b\u0e49\u0e1f\u0e23\u0e35", "\u0e15\u0e31\u0e4b\u0e27\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e1a\u0e34\u0e19\u0e43\u0e2b\u0e49", "\u0e27\u0e31\u0e19\u0e2b\u0e22\u0e38\u0e14 1 \u0e27\u0e31\u0e19/\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c (\u0e21\u0e35\u0e04\u0e48\u0e32\u0e08\u0e49\u0e32\u0e07)", "\u0e2a\u0e31\u0e0d\u0e0d\u0e32 1 \u0e1b\u0e35 \u00b7 \u0e2a\u0e1b\u0e2d\u0e19\u0e40\u0e0b\u0e2d\u0e23\u0e4c\u0e16\u0e39\u0e01\u0e01\u0e0e\u0e2b\u0e21\u0e32\u0e22"],
    safeEy: "\u0e16\u0e39\u0e01\u0e01\u0e0e\u0e2b\u0e21\u0e32\u0e22\u0e41\u0e25\u0e30\u0e08\u0e23\u0e34\u0e07", safeTitle: "\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22 \u0e16\u0e39\u0e01\u0e01\u0e0e\u0e2b\u0e21\u0e32\u0e22 \u0e41\u0e25\u0e30\u0e21\u0e35\u0e08\u0e23\u0e34\u0e07",
    safe: ["\u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e43\u0e1a\u0e2d\u0e19\u0e38\u0e0d\u0e32\u0e15\u0e43\u0e19\u0e0b\u0e32\u0e2d\u0e38\u0e14\u0e35\u0e2d\u0e32\u0e23\u0e30\u0e40\u0e1a\u0e35\u0e22 \u2014 \u0e40\u0e25\u0e02\u0e17\u0e35\u0e48\u0e43\u0e1a\u0e2d\u0e19\u0e38\u0e0d\u0e32\u0e15 " + LICENSE, "\u0e25\u0e39\u0e01\u0e04\u0e49\u0e32\u0e2b\u0e0d\u0e34\u0e07\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19 \u2014 \u0e17\u0e38\u0e01\u0e01\u0e32\u0e23\u0e08\u0e2d\u0e07\u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e41\u0e25\u0e30\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21", "\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e17\u0e35\u0e48\u0e40\u0e1b\u0e47\u0e19\u0e17\u0e32\u0e07\u0e01\u0e32\u0e23 \u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e2a\u0e34\u0e17\u0e18\u0e34\u0e17\u0e35\u0e48\u0e0a\u0e31\u0e14\u0e40\u0e08\u0e19\u0e41\u0e25\u0e30\u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e04\u0e38\u0e49\u0e21\u0e04\u0e23\u0e2d\u0e07", "\u0e21\u0e35\u0e1c\u0e39\u0e49\u0e1b\u0e23\u0e30\u0e2a\u0e32\u0e19\u0e07\u0e32\u0e19\u0e0a\u0e48\u0e27\u0e22\u0e04\u0e38\u0e13\u0e1b\u0e23\u0e31\u0e1a\u0e15\u0e31\u0e27\u0e40\u0e21\u0e37\u0e48\u0e2d\u0e21\u0e32\u0e16\u0e36\u0e07"],
    faqEy: "\u0e04\u0e33\u0e16\u0e32\u0e21\u0e17\u0e35\u0e48\u0e1e\u0e1a\u0e1a\u0e48\u0e2d\u0e22", faqTitle: "\u0e04\u0e33\u0e16\u0e32\u0e21\u0e17\u0e35\u0e48\u0e19\u0e31\u0e01\u0e1a\u0e33\u0e1a\u0e31\u0e14\u0e0a\u0e32\u0e27\u0e44\u0e17\u0e22\u0e16\u0e32\u0e21\u0e1a\u0e48\u0e2d\u0e22",
    faq: [{ q: "\u0e08\u0e30\u0e44\u0e14\u0e49\u0e23\u0e32\u0e22\u0e44\u0e14\u0e49\u0e40\u0e17\u0e48\u0e32\u0e44\u0e2b\u0e23\u0e48?", a: "\u0e1b\u0e23\u0e30\u0e21\u0e32\u0e13 2,500 \u0e23\u0e34\u0e22\u0e32\u0e25\u0e15\u0e48\u0e2d\u0e40\u0e14\u0e37\u0e2d\u0e19 (\u2248\u0e3f21,750) \u0e1a\u0e27\u0e01\u0e42\u0e1a\u0e19\u0e31\u0e2a\u0e15\u0e32\u0e21\u0e1c\u0e25\u0e07\u0e32\u0e19\u0e41\u0e25\u0e30\u0e23\u0e32\u0e07\u0e27\u0e31\u0e25\u0e15\u0e32\u0e21\u0e40\u0e17\u0e28\u0e01\u0e32\u0e25" }, { q: "\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22\u0e44\u0e2b\u0e21?", a: "\u0e1b\u0e25\u0e2d\u0e14\u0e20\u0e31\u0e22 \u2014 \u0e25\u0e39\u0e01\u0e04\u0e49\u0e32\u0e2b\u0e0d\u0e34\u0e07\u0e40\u0e17\u0e48\u0e32\u0e19\u0e31\u0e49\u0e19 \u0e17\u0e38\u0e01\u0e01\u0e32\u0e23\u0e08\u0e2d\u0e07\u0e44\u0e14\u0e49\u0e23\u0e31\u0e1a\u0e01\u0e32\u0e23\u0e22\u0e37\u0e19\u0e22\u0e31\u0e19\u0e41\u0e25\u0e30\u0e15\u0e34\u0e14\u0e15\u0e32\u0e21 \u0e41\u0e25\u0e30\u0e21\u0e35\u0e1c\u0e39\u0e49\u0e1b\u0e23\u0e30\u0e2a\u0e32\u0e19\u0e07\u0e32\u0e19\u0e04\u0e2d\u0e22\u0e14\u0e39\u0e41\u0e25\u0e04\u0e38\u0e13" }, { q: "\u0e04\u0e23\u0e2d\u0e1a\u0e04\u0e25\u0e38\u0e21\u0e2d\u0e30\u0e44\u0e23\u0e1a\u0e49\u0e32\u0e07?", a: "\u0e21\u0e35\u0e17\u0e35\u0e48\u0e1e\u0e31\u0e01\u0e41\u0e25\u0e30\u0e15\u0e31\u0e4b\u0e27\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e1a\u0e34\u0e19\u0e43\u0e2b\u0e49 \u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e27\u0e31\u0e19\u0e2b\u0e22\u0e38\u0e14\u0e21\u0e35\u0e04\u0e48\u0e32\u0e08\u0e49\u0e32\u0e07 1 \u0e27\u0e31\u0e19\u0e17\u0e38\u0e01\u0e2a\u0e31\u0e1b\u0e14\u0e32\u0e2b\u0e4c" }, { q: "\u0e2a\u0e31\u0e0d\u0e0d\u0e32\u0e19\u0e32\u0e19\u0e40\u0e17\u0e48\u0e32\u0e44\u0e2b\u0e23\u0e48?", a: "\u0e23\u0e32\u0e22\u0e1b\u0e35" }],
    share: "\u0e41\u0e0a\u0e23\u0e4c\u0e43\u0e2b\u0e49\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19", shareMsg: "Sabai \u0e01\u0e33\u0e25\u0e31\u0e07\u0e23\u0e31\u0e1a\u0e2a\u0e21\u0e31\u0e04\u0e23\u0e19\u0e31\u0e01\u0e19\u0e27\u0e14\u0e1a\u0e33\u0e1a\u0e31\u0e14\u0e2b\u0e0d\u0e34\u0e07\u0e43\u0e19\u0e0b\u0e32\u0e2d\u0e38\u0e14\u0e35\u0e2d\u0e32\u0e23\u0e30\u0e40\u0e1a\u0e35\u0e22 \u2014 \u0e21\u0e35\u0e17\u0e35\u0e48\u0e1e\u0e31\u0e01\u0e41\u0e25\u0e30\u0e15\u0e31\u0e4b\u0e27\u0e40\u0e04\u0e23\u0e37\u0e48\u0e2d\u0e07\u0e1a\u0e34\u0e19\u0e43\u0e2b\u0e49 \u0e14\u0e39\u0e1b\u0e23\u0e30\u0e01\u0e32\u0e28:",
    footRights: "© 2026 Sabai · ساباي — ดูแลสุขภาพถึงบ้านระดับพรีเมียมสำหรับผู้หญิง ซาอุดีอาระเบีย",
  },
};

const LANGS = [["en", "EN"], ["ar", "عربي"], ["th", "ไทย"]];
const PLATFORMS = ["Instagram", "TikTok", "Facebook", "Snapchat", "X"];
const HERO_IMG = "/hero.webp";

export default function App() {
  const ref = useReveal();
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const ar = lang === "ar";
  const [form, setForm] = useState({ name: "", phone: "", nationality: "Thailand", years: "", expPlace: "", arabic: "", english: "", age: "", height: "", weight: "", city: "", message: "", specs: [], extras: [], socials: [], photos: [] });
  const [status, setStatus] = useState("idle");
  const [invalidFields, setInvalidFields] = useState([]);
  const [socialP, setSocialP] = useState("Instagram");
  const [socialU, setSocialU] = useState("");
  const addSocial = () => { const u = socialU.trim(); if (!u) return; setForm((f) => ({ ...f, socials: [...f.socials, { p: socialP, u: u.replace(/^@/, "") }] })); setSocialU(""); setInvalidFields((a) => a.filter((x) => x !== "socials")); };
  const removeSocial = (i) => setForm((f) => ({ ...f, socials: f.socials.filter((_, x) => x !== i) }));
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleSpec = (s) => setForm((f) => ({ ...f, specs: f.specs.includes(s) ? f.specs.filter((x) => x !== s) : [...f.specs, s] }));
  const toggleExtra = (s) => setForm((f) => ({ ...f, extras: f.extras.includes(s) ? f.extras.filter((x) => x !== s) : [...f.extras, s] }));
  const MAX_PHOTOS = 5;
  const compress = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX = 900;
        let { width: w, height: h } = img;
        if (w > h && w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
        else if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; }
        const cv = document.createElement("canvas");
        cv.width = w; cv.height = h;
        cv.getContext("2d").drawImage(img, 0, 0, w, h);
        const out = cv.toDataURL("image/jpeg", 0.82);
        resolve(out && out.length > 100 ? out : reader.result);
      };
      img.onerror = () => resolve(reader.result);
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  const onPhoto = async (e) => {
    const files = Array.from(e.target.files || []).filter((f) => f.type.startsWith("image/"));
    e.target.value = "";
    if (!files.length) return;
    const room = MAX_PHOTOS - form.photos.length;
    const out = [];
    for (const file of files.slice(0, Math.max(0, room))) out.push(await compress(file));
    if (out.length) setForm((f) => ({ ...f, photos: [...f.photos, ...out].slice(0, MAX_PHOTOS) }));
  };
  const removePhoto = (i) => setForm((f) => ({ ...f, photos: f.photos.filter((_, x) => x !== i) }));

  useEffect(() => { document.title = "Sabai Careers · " + (ar ? "وظائف ساباي" : lang === "th" ? "ร่วมงานกับซาบาย" : "Join our therapists"); }, [lang]);
  // sync the default nationality label with language (only if untouched / default)
  useEffect(() => { setForm((f) => (["Thailand", "تايلند", "ไทย"].includes(f.nationality) ? { ...f, nationality: t.f.nationality0 } : f)); }, [lang]);

  const L = t.f;
  const buildMsg = () => {
    const lines = [L.intro, "",
      `${L.name}: ${form.name || "-"}`, `${L.phone}: ${form.phone || "-"}`, `${L.nat}: ${form.nationality || "-"}`,
      `${L.age}: ${form.age || "-"}`, `${L.height}: ${form.height || "-"}`, `${L.weight}: ${form.weight || "-"}`,
      `${L.years}: ${form.years || "-"}`, `${L.expPlace}: ${form.expPlace || "-"}`, `${t.arabicLabel}: ${form.arabic || "-"}`, `${t.englishLabel}: ${form.english || "-"}`, `${L.spec}: ${form.specs.join(", ") || "-"}`, `${t.extraLabel}: ${form.extras.join(", ") || "-"}`, `${L.city}: ${form.city || "-"}`,
      `${L.socials}: ${form.socials.map((s) => `${s.p}: ${s.u}`).join(" · ") || "-"}`];
    if (form.message) lines.push(`${L.msg}: ${form.message}`);
    if (form.photos.length) lines.push(L.photoAttached + (form.photos.length > 1 ? " (" + form.photos.length + ")" : ""));
    return encodeURIComponent(lines.join("\n"));
  };
  const waHref = `https://wa.me/${WA_NUMBER}?text=${buildMsg()}`;
  const waPlain = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(L.intro)}`;
  const formValid = form.name.trim() && form.phone.trim() && form.nationality.trim() && form.years.trim() && form.expPlace.trim() && form.arabic.trim() && form.english.trim() && form.age.trim() && form.height.trim() && form.weight.trim() && form.specs.length && form.city.trim() && form.socials.length;
  const submit = async () => {
    if (status === "sending") return;
    const missing = [];
    if (!form.name.trim()) missing.push("name");
    if (!form.phone.trim()) missing.push("phone");
    if (!form.nationality.trim()) missing.push("nationality");
    if (!form.years.trim()) missing.push("years");
    if (!form.expPlace.trim()) missing.push("expPlace");
    if (!form.arabic.trim()) missing.push("arabic");
    if (!form.english.trim()) missing.push("english");
    if (!form.age.trim()) missing.push("age");
    if (!form.height.trim()) missing.push("height");
    if (!form.weight.trim()) missing.push("weight");
    if (!form.specs.length) missing.push("specs");
    if (!form.city.trim()) missing.push("city");
    if (!form.socials.length) missing.push("socials");
    if (missing.length) { setInvalidFields(missing); setStatus("invalid"); return; }
    setInvalidFields([]);
    if (!SHEET_ENDPOINT) { window.open(waHref, "_blank"); setStatus("sent"); return; }
    setStatus("sending");
    try {
      await fetch(SHEET_ENDPOINT, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ name: form.name, phone: form.phone, nationality: form.nationality, age: form.age, height: form.height, weight: form.weight, years: form.years, expPlace: form.expPlace, arabic: form.arabic, english: form.english, specs: form.specs, extras: form.extras, city: form.city, socials: form.socials, message: form.message, photos: form.photos, lang }) });
      setStatus("sent");
    } catch (e) {
      window.open(waHref, "_blank");
      setStatus("sent");
    }
  };
  const bad = (k) => invalidFields.includes(k) ? { borderColor: "var(--magenta)", boxShadow: "0 0 0 2px rgba(194,91,126,.18)" } : null;
  const setF = (k, v) => { set(k, v); if (invalidFields.includes(k) && String(v).trim()) setInvalidFields((a) => a.filter((x) => x !== k)); };
  const share = async () => {
    const url = (typeof window !== "undefined" && window.location && window.location.href) ? window.location.href : "https://sabai.pink";
    const text = t.shareMsg + " " + url;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "Sabai Careers", text: t.shareMsg, url }); return; } catch (e) {}
    }
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  };

  return (
    <div className="sb" dir={t.dir} lang={lang} data-lang={lang} ref={ref}>
      <style>{CSS}</style>
      <div className="top-wash" aria-hidden="true" />

      <nav className="nav">
        <div className="wrap nav-in">
          <div className="logo">
            <div className="mk"><SabaiMark s={30} /></div>
            <div><div className="nm">{ar ? "ساباي" : "Sabai"}</div><div className="su">{t.brandSub}</div></div>
          </div>
          <div className="nav-act">
            <div className="langs">{LANGS.map(([c, l]) => <button key={c} className={lang === c ? "on" : ""} onClick={() => setLang(c)}>{l}</button>)}</div>
            <a className="btn btn-gold desktop-cta" style={{ padding: "11px 20px" }} href="#apply">{t.applyNow}</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="women" style={{ marginBottom: 12 }}><Shield size={15} /> {t.womenOnly}</span>
            <div className="eyebrow" style={{ marginTop: 4 }}>{t.hero.eyebrow}</div>
            <h1>{t.hero.h1a} <em>{t.hero.h1b}</em> {t.hero.h1c}</h1>
            <p className="lede" style={{ marginTop: 18 }}>{t.hero.sub}</p>
            <div className="hero-cta">
              <a className="btn btn-gold" href="#apply">{t.applyNow}</a>
              <a className="btn btn-ghost" href="#perks">{t.hero.learn}</a>
            </div>
            <div className="hero-mini">
              <div><Plane size={16} /> {t.hero.m1}</div><div><Shield size={16} /> {t.hero.m2}</div><div><TrendingUp size={16} /> {t.hero.m3}</div>
            </div>
          </div>
          <div className="hero-card">
            <img src={HERO_IMG} alt="Sabai · traditional Thai attire" className="hero-photo" />
            <div className="hero-overlay" />
            <Sparkles className="spark" size={22} style={{ insetBlockStart: 16, insetInlineStart: 16, color: "var(--gold)" }} />
            <Sparkles className="spark" size={16} style={{ insetBlockStart: 30, insetInlineEnd: 18, color: "var(--magenta)", animationDelay: ".9s" }} />
            <Sparkles className="spark" size={13} style={{ insetBlockStart: 92, insetInlineStart: 22, color: "var(--sage)", animationDelay: "1.7s" }} />
            <div className="hero-cap">
              <div className="mkbox"><SabaiMark s={26} /></div>
              <div>
                <div className="hero-cap-nm">{ar ? "ساباي" : "Sabai"}</div>
                <div className="hero-cap-sub"><BadgeCheck size={13} /> {t.hero.card}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PERKS */}
      <section className="sec" id="perks">
        <div className="wrap">
          <div className="center reveal"><div className="eyebrow" style={{ justifyContent: "center" }}>{t.benefits}</div><h2 className="title">{t.perksTitle}</h2></div>
          <div className="grid-3" style={{ marginTop: 36 }}>
            {t.perks.map((p, i) => <div className="card perk reveal" key={i}><div className="ic"><p.i size={24} /></div><h3>{p.t}</h3><p>{p.d}</p></div>)}
          </div>
        </div>
      </section>

      {/* EARNINGS */}
      <section className="sec">
        <div className="wrap">
          <div className="stats reveal">
            <div className="center" style={{ marginBottom: 22 }}>
              <h2 className="title" style={{ color: "#fff", fontSize: 28 }}>{t.earnTitle}</h2>
              <div style={{ marginTop: 14 }}><span className="earn-amt">{t.earnAmount}</span><span style={{ color: "rgba(255,255,255,.7)", fontSize: 18, marginInlineStart: 8 }}>{t.earnSub}</span></div>
              {t.earnBaht ? <div style={{ color: "var(--rose-lt)", fontWeight: 700, marginTop: 4 }}>{t.earnBaht}</div> : null}
              <div style={{ color: "rgba(255,255,255,.82)", marginTop: 8, fontSize: 14.5 }}>{t.earnPlus}</div>
            </div>
            <div className="covers">{t.covers.map((c, i) => <div className="cover" key={i}><Check size={16} /> {c}</div>)}</div>
          </div>
        </div>
      </section>

      {/* WHO + HOW */}
      <section className="sec">
        <div className="wrap">
          <div className="grid-2">
            <div className="card reveal" style={{ padding: 30 }}>
              <div className="eyebrow">{t.reqs}</div>
              <h2 className="title" style={{ fontSize: 26, marginBottom: 16 }}>{t.lookTitle}</h2>
              {t.look.map((l, i) => <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < t.look.length - 1 ? "1px solid var(--line)" : "none" }}><Check size={20} style={{ color: "var(--gold-dk)", flex: "none", marginTop: 2 }} /><span style={{ fontSize: 14.5 }}>{l}</span></div>)}
            </div>
            <div className="reveal">
              <div className="eyebrow">{t.process}</div>
              <h2 className="title" style={{ fontSize: 26, marginBottom: 18 }}>{t.howTitle}</h2>
              <div style={{ display: "grid", gap: 14 }}>
                {t.how.map((h, i) => (
                  <div className="card steps-card" key={i}>
                    <div className="num" style={{ fontFamily: ar ? "'El Messiri',serif" : "'Playfair Display',serif" }}>{ar ? ["١", "٢", "٣"][i] : i + 1}</div>
                    <div><b style={{ fontSize: 16 }}>{h.t}</b><p style={{ margin: "2px 0 0", color: "var(--ink-2)", fontSize: 14 }}>{h.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAFE / LEGIT */}
      <section className="sec">
        <div className="wrap">
          <div className="center reveal"><div className="eyebrow" style={{ justifyContent: "center" }}>{t.safeEy}</div><h2 className="title">{t.safeTitle}</h2></div>
          <div className="grid-2" style={{ marginTop: 28 }}>
            {t.safe.map((x, i) => <div className="card reveal" key={i} style={{ padding: "18px 20px", display: "flex", gap: 12, alignItems: "flex-start" }}><BadgeCheck size={20} style={{ color: "var(--gold-dk)", flex: "none", marginTop: 2 }} /><span style={{ fontSize: 14.5 }}>{x}</span></div>)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec">
        <div className="wrap">
          <div className="center reveal"><div className="eyebrow" style={{ justifyContent: "center" }}>{t.faqEy}</div><h2 className="title">{t.faqTitle}</h2></div>
          <div style={{ maxWidth: 760, margin: "28px auto 0", display: "grid", gap: 12 }}>
            {t.faq.map((q, i) => <div className="card reveal" key={i} style={{ padding: "18px 22px" }}><b style={{ fontSize: 16 }}>{q.q}</b><p style={{ margin: "6px 0 0", color: "var(--ink-2)", fontSize: 14.5 }}>{q.a}</p></div>)}
          </div>
        </div>
      </section>

      {/* APPLY */}
      <section className="sec" id="apply" style={{ background: "var(--cream-2)" }}>
        <div className="wrap">
          <div className="center reveal" style={{ marginBottom: 30 }}><div className="eyebrow" style={{ justifyContent: "center" }}>{t.apply2}</div><h2 className="title">{t.formTitle}</h2></div>
          <div className="apply">
            <div className="card form reveal">
              <div className="field"><label style={invalidFields.includes("name") ? { color: "var(--magenta)" } : null}>{L.name}</label><input value={form.name} onChange={(e) => setF("name", e.target.value)} placeholder={L.name} style={bad("name")} /></div>
              <div className="field"><label style={invalidFields.includes("phone") ? { color: "var(--magenta)" } : null}>{L.phone}</label><input value={form.phone} onChange={(e) => setF("phone", e.target.value)} placeholder="+66 8X XXX XXXX" dir="ltr" inputMode="tel" style={bad("phone")} /></div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="field" style={{ flex: 1 }}><label style={invalidFields.includes("nationality") ? { color: "var(--magenta)" } : null}>{L.nat}</label><input value={form.nationality} onChange={(e) => setF("nationality", e.target.value)} style={bad("nationality")} /></div>
                <div className="field" style={{ flex: 1 }}><label style={invalidFields.includes("years") ? { color: "var(--magenta)" } : null}>{L.years}</label><input value={form.years} onChange={(e) => setF("years", e.target.value)} inputMode="numeric" placeholder="5" style={bad("years")} /></div>
              </div>
              <div className="field">
                <label style={invalidFields.includes("expPlace") ? { color: "var(--magenta)" } : null}>{L.expPlace}</label>
                <input value={form.expPlace} onChange={(e) => setF("expPlace", e.target.value)} placeholder={L.expPh} style={bad("expPlace")} />
                <p style={{ fontSize: 12, color: "var(--ink-2)", margin: "6px 2px 0" }}>{L.expHint}</p>
              </div>
              <div className="field"><label style={invalidFields.includes("arabic") ? { color: "var(--magenta)" } : null}>{t.arabicLabel}</label><div className="spec">{t.arabicLevels.map((lv) => <button key={lv} type="button" className={form.arabic === lv ? "on" : ""} onClick={() => setF("arabic", lv)}>{lv}</button>)}</div></div>
              <div className="field"><label style={invalidFields.includes("english") ? { color: "var(--magenta)" } : null}>{t.englishLabel}</label><div className="spec">{t.arabicLevels.map((lv) => <button key={lv} type="button" className={form.english === lv ? "on" : ""} onClick={() => setF("english", lv)}>{lv}</button>)}</div></div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="field" style={{ flex: 1 }}><label style={invalidFields.includes("age") ? { color: "var(--magenta)" } : null}>{L.age}</label><input value={form.age} onChange={(e) => setF("age", e.target.value)} inputMode="numeric" placeholder="28" style={bad("age")} /></div>
                <div className="field" style={{ flex: 1 }}><label style={invalidFields.includes("height") ? { color: "var(--magenta)" } : null}>{L.height}</label><input value={form.height} onChange={(e) => setF("height", e.target.value)} inputMode="numeric" placeholder="165" style={bad("height")} /></div>
                <div className="field" style={{ flex: 1 }}><label style={invalidFields.includes("weight") ? { color: "var(--magenta)" } : null}>{L.weight}</label><input value={form.weight} onChange={(e) => setF("weight", e.target.value)} inputMode="numeric" placeholder="60" style={bad("weight")} /></div>
              </div>
              <div className="field"><label style={invalidFields.includes("specs") ? { color: "var(--magenta)" } : null}>{L.spec}</label><div className="spec">{t.specs.map((sp) => <button key={sp} type="button" className={form.specs.includes(sp) ? "on" : ""} onClick={() => { toggleSpec(sp); if (invalidFields.includes("specs")) setInvalidFields((a) => a.filter((x) => x !== "specs")); }}>{sp}</button>)}</div></div>
              <div className="field"><label>{t.extraLabel}</label><div className="spec">{t.extras.map((x) => <button key={x} type="button" className={form.extras.includes(x) ? "on" : ""} onClick={() => toggleExtra(x)}>{x}</button>)}</div></div>
              <div className="field"><label style={invalidFields.includes("city") ? { color: "var(--magenta)" } : null}>{L.city}</label><select value={form.city} onChange={(e) => setF("city", e.target.value)} style={bad("city")}><option value="">{L.select}</option>{t.cities.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div className="field">
                <label style={invalidFields.includes("socials") ? { color: "var(--magenta)" } : null}>{L.socials}</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <select value={socialP} onChange={(e) => setSocialP(e.target.value)} style={{ flex: "0 0 130px" }}>{PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}</select>
                  <input value={socialU} onChange={(e) => setSocialU(e.target.value.replace(/[^a-zA-Z0-9._]/g, ""))} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSocial(); } }} placeholder={L.username} dir="ltr" style={{ flex: 1, minWidth: 130 }} />
                  <button type="button" className="btn btn-ghost" style={{ padding: "11px 18px" }} onClick={addSocial}>{L.add}</button>
                </div>
                {form.socials.length > 0 && (
                  <div className="spec" style={{ marginTop: 10 }}>
                    {form.socials.map((s, i) => (
                      <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 12px", borderRadius: 999, border: "1.5px solid var(--line)", background: "var(--gold-soft)", color: "var(--gold-dk)", fontWeight: 600, fontSize: 13 }}>
                        <b style={{ fontWeight: 700 }}>{s.p}</b><span dir="ltr">@{s.u}</span>
                        <button type="button" onClick={() => removeSocial(i)} aria-label="remove" style={{ display: "grid", placeItems: "center", color: "var(--coral)" }}><X size={14} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="field"><label>{L.msg}</label><textarea rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} /></div>
              <div className="field">
                <label>{L.photo}</label>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  {form.photos.length < MAX_PHOTOS && (
                    <label className="btn btn-ghost" style={{ padding: "11px 18px", cursor: "pointer" }}><Camera size={17} /> {L.choose}<input type="file" accept="image/*" multiple onChange={onPhoto} style={{ display: "none" }} /></label>
                  )}
                  {form.photos.map((src, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <img src={src} alt={"photo " + (i + 1)} style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", border: "1px solid var(--line)" }} />
                      <button type="button" onClick={() => removePhoto(i)} aria-label="remove" style={{ position: "absolute", insetBlockStart: -7, insetInlineEnd: -7, width: 22, height: 22, borderRadius: "50%", display: "grid", placeItems: "center", border: "1px solid var(--line)", background: "#fff", color: "var(--coral)", boxShadow: "0 2px 6px rgba(0,0,0,.15)" }}><X size={13} /></button>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: "var(--ink-2)", margin: "8px 0 0" }}>{L.photoHint}</p>
              </div>
              {status === "sent" ? (
                <div style={{ textAlign: "center", padding: "16px 0 4px" }}>
                  <div style={{ width: 62, height: 62, borderRadius: "50%", margin: "0 auto 12px", display: "grid", placeItems: "center", color: "#fff", background: "linear-gradient(135deg,var(--gold-lt),var(--gold-dk))" }}><Check size={28} strokeWidth={3} /></div>
                  <h3 style={{ fontSize: 19 }}>{L.sentT}</h3>
                  <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "6px 0 10px" }}>{L.sentD}</p>
                  <div style={{ background: "#E7F8EE", border: "1px solid rgba(31,175,85,.25)", borderRadius: 14, padding: "12px 16px", margin: "0 auto 16px", maxWidth: 440 }}>
                    <p style={{ color: "#137a3c", fontSize: 13.5, margin: 0, lineHeight: 1.6 }}>{L.waRefNote}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                    <a className="btn btn-wa" style={{ color: "#fff", background: "linear-gradient(135deg,#25d366,#1faf55)" }} href={waHref} target="_blank" rel="noreferrer"><MessageCircle size={17} /> {t.waBtn}</a>
                    <button type="button" className="btn btn-ghost" onClick={() => { setForm({ name: "", phone: "", nationality: L.nationality0, years: "", expPlace: "", arabic: "", english: "", age: "", height: "", weight: "", city: "", message: "", specs: [], extras: [], socials: [], photos: [] }); setStatus("idle"); }}>{L.another}</button>
                    <button type="button" className="btn btn-ghost" onClick={share}><Share2 size={16} /> {t.share}</button>
                  </div>
                </div>
              ) : (
                <>
                  <button type="button" className="btn btn-wa" style={{ width: "100%", color: "#fff", background: "linear-gradient(135deg,#25d366,#1faf55)", opacity: status === "sending" ? .8 : 1, pointerEvents: status === "sending" ? "none" : "auto" }} onClick={submit}>
                    {status === "sending" ? <><span className="spin" /> {L.sending}</> : <><Send size={17} /> {SHEET_ENDPOINT ? L.submit : L.waSend}</>}
                  </button>
                  {(status === "invalid" || (!formValid && status === "error")) && <p style={{ fontSize: 12.5, color: "var(--coral)", margin: "10px 0 0", textAlign: "center" }}>{L.req}</p>}
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec">
        <div className="wrap">
          <div className="cta-band reveal">
            <Fil />
            <h2 className="title" style={{ marginTop: 16 }}>{t.ctaTitle}</h2>
            <p className="lede" style={{ margin: "10px auto 0", maxWidth: 520 }}>{t.ctaSub}</p>
            <a className="btn btn-gold" style={{ marginTop: 22 }} href="#apply">{t.applyNow}</a>
          </div>
        </div>
      </section>

      <footer className="ft">
        <div className="wrap">
          <div className="ft-top">
            <div className="logo"><div className="mk" style={{ background: "rgba(255,255,255,.08)", borderColor: "rgba(255,255,255,.2)" }}><SabaiMark s={30} /></div><div className="nm" style={{ color: "#fff" }}>{ar ? "ساباي" : "Sabai"}</div></div>
            <a href="#apply" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>{t.applyNow}</a>
          </div>
          <div className="ft-bottom">{t.footRights}</div>
        </div>
      </footer>

    </div>
  );
}
