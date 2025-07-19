import type { Metadata } from "next";
import { Playfair_Display, Crimson_Text, Old_Standard_TT, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const crimson = Crimson_Text({
  variable: "--font-crimson",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const oldStandard = Old_Standard_TT({
  variable: "--font-old-standard",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Metal Forge - Underground Metal Community",
  description: "The Underground Metal Gazette & Social Platform - Raw, unfiltered metal community",
  keywords: "metal, underground, black metal, death metal, community, music, forge, bands, demos",
  authors: [{ name: "Metal Forge Team" }],
  generator: 'Next.js',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: "Metal Forge - Underground Metal Community",
    description: "The Underground Metal Gazette & Social Platform",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logometalforge.jpeg",
        width: 1200,
        height: 630,
        alt: "Metal Forge Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Metal Forge - Underground Metal Community",
    description: "The Underground Metal Gazette & Social Platform",
    images: ["/logometalforge.jpeg"],
  },
  icons: {
    icon: [
      { url: "/logometalforge.jpeg" },
      { url: "/logometalforge.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logometalforge.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    apple: [
      { url: "/logometalforge.jpeg" },
      { url: "/logometalforge.jpeg", sizes: "180x180", type: "image/jpeg" },
    ],
    shortcut: "/logometalforge.jpeg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable} ${oldStandard.variable} ${inter.variable}`}>
      <head>
        {/* Favicon i ikony */}
        <link rel="icon" href="/logometalforge.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/logometalforge.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logometalforge.jpeg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logometalforge.jpeg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logometalforge.jpeg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/logometalforge.jpeg" />
        
        {/* Meta tagi */}
        <meta name="theme-color" content="#DC2626" />
        <meta name="msapplication-TileColor" content="#DC2626" />
        <meta name="msapplication-TileImage" content="/logometalforge.jpeg" />
        
        {/* Preload logo dla lepszej wydajności */}
        <link rel="preload" href="/logometalforge.jpeg" as="image" />
      </head>
      <body className="min-h-screen bg-black text-white leading-relaxed font-inter antialiased overflow-x-hidden">
        {/* Header Component */}
        <Header />
        
        {/* Main Content */}
        <main className="relative z-0">
          <div className="min-h-screen">
            {children}
          </div>
        </main>

        {/* Global background effects */}
        <div className="fixed inset-0 pointer-events-none z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        </div>
      </body>
    </html>
  );
}
