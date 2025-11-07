---
sidebar_position: 1
---

# Amaz-One Dollar Documentation

Welcome to the comprehensive documentation for **Amaz-One Dollar**, an impact-backed stablecoin for Brazil's solidarity economy.

## What is Amaz-One Dollar?

Amaz-One Dollar is a transformative financial instrument—an impact-backed stablecoin fully collateralized by tokenized BiomaH credits—that bridges Brazil's thriving solidarity economy, maturing digital asset market, and untapped environmental assets.

### Key Features

- **Impact-Backed Collateral**: BiomaH credits representing conserved/regenerating Brazilian biomes
- **Multi-Collateral Support**: Accept multiple environmental tokens as collateral (AMZN, BIO, REN, AGRI, AQUA, NIL, ECO)
- **Chainlink Price Feeds**: Real-time price data from Chainlink oracles
- **Over-Collateralization**: Maintains stability through 150% collateralization ratio (70% LTV)
- **Dutch Auction Liquidations**: Efficient price discovery for liquidated collateral
- **Savings Rate**: Earn yield on stablecoin holdings
- **Stability Fees**: Interest rates on borrowed stablecoins (2-4% annual)
- **Emergency Shutdown**: Global settlement mechanism for crisis situations
- **Batch Operations**: Multicall support for gas optimization
- **Brazil Integration**: Pix/WanderWallet off-ramps for BRL conversion
- **Solidarity Economy Focus**: Designed for FRS, cooperatives, and community organizations

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/TerexitariusStomp/Mutiraon.git
cd mutiraon-stablecoin

# Install root dependencies
npm install

# Install frontend dependencies
cd frontendnew
npm install
cd ..
```

### Development

Start the development server:

```bash
# Start the frontend
npm run dev

# In another terminal, start the documentation
cd documentation
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000) and documentation at [http://localhost:3001](http://localhost:3001).

## Architecture Overview

Amaz-One Dollar employs a Collateralized Debt Position (CDP) model inspired by MakerDAO:

### Core Components

- **StableCoin.sol**: ERC-20 stablecoin minted/burned via joins and Vat
- **Vat.sol**: Core accounting for collateral/debt balances, urns, ilks, system-wide line/dust
- **Spot.sol**: Collateral risk config and price feeds; sets safe collateralization via mat
- **Dog.sol**: Liquidation keeper that starts auctions when vaults are unsafe
- **Clip.sol**: Dutch auctions for liquidations with price decay via Calc
- **Jug.sol**: Stability fees (per-ilk duty) accruing over time
- **Vow.sol**: System surplus/deficit management
- **Pot.sol**: Savings rate (DSR) for idle stablecoin deposits
- **End.sol**: Global settlement (emergency shutdown)

### System Flow

1. **Deposit**: FRS, cooperatives deposit tokenized BiomaH credits into secure vault
2. **Valuation**: Oracle networks verify current market value of deposited credits
3. **Minting**: Stablecoins minted up to 70% of collateral value (150% collateralization ratio)
4. **Borrowing**: Organizations receive stablecoins for immediate liquidity needs
5. **Utilization**: Stablecoins converted to BRL via WanderWallet/Pix for payroll, investment
6. **Repayment**: Borrowers repay stablecoin debt plus stability fee to unlock collateral
7. **Liquidation Protection**: 30% buffer protects against collateral value decline

## Next Steps

- [Smart Contracts Overview](./tutorial-basics/create-a-document)
- [Frontend Architecture](./tutorial-basics/create-a-page)
- [Deployment Guide](./tutorial-basics/deploy-your-site)
- [API Reference](./tutorial-extras/manage-docs-versions)
