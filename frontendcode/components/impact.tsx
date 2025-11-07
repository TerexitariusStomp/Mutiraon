import { TreePine, Heart, TrendingUp, Globe } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export function Impact() {
  const { t } = useI18n();
  const impacts = [
    { icon: TreePine, metric: "10M+ hectares", label: t("impact.card1.label"), description: t("impact.card1.desc") },
    { icon: Heart, metric: "500K+", label: t("impact.card2.label"), description: t("impact.card2.desc") },
    { icon: TrendingUp, metric: "R$2B+", label: t("impact.card3.label"), description: t("impact.card3.desc") },
    { icon: Globe, metric: "100%", label: t("impact.card4.label"), description: t("impact.card4.desc") },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("impact.title")}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("impact.subtitle")}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impacts.map((impact, index) => {
              const Icon = impact.icon;
              return (
                <div key={index} className="bg-card rounded-lg p-6 text-center group hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent mb-1">{impact.metric}</div>
                  <div className="text-sm font-semibold uppercase tracking-wider mb-2">{impact.label}</div>
                  <p className="text-sm text-muted-foreground">{impact.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-card rounded-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">{t("impact.join.title")}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{t("impact.join.subtitle")}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open('https://t.me/amazonedollar', '_blank')}
                    className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    {t("impact.join.cta1")}
                  </button>
                  <button
                    onClick={() => window.location.href = '/docs'}
                    className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                  >
                    {t("impact.join.cta2")}
                  </button>
                </div>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src="/diverse-brazilian-community-members-collaborating-.jpg"
                  alt="Community collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

