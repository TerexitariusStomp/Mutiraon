"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { useStablecoin } from "@/src/hooks/useStablecoin";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner'
import { waitForTxConfirmation } from "../../lib/utils";
import { ILK_CBiomaH } from "@/src/lib/contracts-updated";

export default function VaultsPage() {
  const { t, lang } = useI18n();
  const [selectedCollateral, setSelectedCollateral] = useState("CBiomaH");
  const { address } = useAccount();
  const {
    ink,
    art,
    depositCollateral,
    approveToken,
    authorizeVat,
    lockCollateral,
    unlockCollateral,
    generateStablecoin,
    generateAndSendStablecoin,
    withdrawStablecoin,
    repayStablecoin,
    withdrawCollateral,
    isPending,
    isSuccess,
    refetchData,
  } = useStablecoin(selectedCollateral as 'CBiomaH');
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [unlockAmount, setUnlockAmount] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const icons: Record<string, string> = {
    CBiomaH: "dYO3",
  };

  const collaterals = [
    { code: "CBiomaH" },
  ];

  const handleDepositApprove = async () => {
    if (!depositAmount) return;
    console.log("Deposit Approve button clicked with amount:", depositAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before depositing.");
      return;
    }

    try {
      console.log("Calling approveToken...");
      const hash = await approveToken(depositAmount, selectedCollateral as 'CBiomaH');
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Approve confirmed on-chain");
      toast.success(`Approve ${selectedCollateral}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
    } catch (error) {
      console.error("Approve failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Approve failed: ${errorMessage}`);
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount) return;
    console.log("Deposit button clicked with amount:", depositAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before depositing.");
      return;
    }

    try {
      console.log("Calling depositCollateral...");
      const hash = await depositCollateral(depositAmount, selectedCollateral as 'CBiomaH');
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Deposit confirmed on-chain");
      toast.success(`Deposit ${selectedCollateral}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setDepositAmount("");
    } catch (error) {
      console.error("Deposit failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Deposit failed: ${errorMessage}`);
    }
  };

  const handleLock = async () => {
    if (!lockAmount) return;
    console.log("Lock button clicked with amount:", lockAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before locking.");
      return;
    }

    try {
      console.log("Calling lockCollateral...");
      const hash = await lockCollateral(lockAmount, ILK_CBiomaH) as any;
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Lock confirmed on-chain");
      toast.success(`Lock ${selectedCollateral}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setLockAmount("");
    } catch (error) {
      console.error("Lock failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Lock failed: ${errorMessage}`);
    }
  };

  const handleUnlock = async () => {
    if (!unlockAmount) return;
    console.log("Unlock button clicked with amount:", unlockAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before unlocking.");
      return;
    }

    try {
      console.log("Calling unlockCollateral...");
      const hash = await unlockCollateral(unlockAmount, ILK_CBiomaH) as any;
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Unlock confirmed on-chain");
      toast.success(`Unlock ${selectedCollateral}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setUnlockAmount("");
    } catch (error) {
      console.error("Unlock failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Unlock failed: ${errorMessage}`);
    }
  };

  const handleMint = async () => {
    if (!mintAmount) return;
    console.log("Mint button clicked with amount:", mintAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before minting.");
      return;
    }

    try {
      console.log("Calling generateAndSendStablecoin...");
      const hash = await generateAndSendStablecoin(mintAmount, ILK_CBiomaH, address) as any;
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Mint confirmed on-chain");
      toast.success(`Mint ONEDOLLAR: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setMintAmount("");
    } catch (error) {
      console.error("Mint failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Mint failed: ${errorMessage}`);
    }
  };

  const handleRepay = async () => {
    if (!repayAmount) return;
    console.log("Repay button clicked with amount:", repayAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before repaying.");
      return;
    }

    try {
      console.log("Calling repayStablecoin...");
      const hash = await repayStablecoin(repayAmount, ILK_CBiomaH) as any;
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Repay confirmed on-chain");
      toast.success(`Repay ONEDOLLAR: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setRepayAmount("");
    } catch (error) {
      console.error("Repay failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Repay failed: ${errorMessage}`);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    console.log("Withdraw button clicked with amount:", withdrawAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before withdrawing.");
      return;
    }

    try {
      console.log("Calling withdrawCollateral...");
      const hash = await withdrawCollateral(withdrawAmount, selectedCollateral as 'CBiomaH');
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Withdraw confirmed on-chain");
      toast.success(`Withdraw ${selectedCollateral}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setWithdrawAmount("");
    } catch (error) {
      console.error("Withdraw failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Withdraw failed: ${errorMessage}`);
    }
  };

  return (
    <div className="container mx-auto min-h-[70vh] px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{t('vaults.title')}</h1>
          <p className="mt-2 text-muted-foreground">{t('vaults.subtitle')}</p>
        </header>

        {/* Collateral Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {collaterals.map((collateral) => (
              <button
                key={collateral.code}
                onClick={() => setSelectedCollateral(collateral.code)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCollateral === collateral.code
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {collateral.code}
              </button>
            ))}
          </div>
        </div>

        {/* Vault Management Interface */}
        <div className="space-y-6">
          {/* Collateral Header */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6f4ec] text-2xl">
                {icons[selectedCollateral]}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {t('vaults.header')
                    .replace('{name}', t(`coll.${selectedCollateral}.name`))
                    .replace('{code}', selectedCollateral)}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t(`coll.${selectedCollateral}.desc`)}
                </p>
              </div>
            </div>
          </div>

          {/* Balances Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('vault.bal.wallet').replace('{code}', selectedCollateral)}</h3>
              <p className="text-2xl font-bold text-foreground">0.00 {selectedCollateral}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('vault.bal.deposited').replace('{code}', selectedCollateral)}</h3>
              <p className="text-2xl font-bold text-foreground">{parseFloat(ink).toFixed(4)} {selectedCollateral}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('vault.bal.available')}</h3>
              <p className="text-2xl font-bold text-foreground">0.00 {selectedCollateral}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <h3 className="font-semibold text-foreground mb-2">{t('vault.bal.mut')}</h3>
              <p className="text-2xl font-bold text-foreground">{parseFloat(art).toFixed(4)} Amaz-One Dollar</p>
            </div>
          </div>

          {/* Vault Status */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">🏛️ {t('vault.status.title')}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">{t('vault.status.locked')}</p>
                <p className="text-xl font-semibold text-foreground">{parseFloat(ink).toFixed(4)} {selectedCollateral}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('vault.status.debt')}</p>
                <p className="text-xl font-semibold text-foreground">{parseFloat(art).toFixed(4)} Amaz-One Dollar</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('vault.status.avail')}</p>
                <p className="text-xl font-semibold text-foreground">0.00 {selectedCollateral}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('vault.status.ready')}</p>
                <p className="text-xl font-semibold text-foreground">0.00 {selectedCollateral}</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-800">{t('vault.status.maxsafe')}: 0 Amaz-One Dollar</p>
              <p className="text-xs text-amber-600 mt-1">{t('vault.status.strict')}</p>
            </div>
          </div>

          {/* Deposit Section */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">💰 {t('vault.dep.title').replace('{code}', selectedCollateral)}</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">{t('vault.dep.step').replace('{code}', selectedCollateral)}</h4>
              <p className="text-sm text-blue-800 mb-3">{t('vault.dep.what')}</p>
              <ul className="text-sm text-blue-800 space-y-1 ml-4">
                <li>• {t('vault.dep.li1').replace('{code}', selectedCollateral)}</li>
                <li>• {t('vault.dep.li2')}</li>
                <li>• {t('vault.dep.li3')}</li>
                <li>• {t('vault.dep.li4')}</li>
              </ul>
              <p className="text-xs text-blue-700 mt-2 italic">{t('vault.dep.think')}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('vault.dep.amount').replace('{code}', selectedCollateral)}</label>
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleDepositApprove} disabled={isPending || !depositAmount} className="flex-1">{t('vault.dep.approve')}</Button>
                <Button onClick={handleDeposit} disabled={isPending || !depositAmount} className="flex-1">{t('vault.dep.deposit')}</Button>
              </div>
            </div>
          </div>

          {/* Manage Locked Collateral */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">🔒 {t('vault.lock.title')}</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-900 mb-2">{t('vault.lock.step')}</h4>
              <p className="text-sm text-green-800 mb-3">{t('vault.lock.what')}</p>
              <ul className="text-sm text-green-800 space-y-1 ml-4">
                <li>• {t('vault.lock.li1')}</li>
                <li>• {t('vault.lock.li2')}</li>
                <li>• {t('vault.lock.li3')}</li>
                <li>• {t('vault.lock.li4')}</li>
              </ul>
              <p className="text-xs text-green-700 mt-2 italic">{t('vault.lock.think')}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('vault.lock.label')}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={lockAmount}
                    onChange={(e) => setLockAmount(e.target.value)}
                    className="flex-1"
                    placeholder={t('vault.lock.placeholder')}
                  />
                  <Button onClick={handleLock} disabled={isPending || !lockAmount} className="px-4">{t('vault.lock.btn')}</Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('vault.unlock.label')}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={unlockAmount}
                    onChange={(e) => setUnlockAmount(e.target.value)}
                    className="flex-1"
                    placeholder={t('vault.unlock.placeholder')}
                  />
                  <Button onClick={handleUnlock} disabled={isPending || !unlockAmount} variant="outline" className="px-4">{t('vault.unlock.btn')}</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Amaz-One Dollar */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">💵 {t('vault.mut.title')}</h3>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-purple-900 mb-2">{t('vault.mut.step')}</h4>
              <p className="text-sm text-purple-800 mb-3">{t('vault.mut.what')}</p>
              <ul className="text-sm text-purple-800 space-y-1 ml-4">
                <li>• {t('vault.mut.li1')}</li>
                <li>• {t('vault.mut.li2')}</li>
                <li>• {t('vault.mut.li3')}</li>
                <li>• {t('vault.mut.li4')}</li>
              </ul>
              <p className="text-xs text-purple-700 mt-2 italic">{t('vault.mut.important').replace('{code}', selectedCollateral)}</p>
              <p className="text-xs text-purple-700 italic">{t('vault.mut.think')}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('vault.mut.mint.label')}</label>
                <p className="text-xs text-muted-foreground mb-2">{t('vault.mut.mint.maxsafe').replace('{amt}', '0')}</p>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={mintAmount}
                    onChange={(e) => setMintAmount(e.target.value)}
                    className="flex-1"
                    placeholder={t('vault.mut.mint.placeholder')}
                  />
                  <Button onClick={handleMint} disabled={isPending || !mintAmount} className="px-4">{t('vault.mut.mint.btn')}</Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('vault.mut.repay.label')}</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={repayAmount}
                    onChange={(e) => setRepayAmount(e.target.value)}
                    className="flex-1"
                    placeholder={t('vault.mut.repay.placeholder')}
                  />
                  <Button onClick={handleRepay} disabled={isPending || !repayAmount} variant="outline" className="px-4">{t('vault.mut.repay.btn')}</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Withdraw Collateral */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">↩️ {t('vault.wd.title')}</h3>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-orange-900 mb-2">{t('vault.wd.step')}</h4>
              <p className="text-sm text-orange-800 mb-3">{t('vault.wd.what').replace('{code}', selectedCollateral)}</p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-orange-900">{t('vault.wd.unlock.title')}</p>
                  <ul className="text-sm text-orange-800 space-y-1 ml-4">
                    <li>• {t('vault.wd.unlock.li1')}</li>
                    <li>• {t('vault.wd.unlock.li2')}</li>
                    <li>• {t('vault.wd.unlock.li3')}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-900">{t('vault.wd.withdraw.title')}</p>
                  <ul className="text-sm text-orange-800 space-y-1 ml-4">
                    <li>• {t('vault.wd.withdraw.li1')}</li>
                    <li>• {t('vault.wd.withdraw.li2')}</li>
                    <li>• {t('vault.wd.withdraw.li3')}</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-orange-700 mt-2 italic">{t('vault.wd.think')}</p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">{t('vault.wd.available').replace('{amt}', '0.00').replace('{code}', selectedCollateral)}</p>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">{t('vault.wd.only')}</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="flex-1"
                  placeholder={t('vault.wd.placeholder')}
                />
                <Button onClick={handleWithdraw} disabled={isPending || !withdrawAmount} variant="outline" className="px-4">{t('vault.wd.btn')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


