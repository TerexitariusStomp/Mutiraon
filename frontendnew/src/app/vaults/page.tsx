"use client";

import { useState } from "react";

export default function VaultsPage() {
  const [selectedCollateral, setSelectedCollateral] = useState("AMZN");

  const collaterals = [
    { code: "AMZN", name: "Amazon Rainforest Token", description: "Backs carbon offset credits and rainforest conservation" },
    { code: "BIO", name: "Biological Diversity", description: "Supports biodiversity conservation projects" },
    { code: "REN", name: "Renewables", description: "Funds renewable energy initiatives" },
    { code: "AGRI", name: "Environmental Agriculture", description: "Promotes sustainable farming practices" },
    { code: "AQUA", name: "Aquatic Preservation", description: "Protects aquatic ecosystems" },
    { code: "NIL", name: "Net Impact Ledger", description: "Tracks environmental impact metrics" },
    { code: "ECO", name: "Ecological Stewardship", description: "General environmental conservation" }
  ];

  return (
    <div className="container mx-auto min-h-[70vh] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Select Environmental Collateral
          </h1>
          <p className="mt-2 text-muted-foreground">
            Choose a collateral type to manage your vault and mint OGUSD.
          </p>
        </header>

        {/* Collateral Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {collaterals.map((collateral) => (
              <button
                key={collateral.code}
                onClick={() => setSelectedCollateral(collateral.code)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCollateral === collateral.code
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {collateral.code}
              </button>
            ))}
          </div>
        </div>

        {/* Vault Management Interface */}
        <div className="space-y-6">
          {/* Collateral Header */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f5fb] text-2xl">
                🌳
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {collaterals.find(c => c.code === selectedCollateral)?.name} ({selectedCollateral})
                </h2>
                <p className="text-sm text-muted-foreground">
                  {collaterals.find(c => c.code === selectedCollateral)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Balances Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">{selectedCollateral} Wallet</h3>
              <p className="text-2xl font-bold text-foreground">0.00 {selectedCollateral}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">Deposited {selectedCollateral}</h3>
              <p className="text-2xl font-bold text-foreground">0.00 {selectedCollateral}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">Available to lock</h3>
              <p className="text-2xl font-bold text-foreground">0.00 {selectedCollateral}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">Mutiraon Balance</h3>
              <p className="text-2xl font-bold text-foreground">0.00 Mutiraon</p>
            </div>
          </div>

          {/* Vault Status */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              🏛️ Vault Status
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Locked Collateral</p>
                <p className="text-xl font-semibold text-foreground">0.00 {selectedCollateral}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Outstanding Debt</p>
                <p className="text-xl font-semibold text-foreground">0.00 Mutiraon</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Collateral</p>
                <p className="text-xl font-semibold text-foreground">0.00 {selectedCollateral}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ready to lock</p>
                <p className="text-xl font-semibold text-foreground">0.00 {selectedCollateral}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">Max Safe Mint: 0 Mutiraon</p>
              <p className="text-xs text-amber-600 mt-1">⚠️ Contract enforces strict limits</p>
            </div>
          </div>

          {/* Deposit Section */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              💰 Deposit {selectedCollateral}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Add {selectedCollateral} tokens to your vault
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount of {selectedCollateral}
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-3">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  1. Approve
                </button>
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                  2. Deposit
                </button>
              </div>
            </div>
          </div>

          {/* Manage Locked Collateral */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              🔒 Manage Locked Collateral
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Lock deposited {selectedCollateral} to enable borrowing
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Lock Collateral
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Amount to lock"
                  />
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    Lock
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Unlock Collateral
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Amount to unlock"
                  />
                  <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90">
                    Unlock
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Mutiraon */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              💵 Manage Mutiraon
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Mint or repay Mutiraon against your locked collateral
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mint Mutiraon
                </label>
                <p className="text-xs text-muted-foreground mb-2">Max safe: 0</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Amount to mint"
                  />
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
                    Mint
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Repay Mutiraon
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Amount to repay"
                  />
                  <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90">
                    Repay
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Withdraw Collateral */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              ↩️ Withdraw Collateral
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get deposited (but unlocked) {selectedCollateral} back to your wallet
            </p>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Available: 0.00 {selectedCollateral}</p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Withdraw only
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Amount to withdraw"
                />
                <button className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground hover:opacity-90">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
