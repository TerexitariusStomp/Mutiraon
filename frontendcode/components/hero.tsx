import { useI18n } from "@/i18n/I18nContext";

export function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aerial-view-of-lush-brazilian-rainforest-and-commu.jpg"
          alt="Brazilian community and forest"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          {t("hero.title.1")} <br />
          {t("hero.title.2")} <br />
          {t("hero.title.3")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          {t("hero.subtitle")}
        </p>
        {/* CTA buttons removed; use header navigation */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}
