# Amaz-One Dollar Frontend - ONEDOLLAR Environmental Stablecoin

A modern DeFi frontend for the ONEDOLLAR stablecoin system, backed by environmental tokens. This project allows users to mint and manage positions using collateral from verified environmental conservation projects.

## 🌱 Environmental Impact

ONEDOLLAR supports a single environmental collateral:

- **BIOME** - Biome Credit (Biome Conservation)

## 🚀 Live Demo

Visit the deployed application: [https://your-username.github.io/mutiraon](https://your-username.github.io/mutiraon)

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Wagmi + RainbowKit
- **State Management**: React Hooks
- **Build**: Static Export

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/mutiraon.git
cd mutiraon
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the environment variables with your API keys and contract addresses.

## 🛠️ Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Build

Build the project for production:
```bash
npm run build
```

Generate static files:
```bash
npm run build:static
```

The static files will be generated in the `out` directory.

## 🌐 Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment:

1. The repository is set up with the base path `/Mutiraon`
2. Static files are generated in the `out` directory
3. GitHub Actions can be used for automated deployment

### Manual Deployment

1. Build the project: `npm run build:static`
2. Upload the contents of the `out` directory to your hosting provider

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx           # Home page
│   ├── vaults/            # Vault management pages
│   ├── docs/              # Documentation
│   └── stake/             # Staking pages
├── components/            # Reusable React components
│   ├── ui/                # UI components (shadcn/ui)
│   ├── sections/          # Page sections
│   └── providers.tsx      # App providers
├── hooks/                 # Custom React hooks
│   ├── usePot.ts         # POT contract interactions
│   └── useStablecoin.ts  # Stablecoin operations
└── lib/                   # Utility libraries
    ├── contracts.ts       # Contract addresses and ABIs
    ├── utils.ts          # Helper functions
    └── wagmi.ts          # Wagmi configuration
```

## 🔗 Smart Contracts

The frontend interacts with the following deployed contracts on Ethereum Sepolia:

- **Vat**: Core CDP engine
- **StableCoin**: ONEDOLLAR token contract
- **Spot**: Price feed system
- **Pot**: Savings rate mechanism
- **Dog**: Liquidation engine
- **Join**: Collateral token adapters
- **Jug**: Stability fee management

## 🔐 Security

⚠️ **IMPORTANT**: This is experimental software. The smart contracts have NOT been audited by any third-party security firm. Use at your own risk.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

- Documentation: Visit the `/docs` page in the application
- Issues: Create an issue in this repository
- Community: Join our Telegram group

## 🌍 Environmental Impact

By using ONEDOLLAR, you're supporting real environmental conservation efforts. Each token represents verified environmental projects that contribute to:

- Amazon rainforest protection
- Biodiversity conservation
- Renewable energy generation
- Sustainable agriculture
- Water conservation
- Soil conservation
- Carbon emission reduction

---

**Built with ❤️ for environmental conservation**

