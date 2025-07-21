import type { Metadata } from "next";
import { Playfair_Display, Crimson_Text, Old_Standard_TT, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { headers } from 'next/headers';
import ContextProvider from '@/context';

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
  description: "The Underground Metal Gazette & Social Platform",
  keywords: "metal, underground, black metal, death metal, community, music, forge, bands, demos",
  authors: [{ name: "Metal Forge Team" }],
  generator: 'Next.js',
  viewport: 'width=device-width, initial-scale=1',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en" className={`${playfair.variable} ${crimson.variable} ${oldStandard.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/logometalforge.jpeg" type="image/jpeg" />
        <meta name="theme-color" content="#DC2626" />
      </head>
      <body className="min-h-screen bg-black text-white leading-relaxed font-inter antialiased overflow-x-hidden">
        <ContextProvider cookies={cookies}>
          <Header />
          <main className="relative z-0">
            <div className="min-h-screen">
              {children}
            </div>
          </main>
          <div className="fixed inset-0 pointer-events-none z-[-1]">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
          </div>
        </ContextProvider>
      </body>
    </html>
  );
}
