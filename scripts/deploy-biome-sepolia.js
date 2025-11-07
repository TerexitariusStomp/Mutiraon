import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Deploy BIOME token
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  const BIOME = await hre.ethers.getContractFactory("BIOMEToken");
  const biome = await BIOME.deploy(chainId);
  await biome.waitForDeployment();
  const biomeAddress = await biome.getAddress();
  console.log("BIOMEToken deployed:", biomeAddress);

  // Optionally mint some test supply to deployer
  const mintTx = await biome.mint(deployer.address, hre.ethers.parseUnits("1000000", 18));
  await mintTx.wait();
  console.log("Minted test BIOME to deployer");

  // Output JSON for frontend upgrade
  console.log("\nUpdate frontend addresses (frontendnew/src/lib/contracts.ts):");
  console.log("  biomeToken:", biomeAddress);
  console.log("  biomeJoin: <deploy GemJoin for BIOME and paste here>");
  console.log("  biomeClipper: <deploy Clipper for BIOME and paste here>");
}

main().catch((e) => { console.error(e); process.exit(1); });

