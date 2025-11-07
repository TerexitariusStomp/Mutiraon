"use client";

import Link from "next/link";
import React from "react";
import { useI18n } from "@/i18n/I18nContext";

const APP_PATH = process.env.NEXT_PUBLIC_MAIN_APP_PATH || "http://localhost:4100/";
const HOME_PATH = process.env.NEXT_PUBLIC_HOME_PATH || "http://localhost:4200/";

export function Header() {
  const { lang, setLang, t } = useI18n();

  const toggleLang = () => {
    const next = lang === "pt" ? "en" : "pt";
    setLang(next);
  };

  const labelEnter = t("header.enter");
  const labelLang = lang === "pt" ? "EN" : "PT";

  // Check if we're on the app page (4100) or home page (4200)
  const isOnApp = typeof window !== 'undefined' && window.location.port === '4100';
  const buttonHref = isOnApp ? HOME_PATH : APP_PATH;
  const buttonText = isOnApp ? t("header.home") : labelEnter;

  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      <button
        onClick={toggleLang}
        className="rounded-md border border-black/10 bg-white/70 px-3 py-1 text-xs shadow hover:bg-white/90"
        aria-label="Toggle language"
      >
        {labelLang}
      </button>
      <Link
        href={buttonHref}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
      >
        {buttonText}
      </Link>
    </div>
  );
}
