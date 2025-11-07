"use client";

import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatEther } from "viem";
import { CONTRACT_ADDRESSES, ETH_FAUCET_ABI } from "@/src/lib/contracts-updated";

export default function EthFaucetClaim() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const addresses = CONTRACT_ADDRESSES.sepolia;

  const faucetAddr = addresses.ethFaucet as `0x${string}`;
  const isConfigured = faucetAddr && faucetAddr !== ("0x0000000000000000000000000000000000000000" as `0x${string}`);

  const { data: claimAmount } = useReadContract({
    address: isConfigured ? faucetAddr : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "CLAIM_AMOUNT",
    query: { refetchInterval: 10000 },
  });

  const { data: cooldown } = useReadContract({
    address: isConfigured ? faucetAddr : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "COOLDOWN",
    query: { refetchInterval: 10000 },
  });

  const { data: enabled } = useReadContract({
    address: isConfigured ? faucetAddr : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "enabled",
    query: { refetchInterval: 10000 },
  });

  const { data: canClaim } = useReadContract({
    address: isConfigured ? faucetAddr : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "canClaim",
    args: address ? [address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000 },
  });

  const { data: timeRemaining } = useReadContract({
    address: isConfigured ? faucetAddr : undefined,
    abi: ETH_FAUCET_ABI as any,
    functionName: "getClaimTimeRemaining",
    args: address ? [address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000 },
  });

  const secondsLeft = Number((timeRemaining as bigint) || 0n);
  const hours = Math.floor(secondsLeft / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);

  const { writeContract, data: txHash, isPending: isWriting } = useWriteContract();
  const { isPending: isMining, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  const onClaim = () => {
    if (!isConfigured) return;
    writeContract({ address: faucetAddr, abi: ETH_FAUCET_ABI as any, functionName: "claim", args: [] });
  };

  return (
    <div className="mt-4 rounded-xl border border-black/10 bg-white/70 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">ETH Faucet</h3>
      <p className="mt-1 text-sm text-gray-600">Claim Sepolia ETH to cover transaction fees.</p>

      <div className="mt-3 text-sm text-gray-700">
        <div>Claim amount: {isConfigured && claimAmount ? `${formatEther(claimAmount as bigint)} ETH` : "…"}</div>
        <div>Cooldown: {isConfigured && cooldown ? `${Number(cooldown) / 3600}h` : "…"} {enabled ? "" : "(disabled)"}</div>
        {!isConfigured && (
          <div className="text-gray-500">Faucet not configured.</div>
        )}
        {isConfigured && isConnected && canClaim === false && secondsLeft > 0 && (
          <div className="text-gray-500">Next claim in ~{hours}h {mins}m</div>
        )}
      </div>

      <button
        onClick={onClaim}
        disabled={!isConfigured || !isConnected || canClaim === false || isWriting || isMining || !enabled}
        className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isWriting || isMining ? "Claiming…" : "Claim ETH"}
      </button>

      {isSuccess && <div className="mt-2 text-sm text-emerald-700">Claim successful.</div>}
    </div>
  );
}
