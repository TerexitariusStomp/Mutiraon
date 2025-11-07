import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ethers } from "ethers"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Wait for a transaction to be mined and confirmed on-chain
export async function waitForTxConfirmation(
  txHash: `0x${string}` | string,
  confirmations: number = 1
): Promise<void> {
  // Uses the connected wallet provider so it follows the user-selected network
  const provider = new ethers.BrowserProvider((window as any).ethereum)
  const receipt = await provider.waitForTransaction(txHash)
  // Optionally wait for additional confirmations
  if (confirmations > 1 && receipt?.blockNumber != null) {
    const target = receipt.blockNumber + (confirmations - 1)
    while (true) {
      const block = await provider.getBlockNumber()
      if (block >= target) break
      await new Promise((r) => setTimeout(r, 1000))
    }
  }
}
