"use client";

import { useState } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { useStablecoin } from "@src/hooks/useStablecoin";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { waitForTxConfirmation } from "@src/lib/utils";
import { ILK_CBiomaH } from "@src/lib/contracts-updated";

export default function VaultsPage() {
  const { t, lang } = useI18n();
  const [selectedCollateral] = useState("CBiomaH");
  const { address } = useAccount();

  const {
    ink,
    art,
    gem,
    depositCollateral,
    approveToken,
    authorizeVat,
    lockCollateral,
    unlockCollateral,
    generateStablecoin,
    withdrawStablecoin,
    repayStablecoin,
    withdrawCollateral,
    isPending,
    refetchData,
  } = useStablecoin(selectedCollateral as "CBiomaH");

  const [depositAmount, setDepositAmount] = useState("");
  const [lockAmount, setLockAmount] = useState("");
  const [unlockAmount, setUnlockAmount] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [repayAmount, setRepayAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const requireWallet = () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return false;
    }
    return true;
  };

  const doApprove = async () => {
    if (!requireWallet() || !depositAmount) return;
    const hash = await approveToken(depositAmount, selectedCollateral as "CBiomaH");
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Approve OK");
  };

  const doDeposit = async () => {
    if (!requireWallet() || !depositAmount) return;
    const hash = await depositCollateral(depositAmount, selectedCollateral as "CBiomaH");
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Deposit OK");
    setDepositAmount("");
    setTimeout(refetchData, 1500);
  };

  const doAuthorizeVat = async () => {
    if (!requireWallet()) return;
    const hash = await authorizeVat();
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Authorize OK");
  };

  const doLock = async () => {
    if (!requireWallet() || !lockAmount) return;
    const hash = await lockCollateral(lockAmount, ILK_CBiomaH);
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Lock OK");
    setLockAmount("");
    setTimeout(refetchData, 1500);
  };

  const doUnlock = async () => {
    if (!requireWallet() || !unlockAmount) return;
    const hash = await unlockCollateral(unlockAmount, ILK_CBiomaH);
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Unlock OK");
    setUnlockAmount("");
    setTimeout(refetchData, 1500);
  };

  const doMint = async () => {
    if (!requireWallet() || !mintAmount) return;
    const hash = await generateStablecoin(mintAmount, ILK_CBiomaH);
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Mint OK");
    setMintAmount("");
    setTimeout(refetchData, 1500);
  };

  const doRepay = async () => {
    if (!requireWallet() || !repayAmount) return;
    const hash = await repayStablecoin(repayAmount, ILK_CBiomaH);
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash });
    await waitForTxConfirmation(hash);
    toast.success("Repay OK");
    setRepayAmount("");
    setTimeout(refetchData, 1500);
  };

  const doWithdrawStable = async () => {
    if (!requireWallet() || !withdrawAmount) return;
    const hash = await withdrawStablecoin(withdrawAmount, ILK_CBiomaH as any);
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash as string });
    await waitForTxConfirmation(hash as string);
    toast.success("Withdraw stable OK");
    setWithdrawAmount("");
    setTimeout(refetchData, 1500);
  };

  const doWithdrawCollateral = async () => {
    if (!requireWallet() || !withdrawAmount) return;
    const hash = await withdrawCollateral(withdrawAmount, selectedCollateral as "CBiomaH");
    toast.message(lang === "pt" ? "Transação enviada" : "Transaction submitted", { description: hash as string });
    await waitForTxConfirmation(hash as string);
    toast.success("Withdraw collateral OK");
    setWithdrawAmount("");
    setTimeout(refetchData, 1500);
  };

  return (
    <main className="min-h-[60vh] bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {lang === 'pt'
            ? 'As confirmações on‑chain podem levar algum tempo. Se os saldos não atualizarem imediatamente após uma transação, use o botão de atualizar abaixo.'
            : 'On‑chain confirmations can take time. If balances do not update immediately after a transaction, use the refresh button below.'}
          <div className="mt-2">
            <Button size="sm" variant="outline" onClick={() => refetchData()} disabled={isPending}>
              {lang === 'pt' ? 'Atualizar' : 'Refresh'}
            </Button>
          </div>
        </div>
        <header className="text-center">
          <h1 className="text-3xl font-bold text-foreground">{t("vaults.title")}</h1>
          <p className="text-muted-foreground">{t("vaults.header")}</p>
        </header>

        {/* Balances */}
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-1">{t('vault.bal.deposited').replace('{code}', selectedCollateral)}</h3>
            <p className="text-2xl font-bold">{parseFloat(gem).toFixed(4)} {selectedCollateral}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-1">{t('vault.status.locked')}</h3>
            <p className="text-2xl font-bold">{parseFloat(ink).toFixed(4)} {selectedCollateral}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-1">{t('vault.status.debt')}</h3>
            <p className="text-2xl font-bold">{parseFloat(art).toFixed(4)} Amaz-One Dollar</p>
          </div>
        </section>

        {/* Actions */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Deposit */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-semibold">{t('vault.dep.title').replace('{code}', selectedCollateral)}</h3>
            <label className="text-sm text-muted-foreground">{t('vault.dep.amount').replace('{code}', selectedCollateral)}</label>
            <Input value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} placeholder="0.00" />
            <div className="flex gap-2">
              <Button onClick={doApprove} disabled={isPending || !depositAmount}>{t('vault.dep.approve')}</Button>
              <Button onClick={doDeposit} disabled={isPending || !depositAmount} variant="secondary">{t('vault.dep.deposit')}</Button>
            </div>
          </div>

          {/* Lock / Unlock */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-semibold">{t('vault.lock.title')}</h3>
            <label className="text-sm text-muted-foreground">{t('vault.lock.label')}</label>
            <div className="flex gap-2">
              <Input value={lockAmount} onChange={(e) => setLockAmount(e.target.value)} placeholder={t('vault.lock.placeholder')} />
              <Button onClick={doLock} disabled={isPending || !lockAmount}>{t('vault.lock.btn')}</Button>
            </div>
            <label className="text-sm text-muted-foreground">{t('vault.unlock.label')}</label>
            <div className="flex gap-2">
              <Input value={unlockAmount} onChange={(e) => setUnlockAmount(e.target.value)} placeholder={t('vault.unlock.placeholder')} />
              <Button onClick={doUnlock} disabled={isPending || !unlockAmount} variant="outline">{t('vault.unlock.btn')}</Button>
            </div>
          </div>

          {/* Mint / Repay */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-semibold">{t('vault.mut.title')}</h3>
            <label className="text-sm text-muted-foreground">{t('vault.mut.mint.label')}</label>
            <div className="flex gap-2">
              <Input value={mintAmount} onChange={(e) => setMintAmount(e.target.value)} placeholder={t('vault.mut.mint.placeholder')} />
              <Button onClick={doMint} disabled={isPending || !mintAmount}>{t('vault.mut.mint.btn')}</Button>
            </div>
            <label className="text-sm text-muted-foreground">{t('vault.mut.repay.label')}</label>
            <div className="flex gap-2">
              <Input value={repayAmount} onChange={(e) => setRepayAmount(e.target.value)} placeholder={t('vault.mut.repay.placeholder')} />
              <Button onClick={doRepay} disabled={isPending || !repayAmount} variant="outline">{t('vault.mut.repay.btn')}</Button>
            </div>
          </div>

          {/* Withdraw */}
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <h3 className="text-lg font-semibold">{t('vault.wd.title')}</h3>
            <label className="text-sm text-muted-foreground">{t('vault.wd.only')}</label>
            <div className="flex gap-2">
              <Input value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} placeholder={t('vault.wd.placeholder')} />
              <Button onClick={doWithdrawStable} disabled={isPending || !withdrawAmount} variant="secondary">{t('vault.withdrawStable.submit') || 'Withdraw Stable'}</Button>
              <Button onClick={doWithdrawCollateral} disabled={isPending || !withdrawAmount} variant="outline">{t('vault.wd.btn')}</Button>
            </div>
          </div>
        </section>

        {/* Authorize */}
        <section className="rounded-2xl border border-border bg-card p-6">
          <h3 className="text-lg font-semibold">{t('vault.status.title')}</h3>
          <p className="text-sm text-muted-foreground mb-2">{t('vault.status.strict')}</p>
          <Button onClick={doAuthorizeVat} disabled={isPending}>{t('stake.steps.auth.title')}</Button>
          <p className="mt-2 text-xs text-muted-foreground">
            {lang === 'pt'
              ? 'Se ocorrer erro de underflow/overflow ao travar, verifique o valor disponível para travar e tente um valor menor. Há limites estritos de segurança.'
              : 'If an underflow/overflow error occurs when locking, check the available amount to lock and try a lower value. Strict safety limits apply.'}
          </p>
        </section>
      </div>
    </main>
  );
}
