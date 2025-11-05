import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Providers } from "@/components/providers";
import Navigation from "@/components/sections/navigation";
import RiskDisclaimer from "@/components/sections/risk-disclaimer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Mutiraon: Stablecoin de Impacto do Brasil",
    description: "Stablecoin descentralizada lastreada por tokens de impacto ambiental",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Client-only hook usage guard
  return (
    <html lang="pt">
      <body className="antialiased min-h-screen flex flex-col eco-background">
        <Providers>
          {/* Footer links use i18n inside a client wrapper */}
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "Mutiraon", "version": "1.0.0", "greeting": "Welcome to Mutiraon"}'
          />
          <div className="pt-5 px-4">
            <Navigation />
          </div>
          <main className="flex-1">
            {children}
          </main>
          {/* Forest treeline separator */}
          <div aria-hidden="true" className="w-full overflow-hidden mt-12">
            <svg viewBox="0 0 1440 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="decorative forest treeline" className="block w-full">
              <rect x="0" y="120" width="1440" height="40" fill="#e6f4ec" />
              <g fill="#22c55e" opacity="0.55">
                <circle cx="80" cy="110" r="28" />
                <rect x="76" y="110" width="8" height="28" fill="#166534" />
                <circle cx="200" cy="108" r="24" />
                <rect x="196" y="108" width="8" height="30" fill="#14532d" />
                <circle cx="310" cy="112" r="22" />
                <rect x="306" y="112" width="8" height="26" fill="#166534" />
              </g>
              <g fill="#16a34a" opacity="0.65">
                <circle cx="430" cy="106" r="26" />
                <rect x="426" y="106" width="8" height="30" fill="#14532d" />
                <circle cx="560" cy="114" r="24" />
                <rect x="556" y="114" width="8" height="26" fill="#166534" />
                <circle cx="680" cy="108" r="28" />
                <rect x="676" y="108" width="8" height="32" fill="#14532d" />
              </g>
              <g fill="#15803d" opacity="0.7">
                <circle cx="800" cy="112" r="22" />
                <rect x="796" y="112" width="8" height="28" fill="#14532d" />
                <circle cx="930" cy="106" r="26" />
                <rect x="926" y="106" width="8" height="30" fill="#166534" />
                <circle cx="1060" cy="110" r="24" />
                <rect x="1056" y="110" width="8" height="28" fill="#14532d" />
              </g>
              <g fill="#166534" opacity="0.85">
                <circle cx="1180" cy="108" r="28" />
                <rect x="1176" y="108" width="8" height="32" fill="#0b3d24" />
                <circle cx="1310" cy="112" r="24" />
                <rect x="1306" y="112" width="8" height="28" fill="#0b3d24" />
              </g>
            </svg>
          </div>
          <footer className="border-t border-black/10 bg-[#f3f1f7]">
            <div className="container mx-auto px-4 pt-6"><RiskDisclaimer /></div>
            <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
              <span>©Mutiraon - All rights reserved.</span>
              <nav className="flex gap-4">
                <a href="/docs" className="hover:text-foreground transition-colors">Docs</a>
                <a href="https://github.com/your-username/mutiraon" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Github</a>
                <a href="https://t.me/mutiraon" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Telegram</a>
              </nav>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
