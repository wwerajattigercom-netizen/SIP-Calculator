import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { RegionProvider } from "@/context/RegionContext";
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://stepupcalculator.com"),
  title: "SIP Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
  description: "Free SIP calculator with step-up & inflation. Calculate monthly SIP returns, add lump sum, apply annual step-up and inflation adjustment — all in real time. Works for India and globally (DCA / RSP / AIP).",
  keywords: [
    "SIP calculator", "step up SIP calculator", "SIP calculator with step up",
    "SIP calculator with inflation", "SIP calculator with lump sum",
    "SIP calculator online free", "mutual fund SIP calculator",
    "best SIP calculator India", "SIP return calculator", "monthly SIP calculator",
    "SIP to reach 1 crore", "how much SIP for 1 crore", "1 crore SIP calculator",
    "SIP amount for 1 crore in 10 years", "SIP amount for 1 crore in 20 years",
    "SIP calculator with step up and inflation", "inflation adjusted SIP calculator",
    "step up SIP returns calculator", "dollar cost averaging calculator",
    "DCA calculator with step up", "systematic investment plan calculator",
    "CAGR calculator", "compound annual growth rate calculator",
    "goal based SIP calculator", "time to reach 1 crore SIP",
    "NRI SIP calculator", "SIP calculator India online",
  ],
  authors: [{ name: "Rajat" }],
  robots: "index, follow",
  openGraph: {
    title: "SIP Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
    description: "Free SIP calculator with step-up, lump sum, inflation adjustment — all in one page, real-time sliders. Works globally for SIP / DCA / RSP / AIP investors.",
    type: "website",
    url: "https://stepupcalculator.com",
    locale: "en_IN",
    siteName: "StepupCalculator",
    images: [
      {
        url: "https://stepupcalculator.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StepupCalculator — Free SIP, CAGR & Goal Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIP Calculator with Step Up, Inflation & Lump Sum",
    description: "Free online SIP calculator with step-up, lump sum & inflation. Works for India & worldwide.",
    images: ["https://stepupcalculator.com/og-image.jpg"],
  },
  alternates: { canonical: 'https://stepupcalculator.com',
    languages: {
      'en-IN': 'https://stepupcalculator.com',
      'en-US': 'https://stepupcalculator.com/us/dca-calculator',
      'x-default': 'https://stepupcalculator.com'
    } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <RegionProvider>
            {/* ── Sticky branded header ── */}
            <Header />

            {/* ── Page content, centred & max-width constrained ── */}
            <div className="page-wrapper">
              {children}
            </div>
          </RegionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
