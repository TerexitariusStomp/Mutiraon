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

export default function StakePage() {
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
      await withdrawSavings(withdrawAmount);
      console.log("Withdraw completed successfully");
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
      await stepFunction();
      setCompletedSteps((prev) => new Set([...prev, stepIndex]));
      setCurrentStep(-1); // Reset current step
      // Refetch all data after each successful step
      setTimeout(() => refetchData(), 2000);
    } catch (error) {
      console.error(`Step ${stepIndex + 1} failed:`, error);
      setCurrentStep(-1);
    }
  };

  return (
    <main className="min-h-[60vh] bg-[#f3f1f7]">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              OGUSD Savings Rate
            </h1>
            <p className="text-lg text-muted-foreground">
              Earn yield by depositing your OGUSD stablecoins into our savings
              mechanism
            </p>
          </div>

          {/* Current Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Your Savings Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {parseFloat(userBalance).toFixed(4)} OGUSD
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Savings Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {savingsRate}% APY
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {parseFloat(walletBalance).toFixed(4)} OGUSD
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deposit/Withdraw Interface */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Deposit Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Deposit OGUSD
                  <Badge variant="secondary">Earn {savingsRate}% APY</Badge>
                </CardTitle>
                <CardDescription>
                  Use the step-by-step process below to deposit your OGUSD and
                  start earning yield
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Amount (OGUSD)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: {parseFloat(walletBalance).toFixed(4)} OGUSD
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Use the manual step-by-step process below to deposit safely.
                </div>
              </CardContent>
            </Card>

            {/* Withdraw Card */}
            <Card>
              <CardHeader>
                <CardTitle>Withdraw OGUSD</CardTitle>
                <CardDescription>
                  Withdraw your OGUSD plus accrued interest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Amount (OGUSD)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: {parseFloat(userBalance).toFixed(4)} OGUSD
                  </p>
                </div>
                <Button
                  onClick={handleWithdraw}
                  disabled={isPending || !withdrawAmount}
                  variant="outline"
                  className="w-full"
                >
                  {isPending ? "Withdrawing..." : "Withdraw"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Step-by-Step Deposit Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Step-by-Step Deposit Process
                <Badge variant="outline">Manual Mode</Badge>
              </CardTitle>
              <CardDescription>
                Execute each step individually to deposit OGUSD safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Update Rates",
                    description:
                      "Update savings rate via drip() (required before deposit)",
                    function: () => updateRates(),
                    icon: "💧",
                  },
                  {
                    title: "Approve DaiJoin",
                    description: depositAmount
                      ? `Allow DaiJoin to spend ${depositAmount} OGUSD tokens`
                      : "Allow DaiJoin to spend OGUSD tokens",
                    function: () => approveDaiJoin(depositAmount || "0"),
                    icon: "🔓",
                  },
                  {
                    title: "Join Vat",
                    description: depositAmount
                      ? `Convert ${depositAmount} OGUSD tokens to dai in the Vat`
                      : "Convert OGUSD tokens to dai in the Vat",
                    function: () => joinStablecoinToVat(depositAmount || "0"),
                    icon: "🏦",
                  },
                  {
                    title: "Authorize Pot",
                    description: "Authorize the Pot contract to move your dai",
                    function: () => authorizePot(),
                    icon: "🔑",
                  },
                  {
                    title: "Deposit to Pot",
                    description: depositAmount
                      ? `Deposit ${depositAmount} dai into the savings contract`
                      : "Deposit dai into the savings contract",
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
                          <h4 className="font-medium text-sm">Step {index + 1}: {step.title}</h4>
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
                          What it does: {step.title}
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
                              <li>• Checks the current interest rate and prepares the system</li>
                              <li>• Just click to confirm</li>
                              <li>• This happens automatically behind the scenes</li>
                            </>
                          )}
                          {index === 1 && (
                            <>
                              <li>• Gives the savings program permission to move your OGUSD</li>
                              <li>• Similar to authorizing a payment app to use your bank account</li>
                              <li>• You only need to do this once per session</li>
                              <li>• Click to confirm</li>
                            </>
                          )}
                          {index === 2 && (
                            <>
                              <li>• Converts your OGUSD into the format the savings system uses</li>
                              <li>• This is automatic and happens instantly</li>
                              <li>• No fees or delays</li>
                              <li>• Just click to confirm</li>
                            </>
                          )}
                          {index === 3 && (
                            <>
                              <li>• Gives the savings contract permission to hold your converted currency</li>
                              <li>• Another security check to protect your money</li>
                              <li>• Click to confirm</li>
                            </>
                          )}
                          {index === 4 && (
                            <>
                              <li>• Actually moves your money into the savings account where it starts earning</li>
                              <li>• Your money is now locked in and earning interest</li>
                              <li>• Click to confirm</li>
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
                          {index === 0 && "Think of it like: Preparing your account for a deposit."}
                          {index === 1 && "Think of it like: Giving permission for an automatic transfer."}
                          {index === 2 && "Think of it like: Converting cash to a special savings format."}
                          {index === 3 && "Think of it like: Signing a contract to hold your money safely."}
                          {index === 4 && "Think of it like: Finally depositing money into your savings account."}
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
                          ? "Completed"
                          : currentStep === index
                            ? "Processing..."
                            : !depositAmount
                              ? "Enter Amount First"
                              : "Execute Step"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Execute each step in order to deposit
                  your OGUSD safely into the savings contract.
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="my-8" />

          {/* Pot Contract Information */}
          <div className="mb-8 rounded-2xl border border-border bg-card p-8 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
              About the Pot Contract
            </h2>

            <div className="prose prose-gray max-w-none">
              <p className="text-muted-foreground mb-4">
                The <strong>Pot contract</strong> is a core component of the
                OGUSD Savings Rate (USR) system in decentralized finance,
                specifically enabling OGUSD holders to earn yield by depositing
                their stablecoins into a savings mechanism. The contract tracks
                deposited balances, accrues interest, and allows users to enter
                or exit the USR system safely, all while managing system-level
                administration and rate adjustment.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                Main Functions and Purpose
              </h3>
              <p className="text-muted-foreground mb-4">
                The contract lets users deposit OGUSD stablecoins, building up a
                normalized balance ("pie") that earns interest at the global
                savings rate ("dsr").
              </p>
              <p className="text-muted-foreground mb-4">
                Interest is tracked via the "chi" rate accumulator, which is
                updated with regular calls to the "drip" function—this function
                synchronizes interest accrual to the latest blockchain timestamp
                and distributes the accumulated interest to all savers.
              </p>
              <p className="text-muted-foreground mb-4">
                Depositing (via join) and withdrawing (via exit) operations move
                the user's OGUSD to/from the contract, updating tracked balances
                so accrued interest is reflected mathematically.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                Key Features
              </h3>
              <ul className="text-muted-foreground mb-4 space-y-2">
                <li>
                  <strong>Interest Accrual:</strong> The contract accrues
                  interest for all USR participants based on the global savings
                  rate. The interest is distributed proportionally to all users
                  based on their normalized balances.
                </li>
                <li>
                  <strong>Deposit/Withdrawal:</strong> Anyone can deposit OGUSD
                  to start earning yield or withdraw their principal plus
                  accrued interest at any time after the system is updated.
                </li>
                <li>
                  <strong>Rate and Administration:</strong> Administrators (with
                  auth rights) can set the USR (dsr) value, configure system
                  debt handling, and even "cage" (disable) the contract in
                  emergencies.
                </li>
                <li>
                  <strong>Security:</strong> The contract uses safe math, custom
                  access controls, and special mathematical routines to ensure
                  correct calculation and avoid overflows.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                Simplified Flow
              </h3>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Deposit – join(wad):</strong> A user deposits OGUSD,
                    establishing a normalized savings balance (pie) that
                    immediately starts earning at the current USR.
                  </div>
                  <div>
                    <strong>Interest Accrual – drip():</strong> Periodically
                    called to update the global rate accumulator (chi) and
                    distribute new interest to all savers for the elapsed time
                    period.
                  </div>
                  <div>
                    <strong>Withdraw – exit(wad):</strong> User withdraws some
                    or all savings, receiving OGUSD plus interest (calculated
                    using chi).
                  </div>
                  <div>
                    <strong>Admin Controls – file, cage:</strong> Management
                    functions for rate adjustment or system shutdown.
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                OGUSD Savings Rate – Core Mechanism
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border rounded-lg">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border p-3 text-left font-semibold">
                        Feature
                      </th>
                      <th className="border border-border p-3 text-left font-semibold">
                        Functionality Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-3 font-medium">
                        Interest Accrual
                      </td>
                      <td className="border border-border p-3">
                        Users' deposits earn yield based on the USR and time in
                        system
                      </td>
                    </tr>
                    <tr className="bg-muted/25">
                      <td className="border border-border p-3 font-medium">
                        Savings Management
                      </td>
                      <td className="border border-border p-3">
                        Deposits and withdrawals update normalized balances
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3 font-medium">
                        Rate Updates
                      </td>
                      <td className="border border-border p-3">
                        The USR can be changed by authorized parties
                      </td>
                    </tr>
                    <tr className="bg-muted/25">
                      <td className="border border-border p-3 font-medium">
                        Shutdown
                      </td>
                      <td className="border border-border p-3">
                        The system can be halted through cage()
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-muted-foreground mt-4">
                This mechanism is central to OGUSD's USR, letting OGUSD holders
                benefit from programmable interest while preserving control and
                security of deposited funds.
              </p>
            </div>
          </div>

          {/* Contract Address */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Contract Information
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Pot Contract Address:</span>
                <code className="bg-background px-2 py-1 rounded text-sm font-mono">
                  {CONTRACTS.pot}
                </code>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                <a
                  href={`https://sepolia.etherscan.io/address/${CONTRACTS.pot}#code`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on Sepolia Etherscan ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
