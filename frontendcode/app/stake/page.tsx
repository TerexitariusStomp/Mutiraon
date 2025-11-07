"use client";

import { CONTRACTS } from "@/lib/contracts";
import { usePot } from "@src/hooks/usePot";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/i18n/I18nContext";

import { toast } from 'sonner'
import { waitForTxConfirmation } from "@src/lib/utils";
export default function StakePage() {
  const { t, lang } = useI18n();
  const {
    userBalance,
    walletBalance,
    savingsRate,
    totalPie,
    withdrawSavings,
    approveDaiJoin,
    joinStablecoinToVat,
    authorizePot,
    depositToPot,
    updateRates,
    isPending,
    isSuccess,
    refetchData,
  } = usePot();
  const { address } = useAccount();
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleWithdraw = async () => {
    if (!withdrawAmount) return;
    console.log("Withdraw button clicked with amount:", withdrawAmount);

    // Check if user is connected to wallet
    if (!address) {
      alert("Please connect your wallet first before withdrawing.");
      return;
    }

    try {
      console.log("Calling withdrawSavings...");
      const hash = await withdrawSavings(withdrawAmount);
      if (hash) {
        toast.message(lang === 'pt' ? 'TransaAA�o enviada' : 'Transaction submitted', { description: hash });
        await waitForTxConfirmation(hash);
        console.log("Withdraw confirmed on-chain");
        toast.success(`${t('stake.withdraw')}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
        setWithdrawAmount("");
      }
    } catch (error) {
      console.error("Withdraw failed:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Withdraw failed: ${errorMessage}`);
    }
  };

  const handleStepClick = async (
    stepIndex: number,
    stepFunction: () => Promise<any>,
  ) => {
    if (isPending) return;

    try {
      setCurrentStep(stepIndex);
      const hash = await stepFunction();
      if (hash) {
        toast.message(lang === 'pt' ? 'TransaAA�o enviada' : 'Transaction submitted', { description: hash as string });
        await waitForTxConfirmation(hash as string);
      }
      setCompletedSteps((prev) => new Set([...prev, stepIndex]));
      setCurrentStep(-1); // Reset current step
      // Show success message
      const stepTitles = [
        t('stake.steps.update.title'),
        t('stake.steps.approve.title'),
        t('stake.steps.join.title'),
        t('stake.steps.auth.title'),
        t('stake.steps.deposit.title'),
      ];
      toast.success(`${stepTitles[stepIndex]}: ${lang === 'pt' ? 'ConcluA-do com sucesso' : 'Completed successfully'}`);
      // Refetch all data after each successful step
      setTimeout(() => refetchData(), 2000);
    } catch (error) {
      console.error(`Step ${stepIndex + 1} failed:`, error);
      setCurrentStep(-1);
      // Show error message
      const stepTitles = [
        t('stake.steps.update.title'),
        t('stake.steps.approve.title'),
        t('stake.steps.join.title'),
        t('stake.steps.auth.title'),
        t('stake.steps.deposit.title'),
      ];
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`${stepTitles[stepIndex]}: ${lang === 'pt' ? 'Falhou' : 'Failed'} - ${errorMessage}`);
    }
  };

  return (
    <main className="min-h-[60vh] bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">{t('stake.title')}</h1>
            <p className="text-lg text-muted-foreground">{t('stake.subtitle')}</p>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('stake.balance')}</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">{userBalance.data}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  {t('stake.savingsRate')}: <span className="text-emerald-600 font-medium">{savingsRate.data}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('stake.wallet')}</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">{walletBalance.data}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  {t('stake.savingsRate')}: <span className="text-emerald-600 font-medium">{savingsRate.data}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('stake.totalPie')}</CardTitle>
                <CardDescription className="text-2xl font-bold text-foreground">{totalPie.data}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm text-muted-foreground">
                  {t('stake.savingsRate')}: <span className="text-emerald-600 font-medium">{savingsRate.data}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Transaction Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('stake.steps.title')}</CardTitle>
                <CardDescription>{t('stake.steps.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[{
                    title: t('stake.steps.update.title'),
                    desc: t('stake.steps.update.desc'),
                    action: updateRates,
                    color: "from-emerald-100 to-emerald-200",
                  }, {
                    title: t('stake.steps.approve.title'),
                    desc: t('stake.steps.approve.desc'),
                    action: approveDaiJoin,
                    color: "from-purple-100 to-purple-200",
                  }, {
                    title: t('stake.steps.join.title'),
                    desc: t('stake.steps.join.desc'),
                    action: joinStablecoinToVat,
                    color: "from-blue-100 to-blue-200",
                  }, {
                    title: t('stake.steps.auth.title'),
                    desc: t('stake.steps.auth.desc'),
                    action: authorizePot,
                    color: "from-orange-100 to-orange-200",
                  }, {
                    title: t('stake.steps.deposit.title'),
                    desc: t('stake.steps.deposit.desc'),
                    action: async () => {
                      if (!depositAmount) return;
                      const hash = await depositToPot(depositAmount);
                      return hash;
                    },
                    color: "from-rose-100 to-rose-200",
                  }].map((step, index) => (
                    <div key={index} className={`p-3 rounded-xl bg-gradient-to-br ${step.color}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-foreground">{step.title}</div>
                          <div className="text-xs text-muted-foreground">{step.desc}</div>
                        </div>
                        <div className="flex gap-3 items-center">
                          {completedSteps.has(index) && (
                            <Badge className="bg-emerald-600 hover:bg-emerald-700">{t('stake.completed')}</Badge>
                          )}
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={isPending || (!!depositAmount === false && index === 4)}
                            onClick={() => handleStepClick(index, step.action)}
                          >
                            {currentStep === index ? t('stake.processing') : t('stake.execute')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{t('stake.deposit.title')}</CardTitle>
                <CardDescription>{t('stake.deposit.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">{t('stake.amount')}</label>
                    <Input
                      type="text"
                      placeholder={t('stake.deposit.placeholder')}
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      className="flex-1"
                      variant="secondary"
                      disabled={isPending || !depositAmount}
                      onClick={() => handleStepClick(4, async () => {
                        const hash = await depositToPot(depositAmount);
                        return hash;
                      })}
                    >
                      {t('stake.deposit.submit')}
                    </Button>
                    <Button
                      className="flex-1"
                      variant="outline"
                      disabled={isPending}
                      onClick={() => setDepositAmount("")}
                    >
                      {t('stake.clear')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* Withdraw Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('stake.withdraw.title')}</CardTitle>
              <CardDescription>{t('stake.withdraw.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">{t('stake.amount')}</label>
                  <Input
                    type="text"
                    placeholder={t('stake.withdraw.placeholder')}
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    variant="destructive"
                    disabled={isPending || !withdrawAmount}
                    onClick={handleWithdraw}
                  >
                    {t('stake.withdraw.submit')}
                  </Button>
                  <Button
                    className="flex-1"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => setWithdrawAmount("")}
                  >
                    {t('stake.clear')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
