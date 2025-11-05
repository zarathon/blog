import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { GoogleAnalytics } from "@/components/analytics";

// Fonte para texto normal - DM Mono é monoespaçada e moderna
const fontSans = DM_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// Fonte para headers - Instrument Serif é elegante e única
const fontHeading = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devaneios do Zara",
  description: "Blog sobre engenharia de software, tecnologia, carreira e mais",
  alternates: {
    types: {
      'application/rss+xml': [
        { url: '/blog/feed.xml', title: 'RSS Feed' },
      ],
      'application/atom+xml': [
        { url: '/blog/atom.xml', title: 'Atom Feed' },
      ],
      'application/feed+json': [
        { url: '/blog/feed.json', title: 'JSON Feed' },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontHeading.variable} font-sans antialiased`}
      >
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId="G-6867JMG0QN" />
        )}
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
