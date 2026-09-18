import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import { Archivo } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

export const metadata: Metadata = {
  title: "Harfool Gurjar",
  description:
    "Harfool Gurjar is a software engineer and web developer with a passion for creating innovative and user-friendly applications.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white font-sans text-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
