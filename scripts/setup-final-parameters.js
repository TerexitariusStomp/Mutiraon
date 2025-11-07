import hre from "hardhat";

// Configure faucet to 100 tokens per claim and 24h cooldown
// Usage:
//   CBIOMEH_FAUCET=0x... npx hardhat run scripts/setup-final-parameters.js --network sepolia

const FAUCET_ADDRESS = process.env.CBIOMEH_FAUCET || "";

async function main() {
  if (!/^0x[a-fA-F0-9]{40}$/.test(FAUCET_ADDRESS)) {
    throw new Error("Set CBIOMEH_FAUCET env var to the deployed Faucet address.");
  }

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const faucet = await hre.ethers.getContractAt("Faucet", FAUCET_ADDRESS, deployer);
  const amount = hre.ethers.parseUnits("100", 18); // 100 CBiomaH
  const cooldown = 24 * 60 * 60; // 24 hours
  const enabled = true;

  console.log("Setting faucet parameters:", {
    faucet: FAUCET_ADDRESS,
    claimAmount: "100 * 1e18",
    cooldown: `${cooldown}s`,
    enabled,
  });

  const tx = await faucet.setParameters(amount, cooldown, enabled);
  await tx.wait();
  console.log("Faucet parameters updated.");
}

main().catch((e) => { console.error(e); process.exit(1); });

