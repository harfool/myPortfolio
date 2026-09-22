import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CursorTrail from "@/components/ui/smooth-cursor";
import { SITE_URL, SOCIAL_PROFILE_URLS } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-display",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteTitle = "Harfool Gurjar - Founder";
const siteDescription =
  "Harfool Gurjar is a founder and software engineer building fast, accessible React, Next.js, and TypeScript web experiences with clean architecture and conversion-focused UI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  title: {
    default: siteTitle,
    template: "%s | Harfool Gurjar",
  },
  description: siteDescription,
  keywords: [
    "Harfool Gurjar",
    "frontend developer",
    "front-end developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "software engineer",
    "full-stack developer",
    "web developer India",
  ],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: "Harfool Gurjar",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1734,
        height: 907,
        alt: "Harfool Gurjar — Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harfool Gurjar",
    jobTitle: "Frontend Developer and Software Engineer",
    url: SITE_URL,
    sameAs: SOCIAL_PROFILE_URLS,
    image: `${SITE_URL}/images/harfool-gurjar.png`,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Harfool Gurjar — Frontend Developer",
    url: SITE_URL,
  },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-black selection:bg-black selection:text-white">
        <CursorTrail color="bg-black" size={10} count={6} />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
