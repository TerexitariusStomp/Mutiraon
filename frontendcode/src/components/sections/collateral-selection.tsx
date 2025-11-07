"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, ENVIRONMENTAL_TOKENS, COLLATERAL_TYPES } from '@src/lib/contracts-updated';
import { useI18n } from "@/i18n/I18nContext";
import { useChainId } from 'wagmi';
import { toast } from 'sonner';
import { useStablecoin } from '@src/hooks/useStablecoin';

interface CollateralSelectionProps {
  initialCollateral?: 'CBiomaH'
}

const CollateralSelection = ({ initialCollateral }: CollateralSelectionProps) => {
  const { address, isConnected, chainId: walletChainId } = useAccount();
  const { t } = useI18n();
  const appChainId = useChainId();
  const addresses = CONTRACT_ADDRESSES.sepolia;

  const {
    approveToken,
    depositCollateral,
    lockCollateral,
    unlockCollateral,
    generateAndSendStablecoin,
    repayStablecoin,
    withdrawCollateral,
  } = useStablecoin('CBiomaH');

  const [selectedCollateral, setSelectedCollateral] = useState<keyof typeof ENVIRONMENTAL_TOKENS>(
    initialCollateral ?? 'CBiomaH'
  );

  // Ensure selection follows initialCollateral even if it becomes available after first render
  useEffect(() => {
    if (initialCollateral && initialCollateral !== selectedCollateral) {
      setSelectedCollateral(initialCollateral);
    }
  }, [initialCollateral]);

  const [depositAmount, setDepositAmount] = useState('');
  const [lockAmount, setLockAmount] = useState('');
  const [unlockAmount, setUnlockAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [mintAmount, setMintAmount] = useState('');
  const [repayAmount, setRepayAmount] = useState('');
  
  // Individual loading states for each operation
  const [isApproving, setIsApproving] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isLocking, setIsLocking] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isRepaying, setIsRepaying] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  // Get current collateral information
  const currentCollateralInfo = ENVIRONMENTAL_TOKENS[selectedCollateral];
  const currentIlkBytes = COLLATERAL_TYPES[selectedCollateral];

  // Read balances directly using useReadContract
  const { data: mutiraonBalance, isLoading: mutiraonLoading, error: mutiraonError } = useReadContract({
    address: addresses.stablecoin as `0x${string}`,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'owner', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }]
      }
    ],
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000, refetchOnWindowFocus: true },
  });

  const { data: tokenBalance, isLoading: tokenLoading, error: tokenError } = useReadContract({
    address: currentCollateralInfo.address as `0x${string}`,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'owner', type: 'address' }],
        outputs: [{ name: '', type: 'uint256' }]
      }
    ],
    functionName: 'balanceOf',
    args: address ? [address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000, refetchOnWindowFocus: true },
  });

  const { data: collateralBalance } = useReadContract({
    address: addresses.vat as `0x${string}`,
    abi: [
      {
        name: 'gem',
        type: 'function',
        stateMutability: 'view',
        inputs: [
          { name: 'ilk', type: 'bytes32' },
          { name: 'usr', type: 'address' }
        ],
        outputs: [{ name: '', type: 'uint256' }]
      }
    ],
    functionName: 'gem',
    args: address ? [currentIlkBytes as `0x${string}`, address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000, refetchOnWindowFocus: true },
  });

  // Read Vat.ilks for current collateral to compute safe mint limit precisely
  const { data: ilkData } = useReadContract({
    address: addresses.vat as `0x${string}`,
    abi: [
      {
        name: 'ilks',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: '', type: 'bytes32' }],
        outputs: [
          { name: 'Art',  type: 'uint256' }, // total normalized debt [wad]
          { name: 'rate', type: 'uint256' }, // accumulated rate      [ray]
          { name: 'spot', type: 'uint256' }, // price with margin     [ray]
          { name: 'line', type: 'uint256' }, // debt ceiling          [rad]
          { name: 'dust', type: 'uint256' }  // min debt              [rad]
        ]
      }
    ],
    functionName: 'ilks',
    args: [currentIlkBytes as `0x${string}`],
    query: { refetchInterval: 5000, refetchOnWindowFocus: true },
  });

  // Read raw urns(ilk, user) to avoid precision loss from format/parse round-trip
  const { data: urnRaw } = useReadContract({
    address: addresses.vat as `0x${string}`,
    abi: [
      {
        name: 'urns',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'ilk', type: 'bytes32' }, { name: 'urn', type: 'address' }],
        outputs: [{ name: 'ink', type: 'uint256' }, { name: 'art', type: 'uint256' }]
      }
    ],
    functionName: 'urns',
    args: address ? [currentIlkBytes as `0x${string}`, address as `0x${string}`] : undefined,
    query: { refetchInterval: 5000, refetchOnWindowFocus: true },
  });

  const formatBalance = (balance: bigint | undefined, decimals: number = 18) => {
    if (!balance) return '0.00';
    const formatted = parseFloat(ethers.formatUnits(balance, decimals));
    // Round to 4 decimal places and remove trailing zeros
    return formatted.toFixed(4).replace(/\.?0+$/, '');
  };

  // Calculate max safe mint using Vat invariants with raw urn values
  const calculateMaxSafeMint = () => {
    try {
      if (!ilkData || !urnRaw) return '0';

      // Read raw urn values from chain (no string formatting round-trip)
      const inkWad = BigInt((urnRaw as any)[0]?.toString() ?? '0'); // [wad]
      const artWad = BigInt((urnRaw as any)[1]?.toString() ?? '0'); // [wad]
      if (inkWad <= 0n) return '0';

      // Ilk parameters
      const ArtTotalWad = BigInt((ilkData as any)[0]?.toString() ?? '0'); // [wad]
      const rateRay     = BigInt((ilkData as any)[1]?.toString() ?? '0'); // [ray]
      const spotRay     = BigInt((ilkData as any)[2]?.toString() ?? '0'); // [ray]
      const lineRad     = BigInt((ilkData as any)[3]?.toString() ?? '0'); // [rad]
      const dustRad     = BigInt((ilkData as any)[4]?.toString() ?? '0'); // [rad]

      if (rateRay === 0n || spotRay === 0n) return '0';

      // Safety headroom
      const maxArtAllowedWad = (inkWad * spotRay) / rateRay; // floor
      let additionalBySafetyWad = maxArtAllowedWad > artWad ? (maxArtAllowedWad - artWad) : 0n;

      // Line headroom
      const currentIlkDebtRad = ArtTotalWad * rateRay;
      const remainingRad = lineRad > currentIlkDebtRad ? (lineRad - currentIlkDebtRad) : 0n;
      const remainingByLineWad = remainingRad / rateRay;

      // Combine
      let additionalWad = additionalBySafetyWad < remainingByLineWad ? additionalBySafetyWad : remainingByLineWad;

      // Dust requirement when opening from zero
      if (dustRad > 0n && artWad === 0n && additionalWad > 0n) {
        const requiredMinArtWad = (dustRad + rateRay - 1n) / rateRay; // ceil
        if (additionalWad < requiredMinArtWad) return '0';
      }

      if (additionalWad <= 0n) return '0';

      // 0.5% buffer
      additionalWad = (additionalWad * 995n) / 1000n;
      if (additionalWad <= 0n) return '0';

      const value = Number(ethers.formatUnits(additionalWad, 18));
      return value.toFixed(6).replace(/\.?0+$/, '');
    } catch {
      return '0';
    }
  };

  // Calculate max safe unlock from current state
  const calculateMaxSafeUnlock = () => {
    try {
      if (!ilkData || !urnRaw) return '0';

      const inkWad = BigInt((urnRaw as any)[0]?.toString() ?? '0'); // [wad]
      const artWad = BigInt((urnRaw as any)[1]?.toString() ?? '0'); // [wad]
      const rateRay = BigInt((ilkData as any)[1]?.toString() ?? '0'); // [ray]
      const spotRay = BigInt((ilkData as any)[2]?.toString() ?? '0'); // [ray]

      if (inkWad === 0n) return '0';
      if (artWad === 0n || rateRay === 0n || spotRay === 0n) {
        const value = Number(ethers.formatUnits(inkWad, 18));
        return value.toFixed(6).replace(/\.?0+$/, '');
      }

      const minInkRequired = (rateRay * artWad + (spotRay - 1n)) / spotRay; // ceil
      let maxUnlockWad = inkWad > minInkRequired ? (inkWad - minInkRequired) : 0n;

      // 0.5% buffer
      maxUnlockWad = (maxUnlockWad * 995n) / 1000n;

      const value = Number(ethers.formatUnits(maxUnlockWad, 18));
      return value.toFixed(6).replace(/\.?0+$/, '');
    } catch {
      return '0';
    }
  };

  const handleApprove = async () => {
    if (!depositAmount) return;
    setIsApproving(true);
    try {
      await approveToken(depositAmount, selectedCollateral);
      toast.success(t('vault.loading.approving'));
    } catch (error: any) {
      console.error('Approval failed:', error);
      alert(`Approval failed: ${error.message || 'Unknown error'}. Check console for details.`);
    } finally {
      setIsApproving(false);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount) return;
    setIsDepositing(true);
    try {
      await depositCollateral(depositAmount, selectedCollateral);
      toast.success(t('vault.loading.depositing'));
      setDepositAmount('');
    } catch (error: any) {
      console.error('Deposit failed:', error);
      alert(`Deposit failed: ${error.message || 'Unknown error'}. Check console for details.`);
    } finally {
      setIsDepositing(false);
    }
  };

  const handleLock = async () => {
    if (!lockAmount) return;
    setIsLocking(true);
    try {
      await lockCollateral(lockAmount, currentIlkBytes as unknown as string);
      toast.success(t('vault.loading.locking'));
      setLockAmount('');
    } catch (error: any) {
      console.error('Lock failed:', error);
      alert(`Lock failed: ${error.message || 'Unknown error'}.`);
    } finally {
      setIsLocking(false);
    }
  };

  const handleUnlock = async () => {
    if (!unlockAmount) return;
    setIsUnlocking(true);
    try {
      await unlockCollateral(unlockAmount, currentIlkBytes as unknown as string);
      toast.success(t('vault.loading.unlocking'));
      setUnlockAmount('');
    } catch (error: any) {
      console.error('Unlock failed:', error);
      alert(`Unlock failed: ${error.message || 'Unknown error'}.`);
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleMint = async () => {
    if (!mintAmount) return;
    setIsMinting(true);
    try {
      if (!address) throw new Error('Wallet not connected');
      await generateAndSendStablecoin(mintAmount, currentIlkBytes as unknown as string, address as string);
      toast.success(t('vault.loading.minting'));
      setMintAmount('');
    } catch (error: any) {
      console.error('Mint failed:', error);
      alert(`Mint failed: ${error.message || 'Unknown error'}.`);
    } finally {
      setIsMinting(false);
    }
  };

  const handleRepay = async () => {
    if (!repayAmount) return;
    setIsRepaying(true);
    try {
      await repayStablecoin(repayAmount, currentIlkBytes as unknown as string);
      toast.success(t('vault.loading.repaying'));
      setRepayAmount('');
    } catch (error: any) {
      console.error('Repay failed:', error);
      alert(`Repay failed: ${error.message || 'Unknown error'}.`);
    } finally {
      setIsRepaying(false);
    }
  };

  const handleWithdrawCollateral = async () => {
    if (!withdrawAmount) return;
    setIsWithdrawing(true);
    try {
      await withdrawCollateral(withdrawAmount, selectedCollateral);
      toast.success(t('vault.loading.withdrawing'));
      setWithdrawAmount('');
    } catch (error: any) {
      console.error('Withdraw failed:', error);
      alert(`Withdraw failed: ${error.message || 'Unknown error'}.`);
    } finally {
      setIsWithdrawing(false);
    }
  };

  // Show connection status
  if (!isConnected) {
    return (
      <div className="w-full max-w-[732px] mx-auto p-6 bg-white/60 rounded-2xl border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700 mb-2">Wallet Not Connected</p>
          <p className="text-sm text-gray-500">Please connect your wallet to access the vault</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[732px] mx-auto p-6 bg-white/60 rounded-2xl border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="space-y-6">

        {/* Collateral Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('vaults.title')}</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(ENVIRONMENTAL_TOKENS).map(([key, token]) => (
              <button
                key={key}
                onClick={() => setSelectedCollateral(key as keyof typeof ENVIRONMENTAL_TOKENS)}
                className={`px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                  selectedCollateral === key
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {token.symbol}
              </button>
            ))}
          </div>
          <div className="mt-2 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>{t(`coll.${selectedCollateral}.name`)}</strong>
            </p>
            <p className="text-xs text-green-700 mt-1">
              {t(`coll.${selectedCollateral}.desc`)}
            </p>
          </div>
        </div>

        {/* Balances */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/40 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{t('vault.bal.wallet').replace('{code}', currentCollateralInfo.symbol)}</p>
            <p className="text-lg font-semibold">
              {tokenLoading ? 'Loading...' : formatBalance(tokenBalance as bigint | undefined, 18)} {currentCollateralInfo.symbol}
            </p>
            {tokenError && <p className="text-xs text-red-600">Error: {tokenError.message}</p>}
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-green-600">{t('vault.bal.deposited').replace('{code}', currentCollateralInfo.symbol)}</p>
            <p className="text-lg font-semibold text-green-800">
              {formatBalance(collateralBalance as bigint | undefined, 18)} {currentCollateralInfo.symbol}
            </p>
            <p className="text-xs text-green-600">{t('vault.bal.available')}</p>
          </div>
          <div className="bg-white/40 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{t('vault.bal.mut')}</p>
            <p className="text-lg font-semibold">
              {mutiraonLoading ? 'Loading...' : formatBalance(mutiraonBalance as bigint | undefined, 18)} Amaz-One Dollar
            </p>
            {mutiraonError && <p className="text-xs text-red-600">Error: {mutiraonError.message}</p>}
          </div>
        </div>

        {/* Vault Status & Health */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
          <h4 className="font-semibold mb-3 text-indigo-800">Ã°Å¸Ââ€ºÃ¯Â¸Â Vault Status</h4>
          {urnRaw ? (
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-gray-600 mb-1">{t('vault.status.locked')}</p>
                <p className="font-bold text-lg text-indigo-700">
                  {(() => {
                    const v = BigInt((urnRaw as any)?.[0]?.toString() ?? '0');
                    return formatBalance(v, 18);
                  })()} {currentCollateralInfo.symbol}
                </p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-gray-600 mb-1">{t('vault.status.debt')}</p>
                <p className="font-bold text-lg text-purple-700">
                  {(() => {
                    const v = BigInt((urnRaw as any)?.[1]?.toString() ?? '0');
                    return formatBalance(v, 18);
                  })()} Amaz-One Dollar
                </p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-gray-600 mb-1">{t('vault.status.avail')}</p>
                <p className="font-bold text-lg text-green-700">
                  {formatBalance(collateralBalance as bigint | undefined, 18)} {currentCollateralInfo.symbol}
                </p>
                <p className="text-xs text-gray-500">{t('vault.status.ready')}</p>
              </div>
              <div className="bg-white/60 p-3 rounded-lg">
                <p className="text-gray-600 mb-1">{t('vault.status.maxsafe')}</p>
                <p className="font-bold text-lg text-orange-700">
                  {calculateMaxSafeMint()} Amaz-One Dollar
                </p>
                <p className="text-xs text-gray-500">Ã¢Å¡Â Ã¯Â¸Â Contract enforces strict limits</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-600">No active vault found</p>
          <p className="text-sm text-gray-500">{t('vault.help.steps')}</p>
            </div>
          )}
        </div>

        {/* Vault Management Sections */}
        
        {/* 1. Deposit Collateral */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h4 className="font-semibold mb-3 text-green-800">Ã°Å¸â€™Â° {t('vault.dep.title').replace('{code}', currentCollateralInfo.symbol)}</h4>
          <p className="text-sm text-green-700 mb-3">{t('vault.dep.what')}</p>
          
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder={t('vault.dep.amount').replace('{code}', currentCollateralInfo.symbol)}
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleApprove}
                disabled={isApproving || !depositAmount}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {isApproving ? t('vault.loading.approving') : t('vault.dep.approve')}
              </button>
              <button
                onClick={handleDeposit}
                disabled={isDepositing || !depositAmount}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {isDepositing ? t('vault.loading.depositing') : t('vault.dep.deposit')}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Lock/Unlock Collateral */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold mb-3 text-blue-800">Ã°Å¸â€â€™ {t('vault.lock.title')}</h4>
          <p className="text-sm text-blue-700 mb-3">{t('vault.lock.what')}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">{t('vault.lock.label')}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t('vault.lock.placeholder')}
                  value={lockAmount}
                  onChange={(e) => setLockAmount(e.target.value)}
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleLock}
                  disabled={isLocking || !lockAmount}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isLocking ? t('vault.loading.locking') : t('vault.lock.btn')}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">{t('vault.unlock.label')}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t('vault.unlock.placeholder')}
                  value={unlockAmount}
                  onChange={(e) => setUnlockAmount(e.target.value)}
                  className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleUnlock}
                  disabled={isUnlocking || !unlockAmount}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {isUnlocking ? t('vault.loading.unlocking') : t('vault.unlock.btn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Mint/Repay Stablecoin */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h4 className="font-semibold mb-3 text-purple-800">Ã°Å¸â€™Âµ {t('vault.mut.title')}</h4>
          <p className="text-sm text-purple-700 mb-3">{t('vault.mut.what')}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">{t('vault.mut.mint.label')}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t('vault.mut.mint.maxsafe').replace('{amt}', calculateMaxSafeMint())}
                  value={mintAmount}
                  onChange={(e) => setMintAmount(e.target.value)}
                  className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleMint}
                  disabled={isMinting || !mintAmount}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
                >
                  {isMinting ? t('vault.loading.minting') : t('vault.mut.mint.btn')}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">{t('vault.mut.repay.label')}</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder={t('vault.mut.repay.placeholder')}
                  value={repayAmount}
                  onChange={(e) => setRepayAmount(e.target.value)}
                  className="flex-1 px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleRepay}
                  disabled={isRepaying || !repayAmount}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
                >
                  {isRepaying ? t('vault.loading.repaying') : t('vault.mut.repay.btn')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Withdraw Collateral */}
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h4 className="font-semibold mb-3 text-orange-800">Ã¢â€ Â©Ã¯Â¸Â {t('vault.wd.title')}</h4>
          <p className="text-sm text-orange-700 mb-3">{t('vault.wd.brief').replace('{code}', currentCollateralInfo.symbol)}</p>
          
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={t('vault.wd.available').replace('{amt}', formatBalance(collateralBalance as bigint | undefined, 18)).replace('{code}', currentCollateralInfo.symbol)}
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              className="flex-1 px-3 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={handleWithdrawCollateral}
              disabled={isWithdrawing || !withdrawAmount}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
            >
              {isWithdrawing ? t('vault.loading.withdrawing') : t('vault.wd.btn')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CollateralSelection;




