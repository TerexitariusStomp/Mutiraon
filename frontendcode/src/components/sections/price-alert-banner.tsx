"use client";

import { AlertTriangle, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

const PriceAlertBanner = () => {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-x-2 bg-[#fff3cd] p-1.5 rounded-full border border-[#ffecb5] max-w-fit shadow-sm font-sans text-xs">
      <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e8f5e9] border border-[#d1e7dd]">
        <ChevronRight className="h-4 w-4 text-black" />
      </button>
      <div className="flex items-center gap-x-3 text-[#2c2c2c] pr-4">
        <div className="flex flex-shrink-0 items-center gap-x-1.5">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <span className="font-bold tracking-wider whitespace-nowrap">{t('price.alert')}</span>
        </div>
        <p className="whitespace-nowrap">
          <span>
            {t('price.market')}: <strong className="font-semibold">$0.9876</strong>
          </span>
          <span className="mx-2 opacity-70">•</span>
          <span>
            {t('price.redemption')}: <strong className="font-semibold">$1.0000</strong>
          </span>
          <span className="mx-2 opacity-70">•</span>
          <span>
            {t('price.diff')}: <strong className="font-semibold">1.25%</strong>
          </span>
          <span className="mx-2 opacity-70">•</span>
          <span>
            {t('price.rate')}: <strong className="font-semibold">5%</strong>
          </span>
        </p>
      </div>
    </div>
  );
};

export default PriceAlertBanner;
