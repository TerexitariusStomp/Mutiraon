"use client";

import { useI18n } from "@/i18n/I18nContext";

export default function FooterLinks() {
  const { t } = useI18n();
  return (
    <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
      <span>{t('layout.copyright')}</span>
      <nav className="flex gap-4">
        <a href="/docs" className="hover:text-foreground transition-colors">{t('layout.docs')}</a>
        <a href="https://github.com/your-username/mutiraon" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('layout.github')}</a>
        <a href="https://t.me/mutiraon" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{t('layout.telegram')}</a>
      </nav>
    </div>
  );
}

