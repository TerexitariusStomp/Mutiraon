export function MarketOpportunity() {
  const stats = [
    {
      value: "$318.8B",
      label: "Digital Assets Flow",
      description: "Brazil received in digital assets (July 2024–June 2025), with 90% through stablecoins",
    },
    {
      value: "180+",
      label: "Community Currencies",
      description: "Active community currencies serving underserved populations via Ethnheiro platform",
    },
    {
      value: "500+",
      label: "Registered Firms",
      description: "Crypto firms registered under Brazil's Virtual Assets Law (BVAL, June 2023)",
    },
    {
      value: "103",
      label: "Development Banks",
      description: "Community Development Banks (BCDs) proving solidarity finance operates at scale",
    },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-balance">The Market Opportunity</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Brazil's Virtual Assets Law established Latin America's first comprehensive crypto framework, with
            institutional adoption accelerating. Stablecoins serve as essential inflation hedges and payment rails for
            millions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-accent/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative p-6 text-center">
                  <div className="text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold uppercase tracking-wider mb-3 text-foreground">
                    {stat.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
