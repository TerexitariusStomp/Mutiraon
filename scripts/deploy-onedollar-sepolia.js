import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Get chain ID
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  console.log("Chain ID:", chainId);

  // Deploy StableCoin (Amaz ONEDOLLAR)
  console.log("\n=== Deploying Amaz ONEDOLLAR StableCoin ===");
  const StableCoin = await hre.ethers.getContractFactory("StableCoin");
  const stableCoin = await StableCoin.deploy(chainId);
  await stableCoin.waitForDeployment();
  const stableCoinAddress = await stableCoin.getAddress();
  console.log("StableCoin (Amaz ONEDOLLAR) deployed:", stableCoinAddress);

  // Deploy core contracts
  console.log("\n=== Deploying Core Contracts ===");

  // Vat
  const Vat = await hre.ethers.getContractFactory("Vat");
  const vat = await Vat.deploy();
  await vat.waitForDeployment();
  const vatAddress = await vat.getAddress();
  console.log("Vat deployed:", vatAddress);

  // Spot
  const Spot = await hre.ethers.getContractFactory("Spot");
  const spot = await Spot.deploy(vatAddress);
  await spot.waitForDeployment();
  const spotAddress = await spot.getAddress();
  console.log("Spot deployed:", spotAddress);

  // Jug
  const Jug = await hre.ethers.getContractFactory("Jug");
  const jug = await Jug.deploy(vatAddress);
  await jug.waitForDeployment();
  const jugAddress = await jug.getAddress();
  console.log("Jug deployed:", jugAddress);

  // Dog
  const Dog = await hre.ethers.getContractFactory("Dog");
  const dog = await Dog.deploy(vatAddress);
  await dog.waitForDeployment();
  const dogAddress = await dog.getAddress();
  console.log("Dog deployed:", dogAddress);

  // Pot
  const Pot = await hre.ethers.getContractFactory("Pot");
  const pot = await Pot.deploy(vatAddress);
  await pot.waitForDeployment();
  const potAddress = await pot.getAddress();
  console.log("Pot deployed:", potAddress);

  // Vow
  const Vow = await hre.ethers.getContractFactory("Vow");
  const vow = await Vow.deploy(vatAddress, deployer.address, deployer.address); // Using deployer as placeholder for flapper/flopper
  await vow.waitForDeployment();
  const vowAddress = await vow.getAddress();
  console.log("Vow deployed:", vowAddress);

  // DaiJoin (for stablecoin)
  const DaiJoin = await hre.ethers.getContractFactory("DaiJoin");
  const daiJoin = await DaiJoin.deploy(vatAddress, stableCoinAddress);
  await daiJoin.waitForDeployment();
  const daiJoinAddress = await daiJoin.getAddress();
  console.log("DaiJoin deployed:", daiJoinAddress);

  // Deploy CBiomaH token
  console.log("\n=== Deploying CBiomaH Token ===");
  const CBiomaH = await hre.ethers.getContractFactory("CBiomaHToken");
  const cbiomeh = await CBiomaH.deploy(chainId);
  await cbiomeh.waitForDeployment();
  const cbiomehAddress = await cbiomeh.getAddress();
  console.log("CBiomaHToken deployed:", cbiomehAddress);

  // Mint some test CBiomaH to deployer
  const mintTx = await cbiomeh.mint(deployer.address, hre.ethers.parseUnits("1000000", 18));
  await mintTx.wait();
  console.log("Minted test CBiomaH to deployer");

  // Deploy CBiomaH Join
  console.log("\n=== Deploying CBiomaH Join ===");
  const CBiomaHJoin = await hre.ethers.getContractFactory("CBiomaHJoin");
  const cbiomehJoin = await CBiomaHJoin.deploy(vatAddress, cbiomehAddress);
  await cbiomehJoin.waitForDeployment();
  const cbiomehJoinAddress = await cbiomehJoin.getAddress();
  console.log("CBiomaHJoin deployed:", cbiomehJoinAddress);

  // Deploy CBiomaH Clipper
  console.log("\n=== Deploying CBiomaH Clipper ===");
  const CBiomaHClipper = await hre.ethers.getContractFactory("CBiomaHClipper");
  const cbiomehClipper = await CBiomaHClipper.deploy(vatAddress, spotAddress, dogAddress);
  await cbiomehClipper.waitForDeployment();
  const cbiomehClipperAddress = await cbiomehClipper.getAddress();
  console.log("CBiomaHClipper deployed:", cbiomehClipperAddress);

  // Authorization setup
  console.log("\n=== Setting up Authorizations ===");

  // Vat authorizations
  await vat.rely(spotAddress);
  await vat.rely(jugAddress);
  await vat.rely(dogAddress);
  await vat.rely(potAddress);
  await vat.rely(vowAddress);
  await vat.rely(daiJoinAddress);
  await vat.rely(cbiomehJoinAddress);
  console.log("Vat authorizations set");

  // Spot authorizations
  await spot.rely(deployer.address); // For testing
  console.log("Spot authorizations set");

  // Jug authorizations
  await jug.rely(deployer.address); // For testing
  console.log("Jug authorizations set");

  // Dog authorizations
  await dog.rely(cbiomehClipperAddress);
  console.log("Dog authorizations set");

  // Pot authorizations
  await pot.rely(vowAddress);
  console.log("Pot authorizations set");

  // Vow authorizations
  await vow.rely(dogAddress);
  console.log("Vow authorizations set");

  // StableCoin authorizations
  await stableCoin.rely(daiJoinAddress);
  console.log("StableCoin authorizations set");

  // CBiomaH authorizations
  await cbiomeh.rely(cbiomehJoinAddress);
  console.log("CBiomaH authorizations set");

  // Initialize CBiomaH collateral in Vat
  console.log("\n=== Initializing CBiomaH Collateral ===");
  const ilk = hre.ethers.encodeBytes32String("CBiomaH");
  await vat.init(ilk);
  console.log("CBiomaH collateral initialized in Vat");

  // Set up basic parameters (these would typically be configured by governance)
  console.log("\n=== Setting up Basic Parameters ===");

  // Set debt ceiling for CBiomaH (example: 1M ONEDOLLAR)
  await vat.file(ilk, hre.ethers.encodeBytes32String("line"), hre.ethers.parseUnits("1000000", 45));
  console.log("Debt ceiling set for CBiomaH");

  // Set stability fee for CBiomaH (example: 1% APY)
  await jug.init(ilk);
  await jug.file(ilk, hre.ethers.encodeBytes32String("duty"), hre.ethers.parseUnits("1000000000315522921573372069", 27)); // ~1% APY
  console.log("Stability fee set for CBiomaH");

  // Set liquidation ratio for CBiomaH (example: 150%)
  await spot.file(ilk, hre.ethers.encodeBytes32String("mat"), hre.ethers.parseUnits("150", 27));
  console.log("Liquidation ratio set for CBiomaH");

  // Set chop (liquidation penalty) for CBiomaH (example: 13%)
  await dog.file(ilk, hre.ethers.encodeBytes32String("chop"), hre.ethers.parseUnits("113", 25)); // 1.13 * 10^25
  console.log("Liquidation penalty set for CBiomaH");

  // Set hole (max auction size) for CBiomaH
  await dog.file(ilk, hre.ethers.encodeBytes32String("hole"), hre.ethers.parseUnits("50000", 45));
  console.log("Max auction size set for CBiomaH");

  // Set clip (auction contract) for CBiomaH
  await dog.file(ilk, hre.ethers.encodeBytes32String("clip"), cbiomehClipperAddress);
  console.log("Auction contract set for CBiomaH");

  // Set price feed for CBiomaH (using a mock price feed for now - would be Chainlink in production)
  const mockPrice = hre.ethers.parseUnits("1", 27); // $1 per CBiomaH
  await spot.file(ilk, hre.ethers.encodeBytes32String("pip"), "0x0000000000000000000000000000000000000000"); // Mock address
  // Note: In production, this would be a real price feed contract

  // Poke spot to update price
  await spot.poke(ilk);
  console.log("Price feed updated for CBiomaH");

  // Output deployment summary
  console.log("\n=== DEPLOYMENT COMPLETE ===");
  console.log("Network: Ethereum Sepolia");
  console.log("Chain ID:", chainId);
  console.log("Deployer:", deployer.address);

  const deployment = {
    network: "Ethereum Sepolia",
    chainId: chainId,
    deployer: deployer.address,
    deploymentDate: new Date().toISOString(),
    deploymentStatus: "Complete - Amaz ONEDOLLAR stablecoin system deployed with CBiomaH collateral",

    stablecoin: {
      name: "Amaz ONEDOLLAR",
      symbol: "ONEDOLLAR",
      address: stableCoinAddress
    },

    tokens: {
      CBiomaH: cbiomehAddress
    },

    core: {
      Vat: vatAddress,
      Pot: potAddress,
      Vow: vowAddress,
      Dog: dogAddress,
      Spot: spotAddress,
      Jug: jugAddress,
      DaiJoin: daiJoinAddress
    },

    joins: {
      CBiomaHJoin: cbiomehJoinAddress
    },

    clippers: {
      CBiomaHClipper: cbiomehClipperAddress
    },

    summary: {
      totalContractsDeployed: 10,
      collateralTokens: 1,
      coreSystemContracts: 7,
      collateralAdapters: 1,
      auctionMechanisms: 1,
      systemInitialized: true,
      cbiomehCollateralEnabled: true
    },

    nextSteps: {
      frontend: "Update frontend contracts.ts with deployed addresses",
      priceFeeds: "Configure real price feeds for CBiomaH",
      testing: "Run comprehensive system tests",
      governance: "Set up governance for parameter adjustments"
    }
  };

  // Save deployment info to file
  const fs = require('fs');
  fs.writeFileSync('onedollar-sepolia-deployment.json', JSON.stringify(deployment, null, 2));
  console.log("Deployment info saved to onedollar-sepolia-deployment.json");

  // Output for frontend update
  console.log("\n=== UPDATE FRONTEND CONTRACTS ===");
  console.log("Update frontendnew/src/lib/contracts.ts with:");
  console.log(`  stablecoin: "${stableCoinAddress}",`);
  console.log(`  vat: "${vatAddress}",`);
  console.log(`  spot: "${spotAddress}",`);
  console.log(`  jug: "${jugAddress}",`);
  console.log(`  dog: "${dogAddress}",`);
  console.log(`  pot: "${potAddress}",`);
  console.log(`  vow: "${vowAddress}",`);
  console.log(`  daiJoin: "${daiJoinAddress}",`);
  console.log(`  cbiomehToken: "${cbiomehAddress}",`);
  console.log(`  cbiomehJoin: "${cbiomehJoinAddress}",`);
  console.log(`  cbiomehClipper: "${cbiomehClipperAddress}",`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});