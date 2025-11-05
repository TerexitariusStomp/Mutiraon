"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pt } from "@/i18n/dictionaries/pt";
import { en } from "@/i18n/dictionaries/en";

export type Lang = "pt" | "en";
type Dict = Record<string, string>;

const DICTS: Record<Lang, Dict> = { pt, en };

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const Ctx = createContext<I18nCtx | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "pt";
    return (localStorage.getItem("lang") as Lang) || "pt";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", l);
      // Also set a cookie so server can render correct metadata
      const oneYear = 60 * 60 * 24 * 365;
      document.cookie = `lang=${l}; path=/; max-age=${oneYear}`;
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const dict = DICTS[lang];
  const t = useMemo(() => (key: string) => dict[key] ?? key, [dict]);

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
