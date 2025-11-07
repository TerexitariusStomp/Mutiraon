export default function DocsEnPage() {
  return (
    <main className="min-h-screen bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-10 prose prose-slate max-w-none">
        <h1>ONEDOLLAR Codebase Documentation</h1>
        <p>
          Comprehensive overview of smart contracts, deployment scripts, subgraph, and frontends.
        </p>

        <section>
          <h2>Table of Contents</h2>
          <ol>
            <li><a href="#structure">Repository Structure</a></li>
            <li><a href="#contracts">Smart Contracts</a></li>
            <li><a href="#flows">System Flows</a></li>
            <li><a href="#deployment">Deployment &amp; Scripts</a></li>
            <li><a href="#subgraph">Subgraph</a></li>
            <li><a href="#frontend">Frontends</a></li>
            <li><a href="#config">Configuration</a></li>
            <li><a href="#dev">Developer Guide</a></li>
            <li><a href="#troubleshooting">Troubleshooting</a></li>
            <li><a href="#glossary">Glossary</a></li>
          </ol>
        </section>

        <section id="structure">
          <h2>Repository Structure</h2>
          <p>
            At the root, this monorepo contains Solidity smart contracts, deployment scripts, a subgraph, and two frontends.
          </p>
          <ul>
            <li><code>contracts/</code> — Core protocol contracts (Maker-like: Vat, Spot, Dog, Clip, Jug, Vow, End, Pot, StableCoin, Join, PriceFeed, Calc, Multicall).</li>
            <li><code>scripts/</code> — Hardhat scripts for deployment, configuration, and end-to-end test flows.</li>
            <li><code>subgraph/</code> — The Graph subgraph for indexing on-chain data.</li>
            <li><code>frontendnew/</code> — Next.js app (current UI) with RainbowKit and shadcn/ui.</li>
            <li><code>frontend/</code> — Legacy React app (kept for reference).</li>
            <li><code>test/</code> — Mocha/Chai tests for contracts.</li>
            <li><code>deployments/</code> — Stored addresses from deployments per network.</li>
          </ul>
        </section>

        <section id="contracts">
          <h2>Smart Contracts</h2>
          <p>
            ONEDOLLAR is a collateralized debt position (CDP) system inspired by MakerDAO. Key components:
          </p>
          <ul>
            <li><strong>StableCoin.sol</strong> — ERC-20 stablecoin minted/burned via joins and Vat.</li>
            <li><strong>Vat.sol</strong> — Core accounting: collateral/debt balances, urns, ilks, system-wide line/dust, move/frob.</li>
            <li><strong>Spot.sol</strong> — Collateral risk config and price feeds; sets safe collateralization via <code>mat</code>.</li>
            <li><strong>Dog.sol</strong> — Liquidation keeper that starts auctions when vaults are unsafe; interfaces <em>Clip</em>.</li>
            <li><strong>Clip.sol</strong> — Dutch auctions for liquidations with price decay via <em>Calc</em>.</li>
            <li><strong>Calc.sol</strong> — Price decay algorithms used by Clip (exponential, linear, stairstep).</li>
            <li><strong>Jug.sol</strong> — Stability fees (per-ilk duty) accruing over time.</li>
            <li><strong>Vow.sol</strong> — System surplus/deficit management; triggers Flap/Flop in full systems.</li>
            <li><strong>End.sol</strong> — Global settlement (emergency shutdown).</li>
            <li><strong>Pot.sol</strong> — Savings rate (DSR) for idle stablecoin deposits.</li>
            <li><strong>Join adapters</strong> — ERC-20 collateral in/out and stablecoin join/exit.</li>
            <li><strong>PriceFeed.sol</strong> — Oracle integrations for reference pricing.</li>
          </ul>
        </section>

        <section id="flows">
          <h2>System Flows</h2>
          <ul>
            <li><strong>Open Vault</strong> — User locks collateral into Vat via Join, mints ONEDOLLAR debt.</li>
            <li><strong>Repay &amp; Withdraw</strong> — Burn ONEDOLLAR to reduce debt, free collateral when safe.</li>
            <li><strong>Liquidation</strong> — Dog triggers Clip auction when position is unsafe; bidders buy collateral to cover debt.</li>
            <li><strong>Stability Fees</strong> — Accrue via Jug; protocol income managed by Vow.</li>
          </ul>
        </section>

        <section id="deployment">
          <h2>Deployment &amp; Scripts</h2>
          <ul>
            <li><code>deploy.js</code> — End-to-end deployment of core contracts and adapters.</li>
            <li><code>configure-*.js</code> — Collateral onboarding, risk params, price feeds, lines/dust.</li>
            <li><code>test-*.js</code> — Full system flows, liquidation scenarios, keeper simulations.</li>
            <li><code>update-price-feeds.js</code> — Oracle pokes/updates.</li>
            <li><code>verify-contracts.js</code> — Etherscan or block explorer verifications.</li>
          </ul>
          <p className="mt-2">Deployment results are written to <code>deployments/*.json</code> and consumed by frontends.</p>
        </section>

        <section id="subgraph">
          <h2>Subgraph</h2>
          <p>The subgraph indexes StableCoin, Vat, and Dog/Clip events.</p>
          <ul>
            <li><code>schema.graphql</code> — Entity definitions for vaults, auctions, and protocol metrics.</li>
            <li><code>subgraph.yaml</code> — Event sources and mappings configuration.</li>
            <li><code>src/mapping.ts</code> — Event handlers that maintain derived entities.</li>
          </ul>
        </section>

        <section id="frontend">
          <h2>Frontends</h2>
          <h3>Next.js App (frontendnew)</h3>
          <ul>
            <li>Wallet integration via RainbowKit in <code>src/components/providers.tsx</code> and <code>src/lib/wagmi.ts</code>.</li>
            <li>Contract addresses and ABIs configured in <code>src/lib/contracts.ts</code>.</li>
            <li>Key pages: <code>/</code>, <code>/vaults</code>, <code>/vaults/open</code>, <code>/stake</code>.</li>
            <li>UI primitives via shadcn/ui in <code>src/components/ui/*</code>.</li>
          </ul>
          <h3>Legacy React App (frontend)</h3>
          <ul>
            <li>Contains earlier dashboard, CDP management, and liquidation views.</li>
            <li>Uses wagmi configuration under <code>src/config/wagmi.ts</code> and contract hooks.</li>
          </ul>
        </section>

        <section id="config">
          <h2>Configuration</h2>
          <ul>
            <li><code>.env</code> and <code>.env.local</code> — RPC URLs, private keys, subgraph endpoints.</li>
            <li><code>hardhat.config.js</code> — Networks and compiler settings for Solidity.</li>
            <li><code>deployments/*.json</code> — Resolved on frontend via <code>contracts.ts</code>.</li>
            <li>Price feed settings in scripts and <code>PriceFeed.sol</code> implementations.</li>
          </ul>
        </section>

        <section id="dev">
          <h2>Developer Guide</h2>
          <h3>Run the frontend</h3>
          <ol>
            <li>From repo root: <code>npm run dev</code> (spawns frontendnew).</li>
            <li>Alternatively: <code>cd frontendnew &amp;&amp; npm run dev</code>.</li>
          </ol>
          <h3>Deploy &amp; configure</h3>
          <ol>
            <li>Run <code>node scripts/deploy.js</code> to deploy contracts.</li>
            <li>Run configuration scripts (e.g., <code>scripts/configure-system-final.js</code>).</li>
            <li>Update <code>frontendnew/src/lib/contracts.ts</code> with deployed addresses if not auto-written.</li>
            <li>Verify addresses in <code>deployments/*.json</code>.</li>
          </ol>
          <h3>Testing flows</h3>
          <ul>
            <li>Scripted E2E: <code>scripts/test-full-cdp.js</code>, <code>scripts/test-liquidations.js</code>, and variants.</li>
            <li>Unit tests: <code>test/Stablecoin.test.js</code>.</li>
          </ul>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>
          <ul>
            <li>Oracles not updating: run <code>scripts/update-price-feeds.js</code>, check API3/Chainlink config.</li>
            <li>Vault actions revert: ensure approvals to GemJoin/DaiJoin; check <code>mat</code>, <code>dust</code>, and <code>line</code> limits.</li>
            <li>Liquidations stuck: verify Dog/Clip permissions and Calc parameters.</li>
            <li>Address mismatches: reconcile <code>deployments/*.json</code> with <code>frontendnew/src/lib/contracts.ts</code>.</li>
          </ul>
        </section>

        <section id="glossary">
          <h2>Glossary</h2>
          <ul>
            <li><strong>Ilk</strong> — Collateral type configuration.</li>
            <li><strong>Urn</strong> — User vault data structure.</li>
            <li><strong>Frob</strong> — Adjust collateral and debt.</li>
            <li><strong>Mat</strong> — Liquidation ratio.</li>
            <li><strong>Spot</strong> — Risk-adjusted price.</li>
            <li><strong>Dust</strong> — Minimum debt size.</li>
            <li><strong>Line</strong> — Debt ceiling (per-ilk or global).</li>
          </ul>
        </section>
      </div>
      <section id="pot" className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Pot Contract</h2>
        <p className="mb-2">
          The Pot contract powers the ONEDOLLAR Savings Rate (USR), letting ONEDOLLAR holders earn yield by depositing into a savings mechanism. It tracks balances, accrues interest, and enables safe entry/exit while supporting admin rate adjustments.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Main Functions</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Deposits create a normalized balance ("pie") that earns at the global savings rate ("dsr").</li>
          <li>Interest accrues via the "chi" accumulator and is updated with drip().</li>
          <li>join/exit moves funds in/out, with math reflecting accrued interest.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Key Features</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Interest accrual for all savers proportional to normalized balances.</li>
          <li>Anyone can deposit or withdraw principal plus accrued interest.</li>
          <li>Admins can set USR (dsr), configure debt handling, and cage in emergencies.</li>
          <li>Secure math and access controls to avoid overflows and ensure correctness.</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4 mb-2">Simplified Flow</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Deposit – join(wad): Start earning at current USR.</li>
          <li>Accrual – drip(): Update chi and distribute interest over elapsed time.</li>
          <li>Withdraw — exit(wad): Receive ONEDOLLAR plus interest (via chi).</li>
          <li>Admin – file, cage: Adjust rates or shutdown in emergencies.</li>
        </ul>
      </section>
    </main>
  );
}
