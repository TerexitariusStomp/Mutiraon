"use client";

import { useState } from "react";
import { Hero } from "@/components/hero";
import { MarketOpportunity } from "@/components/market-opportunity";
import { Header } from "@/components/header";
import { CapitalGap } from "@/components/capital-gap";
import { Solution } from "@/components/solution";
import { HowItWorks } from "@/components/how-it-works";
import { Impact } from "@/components/impact";
import { Footer } from "@/components/footer";
import HeroSection from "@/components/sections/hero-section";
import CollateralSelection from "@/components/sections/collateral-selection";
import WalletConnection from "@/components/sections/wallet-connection";
import CombinedFaucetClaim from "@/components/sections/combined-faucet-claim";
import DecorativeElements from "@/components/sections/decorative-elements";

export default function Page() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return (
      <div className="min-h-screen bg-[#f3f1f7]">
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <div className="relative">
            <CollateralSelection />
            <CombinedFaucetClaim />
            <WalletConnection />
          </div>
        </div>
        <DecorativeElements />
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header onEnterApp={() => setShowApp(true)} />
      <Hero />
      <MarketOpportunity />
      <CapitalGap />
      <Solution />
      <HowItWorks />
      <Impact />
      <Footer />
    </main>
  );
}
