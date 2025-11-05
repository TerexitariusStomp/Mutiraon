import hre from "hardhat";

async function main() {
    console.log("🔍 Checking balance on CORRECT Sepolia address...\n");

    // The CORRECT address derived from the private key
    const correctAddress = "0xF0eFA1aD9b2470A496d705C8c890115e84a93Ad3";
    const privateKey = "0x756f605ef663446729ab3c62e6c4a15a460f9578bad6cb3645ab38f95f458f23";
    
    // Create wallet from private key to verify
    const expectedWallet = new hre.ethers.Wallet(privateKey);
    console.log("Expected address:", expectedWallet.address);
    console.log("Correct address:", correctAddress);
    console.log("Addresses match:", expectedWallet.address.toLowerCase() === correctAddress.toLowerCase());

    try {
        // Get balance directly from provider using the correct address
        const balance = await hre.ethers.provider.getBalance(correctAddress);
        console.log("\n💰 Balance check:");
        console.log("Address:", correctAddress);
        console.log("Balance:", hre.ethers.formatEther(balance), "ETH");
        
        if (balance === 0n) {
            console.log("\n⚠️ Account has 0 ETH - needs funding");
            console.log("💡 Send Sepolia ETH to:", correctAddress);
            console.log("🔗 Faucets:");
            console.log("   - https://sepoliafaucet.com/");
            console.log("   - https://www.alchemy.com/faucets/ethereum-sepolia");
        } else {
            console.log("✅ Account has sufficient balance for deployment!");
        }
        
        // Also test signer balance
        const [signer] = await hre.ethers.getSigners();
        console.log("\n🔑 Signer test:");
        console.log("Signer address:", signer.address);
        const signerBalance = await signer.getBalance();
        console.log("Signer balance:", hre.ethers.formatEther(signerBalance), "ETH");
        
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