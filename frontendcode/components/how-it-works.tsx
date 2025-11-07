import { useI18n } from "@/i18n/I18nContext";

export function HowItWorks() {
  const { t } = useI18n();
  const steps = [
    { number: "01", title: t("how.s1.title"), description: t("how.s1.desc") },
    { number: "02", title: t("how.s2.title"), description: t("how.s2.desc") },
    { number: "03", title: t("how.s3.title"), description: t("how.s3.desc") },
    { number: "04", title: t("how.s4.title"), description: t("how.s4.desc") },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-balance">{t("how.title")}</h2>
          <p className="text-muted-foreground text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            {t("how.subtitle")}
          </p>

          {/* YouTube Video Embed */}
          <div className="mb-16 max-w-4xl mx-auto">
            <div className="aspect-video w-full">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/GfdzDh1bfbM?si=TddFRurX4vSGJuI-"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
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
  );
}

