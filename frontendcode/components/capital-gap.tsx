import { AlertCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export function CapitalGap() {
  const { t } = useI18n();
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-balance">{t("capital.title")}</h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Current Constraints */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                <AlertCircle className="w-4 h-4" />
                {t("capital.constraints.tag")}
              </div>
              <h3 className="text-2xl font-bold">{t("capital.constraints.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("capital.constraints.p")}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("capital.constraints.li1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("capital.constraints.li2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{t("capital.constraints.li3")}</span>
                </li>
              </ul>
            </div>

            {/* Untapped Assets */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent mb-2">
                {t("capital.assets.tag")}
              </div>
              <h3 className="text-2xl font-bold">{t("capital.assets.title")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("capital.assets.p")}
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
                    {t("capital.assets.caption")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

