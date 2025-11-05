"use client";

import { useState } from "react";

export default function RiskDisclaimer() {
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
            <h1 className="text-base font-extrabold">
              ⚠️ IMPORTANT NOTICE ⚠️
            </h1>
            <h2 className="mt-1 text-sm font-bold">
              TESTNET ENVIRONMENT
            </h2>
            <p className="mt-1 text-sm font-semibold">
              This application is currently deployed on Ethereum Sepolia testnet. All transactions use test tokens and have no real value.
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
              <strong>Mutiraon: Brazil's Impact Backed Stablecoin</strong> - This is a testnet deployment on Ethereum Sepolia. All tokens and transactions are for testing purposes only and have no real monetary value.
            </p>

            <h3 className="mt-4 font-bold">TESTNET FEATURES</h3>
            <ul className="ml-5 mt-2 list-disc space-y-1">
              <li>
                <strong>Test Tokens</strong>: Use Sepolia ETH and test ERC-20 tokens for all transactions
              </li>
              <li>
                <strong>No Real Value</strong>: All assets on testnet have zero monetary value
              </li>
              <li>
                <strong>Learning Tool</strong>: Experiment with DeFi mechanics in a safe environment
              </li>
              <li>
                <strong>Development Testing</strong>: Help test and improve the protocol before mainnet launch
              </li>
            </ul>

            <h3 className="mt-4 font-bold">GETTING STARTED</h3>
            <p className="mt-1">
              To interact with this testnet deployment:
            </p>
            <ul className="ml-5 mt-2 list-disc space-y-1">
              <li>Connect a Web3 wallet (MetaMask, etc.)</li>
              <li>Switch to Ethereum Sepolia testnet</li>
              <li>Get free Sepolia ETH from a faucet</li>
              <li>Use test tokens for collateral</li>
            </ul>

            <hr className="my-4 border-red-200" />

            <p className="font-semibold">
              <strong>This is experimental software for testing purposes. Use at your own discretion.</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}