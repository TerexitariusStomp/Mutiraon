import { AlertCircle } from "lucide-react"

export function CapitalGap() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-balance">The Capital Gap Crisis</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Current Constraints */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                <AlertCircle className="w-4 h-4" />
                Current Constraints
              </div>
              <h3 className="text-2xl font-bold">Limited Access to Capital</h3>
              <p className="text-muted-foreground leading-relaxed">
                Community Development Banks require 1:1 Real backing, limiting capital generation. Solidarity Revolving
                Funds (FRS) and Credit Cooperatives face severe liquidity scarcity—a typical FRS manages only R$40,000
                despite demand from hundreds of borrowers.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">BCDs limited by 1:1 backing requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">FRS managing minimal capital (R$40,000 average)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">Hundreds of borrowers unable to access credit</span>
                </li>
              </ul>
            </div>

            {/* Untapped Assets */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                Untapped Assets
              </div>
              <h3 className="text-2xl font-bold">Billions in Trapped Environmental Value</h3>
              <p className="text-muted-foreground leading-relaxed">
                Communities control vast environmental assets that generate no immediate capital access: forests, carbon
                credits, biodiversity reserves, and sustainable agriculture land worth billions in trapped value.
              </p>

              <div className="relative rounded-lg overflow-hidden h-80 group">
                <img
                  src="/brazilian-community-members-in-forest-with-sustain.jpg"
                  alt="Brazilian community and environmental assets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <p className="text-sm font-medium">
                    Communities control environmental assets worth billions, but lack mechanisms to unlock capital while
                    maintaining ownership and impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
