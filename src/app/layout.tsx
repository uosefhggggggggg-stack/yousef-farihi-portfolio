import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yousef Farihi | Graphic Designer & Visual Editor",
  description:
    "Crafting creative brand identities through graphic design, visual editing, and strategic branding. Available for worldwide remote collaboration.",
  keywords: [
    "graphic designer",
    "visual editor",
    "branding",
    "brand identity",
    "logo design",
    "packaging design",
    "poster design",
    "Yousef Farihi",
  ],
  authors: [{ name: "Yousef Farihi" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>Y</text></svg>",
  },
  openGraph: {
    title: "Yousef Farihi | Graphic Designer & Visual Editor",
    description:
      "Crafting creative brand identities through graphic design, branding, and visual editing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
