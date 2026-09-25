"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_LINKS } from "@/lib/data";

const WHATSAPP_NUMBER = "919610237965";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      `*New project inquiry*`,
      form.name && `Name: ${form.name}`,
      form.email && `Email: ${form.email}`,
      form.subject && `Subject: ${form.subject}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-10 lg:py-20 bg-white text-black">
      <div className="grid lg:grid-cols-[1fr_1.2fr]">
        {/* Left: black panel, huge heading + contact links */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-black px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.3em] text-white/60"
          >
            05 / Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Let&apos;s
            <br />
            build
            <br />
            something.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-sm text-sm leading-relaxed text-white/60 sm:text-base"
          >
            Have a project, a role, or just an idea worth talking through?
            I&apos;m always open to hearing about it.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-12 flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <p className="text-sm font-medium">
              Available for freelance - replies within 24h
            </p>
          </motion.div>

          <div className="mt-14 space-y-0 border-t border-white/15">
            {CONTACT_LINKS.map((link, i) => {
              const isProtocolLink =
                link.href.startsWith("mailto:") || link.href.startsWith("tel:");

              return (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  href={link.href}
                  // Protocol links (mailto:/tel:) hand off to another app —
                  // opening them in a new tab just leaves a blank tab behind.
                  // Only real webpage links should open in a new tab.
                  {...(!isProtocolLink && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="group flex items-center justify-between border-b border-white/15 py-5 transition-colors hover:bg-white/5"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide sm:text-base">
                      {link.label}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-sm text-white/60 transition-colors group-hover:text-white">
                    {link.value}
                    <span className="transition-transform group-hover:translate-x-1">
                      ↗
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Right: white panel, underline-style form */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.3em] text-black/60"
          >
            Send a message
          </motion.span>

          <form onSubmit={handleSubmit} className="mt-10 space-y-10">
            <FormField
              id="name"
              label="Your name"
              placeholder="Harfool Gurjar"
              value={form.name}
              onChange={handleChange("name")}
              focused={focused}
              setFocused={setFocused}
            />
            <FormField
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange("email")}
              focused={focused}
              setFocused={setFocused}
            />
            <FormField
              id="subject"
              label="Subject"
              placeholder="Project inquiry, collaboration, etc."
              value={form.subject}
              onChange={handleChange("subject")}
              focused={focused}
              setFocused={setFocused}
            />
            <FormField
              id="message"
              label="Message"
              placeholder="Tell me about your project, timeline, and budget..."
              value={form.message}
              onChange={handleChange("message")}
              focused={focused}
              setFocused={setFocused}
              textarea
            />

            <motion.button
              variants={fadeUp}
              type="submit"
              className="group flex w-full items-center justify-between border-t-2 border-black pt-6 text-left transition-colors"
            >
              <span className="text-2xl font-black uppercase tracking-tight sm:text-3xl">
                Send message
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-black transition-colors group-hover:bg-black group-hover:text-white sm:h-14 sm:w-14">
                ↗
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  focused,
  setFocused,
  textarea = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  focused: string | null;
  setFocused: (id: string | null) => void;
  textarea?: boolean;
}) {
  const isFocused = focused === id;

  return (
    <motion.div variants={fadeUp} className="relative">
      <label
        htmlFor={id}
        className={`block text-xs font-mono uppercase tracking-[0.2em] transition-colors ${
          isFocused ? "text-black" : "text-black/60"
        }`}
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={3}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          className="mt-3 block w-full resize-none border-b border-black/15 bg-transparent pb-3 text-base outline-none placeholder:text-black/30 sm:text-lg"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          className="mt-3 w-full border-b border-black/15 bg-transparent pb-3 text-base outline-none placeholder:text-black/30 sm:text-lg"
        />
      )}

      <motion.div
        initial={false}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 h-px w-full bg-black"
      />
    </motion.div>
  );
}
