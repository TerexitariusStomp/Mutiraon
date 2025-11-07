---
sidebar_position: 2
---

# Smart Contracts Overview

Amaz-One Dollar is built on a robust smart contract architecture inspired by MakerDAO, providing a battle-tested foundation for impact-backed stablecoins.

## Core Architecture

The system employs a **Collateralized Debt Position (CDP)** model where users deposit environmental assets as collateral to mint stablecoins. This ensures stability through over-collateralization while unlocking liquidity for Brazil's solidarity economy.

### Key Contracts

| Contract | Purpose | Description |
|----------|---------|-------------|
| **StableCoin.sol** | ERC-20 Token | The stablecoin token with mint/burn functionality |
| **Vat.sol** | Core Accounting | Manages collateral/debt balances, CDP positions, and system-wide parameters |
| **Spot.sol** | Price Management | Handles collateral risk parameters and price feeds |
| **Dog.sol** | Liquidation Engine | Monitors positions and triggers liquidations when unsafe |
| **Clip.sol** | Auction System | Dutch auction mechanism for collateral liquidation |
| **Calc.sol** | Price Decay | Algorithms for auction price reduction over time |
| **Jug.sol** | Stability Fees | Interest rate accumulation on outstanding debt |
| **Vow.sol** | System Finances | Manages protocol surplus/deficit and debt settlement |
| **Pot.sol** | Savings Rate | Yield mechanism for idle stablecoin deposits |
| **End.sol** | Emergency Shutdown | Global settlement mechanism for extreme scenarios |

## BiomaH Credit System

### Environmental Asset Tokenization

BiomaH credits represent verified environmental stewardship:

- **Conservation Credits**: Hectares of protected forest and biodiversity reserves
- **Regeneration Credits**: Active reforestation and ecosystem restoration projects
- **Carbon Credits**: Verified CO2 offset and sequestration claims
- **Biodiversity Credits**: Habitat protection and species conservation metrics

### Valuation Methodology

Credits are valued through multiple approaches:

1. **Carbon Equivalency**: Based on verified CO2 offset potential ($5-100 per ton)
2. **Ecological Services**: Biodiversity, water cycle, and soil health benefits
3. **Hectare-Based Pricing**: Fixed BRL/USD value per conserved hectare
4. **Market Discovery**: Secondary trading establishes equilibrium prices

## System Parameters

### Collateral Types

| Parameter | BiomaH-A | ECO-A | BIO-A | Description |
|-----------|----------|-------|-------|-------------|
| **Token Address** | `<address>` | `<address>` | `<address>` | Token contracts |
| **Oracle Feed** | `<address>` | `<address>` | `<address>` | Price feed addresses |
| **Liquidation Ratio** | 150% | 150% | 150% | Minimum collateralization (70% LTV) |
| **Stability Fee** | 2-4% APR | 2% APR | 2% APR | Interest on borrowed stablecoins |
| **Liquidation Penalty** | 10-13% | 10% | 10% | Fee on liquidated positions |
| **Debt Ceiling** | 10M | 10M | 10M | Maximum debt per collateral type |
| **Dust Limit** | 100 | 100 | 100 | Minimum debt per position |

### Global Parameters

- **Network**: Ethereum Sepolia (testnet), Ethereum Mainnet (production)
- **Total Debt Ceiling**: 50M stablecoins
- **Savings Rate**: 0% (configurable)
- **Emergency Shutdown Delay**: 24 hours
- **Target Communities**: FRS, cooperatives, solidarity economy organizations
- **Off-ramp Integration**: WanderWallet + Pix for BRL conversion

## Security Features

### Risk Management

1. **Over-Collateralization**: All positions must maintain 150% collateral ratio
2. **Liquidation System**: Automatic liquidation of unsafe positions via Dutch auctions
3. **Price Oracle Protection**: Multiple price feed sources with staleness checks
4. **Emergency Shutdown**: Global settlement mechanism for extreme scenarios

### Access Control

- **Administrative Functions**: Protected by `auth` modifier
- **Permission System**: Granular control over contract interactions
- **Upgradeable Components**: Individual contracts can be replaced via governance

## Integration Points

### WanderWallet Integration

- **Stablecoin-to-BRL Conversion**: Instant conversion via Pix rails
- **User Experience**: Borrow stablecoin → Convert to BRL → Pay suppliers instantly
- **Foreign Currency Bridge**: USD/EUR top-ups for international solidarity economy funding

### Pix Rails

- **Instant Settlement**: 64 billion transactions worth $4.6 trillion annually
- **Merchant Acceptance**: Virtually all Brazilian merchants accept Pix
- **Speed**: Real-time payments, 24/7/365 availability

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Run tests
npm test

# Start local Hardhat network
npx hardhat node
```

### Deployment

```bash
# Deploy to Sepolia testnet
npm run deploy:biome:sepolia

# Configure collateral types
node scripts/configure-cbiomeh-ilk.js

# Update price feeds
node scripts/update-price-feeds.js
```

### Testing

```bash
# Run full test suite
npm test

# Test specific flows
node scripts/test-full-cdp.js
node scripts/test-liquidations.js
```
