"use client";

import Image from "next/image";
import {
  FOOTER_SERVICES,
  FOOTER_SOCIALS,
  NOTES,
  QUICK_LINKS,
} from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-white text-black">
      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-10 sm:px-6 lg:pt-28 lg:pt-32 xl:px-0">
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
              {FOOTER_SERVICES.map((service) => (
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
              {FOOTER_SOCIALS.map((social) => (
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

        {/* Editorial image mosaic — mobile overlay */}
        <div className="border border-black md:hidden">
          <div className="relative h-[460px] overflow-hidden">
            <Image
              src="/images/footer-image.png"
              alt="Harfool Gurjar"
              fill
              sizes="100vw"
              className="object-cover object-top grayscale"
            />
            {/* top note */}
            <div className="absolute inset-x-0 top-0 border-b border-black bg-black p-5">
              <p className="max-w-[32ch] text-sm leading-relaxed text-white/70">
                {NOTES[0]}
              </p>
            </div>
            {/* bottom note */}
            <div className="absolute inset-x-0 bottom-0 border-t border-black bg-black p-5">
              <p className="ml-auto max-w-[32ch] text-right text-sm leading-relaxed text-white/70">
                {NOTES[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Editorial image mosaic — tablet & desktop grid */}
        <div className="hidden border border-black md:block">
          <div className="relative overflow-hidden">
            {/* Full-bleed image behind the grid */}
            <Image
              src="/images/footer-image.png"
              alt="Harfool Gurjar"
              fill
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover object-top grayscale"
            />

            <div className="relative grid grid-cols-4 md:auto-rows-[230px] lg:auto-rows-[270px]">
              {/* r1c1 — note 0 */}
              <div className="col-start-1 row-start-1 flex items-start border border-black/80 bg-black p-5 group">
                <p className="max-w-[26ch] text-sm leading-relaxed text-white/70 group-hover:text-white transition-all duration-300">
                  {NOTES[0]}
                </p>
              </div>

              {/* r1c2 — image shows through */}
              <div className="col-start-2 row-start-1 border border-black/80 hover:bg-white/20 hover:backdrop-blur-xs transition-all duration-300" />

              {/* r1c3 — image shows through */}
              <div className="col-start-3 row-start-1 border border-black/80 hover:bg-white/20 hover:backdrop-blur-xs transition-all duration-300" />

              {/* r1c4 — white blank */}
              <div className="col-start-4 row-start-1 border border-black/80 hover:bg-white/20 hover:backdrop-blur-xs transition-all duration-300" />

              {/* r2c1 — image shows through */}
              <div className="col-start-1 row-start-2 border border-black/80 hover:bg-white/20 hover:backdrop-blur-xs transition-all duration-300" />

              {/* r2c2 — image shows through */}
              <div className="col-start-2 row-start-2 border border-black/80 hover:bg-white/20 hover:backdrop-blur-xs transition-all duration-300" />

              {/* r2c3 — image shows through */}
              <div className="col-start-3 row-start-2 border border-black/80 hover:bg-white/20 hover:backdrop-blur-xs transition-all duration-300" />

              {/* r2c4 — note 1 */}
              <div className="col-start-4 row-start-2 flex items-end justify-end border border-black/80 bg-black p-5 group">
                <p className="max-w-[26ch] text-right text-sm leading-relaxed text-white/70 group-hover:text-white transition-all duration-300">
                  {NOTES[1]}
                </p>
              </div>
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
