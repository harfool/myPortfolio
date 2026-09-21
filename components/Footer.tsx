"use client";

const QUICK_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Full-Stack Development",
  "AI Automation",
  "Digital Marketing",
  "Web Design & UI/UX",
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harfool-gurjar-84997637a",
  },
  { label: "GitHub", href: "https://github.com/harfool" },
  { label: "Email", href: "mailto:harfoolgujjar63@gmail.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white text-black">
      {/* Giant background quote */}
      <div className="pointer-events-none absolute inset-x-0 top-0 select-none overflow-hidden">
        <div className="flex translate-y-[-8%] whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <p
              key={i}
              className="pr-12 text-[18vw] font-black uppercase leading-none tracking-tighter text-black/[0.04] sm:pr-16 sm:text-[14vw]"
            >
              Build. Ship. Repeat.
            </p>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 xl:px-0 pt-32 pb-10 sm:pt-40 lg:pt-48">
        {/* Top: name + CTA */}
        <div className="flex flex-col gap-8 border-b border-black pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40">
              Harfool Gurjar
            </span>
            <h2 className="mt-4 max-w-lg text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              Got an idea? Let&apos;s make it real.
            </h2>
          </div>

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </a>
        </div>

        {/* Middle: info grid */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
              Contact
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href="mailto:harfoolgujjar63@gmail.com"
                className="block text-black/70 transition hover:text-black"
              >
                harfoolgujjar63@gmail.com
              </a>
              <a
                href="tel:+919610237965"
                className="block text-black/70 transition hover:text-black"
              >
                +91 96102 37965
              </a>
              <p className="text-black/70">Bhilware, Rajasthan, India</p>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-black/70 transition hover:text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              {SERVICES.map((service) => (
                <li key={service} className="text-sm text-black/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-fit items-center gap-1 text-sm text-black/70 transition hover:text-black"
                >
                  {social.label}
                  <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-black/10 pt-8 text-xs text-black/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Harfool Gurjar. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Available for freelance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
// px-6 py-10 lg:py-30 sm:px-10 lg:px-16
