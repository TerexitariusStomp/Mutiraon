import hre from "hardhat";

const TOKEN_ADDRESS = process.env.CBIOMEH_TOKEN || "";
const FAUCET_ADDRESS = process.env.CBIOMEH_FAUCET || "";

async function main() {
  if (!/^0x[a-fA-F0-9]{40}$/.test(TOKEN_ADDRESS)) throw new Error("Set CBIOMEH_TOKEN");
  if (!/^0x[a-fA-F0-9]{40}$/.test(FAUCET_ADDRESS)) throw new Error("Set CBIOMEH_FAUCET");
  const [signer] = await hre.ethers.getSigners();
  const abi = ["function balanceOf(address) view returns (uint256)"]; 
  const token = new hre.ethers.Contract(TOKEN_ADDRESS, abi, signer);
  const bal = await token.balanceOf(FAUCET_ADDRESS);
  console.log("Faucet token balance:", bal.toString());
}

main().catch((e) => { console.error(e); process.exit(1); });

