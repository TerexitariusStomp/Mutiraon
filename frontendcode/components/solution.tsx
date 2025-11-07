import { Shield, TrendingUp, Users, Leaf } from "lucide-react"

export function Solution() {
  const features = [
    {
      icon: Shield,
      title: "Asset-Backed Stability",
      description:
        "Collateralized by real environmental assets—forests, carbon credits, and sustainable land—providing genuine value backing pegged to USD",
    },
    {
      icon: TrendingUp,
      title: "Solidarity Fund Investment & Credit",
      description:
        "Enables investment in solidarity funds and credit provision both alongside and separate from community currencies, unlocking liquidity from environmental assets without requiring sale",
    },
    {
      icon: Users,
      title: "Community Ownership",
      description:
        "Assets remain under community control, ensuring local governance and long-term sustainable development",
    },
    {
      icon: Leaf,
      title: "Environmental Impact",
      description:
        "Incentivizes conservation and sustainable practices while creating economic opportunities aligned with ecological goals",
    },
  ]

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">The Solution: Amaz-One Dollar</h2>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              A USD-pegged stablecoin that bridges traditional solidarity finance with blockchain innovation,
              collateralized by environmental assets to unlock capital for solidarity fund investments and credit
              provision—working alongside and independent of community currencies—while preserving ecological value and
              local control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-primary-foreground/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="relative p-8">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-primary-foreground/80 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
