import hre from "hardhat";

const TOKEN_ADDRESS = process.env.CBIOMEH_TOKEN || ""; // set or pass env var

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  if (!TOKEN_ADDRESS || !/^0x[a-fA-F0-9]{40}$/.test(TOKEN_ADDRESS)) {
    throw new Error("Set CBIOMEH_TOKEN env var to the deployed CBiomaHToken address.");
  }

  // Deploy faucet
  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(TOKEN_ADDRESS);
  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();
  console.log("Faucet deployed:", faucetAddress);

  // Mint 100,000,000 CBiomaH to faucet
  const token = await hre.ethers.getContractAt("CBiomaHToken", TOKEN_ADDRESS, deployer);
  const amount = hre.ethers.parseUnits("100000000", 18);
  const mintTx = await token.mint(faucetAddress, amount);
  await mintTx.wait();
  console.log("Minted 100,000,000 CBiomaH to faucet");

  console.log("\nUpdate frontend addresses:");
  console.log("  cbiomehToken:", TOKEN_ADDRESS);
  console.log("  cbiomehFaucet:", faucetAddress);
}

main().catch((e) => { console.error(e); process.exit(1); });

