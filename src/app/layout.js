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
  title: "SIP & DCA Calculator with Step Up, Inflation & Lump Sum | Free Tool",
  description: "Free SIP / Dollar Cost Averaging calculator with step-up, inflation adjustment & lump sum — all in one place. Calculate investment returns online instantly. Works for any currency, any market.",
  keywords: [
    // SIP terms (used globally for systematic investing)
    "SIP calculator",
    "SIP calculator with step up",
    "SIP calculator with inflation",
    "step up SIP calculator",
    "SIP calculator with lump sum",
    "SIP calculator with step up and inflation",
    "SIP calculator with lump sum and step up",
    "inflation adjusted SIP calculator",
    "mutual fund SIP calculator",
    "SIP step up calculator online free",
    "SIP calculator with annual increment",
    "top up SIP calculator",
    "best SIP calculator",
    "SIP returns calculator with inflation",
    "monthly SIP returns calculator",
    // Global DCA / investment terms
    "dollar cost averaging calculator",
    "DCA calculator with inflation",
    "DCA calculator with step up",
    "recurring investment calculator",
    "monthly investment calculator with inflation",
    "systematic investment plan calculator",
    "regular investment calculator with step up",
    "compound investment calculator monthly",
    "investment growth calculator with inflation",
    "DCA calculator with inflation adjustment",
    // NRI / diaspora
    "NRI SIP calculator",
    "SIP calculator for NRI",
  ],
  authors: [{ name: "Rajat Pande" }],
  robots: "index, follow",
  openGraph: {
    title: "SIP & DCA Calculator with Step Up, Inflation & Lump Sum",
    description: "The only free calculator combining SIP/DCA + Step Up + Lump Sum + Inflation in real time. Works for any currency, any market.",
    type: "website",
    locale: "en",
    siteName: "SIP & DCA Calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP & DCA Calculator with Step Up, Inflation & Lump Sum",
    description: "Free online SIP / DCA calculator. Add step-up, lump sum & inflation. Works for any currency worldwide.",
  },
  alternates: {
    canonical: "/",
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
