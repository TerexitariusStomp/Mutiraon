import Image from "next/image";
import { Info, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nContext";

const StatInfo = ({
  label,
  tooltipText,
}: {
  label: string;
  tooltipText: string;
}) => (
  <div className="flex items-center justify-center gap-1 text-sm text-[#333333] font-normal">
    <span>{label}</span>
    <div className="group relative flex items-center">
      <Info className="h-3.5 w-3.5 cursor-help text-black/40" />
      <div
        className="invisible absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2
        transform rounded-md bg-[#2d2d2d] p-3 text-xs font-normal text-white
        opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100"
      >
        {tooltipText}
        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-[#2d2d2d]"></div>
      </div>
    </div>
  </div>
);

const HeroSection = () => {
  const { t } = useI18n();
  return (
    <section className="relative flex w-full flex-col items-center overflow-x-hidden bg-[#f3f7f3] pt-8 pb-10 md:pt-12">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(220,245,230,1), rgba(236,250,242,1) 25%, rgba(236,250,242,1) 75%, rgba(210,238,223,1))",
        }}
      />
      {/* Soft canopy highlight */}
      <div
        className="pointer-events-none absolute top-[60px] -left-[220px] z-0 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(46,179,151,0.25), rgba(46,179,151,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      <div className="z-10 mx-auto w-full max-w-4xl px-4">
        <div
          className="w-full rounded-[24px] p-6 md:p-8"
          style={{
            background: "rgba(255, 255, 255, 0.6)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: "rgba(0, 0, 0, 0.04) 0px 4px 32px",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h1 className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
              <span className="text-[#2eb397]">{t('hero.title.1')}</span>
              <span className="text-[#2f855a]">{t('hero.title.2')}</span>
              <span className="text-[#14532d]">{t('hero.title.3')}</span>
            </h1>
            <Link href="/vaults" className="relative flex cursor-pointer items-center gap-2">
              <h1 className="bg-gradient-to-r from-[#166534] via-[#15803d] to-[#3f6212] bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent md:text-5xl">
                {t('hero.cta')}
              </h1>
              <ChevronDown className="h-7 w-7 text-[#166534] md:h-8 md:w-8" />
            </Link>
          </div>

          <p className="mt-4 text-center text-sm text-[#1f2937]">
            {t('hero.subtitle')}
          </p>

          {/* Stats removed per request */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
