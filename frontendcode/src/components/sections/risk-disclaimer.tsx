"use client";

import { useState } from "react";

import { useI18n } from "@/i18n/I18nContext";

export default function RiskDisclaimer() {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(true);

  return (
    <section
      role="alert"
      aria-live="polite"
      className="mx-auto mb-4 w-full max-w-[1200px] px-4"
    >
      <div className="rounded-xl border border-red-300 bg-red-50 text-red-900 shadow-sm">
        <div className="flex items-start justify-between gap-3 p-4">
          <div>
            <h1 className="text-base font-extrabold">⚠️ {t('risk.title')} ⚠️</h1>
            <h2 className="mt-1 text-sm font-bold">
              {t('risk.env')}
            </h2>
            <p className="mt-1 text-sm font-semibold">
              {t('risk.line1')}
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full border border-red-300 bg-white/60 px-3 py-1 text-xs font-medium text-red-700 hover:bg-white"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="risk-details"
          >
            {expanded ? "Hide" : "Show"}
          </button>
        </div>

        {expanded && (
          <div id="risk-details" className="border-t border-red-200 p-4 pt-3 text-sm">
            <p className="mt-1">
              <strong>{t('risk.brand')}</strong> - {t('risk.line1')}
            </p>

            <h3 className="mt-4 font-bold">{t('risk.features')}</h3>
            <ul className="ml-5 mt-2 list-disc space-y-1">
              <li>{t('risk.features.1')}</li>
              <li>{t('risk.features.2')}</li>
              <li>{t('risk.features.3')}</li>
              <li>{t('risk.features.4')}</li>
            </ul>

            <h3 className="mt-4 font-bold">{t('risk.getting')}</h3>
            <p className="mt-1">{t('risk.getting.hint')}</p>
            <ul className="ml-5 mt-2 list-disc space-y-1">
              <li>{t('risk.getting.1')}</li>
              <li>{t('risk.getting.2')}</li>
              <li>{t('risk.getting.3')}</li>
              <li>{t('risk.getting.4')}</li>
            </ul>

            <hr className="my-4 border-red-200" />

            <p className="font-semibold"><strong>{t('risk.disclaimer')}</strong></p>
          </div>
        )}
      </div>
    </section>
  );
}
