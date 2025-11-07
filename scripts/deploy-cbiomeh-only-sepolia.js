import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Get chain ID
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  console.log("Chain ID:", chainId);

  // Use existing core contracts from previous deployment
  const CONTRACTS = {
    vat: "0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25",
    spot: "0x8583bcD939571Eaa21D9BBfDCc82e7A0Fda2c38f",
    jug: "0x1Db55dA3a3eD1BC092E297A5D166C9F1d4EC0283",
    dog: "0x75af7fF5098beCBA8a8d483bEfd11ed12ad9525F",
    pot: "0x34C886c7C6407A65d193DF006f3Ef600e9b992d7",
    vow: "0x171949B94fE913a21BCD1Fb97dC1F08359C3b8Bc",
    daiJoin: "0xd8D7Ab4762e0d70DdCDEF22f757c5662E1488dB8",
    stablecoin: "0x3B3Dc8305bd491cffe41DC955C0fCa16bfbE1E3A"
  };

  console.log("Using existing core contracts from previous deployment");

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
  const cbiomehJoin = await CBiomaHJoin.deploy(CONTRACTS.vat, cbiomehAddress);
  await cbiomehJoin.waitForDeployment();
  const cbiomehJoinAddress = await cbiomehJoin.getAddress();
  console.log("CBiomaHJoin deployed:", cbiomehJoinAddress);

  // Deploy CBiomaH Clipper
  console.log("\n=== Deploying CBiomaH Clipper ===");
  const CBiomaHClipper = await hre.ethers.getContractFactory("CBiomaHClipper");
  const cbiomehClipper = await CBiomaHClipper.deploy(CONTRACTS.vat, CONTRACTS.spot, CONTRACTS.dog);
  await cbiomehClipper.waitForDeployment();
  const cbiomehClipperAddress = await cbiomehClipper.getAddress();
  console.log("CBiomaHClipper deployed:", cbiomehClipperAddress);

  // Authorization setup
  console.log("\n=== Setting up Authorizations ===");

  // Get contract instances
  const vat = await hre.ethers.getContractAt("Vat", CONTRACTS.vat);
  const dog = await hre.ethers.getContractAt("Dog", CONTRACTS.dog);
  const spot = await hre.ethers.getContractAt("Spot", CONTRACTS.spot);
  const jug = await hre.ethers.getContractAt("Jug", CONTRACTS.jug);

  // Vat authorizations
  await vat.rely(cbiomehJoinAddress);
  console.log("Vat authorization set for CBiomaHJoin");

  // Dog authorizations
  await dog.rely(cbiomehClipperAddress);
  console.log("Dog authorization set for CBiomaHClipper");

  // CBiomaH authorizations
  await cbiomeh.rely(cbiomehJoinAddress);
  console.log("CBiomaH authorization set for CBiomaHJoin");

  // Initialize CBiomaH collateral in Vat
  console.log("\n=== Initializing CBiomaH Collateral ===");
  const ilk = hre.ethers.encodeBytes32String("CBiomaH");
  await vat.init(ilk);
  console.log("CBiomaH collateral initialized in Vat");

  // Set up basic parameters
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

  // Set price feed for CBiomaH (using a mock price feed for now)
  const mockPrice = hre.ethers.parseUnits("1", 27); // $1 per CBiomaH
  await spot.file(ilk, hre.ethers.encodeBytes32String("pip"), "0x0000000000000000000000000000000000000000"); // Mock address
  console.log("Price feed set for CBiomaH");

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
    deploymentStatus: "Complete - CBiomaH collateral added to existing Amaz ONEDOLLAR system",

    stablecoin: {
      name: "Amaz ONEDOLLAR",
      symbol: "ONEDOLLAR",
      address: CONTRACTS.stablecoin
    },

    tokens: {
      CBiomaH: cbiomehAddress
    },

    core: CONTRACTS,

    joins: {
      CBiomaHJoin: cbiomehJoinAddress
    },

    clippers: {
      CBiomaHClipper: cbiomehClipperAddress
    },

    summary: {
      totalContractsDeployed: 3,
      collateralTokens: 1,
      collateralAdapters: 1,
      auctionMechanisms: 1,
      cbiomehCollateralEnabled: true,
      systemExtended: true
    },

    nextSteps: {
      frontend: "Update frontend contracts.ts with new CBiomaH addresses",
      priceFeeds: "Configure real price feeds for CBiomaH",
      testing: "Test CBiomaH collateral minting and liquidation",
      governance: "Set up governance for parameter adjustments"
    }
  };

  // Save deployment info to file
  const fs = require('fs');
  fs.writeFileSync('cbiomeh-addition-sepolia-deployment.json', JSON.stringify(deployment, null, 2));
  console.log("Deployment info saved to cbiomeh-addition-sepolia-deployment.json");

  // Output for frontend update
  console.log("\n=== UPDATE FRONTEND CONTRACTS ===");
  console.log("Update frontendnew/src/lib/contracts.ts with:");
  console.log(`  cbiomehToken: "${cbiomehAddress}",`);
  console.log(`  cbiomehJoin: "${cbiomehJoinAddress}",`);
  console.log(`  cbiomehClipper: "${cbiomehClipperAddress}",`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
