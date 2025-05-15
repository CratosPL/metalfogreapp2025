import { MantineProvider } from "@mantine/core";
import { Russo_One, Unbounded } from 'next/font/google';
import "./globals.css";

const russo = Russo_One({ subsets: ["latin"], weight: "400", variable: "--font-russo" });
const unbound = Unbounded({ subsets: ["latin"], weight: ["200", "400", "500", "700"], variable: "--font-unbound" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${russo.variable} ${unbound.variable}`}>
      <head>
        <title>Stronghold | Coming Soon</title>
        <meta
          name="description"
          content="Stronghold, the Polish bastion of underground black metal, returns with Web3 power. Join the horde! / Stronghold, polski bastion podziemnego black metalu, powraca z mocą Web3. Dołącz do hordy!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Stronghold | Coming Soon" />
        <meta
          property="og:description"
          content="Stronghold, the Polish bastion of underground black metal, returns with Web3 power. Join the horde! / Stronghold, polski bastion podziemnego black metalu, powraca z mocą Web3. Dołącz do hordy!"
        />
        <meta property="og:image" content="/images/stronghold_hero.webp" />
      </head>
      <body
        className="font-russo"
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MantineProvider
          theme={{
            colors: {
              gray: [
                "#f8f9fa",
                "#f1f3f5",
                "#e9ecef",
                "#dee2e6",
                "#ced4da",
                "#adb5bd",
                "#868e96",
                "#495057",
                "#343a40",
                "#111827",
              ],
              red: [
                "#ffe3e3",
                "#ffc1cc",
                "#ffa8b7",
                "#ff8fa3",
                "#ff758f",
                "#ff5c7b",
                "#ff4266",
                "#ff2952",
                "#ff0f3d",
                "#b71c1c",
              ],
            },
            primaryColor: "red",
            fontFamily: "'Russo One', sans-serif",
            headings: { fontFamily: "'Unbounded', sans-serif" },
            components: {
              Button: {
                styles: {
                  root: {
                    background: "transparent",
                    border: "none",
                    color: "#d0d0d0 !important",
                    "&:hover": {
                      background: "transparent",
                    },
                    "&:disabled": {
                      color: "#d0d0d0 !important",
                      opacity: 0.6,
                    },
                  },
                },
              },
            },
          }}
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}