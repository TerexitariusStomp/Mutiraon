import hre from "hardhat";
import fs from "fs";

async function main() {
    console.log("🚀 Deploying Mutiraon Stablecoin System on Ethereum Sepolia...\n");

    // Use the correct private key directly with provider
    const privateKey = "0x756f605ef663446729ab3c62e6c4a15a460f9578bad6cb3645ab38f95f458f23";
    const wallet = new hre.ethers.Wallet(privateKey).connect(hre.ethers.provider);
    
    console.log("Using correct wallet address:", wallet.address);
    console.log("Expected address: 0xF0eFA1aD9b2470A496d705C8c890115e84a93Ad3");
    console.log("Match:", wallet.address.toLowerCase() === "0xf0efa1ad9b2470a496d705c8c890115e84a93ad3".toLowerCase());

    // Get network info
    const network = await hre.ethers.provider.getNetwork();
    const chainId = network.chainId;
    console.log("\nNetwork Chain ID:", chainId);

    // Check balance
    const deployerBalance = await hre.ethers.provider.getBalance(wallet.address);
    console.log("Deployer balance:", hre.ethers.formatEther(deployerBalance), "ETH\n");

    // Verify sufficient balance
    if (deployerBalance < hre.ethers.parseEther("0.1")) {
        throw new Error("❌ Insufficient balance for deployment. Need at least 0.1 ETH.");
    }

    try {
        // Deploy the main Mutiraon stablecoin
        console.log("🏦 Deploying Mutiraon stablecoin...");
        const StableCoin = await hre.ethers.getContractFactory("StableCoin", wallet);
        const stablecoin = await StableCoin.deploy(chainId);
        await stablecoin.waitForDeployment();
        console.log("✅ Mutiraon deployed to:", await stablecoin.getAddress());

        // Deploy environmental tokens
        console.log("\n🌱 Deploying Brazilian Environmental Tokens...");
        
        const tokenContracts = {};
        const tokenNames = [
            "AMZN", "BIO", "REN", "AGRI", "AQUA", "NIL", "ECO"
        ];
        
        for (const tokenName of tokenNames) {
            console.log(`Deploying ${tokenName} token...`);
            const TokenFactory = await hre.ethers.getContractFactory(`${tokenName}Token`, wallet);
            const token = await TokenFactory.deploy(chainId);
            await token.waitForDeployment();
            tokenContracts[tokenName] = token;
            console.log(`✅ ${tokenName} deployed to:`, await token.getAddress());
        }

        // Deploy core system contracts
        console.log("\n⚙️ Deploying core system contracts...");
        
        // Deploy Vat (CDP Engine)
        const Vat = await hre.ethers.getContractFactory("Vat", wallet);
        const vat = await Vat.deploy();
        await vat.waitForDeployment();
        console.log("✅ Vat deployed to:", await vat.getAddress());

        // Deploy Pot (Savings Rate)
        const Pot = await hre.ethers.getContractFactory("Pot", wallet);
        const pot = await Pot.deploy(await vat.getAddress());
        await pot.waitForDeployment();
        console.log("✅ Pot deployed to:", await pot.getAddress());

        // Deploy Vow (Debt Accounting)
        const Vow = await hre.ethers.getContractFactory("Vow", wallet);
        const vow = await Vow.deploy(await vat.getAddress(), hre.ethers.ZeroAddress, hre.ethers.ZeroAddress);
        await vow.waitForDeployment();
        console.log("✅ Vow deployed to:", await vow.getAddress());

        // Deploy Dog (Liquidation Engine)
        const Dog = await hre.ethers.getContractFactory("Dog", wallet);
        const dog = await Dog.deploy(await vat.getAddress());
        await dog.waitForDeployment();
        console.log("✅ Dog deployed to:", await dog.getAddress());

        // Deploy Spot (Price Oracle)
        const Spot = await hre.ethers.getContractFactory("Spot", wallet);
        const spot = await Spot.deploy(await vat.getAddress());
        await spot.waitForDeployment();
        console.log("✅ Spot deployed to:", await spot.getAddress());

        // Deploy Jug (Stability Fee)
        const Jug = await hre.ethers.getContractFactory("Jug", wallet);
        const jug = await Jug.deploy(await vat.getAddress());
        await jug.waitForDeployment();
        console.log("✅ Jug deployed to:", await jug.getAddress());

        // Deploy DaiJoin (Stablecoin Adapter)
        const DaiJoin = await hre.ethers.getContractFactory("DaiJoin", wallet);
        const daiJoin = await DaiJoin.deploy(await vat.getAddress(), await stablecoin.getAddress());
        await daiJoin.waitForDeployment();
        console.log("✅ DaiJoin deployed to:", await daiJoin.getAddress());

        // Deploy GemJoin contracts for each environmental token
        const GemJoin = await hre.ethers.getContractFactory("GemJoin", wallet);
        const joinContracts = {};
        
        const ilkNames = ["AMZN-A", "BIO-A", "REN-A", "AGRI-A", "AQUA-A", "NIL-A", "ECO-A"];
        
        for (let i = 0; i < tokenNames.length; i++) {
            const tokenName = tokenNames[i];
            const ilkName = ilkNames[i];
            const tokenAddress = await tokenContracts[tokenName].getAddress();
            
            console.log(`Deploying ${tokenName}Join...`);
            const tokenJoin = await GemJoin.deploy(await vat.getAddress(), hre.ethers.toUtf8Bytes(ilkName + '\x00'.repeat(32 - ilkName.length)), tokenAddress);
            await tokenJoin.waitForDeployment();
            joinContracts[tokenName] = tokenJoin;
            console.log(`✅ ${tokenName}Join deployed to:`, await tokenJoin.getAddress());
        }

        // Deploy Clipper (Auction House) for each collateral
        console.log("\n🔨 Deploying auction mechanisms...");
        const Clipper = await hre.ethers.getContractFactory("Clipper", wallet);
        const clipperContracts = {};
        
        for (let i = 0; i < tokenNames.length; i++) {
            const tokenName = tokenNames[i];
            const ilkName = ilkNames[i];
            
            console.log(`Deploying ${tokenName}Clipper...`);
            const clipper = await Clipper.deploy(await vat.getAddress(), await spot.getAddress(), await dog.getAddress(), hre.ethers.toUtf8Bytes(ilkName + '\x00'.repeat(32 - ilkName.length)));
            await clipper.waitForDeployment();
            clipperContracts[tokenName] = clipper;
            console.log(`✅ ${tokenName}Clipper deployed to:`, await clipper.getAddress());
        }

        // Authorize core contracts
        console.log("\n🔑 Authorizing core contracts...");
        
        // Authorize Dog to access Vat
        await vat.rely(await dog.getAddress());
        console.log("✅ Dog authorized in Vat");
        
        // Authorize Spot to access Vat
        await vat.rely(await spot.getAddress());
        console.log("✅ Spot authorized in Vat");
        
        // Authorize Jug to access Vat
        await vat.rely(await jug.getAddress());
        console.log("✅ Jug authorized in Vat");
        
        // Authorize Vow to access Vat
        await vat.rely(await vow.getAddress());
        console.log("✅ Vow authorized in Vat");
        
        // Authorize join contracts to access Vat
        for (const tokenName of tokenNames) {
            await vat.rely(await joinContracts[tokenName].getAddress());
            console.log(`✅ ${tokenName}Join authorized in Vat`);
        }
        
        // Authorize DaiJoin to manage Mutiraon
        await stablecoin.rely(await daiJoin.getAddress());
        console.log("✅ DaiJoin authorized in StableCoin");

        // Initialize parameters for each collateral
        console.log("\n⚙️ Initializing collateral parameters...");
        
        // Set liquidation ratio (150%)
        const liquidationRatio = hre.ethers.parseUnits("1.5", 27); // 150% inRAY
        
        // Set debt ceiling per collateral (10M Mutiraon each)
        const debtCeiling = hre.ethers.parseUnits("10000000", 45); // 10M RAD
        
        // Set stability fee (2% APR = 0.02)
        const stabilityFee = hre.ethers.parseUnits("0.02", 27); // 2% inRAY
        
        for (let i = 0; i < tokenNames.length; i++) {
            const tokenName = tokenNames[i];
            const ilkName = ilkNames[i];
            const ilkBytes = hre.ethers.formatBytes32String(ilkName);
            
            // Initialize ilk in Vat
            await vat.init(ilkBytes);
            console.log(`✅ ${ilkName} initialized in Vat`);
            
            // Set liquidation ratio
            await vat.file(ilkBytes, hre.ethers.toUtf8Bytes("mat" + '\x00'.repeat(29)), liquidationRatio);
            console.log(`✅ ${ilkName} liquidation ratio set to 150%`);
            
            // Set debt ceiling
            await vat.file(ilkBytes, hre.ethers.toUtf8Bytes("line" + '\x00'.repeat(28)), debtCeiling);
            console.log(`✅ ${ilkName} debt ceiling set to 10M Mutiraon`);
            
            // Set stability fee
            await jug.init(ilkBytes);
            await jug.file(ilkBytes, hre.ethers.toUtf8Bytes("duty" + '\x00'.repeat(29)), stabilityFee);
            console.log(`✅ ${ilkName} stability fee set to 2% APR`);
            
            // Set spot price feed
            await spot.file(ilkBytes, hre.ethers.toUtf8Bytes("pip" + '\x00'.repeat(29)), await clipperContracts[tokenName].getAddress());
            console.log(`✅ ${ilkName} price feed set`);
            
            // Set liquidation parameters in Dog
            await dog.file(ilkBytes, hre.ethers.toUtf8Bytes("chop" + '\x00'.repeat(28)), hre.ethers.parseUnits("1.1", 27)); // 10% penalty
            await dog.file(ilkBytes, hre.ethers.toUtf8Bytes("hole" + '\x00'.repeat(28)), hre.ethers.parseUnits("1000000", 45)); // 1M RAD
            await dog.file(ilkBytes, hre.ethers.toUtf8Bytes("clip" + '\x00'.repeat(29)), await clipperContracts[tokenName].getAddress());
            console.log(`✅ ${ilkName} liquidation parameters set`);
        }

        // Set global debt ceiling (70M Mutiraon total - 7 collaterals * 10M each)
        const globalDebtCeiling = hre.ethers.parseUnits("70000000", 45);
        await vat.file(hre.ethers.toUtf8Bytes("Line" + '\x00'.repeat(28)), globalDebtCeiling);
        console.log("✅ Global debt ceiling set to 70M Mutiraon");

        // Set global stability fee (0% for savings rate)
        await jug.file(hre.ethers.toUtf8Bytes("base" + '\x00'.repeat(29)), hre.ethers.parseUnits("0", 27));
        console.log("✅ Global base stability fee set to 0%");

        // Update Pot savings rate
        await pot.file(hre.ethers.toUtf8Bytes("pie" + '\x00'.repeat(29)), hre.ethers.parseUnits("1", 27));
        await pot.file(hre.ethers.toUtf8Bytes("dsr" + '\x00'.repeat(29)), hre.ethers.parseUnits("0", 27)); // 0% savings rate
        console.log("✅ Savings rate configured");

        // Save deployment addresses
        const deploymentAddresses = {
            stablecoin: await stablecoin.getAddress(),
            vat: await vat.getAddress(),
            pot: await pot.getAddress(),
            vow: await vow.getAddress(),
            dog: await dog.getAddress(),
            spot: await spot.getAddress(),
            jug: await jug.getAddress(),
            daiJoin: await daiJoin.getAddress(),
            tokens: {},
            joins: {},
            clippers: {}
        };

        // Add token addresses
        for (const tokenName of tokenNames) {
            deploymentAddresses.tokens[tokenName] = await tokenContracts[tokenName].getAddress();
            deploymentAddresses.joins[tokenName] = await joinContracts[tokenName].getAddress();
            deploymentAddresses.clippers[tokenName] = await clipperContracts[tokenName].getAddress();
        }

        // Write addresses to file
        const addressesFile = './mutiraon-sepolia-addresses.json';
        fs.writeFileSync(addressesFile, JSON.stringify(deploymentAddresses, null, 2));
        console.log(`\n📝 Deployment addresses saved to ${addressesFile}`);

        // Print summary
        console.log("\n🎉 Mutiraon System Deployment Complete!");
        console.log("=====================================");
        console.log("📊 Deployment Summary:");
        console.log(`- Network: Ethereum Sepolia (Chain ID: ${chainId})`);
        console.log(`- Mutiraon Stablecoin: ${deploymentAddresses.stablecoin}`);
        console.log(`- Environmental Tokens: 7 deployed`);
        console.log(`- Core System Contracts: 6 deployed`);
        console.log(`- Collateral Adapters: 7 deployed`);
        console.log(`- Auction Mechanisms: 7 deployed`);
        console.log(`- Total Contracts: ${22 + tokenNames.length} deployed`);

        console.log("\n🌱 Environmental Token Addresses:");
        for (const tokenName of tokenNames) {
            console.log(`- ${tokenName}: ${deploymentAddresses.tokens[tokenName]}`);
        }

        console.log("\n🔧 Next Steps:");
        console.log("1. Verify contracts on Etherscan");
        console.log("2. Configure price feeds for each collateral");
        console.log("3. Set up governance and admin permissions");
        console.log("4. Initialize liquidity pools for tokens");
        console.log("5. Deploy frontend with new contract addresses");
        console.log("6. Run comprehensive testing on Sepolia");

        console.log("\n✅ Mutiraon is ready for Sepolia deployment!");

    } catch (error) {
        if (error.code === 'INSUFFICIENT_FUNDS') {
            console.error("❌ Insufficient funds for deployment");
            console.log("💡 Please ensure your account has enough Sepolia ETH for gas fees");
            console.log("   Estimated cost: 2-5 ETH for full deployment");
        } else {
            console.error("❌ Deployment failed:", error.message);
            console.error("Full error:", error);
        }
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("❌ Deployment failed:", error);
        process.exit(1);
    });