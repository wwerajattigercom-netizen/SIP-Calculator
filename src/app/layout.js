import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SIP Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
  description: "Free SIP calculator with step-up & inflation. Calculate monthly SIP returns, add lump sum, apply annual step-up and inflation adjustment — all in real time. Works for India and globally (DCA / RSP / AIP).",
  keywords: [
    // Primary high-volume
    "SIP calculator",
    "step up SIP calculator",
    "SIP calculator with step up",
    "SIP calculator with inflation",
    "SIP calculator with lump sum",
    "SIP calculator online free",
    "mutual fund SIP calculator",
    "best SIP calculator India",
    "SIP return calculator",
    "monthly SIP calculator",
    // Goal / 1 Crore — high intent
    "SIP to reach 1 crore",
    "how much SIP for 1 crore",
    "1 crore SIP calculator",
    "SIP amount for 1 crore in 10 years",
    "SIP amount for 1 crore in 20 years",
    "how to reach 1 crore with SIP",
    // Advanced combinations
    "SIP calculator with step up and inflation",
    "SIP calculator with lump sum and step up",
    "inflation adjusted SIP calculator",
    "SIP with annual increment calculator",
    "top up SIP calculator",
    "step up SIP returns calculator",
    // Global DCA terms
    "dollar cost averaging calculator",
    "DCA calculator with step up",
    "DCA calculator with inflation",
    "recurring investment calculator with step up",
    "systematic investment plan calculator",
    "compound investment calculator monthly",
    // NRI
    "NRI SIP calculator",
    "SIP calculator for NRI investors",
    "SIP calculator for US NRI",
    "SIP calculator India online",
  ],
  authors: [{ name: "Rajat" }],
  robots: "index, follow",
  openGraph: {
    title: "SIP Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
    description: "Free SIP calculator with step-up, lump sum, inflation adjustment — all in one page, real-time sliders. Works globally for SIP / DCA / RSP / AIP investors.",
    type: "website",
    url: "https://stepupcalculator.com",
    locale: "en_IN",
    siteName: "Step Up SIP Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator with Step Up, Inflation & Lump Sum",
    description: "Free online SIP calculator with step-up, lump sum & inflation. Calculate how much your SIP will grow or what SIP you need. Works for India & worldwide.",
  },
  alternates: {
    canonical: "https://stepupcalculator.com",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
