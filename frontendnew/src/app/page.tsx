import HeroSection from "@/components/sections/hero-section";
import CollateralSelection from "@/components/sections/collateral-selection";
import WalletConnection from "@/components/sections/wallet-connection";
import FaucetClaim from "@/components/sections/faucet-claim";
import DecorativeElements from "@/components/sections/decorative-elements";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f1f7]">

      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <CollateralSelection />
          <FaucetClaim />
          <WalletConnection />
        </div>
      </div>

      <DecorativeElements />
    </div>
  );
}
