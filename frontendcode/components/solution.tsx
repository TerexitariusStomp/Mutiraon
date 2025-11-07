import { Shield, TrendingUp, Users, Leaf } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export function Solution() {
  const { t } = useI18n();

  const features = [
    {
      icon: Shield,
      title: t("solution.f1.title"),
      description: t("solution.f1.desc"),
    },
    {
      icon: TrendingUp,
      title: t("solution.f2.title"),
      description: t("solution.f2.desc"),
    },
    {
      icon: Users,
      title: t("solution.f3.title"),
      description: t("solution.f3.desc"),
    },
    {
      icon: Leaf,
      title: t("solution.f4.title"),
      description: t("solution.f4.desc"),
    },
  ];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t("solution.title")}</h2>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t("solution.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

