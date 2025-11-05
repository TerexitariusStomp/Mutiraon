"use client";

import Link from "next/link";
import { TreePine, ChevronDown } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { useI18n } from "@/i18n/I18nContext";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { key: "nav.get", href: "/vaults", active: true },
  { key: "nav.stake", href: "/stake", active: false },
];

const InnerNav = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { t, lang, setLang } = useI18n();
  return (
    <nav className="sticky top-0 z-50 mx-auto max-w-[1200px] rounded-2xl bg-white/90 backdrop-blur-md px-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/5">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-x-8">
          <Link href="/" className="flex shrink-0 items-center gap-x-2">
            <TreePine className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-logo text-foreground">Mutiraon</span>
              <span className="text-xs text-muted-foreground -mt-1">{t('nav.tagline')}</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-x-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`font-navigation whitespace-nowrap transition-colors hover:text-foreground/80 ${
                  link.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-x-4">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full px-4 py-2 font-button">
                {t('nav.lang')}: {lang === 'pt' ? 'PT' : 'EN'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang('pt')}>{t('nav.lang.pt')}</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang('en')}>{t('nav.lang.en')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-x-1.5 rounded-full px-4 py-2 font-button"
              >
                {t('nav.more')}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={lang === 'pt' ? "/docs/pt" : "/docs/en"}>{t('nav.docs')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://github.com/your-username/mutiraon" target="_blank" rel="noopener noreferrer">{t('nav.github')}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://t.me/mutiraon" target="_blank" rel="noopener noreferrer">{t('nav.telegram')}</Link>
              </DropdownMenuItem>
              {/* Mobile nav items */}
              <div className="lg:hidden">
                {navLinks.map((link) => (
                   <DropdownMenuItem key={link.key} asChild>
                     <Link href={link.href}>{t(link.key)}</Link>
                   </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {isConnected && (
            <Button
              variant="outline"
              className="flex items-center gap-x-1.5 rounded-full px-4 py-2 font-button"
              onClick={() => disconnect()}
            >
              {t('nav.disconnect')}
            </Button>
          )}
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

import { useEffect, useState } from "react";
const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <InnerNav />;
};

export default Navigation;
