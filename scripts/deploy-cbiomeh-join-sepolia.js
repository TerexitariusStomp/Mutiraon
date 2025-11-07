import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Get contract addresses
  const CONTRACTS = {
    vat: "0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25",
    cbiomehToken: "0x9589B102eF9D61108B05F411e4d9F3c417F4c001"
  };

  // Deploy CBiomaHJoin
  const CBiomaHJoin = await hre.ethers.getContractFactory("CBiomaHJoin");
  const cbiomehJoin = await CBiomaHJoin.deploy(CONTRACTS.vat, CONTRACTS.cbiomehToken);
  await cbiomehJoin.waitForDeployment();
  const cbiomehJoinAddress = await cbiomehJoin.getAddress();
  console.log("CBiomaHJoin deployed:", cbiomehJoinAddress);

  // Update frontend addresses
  console.log("\nUpdate frontend addresses (frontendnew/src/lib/contracts-updated.ts):");
  console.log("  cbiomehJoin:", cbiomehJoinAddress);
}

main().catch((e) => { console.error(e); process.exit(1); });