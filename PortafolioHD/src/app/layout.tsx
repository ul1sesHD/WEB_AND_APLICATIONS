import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UlisesHD · Full Stack Engineer",
  description:
    "Portafolio de Ulises Hernández — Full Stack Engineer, Designer e Innovator. Backend, Frontend, AI, Cloud (AWS), Diseño y Liderazgo.",
  keywords: [
    "Full Stack Engineer",
    "Next.js",
    "React",
    "AWS",
    "AI",
    "UX/UI Designer",
    "Portfolio",
    "Ulises Hernandez",
  ],
  authors: [{ name: "Ulises Hernandez" }],
  openGraph: {
    title: "UlisesHD · Full Stack Engineer",
    description: "Portafolio profesional con estética cyberpunk.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
