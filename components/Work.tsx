"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PROJECTS = [
  {
    index: "01",
    title: "Zoo Management System",
    href: "https://zms.chaipecharcha.tech/",
    tagline: "Public site + admin dashboard for zoo operations",
    description:
      "A full platform to manage zoo operations - animal records, staff, and visitor ticketing. Public site with an animal catalogue and booking flow, plus a role-based admin dashboard for owners, admins, and editors.",
    features: [
      "React Router SPA with Zustand stores and prefetch-on-click navigation",
      "Express + Mongoose REST APIs with JWT auth and RBAC middleware",
      "QR ticket generation, file uploads via Multer/Cloudinary, pagination",
    ],
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB", "JWT"],
    color: "#1a1a1a",
    accent: "#8b8b8b",
  },
  {
    index: "02",
    title: "Marwar Saheli",
    href: "https://marwarsaheli.com/",
    tagline: "E-commerce platform for Rajasthani spices",
    description:
      "An online storefront selling authentic Rajasthani spices, built for scale - product search, reviews, lazy-loaded imagery, and a full order pipeline from cart to payment.",
    features: [
      "Responsive commerce UI with search, categories, and reviews via Zustand",
      "Express + Mongoose APIs for users, products, orders, and shipping",
      "Admin dashboard with RBAC, CRUD, and Razorpay payment integration",
    ],
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB", "Razorpay"],
    color: "#1a1a1a",
    accent: "#8b8b8b",
  },
  {
    index: "03",
    title: "AI | Gen AI",
    href: "https://harfool-ai.vercel.app/",
    tagline: "Platform showcasing AI-generated content",
    description:
      "A marketing and demo platform for showcasing AI-generated content and applications - clean landing experience built to convert, with performance and clarity as the priority.",
    features: [
      "Landing page optimized for conversion and fast first paint",
      "Component-driven build for easy content and feature iteration",
      "Fully responsive across devices with a minimal, modern aesthetic",
    ],
    stack: ["React", "Tailwind", "Node", "Express", "MongoDB"],
    color: "#1a1a1a",
    accent: "#8b8b8b",
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 bg-white px-6 py-10 lg:pt-4 text-black sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-baseline justify-between gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-black/40">
            02 / Work
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.3em] text-black/40 sm:inline">
            {PROJECTS.length} selected
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl"
        >
          Featured work
        </motion.h2>
      </div>

      <div className="mt-16">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.8, 1],
    [1, 1, isLast ? 1 : 0.6],
  );

  return (
    <div
      ref={cardRef}
      className="sticky max-w-6xl mx-auto"
      style={{
        top: `${8 + index * 1.5}rem`,
        zIndex: index + 1,
        paddingBottom: "4rem",
      }}
    >
      <motion.div
        style={{ scale, opacity, transformOrigin: "top center" }}
        className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)] will-change-transform"
      >
        <div className="grid lg:grid-cols-2">
          {/* Visual side */}
          <div
            className="relative flex aspect-[4/3] items-center justify-center overflow-hidden p-8 sm:p-12 lg:aspect-auto lg:min-h-[520px]"
            style={{ backgroundColor: project.color }}
          >
            <span
              className="pointer-events-none select-none text-[14rem] font-black leading-none opacity-[0.08]"
              style={{ color: project.accent }}
            >
              {project.index}
            </span>
            <div className="absolute inset-x-8 bottom-8 flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] sm:inset-x-12 sm:bottom-12">
              <span style={{ color: project.accent }}>{project.index}</span>
              <span className="text-white/50">
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-black/40">
              {project.tagline}
            </span>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-black/70 sm:text-base">
              {project.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 text-sm leading-relaxed text-black/75"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/40" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-1 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              View project ↗
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
