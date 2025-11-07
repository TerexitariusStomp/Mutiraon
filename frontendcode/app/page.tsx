import { Hero } from "@/components/hero";
import { MarketOpportunity } from "@/components/market-opportunity";
import { Header } from "@/components/header";
import { CapitalGap } from "@/components/capital-gap";
import { Solution } from "@/components/solution";
import { HowItWorks } from "@/components/how-it-works";
import { Impact } from "@/components/impact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header />
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
