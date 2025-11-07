"use client";

import { CONTRACTS } from "@/lib/contracts";
import { usePot } from "@/hooks/usePot";
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
import { waitForTxConfirmation } from "../../lib/utils";
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
      toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
      await waitForTxConfirmation(hash as string);
      console.log("Withdraw confirmed on-chain");
      toast.success(`${t('stake.withdraw')}: ${lang === 'pt' ? 'Confirmado em blockchain' : 'Confirmed on-chain'}`);
      setWithdrawAmount("");
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
        toast.message(lang === 'pt' ? 'Transação enviada' : 'Transaction submitted', { description: hash as string });
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
      toast.success(`${stepTitles[stepIndex]}: ${lang === 'pt' ? 'Concluído com sucesso' : 'Completed successfully'}`);
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
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {parseFloat(userBalance).toFixed(4)} ONEDOLLAR
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('stake.rate')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {savingsRate}% APY
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t('stake.wallet')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {parseFloat(walletBalance).toFixed(4)} ONEDOLLAR
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deposit/Withdraw Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Deposit Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">{t('stake.deposit')} <Badge variant="secondary">{t('stake.rate')}: {savingsRate}%</Badge></CardTitle>
                <CardDescription>{t('stake.deposit.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('stake.amount')}</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t('stake.available')}: {parseFloat(walletBalance).toFixed(4)} ONEDOLLAR</p>
                </div>
                <div className="text-sm text-muted-foreground">{t('stake.exec.steps')}</div>
              </CardContent>
            </Card>

            {/* Withdraw Card */}
            <Card>
              <CardHeader>
                <CardTitle>{t('stake.withdraw')}</CardTitle>
                <CardDescription>{t('stake.withdraw.desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{t('stake.amount')}</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t('stake.available')}: {parseFloat(userBalance).toFixed(4)} ONEDOLLAR</p>
                </div>
                <Button
                  onClick={handleWithdraw}
                  disabled={isPending || !withdrawAmount}
                  variant="outline"
                  className="w-full"
                >
                  {isPending ? t('stake.withdrawing') : t('stake.withdraw')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Step-by-Step Deposit Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{t('stake.process.title')} <Badge variant="outline">{t('stake.process.mode')}</Badge></CardTitle>
              <CardDescription>
                {t('stake.exec.steps')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: t('stake.steps.update.title'),
                    description: t('stake.steps.update.desc'),
                    function: () => updateRates(),
                    icon: "💧",
                  },
                  {
                    title: t('stake.steps.approve.title'),
                    description: depositAmount
                      ? t('stake.steps.approve.desc.some').replace('{amount}', depositAmount)
                      : t('stake.steps.approve.desc.none'),
                    function: () => approveDaiJoin(depositAmount || "0"),
                    icon: "🔓",
                  },
                  {
                    title: t('stake.steps.join.title'),
                    description: depositAmount
                      ? t('stake.steps.join.desc.some').replace('{amount}', depositAmount)
                      : t('stake.steps.join.desc.none'),
                    function: () => joinStablecoinToVat(depositAmount || "0"),
                    icon: "🏦",
                  },
                  {
                    title: t('stake.steps.auth.title'),
                    description: t('stake.steps.auth.desc'),
                    function: () => authorizePot(),
                    icon: "🔑",
                  },
                  {
                    title: t('stake.steps.deposit.title'),
                    description: depositAmount
                      ? t('stake.steps.deposit.desc.some').replace('{amount}', depositAmount)
                      : t('stake.steps.deposit.desc.none'),
                    function: () => depositToPot(depositAmount || "0"),
                    icon: "💰",
                  },
                ].map((step, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-50 border-b border-gray-200 p-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`text-xl ${completedSteps.has(index) ? "text-green-500" : currentStep === index ? "text-blue-500 animate-pulse" : "text-gray-400"}`}
                        >
                          {completedSteps.has(index) ? "✅" : step.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{t('stake.step')} {index + 1}: {step.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className={`p-3 rounded-lg mb-3 ${
                        index === 0 ? "bg-blue-50 border border-blue-200" :
                        index === 1 ? "bg-green-50 border border-green-200" :
                        index === 2 ? "bg-purple-50 border border-purple-200" :
                        index === 3 ? "bg-orange-50 border border-orange-200" :
                        "bg-red-50 border border-red-200"
                      }`}>
                        <p className={`text-sm font-medium mb-2 ${
                          index === 0 ? "text-blue-900" :
                          index === 1 ? "text-green-900" :
                          index === 2 ? "text-purple-900" :
                          index === 3 ? "text-orange-900" :
                          "text-red-900"
                        }`}>
                          {t('stake.step.what')}: {step.title}
                        </p>
                        <ul className={`text-sm space-y-1 ml-4 ${
                          index === 0 ? "text-blue-800" :
                          index === 1 ? "text-green-800" :
                          index === 2 ? "text-purple-800" :
                          index === 3 ? "text-orange-800" :
                          "text-red-800"
                        }`}>
                          {index === 0 && (
                            <>
                              <li>� {t('stake.bullets.0.1')}</li>
                              <li>� {t('stake.bullets.0.2')}</li>
                              <li>� {t('stake.bullets.0.3')}</li>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <li>� {t('stake.bullets.1.1')}</li>
                              <li>� {t('stake.bullets.1.2')}</li>
                              <li>� {t('stake.bullets.1.3')}</li>
                              <li>� {t('stake.bullets.1.4')}</li>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <li>� {t('stake.bullets.2.1')}</li>
                              <li>� {t('stake.bullets.2.2')}</li>
                              <li>� {t('stake.bullets.2.3')}</li>
                              <li>� {t('stake.bullets.2.4')}</li>
                            </>
                          )}
                          {index === 3 && (
                            <>
                              <li>� {t('stake.bullets.3.1')}</li>
                              <li>� {t('stake.bullets.3.2')}</li>
                              <li>� {t('stake.bullets.3.3')}</li>
                            </>
                          )}
                          {index === 4 && (
                            <>
                              <li>� {t('stake.bullets.4.1')}</li>
                              <li>� {t('stake.bullets.4.2')}</li>
                              <li>� {t('stake.bullets.4.3')}</li>
                            </>
                          )}
                        </ul>
                        <p className={`text-xs mt-2 italic ${
                          index === 0 ? "text-blue-700" :
                          index === 1 ? "text-green-700" :
                          index === 2 ? "text-purple-700" :
                          index === 3 ? "text-orange-700" :
                          "text-red-700"
                        }`}>
                          {index === 0 && (lang === 'pt' ? "Pense assim: Preparar sua conta para um dep�sito." : "Think of it like: Preparing your account for a deposit.")}
                          {index === 1 && (lang === 'pt' ? "Pense assim: Dar permiss�o para uma transfer�ncia autom�tica." : "Think of it like: Giving permission for an automatic transfer.")}
                          {index === 2 && (lang === 'pt' ? "Pense assim: Converter dinheiro para um formato especial de poupan�a." : "Think of it like: Converting cash to a special savings format.")}
                          {index === 3 && (lang === 'pt' ? "Pense assim: Assinar um contrato para manter seu dinheiro em seguran�a." : "Think of it like: Signing a contract to hold your money safely.")}
                          {index === 4 && (lang === 'pt' ? "Pense assim: Finalmente depositar dinheiro na sua conta poupan�a." : "Think of it like: Finally depositing money into your savings account.")}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleStepClick(index, step.function)}
                        disabled={
                          isPending || completedSteps.has(index) || !depositAmount
                        }
                        variant={
                          completedSteps.has(index) ? "secondary" : "outline"
                        }
                        size="sm"
                        className="w-full"
                      >
                        {completedSteps.has(index)
                          ? (lang === 'pt' ? "Conclu�do" : "Completed")
                          : currentStep === index
                            ? (lang === 'pt' ? "Processando..." : "Processing...")
                            : !depositAmount
                              ? (lang === 'pt' ? "Informe o valor primeiro" : "Enter Amount First")
                              : (lang === 'pt' ? "Executar passo" : "Execute Step")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {lang === 'pt' ? (
                    <>
                      <strong>Observa��o:</strong> Execute cada passo na ordem para depositar seus ONEDOLLAR com seguran�a no contrato de poupan�a.
                    </>
                  ) : (
                    <>
                      <strong>Note:</strong> Execute each step in order to deposit your ONEDOLLAR safely into the savings contract.
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />
        </div>
      </div>
  </main>
  );
}
