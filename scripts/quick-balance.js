import hre from "hardhat";

async function main() {
    console.log("🔍 Direct balance check on Sepolia...\n");

    const deployerAddress = "0xfc4Ce2BDcD309AB40F60E74Bcdb54a3EB0d60Fa9";
    
    try {
        // Get balance directly from provider
        const balance = await hre.ethers.provider.getBalance(deployerAddress);
        console.log("Direct provider balance:", hre.ethers.formatEther(balance), "ETH");
        
        // Also check via signer
        const [signer] = await hre.ethers.getSigners();
        const signerBalance = await signer.getBalance();
        console.log("Signer balance:", hre.ethers.formatEther(signerBalance), "ETH");
        
        console.log("Deployer address:", deployerAddress);
        
        if (balance === 0n && signerBalance === 0n) {
            console.log("\n⚠️ Both balances are 0 ETH");
            console.log("Possible reasons:");
            console.log("1. Transaction not yet confirmed on blockchain");
            console.log("2. Wrong address funded");
            console.log("3. RPC endpoint caching");
            console.log("\n💡 Suggestions:");
            console.log("- Wait 2-3 minutes and try again");
            console.log("- Verify the address you funded matches:", deployerAddress);
            console.log("- Check your transaction on Sepolia Etherscan");
        } else if (balance > 0n) {
            console.log("✅ Account has balance! Ready for deployment.");
        }
    } catch (error) {
        console.error("❌ Balance check failed:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Script failed:", error);
        process.exit(1);
    });