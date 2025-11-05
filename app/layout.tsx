import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/theme-toggle";

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
  title: "Meu Blog",
  description: "Blog sobre desenvolvimento, tecnologia e mais",
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
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
