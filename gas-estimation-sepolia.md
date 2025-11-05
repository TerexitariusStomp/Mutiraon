# Mutiraon System Gas Estimation for Eth Sepolia Deployment

## Contract Deployment Overview

The Mutiraon stablecoin system consists of **29 contracts** that need to be deployed on Ethereum Sepolia:

### 1. Core Token (1 contract)
- **StableCoin** (Mutiraon stablecoin) - 1,800,000 gas

### 2. Environmental Tokens (7 contracts)
- **AMZNToken** (Amazon Conservation) - 1,800,000 gas
- **BIOToken** (Bioeconomy) - 1,800,000 gas  
- **RENToken** (Renewable Energy) - 1,800,000 gas
- **AGRIToken** (Sustainable Agriculture) - 1,800,000 gas
- **AQUAToken** (Water & Sanitation) - 1,800,000 gas
- **NILToken** (Nature Investment Lab) - 1,800,000 gas
- **ECOToken** (Eco Invest Brasil) - 1,800,000 gas
- *Subtotal: 12,600,000 gas*

### 3. Core System Contracts (6 contracts)
- **Vat** (CDP Engine) - 4,500,000 gas
- **Pot** (Savings Rate) - 2,200,000 gas
- **Vow** (Debt Accounting) - 1,800,000 gas
- **Dog** (Liquidation Engine) - 1,500,000 gas
- **Spot** (Price Oracle) - 1,200,000 gas
- **Jug** (Stability Fee) - 1,600,000 gas
- *Subtotal: 12,800,000 gas*

### 4. Adapter Contracts (8 contracts)
- **DaiJoin** (Stablecoin Adapter) - 1,000,000 gas
- **AMZNJoin** (Amazon Collateral Adapter) - 800,000 gas
- **BIOJoin** (Bioeconomy Collateral Adapter) - 800,000 gas
- **RENJoin** (Renewable Energy Adapter) - 800,000 gas
- **AGRIJoin** (Agriculture Collateral Adapter) - 800,000 gas
- **AQUAJoin** (Water Collateral Adapter) - 800,000 gas
- **NILJoin** (Nature Investment Adapter) - 800,000 gas
- **ECOJoin** (Eco Collateral Adapter) - 800,000 gas
- *Subtotal: 7,600,000 gas*

### 5. Auction Mechanisms (7 contracts)
- **AMZNClipper** - 3,200,000 gas
- **BIOClipper** - 3,200,000 gas
- **RENClipper** - 3,200,000 gas
- **AGRIClipper** - 3,200,000 gas
- **AQUAClipper** - 3,200,000 gas
- **NILClipper** - 3,200,000 gas
- **ECOClipper** - 3,200,000 gas
- *Subtotal: 22,400,000 gas*

## Total Contract Deployment Gas: 56,300,000 gas

## Post-Deployment Configuration Gas Costs

### Contract Authorizations (6 transactions)
- Authorizing Dog, Spot, Jug, Vow in Vat: ~150,000 gas each
- Authorizing 7 join contracts in Vat: ~150,000 gas each
- Authorizing DaiJoin in StableCoin: ~100,000 gas
- *Subtotal: 1,400,000 gas*

### Collateral Initialization (7 collaterals × 6 operations)
- Vat.init() for each ilk: ~80,000 gas each
- Setting liquidation ratios: ~60,000 gas each
- Setting debt ceilings: ~60,000 gas each
- Setting stability fees: ~100,000 gas each
- Setting price feeds: ~80,000 gas each
- Setting liquidation parameters: ~120,000 gas each
- *Subtotal: 3,500,000 gas*

### Global System Configuration
- Setting global debt ceiling: ~100,000 gas
- Setting global stability fee: ~80,000 gas
- Configuring Pot savings rate: ~150,000 gas
- *Subtotal: 330,000 gas*

## Total Post-Deployment Gas: 5,230,000 gas

## **GRAND TOTAL GAS ESTIMATION: 61,530,000 gas**

---

## Cost Analysis for Ethereum Sepolia

### Current Sepolia Gas Price Scenarios:

| Gas Price (gwei) | Total Cost (ETH) | Total Cost (USD)* |
|------------------|------------------|-------------------|
| 2 gwei (low) | 0.123 ETH | ~$0.25 |
| 10 gwei (medium) | 0.615 ETH | ~$1.25 |
| 20 gwei (high) | 1.231 ETH | ~$2.50 |
| 50 gwei (very high) | 3.077 ETH | ~$6.25 |

*USD prices based on ~$2,000/ETH exchange rate

### Recommended Budget
**Plan for 1.0 - 1.5 ETH** to cover:
- Contract deployment (61.5M gas)
- Etherscan verification (~30M additional gas)
- Buffer for failed transactions and retries
- Testing and debugging costs

---

## Gas Optimization Notes

1. **Compiler Optimizations**: The contracts use Solidity 0.8.19 with optimizer enabled (200 runs) and viaIR=true
2. **Batch Deployments**: Consider deploying similar contracts in batches to reduce overhead
3. **Gas Price Strategy**: Use lower gas prices (2-10 gwei) during off-peak Sepolia hours
4. **Sequential vs Parallel**: Deploy essential core contracts first, then environmental tokens and adapters

---

## Deployment Sequence Recommendation

1. **Phase 1**: Deploy core system (Vat, Pot, Vow, Dog, Spot, Jug) - ~12.8M gas
2. **Phase 2**: Deploy StableCoin and environmental tokens - ~14.4M gas  
3. **Phase 3**: Deploy adapter contracts - ~7.6M gas
4. **Phase 4**: Deploy clipper contracts - ~22.4M gas
5. **Phase 5**: System configuration and initialization - ~5.2M gas

**Total deployment time estimate**: 2-4 hours depending on gas price and network congestion

---

*Generated on: 2025-11-04*
*System: Mutiraon Stablecoin v1.0*
*Network: Ethereum Sepolia*