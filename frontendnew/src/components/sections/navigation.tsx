"use client";

import Link from "next/link";
import { TreePine, ChevronDown } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: "GET OGUSD", href: "/vaults", active: true },
  { name: "STAKE", href: "/stake", active: false },
];

const Navigation = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <nav className="sticky top-0 z-50 mx-auto max-w-[1200px] rounded-2xl bg-white/90 backdrop-blur-md px-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-black/5">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-x-8">
          <Link href="/" className="flex shrink-0 items-center gap-x-2">
            <TreePine className="h-8 w-8 text-primary" />
            <span className="font-logo text-foreground">Mutiraon</span>
          </Link>
          <nav className="hidden items-center gap-x-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-navigation whitespace-nowrap transition-colors hover:text-foreground/80 ${
                  link.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-x-1.5 rounded-full px-4 py-2 font-button"
              >
                More
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/docs">Docs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://github.com/your-username/mutiraon" target="_blank" rel="noopener noreferrer">Github</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://t.me/usdog_bark" target="_blank" rel="noopener noreferrer">Telegram</Link>
              </DropdownMenuItem>
              {/* Mobile nav items */}
              <div className="lg:hidden">
                {navLinks.map((link) => (
                   <DropdownMenuItem key={link.name} asChild>
                     <Link href={link.href}>{link.name}</Link>
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
              Disconnect
            </Button>
          )}
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;