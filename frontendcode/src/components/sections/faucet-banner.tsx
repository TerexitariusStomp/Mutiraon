"use client";

import { useMemo } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatEther, formatUnits } from "viem";
import { CONTRACT_ADDRESSES, FAUCET_ABI, ETH_FAUCET_ABI } from "@/lib/contracts-updated";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Coins } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export default function FaucetBanner() {
  const { isConnected, address } = useAccount();
  const { t } = useI18n();
  const addresses = CONTRACT_ADDRESSES.sepolia;

  const tokenFaucet = addresses.cbiomehFaucet as `0x${string}`;
  const ethFaucet = addresses.ethFaucet as `0x${string}`;

  const hasTokenFaucet = tokenFaucet && tokenFaucet !== ("0x0000000000000000000000000000000000000000" as `0x${string}`);
  const hasEthFaucet = ethFaucet && ethFaucet !== ("0x0000000000000000000000000000000000000000" as `0x${string}`);

  // --- Token faucet reads ---
  const { data: tClaimAmount } = useReadContract({
    address: hasTokenFaucet ? tokenFaucet : undefined,
    abi: FAUCET_ABI as any,
    functionName: "claimAmount",
    query: { refetchInterval: 10000 },
  });
  const { data: tCooldown } = useReadContract({
    address: hasTokenFaucet ? tokenFaucet : undefined,
    abi: FAUCET_ABI as any,
    functionName: "cooldown",
    query: { refetchInterval: 10000 },
  });
  const { data: tEnabled } = useReadContract({
    address: hasTokenFaucet ? tokenFaucet : undefined,
    abi: FAUCET_ABI as any,
    functionName: "enabled",
    query: { refetchInterval: 10000 },
  });
  const { data: tLastClaim } = useReadContract({
    address: hasTokenFaucet ? tokenFaucet : undefined,
    abi: FAUCET_ABI as any,
    functionName: "lastClaim",
    args: address ? [address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000 },
  });

  const tokenSecondsLeft = useMemo(() => {
    if (!tLastClaim || !tCooldown) return 0;
    const last = BigInt(tLastClaim as bigint);
    const cd = BigInt(tCooldown as bigint);
    const now = BigInt(Math.floor(Date.now() / 1000));
    const next = last + cd;
    return next > now ? Number(next - now) : 0;
  }, [tLastClaim, tCooldown]);

  const canClaimToken = Boolean(tEnabled) && tokenSecondsLeft === 0;

  // --- ETH faucet reads ---
  const { data: eClaimAmount } = useReadContract({
    address: hasEthFaucet ? ethFaucet : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "CLAIM_AMOUNT",
    query: { refetchInterval: 10000 },
  });
  const { data: eCooldown } = useReadContract({
    address: hasEthFaucet ? ethFaucet : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "COOLDOWN",
    query: { refetchInterval: 10000 },
  });
  const { data: eEnabled } = useReadContract({
    address: hasEthFaucet ? ethFaucet : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "enabled",
    query: { refetchInterval: 10000 },
  });
  const { data: eCanClaim } = useReadContract({
    address: hasEthFaucet ? ethFaucet : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "canClaim",
    args: address ? [address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000 },
  });

  const canClaimEth = Boolean(eEnabled) && Boolean(eCanClaim);

  // --- Writes ---
  const { writeContract: writeToken, data: txToken, isPending: pToken } = useWriteContract();
  const { writeContract: writeEth, data: txEth, isPending: pEth } = useWriteContract();

  const { isPending: mToken, isSuccess: sToken } = useWaitForTransactionReceipt({ hash: txToken });
  const { isPending: mEth, isSuccess: sEth } = useWaitForTransactionReceipt({ hash: txEth });

  const claimBoth = () => {
    if (!isConnected) return;
    if (hasTokenFaucet && canClaimToken) {
      writeToken({ address: tokenFaucet, abi: FAUCET_ABI as any, functionName: "claim", args: [] });
    }
    if (hasEthFaucet && canClaimEth) {
      writeEth({ address: ethFaucet, abi: ETH_FAUCET_ABI as any, functionName: "claim", args: [] });
    }
  };

  const disabled = !isConnected || (!canClaimToken && !canClaimEth) ;
  const canClaimAny = canClaimToken || canClaimEth;
  const isClaiming = pToken || pEth || mToken || mEth;

  if (!isConnected) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-4 py-3">
      <div className="mx-auto max-w-4xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div>
            <p className="text-sm font-medium text-amber-800">{t('faucet.banner.title')}</p>
            <p className="text-xs text-amber-700">{t('faucet.banner.subtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {canClaimAny && (
            <Button
              onClick={claimBoth}
              disabled={disabled}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Coins className="h-4 w-4 mr-1" />
              {isClaiming ? t('faucet.claiming') : (sToken || sEth) ? t('faucet.claimed') : t('faucet.claim')}
            </Button>
          )}
          {!canClaimAny && (
            <span className="text-xs text-amber-600">{t('faucet.banner.cooldown')}</span>
          )}
        </div>
      </div>
    </div>
  );
}
