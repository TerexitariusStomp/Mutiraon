"use client";

import Link from "next/link";

export default function VaultsPage() {
  return (
    <div className="container mx-auto min-h-[70vh] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Open an OGUSD Vault
          </h1>
          <p className="mt-2 text-muted-foreground">
            Choose an environmental collateral to open a vault and mint OGUSD. Available
            collaterals represent verified conservation projects.
          </p>
        </header>

        <div className="mb-6 flex items-center gap-2">
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow">
            Available
          </button>
          <span className="text-xs text-muted-foreground">2 vaults</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* BIO Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fbe8e8] text-lg">
                  🐕
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      Biological Diversity (BIO)
                    </h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      BIO
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ERC-20 collateral
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-amber-100 px-2 py-1 text-[11px] font-medium text-amber-800">
                Popular
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">75%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Stability Fee (APR)
                </dt>
                <dd className="text-base font-semibold text-foreground">
                  2.5%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Min. Collateral
                </dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Liquidation Penalty
                </dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Open a vault using BIO tokens to mint OGUSD.
              </p>
              <Link
                href="/vaults/open?collateral=BIO"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                Open Vault
              </Link>
            </div>
          </div>

          {/* AGRI Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff4cc] text-lg">
                  🐶
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      Environmental Agriculture (AGRI)
                    </h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      AGRI
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Native-style collateral
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-800">
                Low Fee
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">75%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Stability Fee (APR)
                </dt>
                <dd className="text-base font-semibold text-foreground">
                  2.5%
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Min. Collateral
                </dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Liquidation Penalty
                </dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                Open a vault using AGRI tokens to mint OGUSD.
              </p>
              <Link
                href="/vaults/open?collateral=AGRI"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                Open Vault
              </Link>
            </div>
          </div>

          {/* ECO Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9f7ef] text-lg">
                  🌱
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      Ecological Stewardship (ECO)
                    </h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                      ECO
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">ERC-20 collateral</p>
                </div>
              </div>
              <span className="rounded-full bg-blue-100 px-2 py-1 text-[11px] font-medium text-blue-800">New</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">75%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stability Fee (APR)</dt>
                <dd className="text-base font-semibold text-foreground">2.5%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Min. Collateral</dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Liquidation Penalty</dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Open a vault using ECO tokens to mint OGUSD.</p>
              <Link href="/vaults/open?collateral=ECO" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">Open Vault</Link>
            </div>
          </div>

          {/* AMZN Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f5fb] text-lg">🌳</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Amazon Restoration (AMZN)</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">AMZN</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ERC-20 collateral</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-medium text-emerald-800">Impact</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">70%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stability Fee (APR)</dt>
                <dd className="text-base font-semibold text-foreground">2.0%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Min. Collateral</dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Liquidation Penalty</dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Open a vault using AMZN tokens to mint OGUSD.</p>
              <Link href="/vaults/open?collateral=AMZN" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">Open Vault</Link>
            </div>
          </div>

          {/* REN Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#efe8fb] text-lg">♻️</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Renewables (REN)</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">REN</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ERC-20 collateral</p>
                </div>
              </div>
              <span className="rounded-full bg-violet-100 px-2 py-1 text-[11px] font-medium text-violet-800">Stable</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">70%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stability Fee (APR)</dt>
                <dd className="text-base font-semibold text-foreground">2.0%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Min. Collateral</dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Liquidation Penalty</dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Open a vault using REN tokens to mint OGUSD.</p>
              <Link href="/vaults/open?collateral=REN" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">Open Vault</Link>
            </div>
          </div>

          {/* AQUA Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f0fb] text-lg">💧</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Aquatic Preservation (AQUA)</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">AQUA</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ERC-20 collateral</p>
                </div>
              </div>
              <span className="rounded-full bg-cyan-100 px-2 py-1 text-[11px] font-medium text-cyan-800">New</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">70%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stability Fee (APR)</dt>
                <dd className="text-base font-semibold text-foreground">2.0%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Min. Collateral</dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Liquidation Penalty</dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Open a vault using AQUA tokens to mint OGUSD.</p>
              <Link href="/vaults/open?collateral=AQUA" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">Open Vault</Link>
            </div>
          </div>

          {/* NIL Card */}
          <div className="group rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6e8fb] text-lg">🌍</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">Net Impact Ledger (NIL)</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">NIL</span>
                  </div>
                  <p className="text-xs text-muted-foreground">ERC-20 collateral</p>
                </div>
              </div>
              <span className="rounded-full bg-rose-100 px-2 py-1 text-[11px] font-medium text-rose-800">Coming</span>
            </div>
            <dl className="grid grid-cols-2 gap-4 rounded-xl bg-muted p-4">
              <div>
                <dt className="text-xs text-muted-foreground">Max LTV</dt>
                <dd className="text-base font-semibold text-foreground">65%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stability Fee (APR)</dt>
                <dd className="text-base font-semibold text-foreground">2.0%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Min. Collateral</dt>
                <dd className="text-base font-semibold text-foreground">$50</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Liquidation Penalty</dt>
                <dd className="text-base font-semibold text-foreground">10%</dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Open a vault using NIL tokens to mint OGUSD.</p>
              <Link href="/vaults/open?collateral=NIL" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow hover:opacity-90">Open Vault</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
