# Mutiraon Production Deployment Instructions

## 🚨 PRODUCTION READY - EVM MAINNET DEPLOYMENT

### Pre-Deployment Checklist
- [x] Private key with deployment funds configured
- [x] DAO Safe address configured for admin rights transfer
- [x] BSCScan API key configured for contract verification
- [x] All contracts tested and audited
- [x] Real BSC token addresses configured
- [x] Chainlink price feeds configured

### Deployment Configuration

```bash
# Deployment Account
Private Key: <redacted>

# DAO Safe (will receive admin rights)
Safe Address: 0x754dc60D811eebfAD39Db915eE0fD3905Ea4D978

# BSCScan API Key
API Key: <redacted>
```

### Environmental Token Addresses (Production, examples)
- **AMZN**: `<address>`
- **BIO**: `<address>`

### Oracle Price Feeds
- Configure Chainlink/API3 feeds for each collateral

## Deployment Steps

### 1. Final Pre-Deployment Check
```bash
npm install
npm run compile
npm test
```

### 2. Deploy to BSC Mainnet
```bash
npm run deploy:bsc
```

### 3. Verify Contracts (Automatic)
The deployment script will automatically verify contracts using the BSCScan API key.

### 4. Admin Rights Transfer
The deployment script will automatically:
- Grant admin rights to DAO Safe: `0x754dc60D811eebfAD39Db915eE0fD3905Ea4D978`
- Revoke deployer admin rights for security

## Expected Gas Costs
- **Total Deployment**: ~15-20M gas
- **Estimated Cost**: ~$20-30 USD at 5 gwei

## Post-Deployment Verification

### 1. Verify System Health
```javascript
// Check total debt ceiling
const totalDebtCeiling = await vat.Line();
console.log("Total Debt Ceiling:", totalDebtCeiling);

// Check collateral configurations
const ecoIlk = await vat.ilks(formatBytes32String("ECO-A"));
console.log("ECO Configuration:", ecoIlk);
```

### 2. Verify Price Feeds
```javascript
const [ecoPrice, valid] = await ecoPriceFeed.peek();
console.log("ECO Price:", ecoPrice, "Valid:", valid);
```

### 3. Verify Admin Rights
```javascript
// Should be 1 for DAO Safe
const daoRights = await vat.wards("0x754dc60D811eebfAD39Db915eE0fD3905Ea4D978");
console.log("DAO Admin Rights:", daoRights);

// Should be 0 for deployer (after rights transfer)
const deployerRights = await vat.wards(deployerAddress);
console.log("Deployer Rights:", deployerRights);
```

## System Parameters (Production)

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Liquidation Ratio** | 150% | Minimum collateralization |
| **Stability Fee** | 2% APR | Interest on borrowed OGUSD |
| **Liquidation Penalty** | 10% | Fee on liquidated positions |
| **Per-Ilk Debt Ceiling** | 10M OGUSD | Maximum debt per collateral |
| **Total Debt Ceiling** | 50M OGUSD | System-wide limit |
| **Dust Limit** | 100 OGUSD | Minimum position size |

## Security Notes

1. **Admin Rights**: Automatically transferred to DAO Safe
2. **Emergency Procedures**: End.sol provides global settlement
3. **Price Feeds**: Real-time Chainlink data
4. **Liquidations**: Automated Dutch auction system

## Monitoring Setup

After deployment, monitor:
- Chainlink price feed updates
- System collateralization ratios
- Liquidation events
- Stability fee accumulation

## Contract Verification

All contracts will be automatically verified on BSCScan using API key: `3FBKFF8AXVXFCG3QHD5K2S6J7UYTKIEM5C`

## Support Contacts

- **Technical Issues**: Check deployment logs
- **System Monitoring**: Use provided query examples
- **Emergency**: Use End.cage() through DAO Safe

---

**⚠️ IMPORTANT**: This is a production deployment with real funds. All admin rights are transferred to the DAO Safe for security.
