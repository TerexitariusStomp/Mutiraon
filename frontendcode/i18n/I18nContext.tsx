"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "@/i18n/dictionaries/en";
import { pt } from "@/i18n/dictionaries/pt";

export type Lang = "pt" | "en";
type Dict = Record<string, string>;

const DICTS: Record<Lang, Dict> = { pt, en };
const STORAGE_KEY = "lang_frontendcode";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const Ctx = createContext<I18nCtx | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as Lang | null) || "pt";
      setLangState(saved);
      document.documentElement.lang = saved;
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {}
  };

  const dict = DICTS[lang];
  const t = useMemo(() => (key: string) => dict[key] ?? key, [dict]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    const fallback: Lang = "pt";
    const dict = DICTS[fallback];
    return { lang: fallback, setLang: () => {}, t: (key: string) => dict[key] ?? key };
  }
  return ctx;
}

