---
sidebar_position: 3
---

# Frontend Architecture

Amaz-One Dollar features a modern, responsive frontend built with Next.js, TypeScript, and cutting-edge web technologies designed specifically for Brazil's solidarity economy users.

## Technology Stack

### Core Framework
- **Next.js 14**: React framework with App Router, server components, and optimized performance
- **TypeScript**: Type-safe development with comprehensive type definitions
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible, unstyled UI components for consistent design

### Web3 Integration
- **Wagmi**: React hooks for Ethereum interaction
- **RainbowKit**: Wallet connection interface with multiple wallet support
- **Viem**: TypeScript interface for Ethereum

### Internationalization
- **Custom i18n Context**: Support for English and Portuguese
- **Dynamic Language Switching**: Persistent language preferences

## Application Structure

### Pages & Routing

```
frontendnew/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Homepage (landing page)
│   ├── docs/              # Documentation pages
│   ├── stake/             # Staking interface
│   └── vaults/            # CDP management
│       └── open/          # Vault creation
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, forms, etc.)
│   └── sections/         # Page sections (hero, faucet, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
│   ├── contracts.ts      # Contract addresses and ABIs
│   ├── wagmi.ts          # Web3 configuration
│   └── utils.ts          # Helper functions
└── i18n/                 # Internationalization
    └── dictionaries/     # Translation files
```

### Key Components

#### Landing Page (`app/page.tsx`)
- **Hero Section**: Project introduction with animated title
- **Market Opportunity**: Statistics and market context
- **Capital Gap**: Problem statement and solution overview
- **Solution**: Technical approach explanation
- **How It Works**: Process visualization
- **Impact**: Projected outcomes and metrics
- **Footer**: Links and contact information

#### App Interface (`app/vaults/`)
- **Collateral Selection**: Choose environmental token collateral
- **Vault Creation**: Open CDP positions with selected collateral
- **Position Management**: Monitor and manage existing vaults
- **Staking Interface**: Earn yield on stablecoin deposits

#### Shared Components
- **Header**: Navigation with language toggle
- **Faucet Banner**: Test token claiming interface
- **Wallet Connection**: RainbowKit integration
- **Error Reporter**: User-friendly error handling

## State Management

### Web3 State
- **Wagmi**: Manages wallet connections, network switching, and contract interactions
- **React Query**: Caching and synchronization of on-chain data
- **Custom Hooks**: Specialized hooks for stablecoin operations

### UI State
- **React State**: Local component state management
- **Context API**: Global state for theme, language, and user preferences

## Styling & Design

### Design System
- **Color Palette**: Emerald green primary (#2eb397) with complementary colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing scale using Tailwind utilities
- **Responsive Design**: Mobile-first approach with progressive enhancement

### Accessibility
- **WCAG Compliance**: AA level accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: High contrast ratios for readability

## Performance Optimization

### Build Optimization
- **Next.js Compiler**: Automatic code splitting and optimization
- **Image Optimization**: Next.js Image component with lazy loading
- **Bundle Analysis**: Webpack bundle analyzer for size monitoring

### Runtime Performance
- **React Server Components**: Server-side rendering for better performance
- **Lazy Loading**: Dynamic imports for route-based code splitting
- **Caching**: React Query for efficient data fetching and caching

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Environment Configuration
```bash
# Environment variables
NEXT_PUBLIC_MAIN_APP_PATH=/app/
NEXT_PUBLIC_HOME_PATH=/
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Testing
- **Jest**: Unit testing for utilities and hooks
- **React Testing Library**: Component testing
- **Playwright**: End-to-end testing (planned)

## Deployment

### GitHub Pages
- **Static Export**: Next.js static generation for GitHub Pages
- **Base Path**: Configured for `/Mutiraon/` subdirectory
- **CNAME**: Custom domain support via `amazonedollar.org`

### Build Process
```bash
# Generate static files
npm run build

# Export for static hosting
npm run export
```

## User Experience

### Onboarding Flow
1. **Language Selection**: Choose preferred language (EN/PT)
2. **Wallet Connection**: Connect Web3 wallet (MetaMask, etc.)
3. **Test Tokens**: Claim faucet tokens for testing
4. **Vault Creation**: Open first CDP position
5. **BRL Conversion**: Convert stablecoins via WanderWallet/Pix

### Progressive Enhancement
- **Core Functionality**: Works without JavaScript for basic information
- **Enhanced Experience**: Full Web3 functionality with JavaScript enabled
- **Graceful Degradation**: Fallbacks for unsupported browsers/features

## Monitoring & Analytics

### Error Tracking
- **Sentry Integration**: Client-side error monitoring
- **Custom Error Boundaries**: React error boundary components

### Performance Monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Bundle Size**: Automated bundle size monitoring
- **Lighthouse Scores**: Performance auditing

This architecture provides a solid foundation for Amaz-One Dollar's mission to bring impact-backed stablecoins to Brazil's solidarity economy, combining modern web technologies with accessible design for underserved communities.
