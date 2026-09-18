"use client";

const FOOTER_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "Mail", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-lg font-black uppercase tracking-tight text-black">
            Harfool Gurjar
          </p>
          <p className="mt-1 text-sm text-black/60">
            Frontend developer crafting premium digital experiences.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-black/70">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-black/10 px-3 py-1.5 transition hover:border-black/30 hover:bg-black hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
