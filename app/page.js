'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Component as ComponentIcon,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  KeyRound,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MonitorSmartphone,
  Phone,
  RefreshCcw,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Webhook,
  X,
} from "lucide-react";
import {
  SiBootstrap,
  SiCplusplus,
  SiDart,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiRailway,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

// ================================================================
//  SETUP — two files to drop into your Next.js /public folder:
//    1. /public/hassan1.png                    → your photo (portrait, ~4:5)
//    2. /public/Hassan_Abdullah_Resume.pdf     → your CV
//  Until the photo exists, the site shows a clean "HA" monogram.
// ================================================================
const PHOTO_SRC = "/hassan123.png";
const RESUME_URL = "/Hassan_Abdullah_Resume.pdf";

// Programmatic smooth scrolling — more reliable than raw #hash links
// (works in sandboxed previews, respects reduced motion, keeps the URL hash in sync)
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  try { history.replaceState(null, "", "#" + id); } catch (err) { /* sandboxed */ }
};
const handleNavClick = (e, id) => {
  e.preventDefault();
  scrollToId(id);
};

// ---------------------------------------------------------------- data
const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { value: "1+", label: "Year of hands-on experience" },
  { value: "5", label: "Featured projects" },
  { value: "PERN", label: "Current stack focus" },
];

const SKILLS = [
  {
    group: "Core Stack (PERN)",
    icon: Database,
    items: ["PostgreSQL", "Express.js", "React.js", "Node.js", "REST APIs", "CRUD", "Authentication"],
    core: true,
  },
  {
    group: "Languages",
    icon: Code2,
    items: ["JavaScript", "TypeScript", "PHP", "Python", "Dart", "C++"],
  },
  {
    group: "Also Experienced In",
    icon: Server,
    items: ["Laravel", "Django", "Flutter", "MySQL", "MongoDB"],
  },
  {
    group: "Frontend & Styling",
    icon: Sparkles,
    items: ["React Components", "Tailwind CSS", "Bootstrap", "Responsive UI"],
  },
  {
    group: "Tools & Deployment",
    icon: Rocket,
    items: ["Git", "GitHub", "Postman", "VS Code", "Docker", "Vercel", "Railway"],
  },
];

// Real technology logos where one exists (Simple Icons); generic lucide icons
// for concepts without a brand mark (REST APIs, CRUD, Authentication, etc.)
const TECH_ICONS = {
  PostgreSQL: SiPostgresql,
  "Express.js": SiExpress,
  "React.js": SiReact,
  "Node.js": SiNodedotjs,
  "REST APIs": Webhook,
  CRUD: RefreshCcw,
  Authentication: KeyRound,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  PHP: SiPhp,
  Python: SiPython,
  Dart: SiDart,
  "C++": SiCplusplus,
  Laravel: SiLaravel,
  Django: SiDjango,
  Flutter: SiFlutter,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  "React Components": ComponentIcon,
  "Tailwind CSS": SiTailwindcss,
  Bootstrap: SiBootstrap,
  "Responsive UI": MonitorSmartphone,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "VS Code": Code2,
  Docker: SiDocker,
  Vercel: SiVercel,
  Railway: SiRailway,
};

const EXPERIENCE = [
  {
    role: "Laravel / PHP Developer",
    company: "Aurion Tech Global",
    logo: "/aurion1.png",
    logoW: 1397,
    logoH: 1397,
    period: "Jun 2025 — Apr 2026",
    points: [
      "Developed backend modules and REST APIs in Laravel/PHP with MySQL for a live production platform.",
      "Wrote and optimized database queries, improving backend performance on key user-facing features.",
      "Maintained live client projects through bug fixing, code cleanup, and incremental feature improvements.",
    ],
  },
  {
    role: "Junior Developer · Internship",
    company: "Expert Soft Solutions",
    logo: "/expert1.png",
    logoW: 1206,
    logoH: 512,
    period: "Feb 2025 — Jun 2025",
    points: [
      "Built and updated frontend and backend features using Python, Django, and React.js.",
      "Resolved bugs, integrated frontend-backend features, and shipped updates in a Git-based team workflow.",
    ],
  },
  {
    role: "IT Services Lead",
    company: "BEMCON",
    logo: "/bemcon1.png",
    logoW: 2306,
    logoH: 600,
    period: "Nov 2023 — Jan 2025",
    points: [
      "Managed IT services, technical support, and infrastructure troubleshooting; supported digital operations.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Lexisera — IELTS Preparation Platform",
    logo: "/lexisera11.png",
    logoW: 1206,
    logoH: 512,
    tech: ["PostgreSQL", "Express.js", "React.js", "Node.js", "REST APIs"],
    live: null,
    status: "In production · Vercel + Railway",
    featured: true,
    points: [
      "Full-stack EdTech platform covering IELTS Listening, Reading, Writing, and Speaking practice with lessons, tasks, and student submissions.",
      "Designed the PostgreSQL schema for users, lessons, tasks, submissions, and progress tracking.",
      "Built REST APIs powering the student dashboard and admin panel with complete CRUD workflows.",
      "Developed the React frontend with reusable components, authentication, and role-based student/admin views.",
      "Deployed to production — React frontend on Vercel, Node.js/Express backend on Railway.",
    ],
  },
  {
    name: "IPBEX Platform",
    logo: "/ipbexn5.webp",
    logoW: 6040,
    logoH: 2346,
    tech: ["Laravel", "PHP", "MySQL"],
    live: "https://ipbex.org/",
    liveLabel: "ipbex.org",
    points: ["Developed and maintained backend modules and APIs for a live web platform, focusing on performance and security."],
  },
  {
    name: "Ghana Land Search",
    logo: "/ghanalandsearch.png",
    logoW: 1773,
    logoH: 489,
    tech: ["Laravel", "PHP", "MySQL", "TypeScript"],
    live: "https://ghanalandsearch.com/",
    liveLabel: "ghanalandsearch.com",
    points: ["Built database-driven search features, optimized queries, and API integrations for a real-estate search platform."],
  },
  {
    name: "Personal Portfolio Website",
    logo: "/hassan1.png",
    logoW: 1254,
    logoH: 1254,
    logoRound: true,
    tech: ["React.js", "Next.js"],
    live: "https://hassan-portfolio-puce.vercel.app/",
    liveLabel: "My Portfolio",
    points: ["This site — designed and built with reusable React components, deployed on Vercel."],
  },
  {
    name: "AI-Based Body Measurement App",
    tech: ["Flutter", "Dart"],
    live: null,
    tag: "Final Year Project",
    points: ["Cross-platform mobile app that estimates body measurements using AI-based image processing."],
  },
];

// ---------------------------------------------------------------- hooks
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function Reveal({ children, className = "", delay = "0ms" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? delay : "0ms" }}
      className={
        className +
        " transition-all duration-700 ease-out " +
        (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
      }
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------- building blocks
function SectionHeader({ eyebrow, title, children }) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs tracking-[0.24em] uppercase text-orange-500">
        {eyebrow}
      </p>
      <div className="mt-3 max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        {children && <p className="mt-4 max-w-2xl leading-relaxed text-neutral-400">{children}</p>}
      </div>
    </Reveal>
  );
}

function LiveDot() {
  return (
    <span className="relative mr-2 flex h-2 w-2 shrink-0" aria-hidden="true">
      <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function Chip({ children, core }) {
  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm " +
        (core
          ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
          : "border-neutral-700 bg-neutral-800/60 text-neutral-300 hover:border-neutral-600")
      }
    >
      {children}
    </span>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex text-sm leading-relaxed text-neutral-300 sm:text-base">
      <CheckCircle2 size={16} className="mr-2 mt-1 shrink-0 text-orange-500" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 shadow-sm transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:text-orange-400"
    >
      {children}
    </a>
  );
}

// Photo frame; falls back to an HA monogram until hassan1.png exists
function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900 shadow-2xl shadow-black/50">
      <div className="relative aspect-[4/5] w-full">
        {!failed ? (
          <Image
            src={PHOTO_SRC}
            alt="Hassan Abdullah"
            fill
            priority
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px"
            onError={() => setFailed(true)}
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
            <span className="text-6xl font-black text-neutral-700">HA</span>
            <span className="mt-3 max-w-40 text-center text-xs text-neutral-600">
              add /public/hassan1.png
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function TerminalCard() {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 shadow-2xl shadow-black/40">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="font-mono text-xs text-neutral-500">portfolio.js</span>
      </div>
      <div className="space-y-2 font-mono text-xs leading-relaxed sm:text-sm">
        <p><span className="text-neutral-500">const</span> <span className="text-cyan-300">developer</span> <span className="text-neutral-500">=</span> <span className="text-emerald-300">"Hassan Abdullah"</span>;</p>
        <p><span className="text-neutral-500">stack</span>.<span className="text-orange-300">focus</span>() <span className="text-neutral-500">// PERN + Laravel</span></p>
        <p><span className="text-neutral-500">deploy</span>(<span className="text-emerald-300">"Vercel"</span>, <span className="text-emerald-300">"Railway"</span>);</p>
        <p><span className="text-neutral-500">status</span>: <span className="text-emerald-300">open_to_roles</span>;</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- navbar
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 py-3" aria-label="Main navigation">
      <div
        className={
          "mx-auto flex h-16 max-w-6xl items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-5 " +
          (scrolled
            ? "border-white/10 bg-neutral-950/85 shadow-lg shadow-black/40 backdrop-blur-xl"
            : "border-transparent bg-neutral-950/60 backdrop-blur-md")
        }
      >
        <a href="#home" className="group inline-flex items-center gap-2 text-sm font-semibold text-white" onClick={(e) => { setOpen(false); handleNavClick(e, "home"); }}>
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-600 text-white transition-transform group-hover:-rotate-6">HA</span>
          <span>Hassan Abdullah</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a
                href={"#" + n.id}
                onClick={(e) => handleNavClick(e, n.id)}
                className={
                  "rounded-full px-4 py-2 text-sm transition-colors " +
                  (active === n.id
                    ? "bg-orange-500/10 text-orange-400 font-semibold"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white")
                }
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center md:flex">
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 pr-5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-700 hover:shadow-md"
          >
            <span className="mr-3 grid h-11 w-11 place-items-center bg-orange-600 text-white transition-colors group-hover:bg-orange-500">
              <Download size={15} />
            </span>
            Resume
          </a>
        </div>

        <button
          className="rounded-xl p-2 text-neutral-300 transition-colors hover:bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-neutral-950/95 p-3 shadow-xl shadow-black/40 backdrop-blur-xl md:hidden">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={"#" + n.id}
              onClick={(e) => { setOpen(false); handleNavClick(e, n.id); }}
              className={
                "block rounded-xl px-4 py-3 text-base " +
                (active === n.id ? "bg-orange-500/10 text-orange-400 font-semibold" : "text-neutral-300")
              }
            >
              {n.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white"
          >
            <Download size={15} className="mr-1.5" /> Resume
          </a>
        </div>
      )}
    </nav>
  );
}

// ---------------------------------------------------------------- footer
function Footer() {
  return (
    <footer className="relative overflow-hidden bg-neutral-950 text-neutral-300">
      <Image
        src="/bg1.jfif"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="select-none object-cover opacity-[0.07] "
      />
      <div className="relative">
        {/* CTA strip */}
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 px-5 py-10 sm:px-6 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Have a role or project in mind?</h3>
              <p className="mt-1 text-sm text-neutral-400">I usually reply within a day.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hassannabdullaho@gmail.com"
                className="inline-flex items-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500"
              >
                <Mail size={15} className="mr-2" /> Email me
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
              >
                <Download size={15} className="mr-2" /> Resume
              </a>
            </div>
          </div>
        </div>

        {/* main grid */}
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-12">
          {/* brand */}
          <div className="lg:col-span-5">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-orange-600 text-xs text-white">HA</span>
              <span>Hassan Abdullah</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
              Junior Full-Stack Developer — PERN Stack Focus. I build web
              applications and ship them to production.
            </p>
            <p className="mt-4 inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
              <LiveDot />
              Available for junior full-stack roles
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="https://github.com/abdullah3566" target="_blank" rel="noreferrer" aria-label="GitHub"
                 className="rounded-lg border border-white/10 p-2.5 text-neutral-400 transition-colors hover:border-orange-500/40 hover:text-orange-400">
                <Github size={17} />
              </a>
              <a href="https://www.linkedin.com/in/hassanbhutta-dev/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
                 className="rounded-lg border border-white/10 p-2.5 text-neutral-400 transition-colors hover:border-orange-500/40 hover:text-orange-400">
                <Linkedin size={17} />
              </a>
              <a href="mailto:hassannabdullaho@gmail.com" aria-label="Email"
                 className="rounded-lg border border-white/10 p-2.5 text-neutral-400 transition-colors hover:border-orange-500/40 hover:text-orange-400">
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* sections */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">Sections</h3>
            <ul className="grid grid-cols-2 gap-2 sm:block sm:space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a
                    href={"#" + n.id}
                    onClick={(e) => handleNavClick(e, n.id)}
                    className="text-sm text-neutral-400 transition-colors hover:text-orange-400"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={RESUME_URL} target="_blank" rel="noreferrer" className="text-sm text-neutral-400 transition-colors hover:text-orange-400">
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>

          {/* contact */}
          <div className="lg:col-span-4">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-neutral-500">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:hassannabdullaho@gmail.com" className="flex items-center break-all text-neutral-400 transition-colors hover:text-orange-400">
                  <Mail size={14} className="mr-2 shrink-0" /> hassannabdullaho@gmail.com
                </a>
              </li>
              <li className="flex items-center text-neutral-400">
                <Phone size={14} className="mr-2 shrink-0" /> +92 302-3274949
              </li>
              <li className="flex items-center text-neutral-400">
                <MapPin size={14} className="mr-2 shrink-0" /> Lahore, Pakistan
              </li>
              <li>
                <a href="https://github.com/abdullah3566" target="_blank" rel="noreferrer" className="flex items-center break-all text-neutral-400 transition-colors hover:text-orange-400">
                  <Github size={14} className="mr-2 shrink-0" /> github.com/abdullah3566
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hassanbhutta-dev/" target="_blank" rel="noreferrer" className="flex items-center break-all text-neutral-400 transition-colors hover:text-orange-400">
                  <Linkedin size={14} className="mr-2 shrink-0" /> linkedin.com/in/hassanbhutta-dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* watermark + bottom bar */}
        <div className="relative border-t border-white/10">
          <div className="watermark-row relative mx-auto flex h-28 max-w-6xl items-center justify-center px-5 sm:h-40 sm:px-6">
            <p
              aria-hidden="true"
              className="watermark-name relative select-none whitespace-nowrap text-center font-black leading-none tracking-tight text-white/[0.03] [-webkit-text-stroke:1px_rgba(249,115,22,0.14)] text-[clamp(2rem,9vw,6.5rem)]"
            >
              HASSAN
            </p>
          </div>

          <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-5 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
            <p className="inline-flex items-center text-xs text-neutral-500">
              <LiveDot />
              Available for new opportunities
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-neutral-500">
              <span>© 2026 Hassan Abdullah. All rights reserved.</span>
              <span className="hidden h-1 w-1 rounded-full bg-neutral-700 sm:inline-block" aria-hidden="true" />
              <span>Designed &amp; built by me ·</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------- page
export default function Portfolio() {
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-neutral-950 text-neutral-100 antialiased">
      <style>{`
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        .live-ping { animation: livePing 1.6s cubic-bezier(0,0,.2,1) infinite; }
        @keyframes livePing { 75%, 100% { transform: scale(2.4); opacity: 0; } }
        .mesh-bg {
          background:
            radial-gradient(circle at 12% 18%, rgba(249, 115, 22, 0.18), transparent 32%),
            radial-gradient(circle at 88% 10%, rgba(234, 88, 12, 0.14), transparent 30%),
            radial-gradient(circle at 55% 68%, rgba(251, 191, 36, 0.07), transparent 30%);
          animation: meshDrift 18s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes meshDrift {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(1.5%, -2%, 0) scale(1.05); }
        }
        .grid-mask {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 72%);
        }
        .animate-float {
          animation: floatSlow 6s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-gradient-x {
          animation: gradientX 4s ease infinite;
        }
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .flip-card-face {
          position: absolute;
          inset: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .flip-card-face.flip-card-front {
          opacity: 1;
          transform: scaleX(1);
        }
        .flip-card-face.flip-card-back {
          opacity: 0;
          transform: scaleX(0.92);
          pointer-events: none;
        }
        .flip-card:hover .flip-card-face.flip-card-front {
          opacity: 0;
          transform: scaleX(0.92);
          pointer-events: none;
        }
        .flip-card:hover .flip-card-face.flip-card-back {
          opacity: 1;
          transform: scaleX(1);
          pointer-events: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .live-ping { animation: none; }
          .mesh-bg { animation: none; }
          .animate-float { animation: none; }
          .animate-gradient-x { animation: none; }
          .flip-card-face { transition: none; }
          * { transition-duration: 0.01ms !important; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid #f97316;
          outline-offset: 3px;
          border-radius: 10px;
        }
        .skip-link {
          position: absolute;
          left: -9999px;
          top: 0;
          z-index: 100;
          background: #ea580c;
          color: #fff;
          padding: 8px 16px;
          border-radius: 0 0 12px 0;
        }
        .skip-link:focus { left: 0; }
        .watermark-name {
          transition: text-shadow 0.4s ease, color 0.4s ease;
        }
        .watermark-row:hover .watermark-name {
          color: rgba(255, 255, 255, 0.06);
          text-shadow: 0 0 40px rgba(249, 115, 22, 0.65), 0 0 90px rgba(249, 115, 22, 0.4);
        }
        @media (prefers-reduced-motion: reduce) {
          .watermark-name { transition: none; }
        }
      `}</style>

      <a href="#home" className="skip-link">Skip to content</a>
      <Navbar active={active} />

      <main>
        {/* ============ home / hero ============ */}
        <section id="home" className="relative scroll-mt-24 overflow-hidden bg-neutral-950 pt-28 pb-20 sm:pt-32">
          <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 grid-mask opacity-80" aria-hidden="true" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                <span className="h-2 w-2 shrink-0 bg-orange-500" aria-hidden="true" />
                Junior Full-Stack Developer
              </div>
            </Reveal>

            <div className="mt-6 grid gap-12 lg:grid-cols-12 lg:gap-6">
              {/* left: headline, copy, CTAs, stats */}
              <div className="lg:col-span-7">
                <Reveal delay="80ms">
                  <h1 className="font-black uppercase leading-[0.92] tracking-tight text-white text-[clamp(2.75rem,7vw,4.75rem)]">
                    <span className="text-white">Code</span> <span className="text-neutral-600">that</span>
                    <br />
                    <span className="text-neutral-600">turns ideas</span>
                    <br />
                    <span className="text-neutral-600">into products</span>
                  </h1>
                </Reveal>

                <Reveal delay="200ms">
                  <p className="mt-8 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg">
                    I build production web applications with a growing focus on the PERN stack. Over the past year I've shipped backend modules and APIs for live platforms — right now I'm building
                    <span className="font-semibold text-white"> Lexisera</span>, an IELTS prep platform live on Vercel and Railway.
                  </p>
                </Reveal>

                <Reveal delay="290ms">
                  <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <a
                      href="#work"
                      onClick={(e) => handleNavClick(e, "work")}
                      className="group inline-flex items-center justify-center overflow-hidden rounded-full border border-neutral-800 bg-neutral-900 pr-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-neutral-700"
                    >
                      <span className="mr-3 grid h-12 w-12 shrink-0 place-items-center bg-orange-600 transition-colors group-hover:bg-orange-500">
                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      See my work
                    </a>
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-300 transition-all hover:-translate-y-0.5 hover:border-neutral-700 hover:text-white"
                    >
                      <Download size={16} className="mr-2" /> Download CV
                    </a>
                    <div className="flex items-center justify-center gap-2 pt-1 sm:justify-start sm:pt-0">
                      <SocialLink href="https://github.com/abdullah3566" label="GitHub"><Github size={20} /></SocialLink>
                      <SocialLink href="https://www.linkedin.com/in/hassanbhutta-dev/" label="LinkedIn"><Linkedin size={20} /></SocialLink>
                      <SocialLink href="mailto:hassannabdullaho@gmail.com" label="Email"><Mail size={20} /></SocialLink>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay="360ms">
                  <div className="mt-6 inline-flex max-w-full items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                    <LiveDot />
                    <span>Open to junior full-stack roles — on-site or remote</span>
                  </div>
                </Reveal>

                <Reveal delay="430ms">
                  <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-neutral-800 pt-6">
                    {STATS.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-2xl font-bold tracking-tight text-white">{stat.value}</p>
                        <p className="mt-1 text-xs text-neutral-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              {/* right: photo with glow + hire badge */}
              <Reveal className="relative lg:z-10 lg:col-span-5" delay="150ms">
                <div className="relative mx-auto w-64 sm:w-80 lg:ml-auto lg:mr-0 lg:w-full lg:max-w-sm">
                  <div
                    aria-hidden="true"
                    className="animate-float absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-orange-600 via-orange-500 to-amber-400 opacity-80 blur-2xl"
                  />
                  <ProfilePhoto />
                  <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "contact")}
                    className="absolute -bottom-6 -left-6 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-orange-600 text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-white shadow-xl shadow-orange-950/50 ring-8 ring-neutral-950 transition-transform hover:scale-105 sm:-bottom-7 sm:-left-7 sm:h-28 sm:w-28 sm:text-[11px]"
                  >
                    Available
                    <br />
                    Now
                  </a>
                </div>
              </Reveal>
            </div>

            {/* giant name */}
            <Reveal delay="500ms">
              <p className="mt-14 select-none break-words font-black uppercase leading-[0.85] tracking-tight text-white text-[clamp(2.5rem,10vw,6.5rem)] sm:mt-16 lg:mt-20">
                Hassan{" "}
                <span className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                  Abdullah
                </span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============ about ============ */}
        <section id="about" className="relative scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="about" title="A developer shaped by real products, not only coursework.">
              Practical experience across Laravel/PHP, Django, React, and now a stronger PERN-stack direction.
            </SectionHeader>

            <div className="grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-8">
                <div className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 shadow-xl shadow-black/30 backdrop-blur sm:p-8">
                  <div className="space-y-5 leading-relaxed text-neutral-300">
                    <p>
                      I graduated with a BS in Computer Science from the University of the Punjab in 2026, but most of what I know about shipping software came from working on real products alongside my degree. At <span className="font-semibold text-white">Aurion Tech Global</span>, I spent close to a year on a live Laravel/PHP platform — writing backend modules and REST APIs, optimizing MySQL queries, and fixing the kind of production bugs you only meet when real users are involved.
                    </p>
                    <p>
                      Before that, an internship at <span className="font-semibold text-white">Expert Soft Solutions</span> had me shipping Django and React features in a team workflow. These days my focus is the PERN stack. I am building <span className="font-semibold text-white">Lexisera</span>, an IELTS preparation platform — I designed the PostgreSQL schema, built REST APIs and role-based dashboards, and deployed it with the React frontend on Vercel and the Node.js/Express backend on Railway.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal className="lg:col-span-4" delay="100ms">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-3xl border border-orange-500/20 bg-orange-500/10 p-6">
                    <GraduationCap className="text-orange-400" size={24} />
                    <h3 className="mt-4 font-semibold text-white">BS Computer Science</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">University of the Punjab · 2026</p>
                  </div>
                  <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm shadow-black/20">
                    <BriefcaseBusiness className="text-orange-400" size={24} />
                    <h3 className="mt-4 font-semibold text-white">Production Experience</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">Backend APIs, database queries, bug fixing, and client projects.</p>
                  </div>
                  <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-sm shadow-black/20">
                    <Terminal className="text-orange-400" size={24} />
                    <h3 className="mt-4 font-semibold text-white">Current Goal</h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">Join a team where I can keep building at a higher level.</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============ skills ============ */}
        <section id="skills" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="skills" title="A practical toolkit for modern full-stack work.">
              Clear PERN-stack focus, with useful experience in Laravel, Django, Flutter, and deployment workflows.
            </SectionHeader>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((s, index) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.group} delay={`${index * 45}ms`}>
                    <div className="flip-card h-[280px] transition-transform duration-300 hover:-translate-y-1">
                      <div className="flip-card-inner">
                        {/* front */}
                        <article className={
                          "flip-card-face flip-card-front flex h-full flex-col rounded-3xl border p-6 shadow-sm " +
                          (s.core ? "border-orange-500/25 bg-orange-500/10 shadow-orange-950/10" : "border-neutral-800 bg-neutral-900 shadow-black/20")
                        }>
                          <div className="flex items-center justify-between gap-4">
                            <div className={"grid h-12 w-12 place-items-center rounded-2xl " + (s.core ? "bg-orange-600 text-white" : "bg-neutral-800 text-orange-400")}>
                              <Icon size={22} />
                            </div>
                            {s.core && <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-semibold text-orange-400">Primary</span>}
                          </div>
                          <h3 className="mt-5 font-semibold text-white">{s.group}</h3>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {s.items.map((i) => <Chip key={i} core={s.core}>{i}</Chip>)}
                          </div>
                        </article>

                        {/* back — technology icons */}
                        <article className={
                          "flip-card-face flip-card-back flex h-full flex-col rounded-3xl border p-6 shadow-sm " +
                          (s.core ? "border-orange-500/25 bg-orange-500/10 shadow-orange-950/10" : "border-neutral-800 bg-neutral-900 shadow-black/20")
                        }>
                          <h3 className="font-semibold text-white">{s.group}</h3>
                          <div className="mt-4 grid flex-1 grid-cols-4 place-items-center gap-x-2 gap-y-4 content-center">
                            {s.items.map((i) => {
                              const TechIcon = TECH_ICONS[i];
                              return (
                                <div key={i} className="flex flex-col items-center gap-1.5" title={i}>
                                  <span className={"grid h-10 w-10 place-items-center rounded-xl " + (s.core ? "bg-orange-600/15 text-orange-300" : "bg-neutral-800 text-neutral-200")}>
                                    {TechIcon && <TechIcon size={19} />}
                                  </span>
                                  <span className="max-w-[4.5rem] truncate text-center text-[10px] leading-tight text-neutral-500">{i}</span>
                                </div>
                              );
                            })}
                          </div>
                        </article>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ experience ============ */}
        <section id="experience" className="scroll-mt-24 bg-neutral-900 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="experience" title="Work history with hands-on product delivery.">
              A clean timeline showing growth from IT operations to software development and production backend work.
            </SectionHeader>

            <div className="relative space-y-6 before:absolute before:left-4 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-neutral-700 sm:before:left-6">
              {EXPERIENCE.map((e, index) => (
                <Reveal key={e.company} delay={`${index * 60}ms`}>
                  <article className="relative ml-10 rounded-3xl border border-neutral-800 bg-neutral-950/40 p-6 shadow-sm shadow-black/20 transition-all hover:-translate-y-1 hover:bg-neutral-900 hover:shadow-xl sm:ml-16 sm:p-7">
                    <span className="absolute -left-[2.15rem] top-7 grid h-4 w-4 place-items-center rounded-full border-4 border-neutral-900 bg-orange-600 shadow-sm sm:-left-[2.7rem]" aria-hidden="true" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">{e.period}</p>
                        <h3 className="mt-2 text-lg font-semibold text-white">
                          {e.role} <span className="font-normal text-neutral-500">— {e.company}</span>
                        </h3>
                      </div>
                      {e.logo && (
                        <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-sm transition-transform duration-300 ease-out hover:scale-125">
                          <Image src={e.logo} alt={`${e.company} logo`} width={e.logoW} height={e.logoH} className="h-full w-full object-contain" />
                        </div>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {e.points.map((p) => <Bullet key={p}>{p}</Bullet>)}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ work / projects ============ */}
        <section id="work" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeader eyebrow="work" title="Selected projects with real-world relevance.">
              Featured work includes a production IELTS platform, live Laravel platforms, and mobile development.
            </SectionHeader>

            <div className="grid gap-5 lg:grid-cols-2">
              {PROJECTS.map((p, index) => (
                <Reveal key={p.name} delay={`${index * 50}ms`} className={p.featured ? "lg:col-span-2" : ""}>
                  <article
                    className={
                      "group relative h-full overflow-hidden rounded-3xl border bg-neutral-900 p-6 shadow-sm shadow-black/20 transition-all hover:-translate-y-1 hover:shadow-2xl sm:p-7 " +
                      (p.featured ? "border-orange-500/30 shadow-orange-950/10" : "border-neutral-800")
                    }
                  >
                    {p.featured && <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-600 via-amber-400 to-orange-600" aria-hidden="true" />}
                    <div className={p.featured ? "grid gap-7 lg:grid-cols-12" : ""}>
                      <div className={p.featured ? "lg:col-span-7" : ""}>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex items-center gap-3">
                              {p.logo && (
                                <div className={
                                  "flex shrink-0 items-center justify-center shadow-sm transition-transform duration-300 ease-out hover:scale-125 " +
                                  (p.logoRound ? "h-10 w-10 overflow-hidden rounded-full border border-white/10" : "h-9 w-14 rounded-lg bg-white p-1.5")
                                }>
                                  <Image
                                    src={p.logo}
                                    alt={`${p.name} logo`}
                                    width={p.logoW}
                                    height={p.logoH}
                                    className={"h-full w-full " + (p.logoRound ? "object-cover" : "object-contain")}
                                  />
                                </div>
                              )}
                              <h3 className="text-xl font-bold tracking-tight text-white">{p.name}</h3>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {p.tech.map((t) => (
                                <span key={t} className="rounded-full bg-neutral-800 px-3 py-1 font-mono text-xs text-neutral-300">{t}</span>
                              ))}
                            </div>
                          </div>

                          <div className="shrink-0">
                            {p.status && (
                              <span className="inline-flex items-center rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                                <LiveDot />
                                {p.status}
                              </span>
                            )}
                            {p.live && (
                              <a
                                href={p.live}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-300 transition-colors hover:bg-orange-600 hover:text-white"
                              >
                                {p.liveLabel} <ExternalLink size={13} className="ml-1" />
                              </a>
                            )}
                            {p.tag && (
                              <span className="inline-block rounded-full bg-neutral-800 px-3 py-1.5 text-xs font-semibold text-neutral-300">
                                {p.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        <ul className="mt-5 space-y-2">
                          {p.points.map((pt) => <Bullet key={pt}>{pt}</Bullet>)}
                        </ul>
                      </div>

                      {p.featured && (
                        <div className="lg:col-span-5">
                          <TerminalCard />
                        </div>
                      )}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ contact ============ */}
        <section id="contact" className="scroll-mt-24 px-5 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-neutral-900 p-8 text-white shadow-2xl shadow-black/40 sm:p-10 lg:p-12">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-600/25 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-20 left-20 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" aria-hidden="true" />

                <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <p className="font-mono text-xs uppercase tracking-[0.24em] text-orange-300">contact</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Let's build something useful.</h2>
                    <p className="mt-4 max-w-2xl leading-relaxed text-neutral-300">
                      I am looking for a junior full-stack role — on-site in Pakistan or remote. If you are hiring, or just want to talk about a project, my inbox is open.
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                      <div className="space-y-3 text-sm text-neutral-200">
                        <a href="mailto:hassannabdullaho@gmail.com" className="flex items-center break-all transition-colors hover:text-orange-400">
                          <Mail size={16} className="mr-2 shrink-0" /> hassannabdullaho@gmail.com
                        </a>
                        <p className="flex items-center"><Phone size={16} className="mr-2 shrink-0" /> +92 302-3274949</p>
                        <p className="flex items-center"><MapPin size={16} className="mr-2 shrink-0" /> Lahore, Pakistan</p>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <a
                          href="mailto:hassannabdullaho@gmail.com"
                          className="inline-flex items-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500"
                        >
                          <Mail size={16} className="mr-2" /> Email me
                        </a>
                        <a
                          href={RESUME_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                        >
                          <Download size={16} className="mr-2" /> Download CV
                        </a>
                        <a
                          href="https://www.linkedin.com/in/hassanbhutta-dev/"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                        >
                          <Linkedin size={16} className="mr-2" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />

      {showTop && (
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 rounded-full border border-neutral-800 bg-neutral-900 p-3 text-neutral-300 shadow-lg shadow-black/40 transition-all hover:-translate-y-0.5 hover:border-orange-500/40 hover:text-orange-400"
        >
          <ArrowUp size={18} />
        </a>
      )}
    </div>
  );
}
