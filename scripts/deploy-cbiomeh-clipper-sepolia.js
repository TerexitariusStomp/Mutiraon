import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Get contract addresses
  const CONTRACTS = {
    vat: "0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25",
    spot: "0x8583bcD939571Eaa21D9BBfDCc82e7A0Fda2c38f",
    dog: "0x75af7fF5098beCBA8a8d483bEfd11ed12ad9525F"
  };

  // Deploy CBiomaHClipper
  const CBiomaHClipper = await hre.ethers.getContractFactory("CBiomaHClipper");
  const cbiomehClipper = await CBiomaHClipper.deploy(CONTRACTS.vat, CONTRACTS.spot, CONTRACTS.dog);
  await cbiomehClipper.waitForDeployment();
  const cbiomehClipperAddress = await cbiomehClipper.getAddress();
  console.log("CBiomaHClipper deployed:", cbiomehClipperAddress);

  // Update frontend addresses
  console.log("\nUpdate frontend addresses (frontendnew/src/lib/contracts-updated.ts):");
  console.log("  cbiomehClipper:", cbiomehClipperAddress);
}

main().catch((e) => { console.error(e); process.exit(1); });