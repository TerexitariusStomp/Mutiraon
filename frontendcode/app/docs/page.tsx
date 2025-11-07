"use client";
import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { useRouter } from "next/navigation";

export default function DocsPage() {
  const { lang } = useI18n();
  const router = useRouter();
  useEffect(() => {
    router.replace(lang === "pt" ? "/docs/pt" : "/docs/en");
  }, [lang, router]);
  return (
    <main className="min-h-screen bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-10">
        <p>Redirecionando�?�</p>
      </div>
    </main>
  );
}

