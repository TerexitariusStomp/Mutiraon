"use client";
import { Suspense } from "react";

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import CollateralSelection from '@/components/sections/collateral-selection';
import { ENVIRONMENTAL_TOKENS } from '@/lib/contracts';

const SUPPORTED = {
  CBiomaH: ENVIRONMENTAL_TOKENS.CBiomaH,
} as const;

type CollateralKey = keyof typeof SUPPORTED;

export default function OpenVaultPage() {
  return (
    <Suspense fallback={<div className="container mx-auto min-h-[70vh] px-4 py-12">Loading...</div>}>
      <OpenVaultInner />
    </Suspense>
  );
}

function OpenVaultInner() {
  const searchParams = useSearchParams();

  const ticker = (searchParams?.get('collateral') || "CBiomaH").toUpperCase() as CollateralKey;
  const selected = SUPPORTED[ticker];

  if (!selected) {
    return (
      <div className="container mx-auto min-h-[70vh] px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <h1 className="text-2xl font-bold text-foreground">Unsupported collateral</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please choose from the available environmental tokens.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {Object.entries(SUPPORTED).map(([key, token]) => (
              <Link
                key={key}
                href={`/vaults/open?collateral=${key}`}
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                {token.symbol}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/vaults" className="text-sm text-muted-foreground underline underline-offset-4">
              Back to Vaults
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-[70vh] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Environmental Token Info Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-100 text-green-800">
            <span className="text-2xl">🌱</span>
            <div>
              <h2 className="font-semibold">{selected.name}</h2>
              <p className="text-xs opacity-75">{selected.description}</p>
            </div>
          </div>
        </div>

        {/* Use the actual collateral selection component */}
        <CollateralSelection initialCollateral={ticker} />

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Environmental Impact: Your {selected.symbol} supports {selected.description.toLowerCase()}
        </p>
      </div>
    </div>
  );
}
