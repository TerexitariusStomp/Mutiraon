import hre from "hardhat";

const TOKEN_ADDRESS = process.env.CBIOMEH_TOKEN || "";
const FAUCET_ADDRESS = process.env.CBIOMEH_FAUCET || "";
const AMOUNT = process.env.CBIOMEH_AMOUNT || "100000000"; // default 100,000,000

async function main() {
  const [signer] = await hre.ethers.getSigners();
  console.log("Signer:", signer.address);

  if (!/^0x[a-fA-F0-9]{40}$/.test(TOKEN_ADDRESS)) throw new Error("Set CBIOMEH_TOKEN");
  if (!/^0x[a-fA-F0-9]{40}$/.test(FAUCET_ADDRESS)) throw new Error("Set CBIOMEH_FAUCET");

  const token = await hre.ethers.getContractAt("CBiomaHToken", TOKEN_ADDRESS, signer);
  const amount = hre.ethers.parseUnits(AMOUNT, 18);
  console.log(`Minting ${AMOUNT} CBiomaH to faucet ${FAUCET_ADDRESS}...`);
  const tx = await token.mint(FAUCET_ADDRESS, amount);
  await tx.wait();
  console.log("Minted.");
}

main().catch((e) => { console.error(e); process.exit(1); });

