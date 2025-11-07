---
sidebar_position: 1
---

# Amaz-One Dollar

> Impact-backed, Brazil-focused stablecoin — built to unlock environmental value for communities while preserving local control.

:::info Why it exists
Brazil has a thriving solidarity economy (FRS funds, cooperatives, CDBs) and vast environmental assets. Communities protect biomes yet lack access to capital. Amaz-One Dollar bridges this gap with a transparent, on-chain credit system collateralized by environmental tokens.
:::

## At a Glance

- Impact collateral: biodiversity/forest credits (e.g., CBiomaH)
- Maker-style CDP core: lock collateral ? mint stablecoin ? repay ? unlock
- Safety first: over-collateralization, oracles, liquidation auctions
- Earn yield: deposit stablecoin into the Pot (USR)
- Frontends: Vaults (CDP) and Stake (Savings)
- Network: Ethereum Sepolia (testnet)

### Quick Links
- App (Vaults & Stake): https://amazonedollar.org/
- Code: https://github.com/TerexitariusStomp/Mutiraon
- Telegram: https://t.me/mutiraon

---

## Architecture

`
User Wallet
   ¦                +--------------+
   +-- approve ---?¦  Gem Join    ¦------+
   +-- join    ---?¦ (collateral) ¦      ¦ gem
   ¦                +--------------+      ?
   ¦                                      Vat -- frob --? debt/ink
   ¦                +--------------+      ?
   +-- frob (lock)?¦      Vat      ¦?-----+ dai
   +-- frob (mint)?¦   (core)      ¦
   ¦                +--------------+
   ¦                +--------------+
   +-- join/exit -?¦  Dai Join    ¦--- StableCoin (ERC-20)
   ¦                +--------------+
   ¦                +--------------+
   +-- join/exit -?¦     Pot       ¦--- USR (savings)
                    +--------------+
`

### Core Contracts
- StableCoin.sol — ERC-20 stablecoin, minted/burned via DaiJoin/Vat
- Vat.sol — system accounting: collateral (ink), debt (art), rob safety
- Join adapters — ERC-20 in/out for collateral and stablecoin
- Spot/Jug/Dog/Clip/Calc/Vow/End — risk, fees, liquidation, settlement
- Pot.sol — savings rate (USR)
- Multicall — batch operations

:::tip Safety
rob enforces collateralization. If you attempt to lock/unlock or mint/repay beyond safe limits, the transaction reverts. Use the UI’s available values and “Max” helpers.
:::

---

## Frontends

### Vaults (CDP)
- Approve + Deposit collateral via GemJoin
- Lock collateral (ink) and Mint stablecoin (art)
- Repay debt and Unlock
- Withdraw stablecoin or collateral

### Stake (Savings)
- Approve + Join stablecoin into Vat
- Authorize Pot
- Deposit to Pot and accrue USR
- Withdraw principal + interest

:::note Latency
On-chain confirmations take time. If balances do not update immediately after a transaction, click Refresh in the UI.
:::

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+/pnpm/bun
- Git and a Sepolia wallet with test ETH

### Install & Run
`ash
# Clone
git clone https://github.com/TerexitariusStomp/Mutiraon.git
cd Mutiraon

# App
cd frontendcode
npm ci
npm run dev

# Docs
cd ../documentation
npm ci
npm start
`

The app runs at http://localhost:3000 and docs at http://localhost:3001 (by default).

---

## Deployment

### GitHub Pages (App)
- Next.js static export with output: 'export'
- Custom domain mazonedollar.org (CNAME) supported
- Workflow: .github/workflows/deploy.yml

### Docs (Docusaurus)
- Build: 
pm run build (in documentation)
- Deploy to GitHub Pages or any static host

---

## Configuration

### Environment Variables (App)
`
NEXT_PUBLIC_ALCHEMY_API_KEY=...
NEXT_PUBLIC_CHAIN_ID=11155111 # Sepolia
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
`

### Addresses (Sepolia)
`
Vat:         0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25
StableCoin:  0x3B3Dc8305bd491cffe41DC955C0fCa16bfbE1E3A
DaiJoin:     0xd8D7Ab4762e0d70DdCDEF22f757c5662E1488dB8
CBiomaH:     0x56050c12F0571DdA13621cBcb7c1c333EA4842BB
CBiomaHJoin: 0xBafCF10F52e206c67De3cd82951088f94d3fC6F5
Pot:         0x34C886c7C6407A65d193DF006f3Ef600e9b992d7
`

---

## FAQs

### Why environmental collateral?
It aligns financial incentives with conservation and community development.

### How is stability maintained?
Over-collateralization, oracle pricing (Spot), and liquidation via Dog/Clip.

### Is this audited?
Not yet — use on testnet only. See the risk banner inside the app.

---

## Contributing
PRs are welcome. Please read the repository README for coding standards and run linters/tests before submitting changes.

## License
See LICENSE in the repository.