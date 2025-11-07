import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const isProd = process.env.NODE_ENV === 'production';

// Robust basePath/assetPrefix handling across environments
// - If deploying under a subpath (e.g., GitHub Pages repo), set NEXT_PUBLIC_BASE_PATH="/your-subpath"
// - If deploying at domain root or using a custom domain, leave it empty/undefined
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
// Normalize: ensure leading slash (when provided) and no trailing slash
const normalizedBasePath = rawBasePath
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, '')}`
  : '';

const nextConfig: NextConfig = {
  // Enable development server
  output: isProd ? 'export' : undefined,
  // Safer for static hosts (S3, CF Pages, etc.)
  trailingSlash: true,
  // Use env-driven basePath instead of hardcoding
  basePath: '',
  // Ensure static asset URLs resolve correctly under basePath on static hosts
  assetPrefix: undefined,

  images: {
    // next/image optimization is not available on static export
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },

  // Hint workspace root for monorepo to silence root inference warnings
  // Point to the repository root (one level up from the app dir)
  outputFileTracingRoot: path.join(__dirname, ".."),

  // Turbopack configuration (replacement for deprecated experimental.turbo)
  turbopack: {
    rules: {},
  },

  webpack: (config) => {
    // Avoid optional deps causing SSR/import errors during build/runtime.
    // These are pulled by wallet SDKs but not needed in web build.
    config.resolve = config.resolve || {};
    // Explicitly alias optional, non-web modules to false so webpack ignores them
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'unstorage': false,
      '@solana/kit': false,
      '@solana-program/system': false,
      '@coinbase/cdp-sdk': false,
      '@base-org/account': false,
    };
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      "pino-pretty": false,
      "@react-native-async-storage/async-storage": false,
    };
    return config;
  }
};

export default nextConfig;
