import { useI18n } from "@/i18n/I18nContext";

export function MarketOpportunity() {
  const { t } = useI18n();

  const stats = [
    {
      value: "$318.8B",
      label: t("market.stat1.label"),
      description: t("market.stat1.desc"),
    },
    {
      value: "180+",
      label: t("market.stat2.label"),
      description: t("market.stat2.desc"),
    },
    {
      value: "500+",
      label: t("market.stat3.label"),
      description: t("market.stat3.desc"),
    },
    {
      value: "103",
      label: t("market.stat4.label"),
      description: t("market.stat4.desc"),
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-balance">{t("market.title")}</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            {t("market.subtitle")}
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
  );
}

