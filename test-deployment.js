import hre from "hardhat";

async function main() {
    console.log("🧪 Testing Mutiraon Deployment Configuration...\n");

    // Check if we can compile contracts
    console.log("📦 Compiling contracts...");
    try {
        await hre.run("compile");
        console.log("✅ Contracts compiled successfully");
    } catch (error) {
        console.error("❌ Compilation failed:", error.message);
        return;
    }

    // Check network configuration
    const network = await hre.ethers.provider.getNetwork();
    console.log(`🌐 Network: ${network.name} (Chain ID: ${network.chainId})`);

    // Check if Sepolia is properly configured
    if (network.chainId === 11155111) {
        console.log("✅ Sepolia network detected");
    } else {
        console.log("⚠️ Not on Sepolia network. Current:", network.chainId);
    }

    // Get signers
    const [deployer] = await hre.ethers.getSigners();
    console.log(`👤 Deployer address: ${deployer.address}`);
    
    const balance = await deployer.getBalance();
    console.log(`💰 Balance: ${hre.ethers.utils.formatEther(balance)} ETH`);

    if (balance.isZero()) {
        console.log("⚠️ Deployer has zero balance. You'll need ETH for deployment.");
    } else {
        console.log("✅ Deployer has sufficient balance");
    }

    // Test contract factories
    console.log("\n🔧 Testing contract factory availability...");
    
    const contractFactories = [
        "StableCoin",
        "BIOMEToken",
        "Vat",
        "Spot",
        "Dog",
        "Jug",
        "Pot",
        "Vow",
        "GemJoin",
        "DaiJoin"
    ];

    for (const contractName of contractFactories) {
        try {
            const factory = await hre.ethers.getContractFactory(contractName);
            console.log(`✅ ${contractName} factory available`);
        } catch (error) {
            console.error(`❌ ${contractName} factory failed:`, error.message);
        }
    }

    console.log("\n🎉 Deployment configuration test completed!");
    console.log("\n📋 Next steps:");
    console.log("1. Fund your deployer account with Sepolia ETH");
    console.log("2. Set up your .env file with private key and RPC URL");
    console.log("3. Run: npx hardhat run scripts/deploy-sepolia.js --network sepolia");
    console.log("4. Verify contracts on Etherscan");
    console.log("5. Update frontend with deployed addresses");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Test failed:", error);
        process.exit(1);
    });
