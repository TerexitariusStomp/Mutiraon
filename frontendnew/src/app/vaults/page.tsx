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

          {/* User Guide */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Simplified User Guide: How to Use Your Environmental Token Vault
            </h3>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="mb-4">
                This vault system lets you use environmental tokens (like Amazon Rainforest Tokens) to create a local currency called Mutiraon. Think of it as using a valuable asset you own to access spending money, without selling that asset.
              </p>

              <h4 className="text-base font-semibold text-foreground mt-6 mb-2">What You're Looking At</h4>
              <p className="mb-4">
                The page shows six main sections, each handling a different part of the process. Here's what they mean in plain language:
              </p>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">1. Your Account Balance (Top Section)</h5>
              <p className="mb-2">This shows how many {selectedCollateral} tokens you currently have in your digital account that aren't yet in the vault system.</p>
              <ul className="list-disc list-inside mb-4 ml-4">
                <li><strong>{selectedCollateral} Account</strong>: Tokens sitting in your regular account</li>
                <li><strong>Deposited {selectedCollateral}</strong>: Tokens you've moved into the vault (but not locked yet)</li>
                <li><strong>Available to Lock</strong>: Same as "Deposited {selectedCollateral}" - these are ready for the next step</li>
                <li><strong>Mutiraon Balance</strong>: How much local currency you currently have</li>
              </ul>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">2. Vault Status (Overview Box)</h5>
              <p className="mb-2">This is your vault's health report:</p>
              <ul className="list-disc list-inside mb-4 ml-4">
                <li><strong>Locked Tokens</strong>: {selectedCollateral} tokens you've locked as security</li>
                <li><strong>Outstanding Debt</strong>: How much Mutiraon you've created (borrowed) and need to repay eventually</li>
                <li><strong>Available Tokens</strong>: Deposited tokens that aren't locked yet</li>
                <li><strong>Maximum You Can Safely Create</strong>: The most Mutiraon you can safely create without risking losing your tokens</li>
              </ul>

              <h4 className="text-base font-semibold text-foreground mt-6 mb-2">The Four-Step Process</h4>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">Step 1: Deposit {selectedCollateral} 💰</h5>
              <p className="mb-2"><em>What it does</em>: Moves tokens from your account into the vault system</p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li>Enter how many {selectedCollateral} tokens you want to deposit</li>
                <li>Click "Approve" (this gives the vault permission to handle your tokens)</li>
                <li>Click "Deposit" (this actually moves them in)</li>
                <li>Your tokens are now in the vault but not locked - you can still take them back easily</li>
              </ol>
              <p className="text-sm italic mb-4">Think of it like: Putting money in a bank account. It's in the bank, but not committed to anything yet.</p>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">Step 2: Lock Tokens 🔒</h5>
              <p className="mb-2"><em>What it does</em>: Locks your deposited tokens so you can create Mutiraon against them</p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li>Look at "Available to Lock" to see how many deposited tokens you have</li>
                <li>Enter how many you want to lock</li>
                <li>Click "Lock"</li>
                <li>These tokens are now securing your ability to create Mutiraon</li>
              </ol>
              <p className="text-sm italic mb-4">Think of it like: Putting money in a special savings account that lets you borrow against it. The money is still yours, but you can't touch it until you pay back what you borrow.</p>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">Step 3: Create Mutiraon 💵</h5>
              <p className="mb-2"><em>What it does</em>: Creates new local currency that you can spend</p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li>Check "Maximum You Can Safely Create" to see the recommended limit (this protects you from losing your tokens)</li>
                <li>Enter how much Mutiraon you want to create</li>
                <li>Click "Create" or "Mint"</li>
                <li>Fresh Mutiraon appears in your account to use</li>
              </ol>
              <p className="text-sm italic mb-4">Important: The system enforces strict limits to keep your vault safe. You can't create more Mutiraon than your locked {selectedCollateral} can support.</p>
              <p className="text-sm italic mb-4">Think of it like: Taking out a loan from a bank, using your savings as collateral. The more you have saved (locked), the more you can borrow.</p>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">Step 4a: Pay Back Mutiraon (When You're Done)</h5>
              <p className="mb-2"><em>What it does</em>: Returns borrowed Mutiraon to reduce or eliminate your debt</p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li>Enter how much Mutiraon you want to pay back</li>
                <li>Click "Pay Back" or "Repay"</li>
                <li>Your outstanding debt decreases</li>
                <li>Once fully paid back, you can unlock and withdraw your {selectedCollateral}</li>
              </ol>
              <p className="text-sm italic mb-4">Think of it like: Paying back a loan to the bank. Once it's paid off, you can access your collateral again.</p>

              <h5 className="text-sm font-semibold text-foreground mt-4 mb-2">Step 4b: Unlock & Withdraw ↩️</h5>
              <p className="mb-2"><em>What it does</em>: Gets your {selectedCollateral} tokens back to your regular account</p>
              <p className="mb-2"><strong>To unlock:</strong></p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li>Go to "Manage Locked Tokens" section</li>
                <li>Enter how much to unlock (only works if you've paid back enough debt)</li>
                <li>Click "Unlock"</li>
              </ol>
              <p className="mb-2"><strong>To withdraw:</strong></p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li>Go to "Get Tokens Back" section</li>
                <li>Enter how much to withdraw (can only withdraw unlocked tokens)</li>
                <li>Click "Withdraw"</li>
                <li>Tokens return to your account</li>
              </ol>
              <p className="text-sm italic mb-4">Think of it like: After paying off your bank loan, you can withdraw your money from that special savings account back to your regular checking account.</p>

              <h4 className="text-base font-semibold text-foreground mt-6 mb-2">Key Safety Rules</h4>
              <ul className="list-disc list-inside mb-4 ml-4">
                <li><strong>Required Backing Ratio</strong>: You must always have more locked {selectedCollateral} value than Mutiraon debt. The system typically requires your backing to be worth 150% or more of what you borrow. This protects you from price changes.</li>
                <li><strong>Liquidation Risk</strong>: If {selectedCollateral} token value drops and your ratio becomes too low, the system may automatically sell some of your backing tokens to pay back the debt. Stay well above the minimum ratio to avoid this.</li>
                <li><strong>Maximum You Can Safely Create</strong>: Always pay attention to this number - it's calculated to keep you safe from losing your tokens.</li>
              </ul>

              <h4 className="text-base font-semibold text-foreground mt-6 mb-2">Quick Reference: What Order?</h4>
              <p className="mb-2">For first-time users, follow this sequence:</p>
              <ol className="list-decimal list-inside mb-4 ml-4">
                <li><strong>Deposit</strong> → Move tokens into vault</li>
                <li><strong>Lock</strong> → Secure them as backing</li>
                <li><strong>Create</strong> → Make Mutiraon to use</li>
                <li><em>(Use your Mutiraon)</em></li>
                <li><strong>Pay Back</strong> → Return the Mutiraon</li>
                <li><strong>Unlock</strong> → Free your backing</li>
                <li><strong>Withdraw</strong> → Get tokens back to account</li>
              </ol>
              <p className="text-sm mb-4">You don't have to do all steps at once - you can deposit and lock today, create tomorrow, and pay back next month. The vault remembers your position.</p>

              <h4 className="text-base font-semibold text-foreground mt-6 mb-2">Common Questions</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Why can't I just create Mutiraon directly?</p>
                  <p className="text-sm">The locking system ensures there's always real value backing the Mutiraon currency. This keeps it stable and trustworthy.</p>
                </div>
                <div>
                  <p className="font-medium">What if I need my {selectedCollateral} back quickly?</p>
                  <p className="text-sm">You must pay back your Mutiraon debt first, then unlock, then withdraw. Plan ahead for liquidity needs.</p>
                </div>
                <div>
                  <p className="font-medium">What happens to my locked {selectedCollateral}?</p>
                  <p className="text-sm">It stays safely in the system. You maintain ownership - it's just temporarily locked as security for your Mutiraon debt.</p>
                </div>
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">Step 1: Deposit {selectedCollateral} 💰</h4>
              <p className="text-sm text-blue-800 mb-3">
                <em>What it does</em>: Moves tokens from your account into the vault system
              </p>
              <ul className="text-sm text-blue-800 space-y-1 ml-4">
                <li>• Enter how many {selectedCollateral} tokens you want to deposit</li>
                <li>• Click "Approve" (this gives the vault permission to handle your tokens)</li>
                <li>• Click "Deposit" (this actually moves them in)</li>
                <li>• Your tokens are now in the vault but not locked - you can still take them back easily</li>
              </ul>
              <p className="text-xs text-blue-700 mt-2 italic">
                Think of it like: Putting money in a bank account. It's in the bank, but not committed to anything yet.
              </p>
            </div>
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
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-900 mb-2">Step 2: Lock Tokens 🔒</h4>
              <p className="text-sm text-green-800 mb-3">
                <em>What it does</em>: Locks your deposited tokens so you can create Mutiraon against them
              </p>
              <ul className="text-sm text-green-800 space-y-1 ml-4">
                <li>• Look at "Available to Lock" to see how many deposited tokens you have</li>
                <li>• Enter how many you want to lock</li>
                <li>• Click "Lock"</li>
                <li>• These tokens are now securing your ability to create Mutiraon</li>
              </ul>
              <p className="text-xs text-green-700 mt-2 italic">
                Think of it like: Putting money in a special savings account that lets you borrow against it. The money is still yours, but you can't touch it until you pay back what you borrow.
              </p>
            </div>
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
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-900 mb-2">Step 3: Create Mutiraon 💵</h4>
              <p className="text-sm text-purple-800 mb-3">
                <em>What it does</em>: Creates new local currency that you can spend
              </p>
              <ul className="text-sm text-purple-800 space-y-1 ml-4">
                <li>• Check "Maximum You Can Safely Create" to see the recommended limit (this protects you from losing your tokens)</li>
                <li>• Enter how much Mutiraon you want to create</li>
                <li>• Click "Mint"</li>
                <li>• Fresh Mutiraon appears in your account to use</li>
              </ul>
              <p className="text-xs text-purple-700 mt-2 italic">
                Important: The system enforces strict limits to keep your vault safe. You can't create more Mutiraon than your locked {selectedCollateral} can support.
              </p>
              <p className="text-xs text-purple-700 italic">
                Think of it like: Taking out a loan from a bank, using your savings as collateral. The more you have saved (locked), the more you can borrow.
              </p>
            </div>
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
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-orange-900 mb-2">Step 4: Unlock & Withdraw ↩️</h4>
              <p className="text-sm text-orange-800 mb-3">
                <em>What it does</em>: Gets your {selectedCollateral} tokens back to your regular account
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-orange-900">To unlock:</p>
                  <ul className="text-sm text-orange-800 space-y-1 ml-4">
                    <li>• Go to "Manage Locked Tokens" section</li>
                    <li>• Enter how much to unlock (only works if you've paid back enough debt)</li>
                    <li>• Click "Unlock"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-900">To withdraw:</p>
                  <ul className="text-sm text-orange-800 space-y-1 ml-4">
                    <li>• Enter how much to withdraw (can only withdraw unlocked tokens)</li>
                    <li>• Click "Withdraw"</li>
                    <li>• Tokens return to your account</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-orange-700 mt-2 italic">
                Think of it like: After paying off your bank loan, you can withdraw your money from that special savings account back to your regular checking account.
              </p>
            </div>
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
