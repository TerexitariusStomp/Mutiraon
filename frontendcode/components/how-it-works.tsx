export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Asset Verification",
      description:
        "Environmental assets held by communities are assessed, verified, and tokenized as collateral reserves",
    },
    {
      number: "02",
      title: "Stablecoin Issuance",
      description:
        "Amaz-One Dollar stablecoins are minted against verified environmental assets, maintaining stable value pegged to USD",
    },
    {
      number: "03",
      title: "Community Distribution",
      description:
        "Stablecoins are used for solidarity fund investments and credit provision through Community Development Banks, both alongside and separate from community currencies",
    },
    {
      number: "04",
      title: "Impact Monitoring",
      description:
        "Environmental preservation is tracked on-chain, ensuring assets maintain value while supporting community development",
    },
  ]

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-balance">How It Works</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            A transparent, blockchain-enabled process that transforms environmental stewardship into accessible capital
            for solidarity economy initiatives.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[90%] h-0.5 bg-border" />
                )}

                <div className="relative">
                  <div className="text-6xl font-bold text-accent/20 mb-4">{step.number}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
