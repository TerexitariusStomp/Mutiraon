"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const APP_PATH = process.env.NEXT_PUBLIC_MAIN_APP_PATH || "/Mutiraon/";

export function Header() {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang_frontendcode") as "pt" | "en" | null) : null;
    if (saved) setLang(saved);
    if (typeof document !== "undefined") document.documentElement.lang = saved || "pt";
  }, []);

  const toggleLang = () => {
    const next = lang === "pt" ? "en" : "pt";
    setLang(next);
    if (typeof window !== "undefined") localStorage.setItem("lang_frontendcode", next);
    if (typeof document !== "undefined") document.documentElement.lang = next;
  };

  const labelEnter = lang === "pt" ? "Entrar no App" : "Enter App";
  const labelLang = lang === "pt" ? "EN" : "PT";

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
        href={APP_PATH}
        className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700"
      >
        {labelEnter}
      </Link>
    </div>
  );
}

