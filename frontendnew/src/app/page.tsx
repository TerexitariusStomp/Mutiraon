import HeroSection from "@/components/sections/hero-section";
import CollateralSelection from "@/components/sections/collateral-selection";
import WalletConnection from "@/components/sections/wallet-connection";
import CombinedFaucetClaim from "@/components/sections/combined-faucet-claim";
import DecorativeElements from "@/components/sections/decorative-elements";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f1f7]">

      <HeroSection />

      {/* YouTube Video Embed */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto mb-8">
          <div className="aspect-video w-full">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/GfdzDh1bfbM?si=TddFRurX4vSGJuI-"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>

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
