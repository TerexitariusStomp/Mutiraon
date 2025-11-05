import hre from "hardhat";

async function main() {
    console.log("🔍 Checking deployer account balance on Sepolia...\n");

    // Get network info
    const network = await hre.ethers.provider.getNetwork();
    console.log("Network:", network.name);
    console.log("Chain ID:", network.chainId);

    // Get signers
    const [deployer] = await hre.ethers.getSigners();
    const deployerBalance = await deployer.getBalance();
    
    console.log("Deployer address:", deployer.address);
    console.log("Deployer balance:", hre.ethers.utils.formatEther(deployerBalance), "ETH\n");

    // Check if we have enough balance (need at least 1 ETH for deployment)
    const minBalance = hre.ethers.utils.parseEther("1.0");
    
    if (deployerBalance.isZero()) {
        console.log("❌ Deployer has ZERO balance. Please fund the account with Sepolia ETH.");
        console.log("Get free Sepolia ETH from: https://sepoliafaucet.com/");
        process.exit(1);
    } else if (deployerBalance.lt(minBalance)) {
        console.log("⚠️ Deployer has insufficient balance. Recommended minimum: 1 ETH");
        console.log("Current balance is sufficient for most deployments but may fail for complex operations.");
    } else {
        console.log("✅ Deployer has sufficient balance for deployment!");
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Balance check failed:", error);
        process.exit(1);
    });