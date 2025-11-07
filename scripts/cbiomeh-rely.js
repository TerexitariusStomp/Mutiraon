import hre from "hardhat";

// Grants ward (mint) rights on CBiomaHToken to TARGET_ADDRESS.
// Must be run with a signer that is already a ward on the token.
// Usage:
//   CBIOMEH_TOKEN=0x... TARGET_ADDRESS=0x... npx hardhat run scripts/cbiomeh-rely.js --network sepolia

const TOKEN_ADDRESS = process.env.CBIOMEH_TOKEN || "";
const TARGET_ADDRESS = process.env.TARGET_ADDRESS || "";

async function main() {
  if (!/^0x[a-fA-F0-9]{40}$/.test(TOKEN_ADDRESS)) throw new Error("Set CBIOMEH_TOKEN");
  if (!/^0x[a-fA-F0-9]{40}$/.test(TARGET_ADDRESS)) throw new Error("Set TARGET_ADDRESS");
  const [signer] = await hre.ethers.getSigners();
  console.log("Using signer:", signer.address);

  const abi = [
    "function wards(address) view returns (uint256)",
    "function rely(address) external"
  ];
  const token = new hre.ethers.Contract(TOKEN_ADDRESS, abi, signer);
  const isWard = await token.wards(signer.address);
  if (isWard === 0n) throw new Error("Current signer is not a ward; cannot call rely");
  console.log("Granting ward to:", TARGET_ADDRESS);
  const tx = await token.rely(TARGET_ADDRESS);
  await tx.wait();
  console.log("Ward granted.");
}

main().catch((e) => { console.error(e); process.exit(1); });

