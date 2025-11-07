import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Deploy CBiomaH token
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  const CBiomaH = await hre.ethers.getContractFactory("CBiomaHToken");
  const cbiomeh = await CBiomaH.deploy(chainId);
  await cbiomeh.waitForDeployment();
  const cbiomehAddress = await cbiomeh.getAddress();
  console.log("CBiomaHToken deployed:", cbiomehAddress);

  // Optionally mint some test supply to deployer
  const mintTx = await cbiomeh.mint(deployer.address, hre.ethers.parseUnits("1000000", 18));
  await mintTx.wait();
  console.log("Minted test CBiomaH to deployer");

  // Output JSON for frontend upgrade
  console.log("\nUpdate frontend addresses (frontendnew/src/lib/contracts.ts):");
  console.log("  cbiomehToken:", cbiomehAddress);
  console.log("  cbiomehJoin: <deploy GemJoin for CBiomaH and paste here>");
  console.log("  cbiomehClipper: <deploy Clipper for CBiomaH and paste here>");
}

main().catch((e) => { console.error(e); process.exit(1); });