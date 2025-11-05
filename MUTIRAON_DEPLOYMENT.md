# Mutiraon Stablecoin Deployment Guide

## Overview

Mutiraon is a decentralized stablecoin system deployed on Ethereum Sepolia that accepts Brazilian environmental tokens as collateral. The system is inspired by MakerDAO and provides a robust CDP (Collateralized Debt Position) mechanism for creating the Mutiraon stablecoin.

## System Architecture

### Core Components

- **Mutiraon Stablecoin**: The main stablecoin token (similar to DAI)
- **Environmental Tokens**: 7 Brazilian environmental tokens serving as collateral
- **Vat**: Core CDP engine that tracks all debt and collateral
- **Spot**: Price oracle system for collateral valuation
- **Dog**: Liquidation engine for handling undercollateralized positions
- **Jug**: Stability fee management
- **Pot**: Savings rate mechanism
- **Clipper**: Auction system for liquidations

### Environmental Token Collaterals

| Token | Full Name | Purpose | Website |
|-------|-----------|---------|---------|
| **AMZN** | Amazon Forest Preservation & REDD+ Token | Amazon rainforest conservation | https://www.amazonfund.gov.br/en/home/ |
| **BIO** | Brazilian Restoration & Bioeconomy Finance Token | Bioeconomy and restoration projects | https://brbfc.org |
| **REN** | Brazilian Renewable Energy Infrastructure Token | Renewable energy infrastructure | https://www.bndes.gov.br/wps/vanityurl/green_finance |
| **AGRB** | Sustainable Agriculture & Carbon Credit Token | Sustainable agriculture and carbon credits | https://brcarbon.com.br/en/ |
| **AQUA** | Water & Sanitation Infrastructure Token | Water and sanitation projects | https://ri.sabesp.com.br/en/the-company/corporate-profile/ |
| **NIL** | Nature Investment Lab Token | Environmental investment projects | https://natureinvestmentlab.org |
| **ECO** | Eco Invest Brasil Token | Ecological transformation projects | https://www.gov.br/fazenda/pt-br/acesso-a-informacao/acoes-e-programas/transformacao-ecologica/novo-brasil-ecological-transformation-plan/featured-programs/eco-invest-brazil |

## Deployment Configuration

### Network Configuration
- **Network**: Ethereum Sepolia
- **Chain ID**: 11155111
- **RPC URL**: https://sepolia.infura.io/v3/9aa3d95b3b440d8892e67c5a5e4d9a5c

### System Parameters

#### Global Parameters
- **Total Debt Ceiling**: 70M Mutiraon (10M per collateral)
- **Global Stability Fee**: 0% (configurable)
- **Emergency Shutdown Delay**: 24 hours

#### Per-Collateral Parameters
- **Liquidation Ratio**: 150%
- **Stability Fee**: 2% APR
- **Liquidation Penalty**: 10%
- **Debt Ceiling**: 10M Mutiraon per collateral
- **Dust Limit**: 100 Mutiraon minimum position

## Deployment Steps

### 1. Environment Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your private key and RPC URLs
```

Required environment variables:
```env
PRIVATE_KEY=your_private_key
ETH_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### 2. Compile Contracts

```bash
npx hardhat compile
```

### 3. Deploy to Sepolia

```bash
# Deploy the complete system
npx hardhat run scripts/deploy-sepolia.js --network sepolia
```

This will deploy:
- 1 Mutiraon stablecoin contract
- 7 environmental token contracts
- 6 core system contracts (Vat, Spot, Dog, Jug, Pot, Vow)
- 7 collateral adapter contracts (GemJoin)
- 7 auction mechanisms (Clipper)

### 4. Verify Contracts

```bash
# Verify on Etherscan
npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### 5. Post-Deployment Configuration

The deployment script automatically configures:
- Contract authorizations
- Collateral parameters
- System limits
- Price feeds

## Contract Addresses

After deployment, addresses will be saved to `mutiraon-sepolia-addresses.json`:

```json
{
  "stablecoin": "0x...",
  "vat": "0x...",
  "spot": "0x...",
  "jug": "0x...",
  "pot": "0x...",
  "dog": "0x...",
  "vow": "0x...",
  "daiJoin": "0x...",
  "tokens": {
    "AMZN": "0x...",
    "BIO": "0x...",
    "REN": "0x...",
    "AGRB": "0x...",
    "AQUA": "0x...",
    "NIL": "0x...",
    "ECO": "0x..."
  },
  "joins": {
    "AMZN": "0x...",
    "BIO": "0x...",
    "REN": "0x...",
    "AGRB": "0x...",
    "AQUA": "0x...",
    "NIL": "0x...",
    "ECO": "0x..."
  },
  "clippers": {
    "AMZN": "0x...",
    "BIO": "0x...",
    "REN": "0x...",
    "AGRB": "0x...",
    "AQUA": "0x...",
    "NIL": "0x...",
    "ECO": "0x..."
  }
}
```

## Usage Guide

### For Users

#### 1. Connect Wallet
- Connect your wallet to Ethereum Sepolia
- Ensure you have Sepolia ETH for gas fees

#### 2. Open a Vault
- Choose your preferred environmental token collateral
- Deposit collateral tokens
- Mint Mutiraon stablecoins (up to 150% collateralization ratio)

#### 3. Manage Your Position
- Monitor your collateralization ratio
- Repay debt to unlock collateral
- Withdraw excess collateral

#### 4. Use Savings Rate
- Deposit Mutiraon in the Pot contract
- Earn yield on your stablecoin holdings

### For Developers

#### Contract Integration

```javascript
// Example: Mint Mutiraon against AMZN collateral
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Initialize contracts (addresses from deployment)
const vat = new ethers.Contract(addresses.vat, VAT_ABI, wallet);
const amznJoin = new ethers.Contract(addresses.joins.AMZN, GEMJOIN_ABI, wallet);

// 1. Deposit AMZN collateral
await amznJoin.join(wallet.address, ethers.parseEther("1000")); // 1000 AMZN

// 2. Mint Mutiraon (150% collateralization ratio)
// At $1 AMZN price, can mint up to ~666 Mutiraon
const mintAmount = ethers.parseEther("600");
await vat.frob(
  ethers.utils.formatBytes32String("AMZN-A"),
  wallet.address,
  wallet.address,
  wallet.address,
  0,  // dink (no additional collateral)
  mintAmount  // dart (debt)
);

// 3. Withdraw Mutiraon to wallet
const daiJoin = new ethers.Contract(addresses.daiJoin, DAIJOIN_ABI, wallet);
await daiJoin.exit(wallet.address, mintAmount);
```

## Security Considerations

### Risk Management
- **Liquidation**: Positions below 150% collateralization are subject to liquidation
- **Price Oracles**: System relies on reliable price feeds for each collateral
- **Smart Contract Risk**: All smart contracts should be audited before mainnet deployment
- **Regulatory Risk**: Environmental token compliance varies by jurisdiction

### Monitoring
- Monitor system health metrics:
  - Total debt outstanding
  - Collateralization ratios
  - Liquidation events
  - Savings rate accrual

## Governance

### System Parameters
- Liquidation ratios can be adjusted through governance
- Stability fees can be modified
- New collaterals can be added
- Emergency shutdown can be triggered

### Administration
- Core contracts use auth patterns for parameter updates
- Time delays may be implemented for sensitive changes
- Multi-sig governance recommended for production

## Troubleshooting

### Common Issues

1. **Transaction Reverts**
   - Check collateralization ratio
   - Ensure sufficient gas limit
   - Verify contract addresses

2. **Price Feed Issues**
   - Verify price oracle configurations
   - Check for stale price data
   - Ensure sufficient collateral diversity

3. **Gas Estimation Errors**
   - Use higher gas limits for complex operations
   - Check network congestion
   - Verify contract states

### Support

- **Documentation**: [Project README](./README.md)
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Security**: Email security contacts for responsible disclosure

## Next Steps

1. **Testing**: Comprehensive testing on Sepolia testnet
2. **Audits**: Smart contract security audits
3. **Price Feeds**: Implement reliable price oracles
4. **Liquidity**: Establish liquidity pools for environmental tokens
5. **Governance**: Deploy governance contracts and processes
6. **Mainnet**: Prepare for mainnet deployment

---

**Note**: This system is currently deployed on Ethereum Sepolia for testing purposes. Do not use with real funds until audits are completed and mainnet deployment is authorized.