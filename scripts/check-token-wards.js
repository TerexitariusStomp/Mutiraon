import hre from "hardhat";

const TOKEN_ADDRESS = process.env.CBIOMEH_TOKEN || "";
const ADDRESS = process.env.CHECK_ADDRESS || "";

async function main() {
  const [signer] = await hre.ethers.getSigners();
  const addr = ADDRESS || signer.address;
  if (!/^0x[a-fA-F0-9]{40}$/.test(TOKEN_ADDRESS)) throw new Error("Set CBIOMEH_TOKEN");
  console.log("Checking wards on token", TOKEN_ADDRESS);
  console.log("For address:", addr);
  const abi = [
    "function wards(address) view returns (uint256)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)"
  ];
  const token = new hre.ethers.Contract(TOKEN_ADDRESS, abi, signer);
  const ward = await token.wards(addr);
  const total = await token.totalSupply();
  const bal = await token.balanceOf(addr);
  console.log("ward:", ward.toString());
  console.log("totalSupply:", total.toString());
  console.log("balanceOf(addr):", bal.toString());
}

main().catch((e) => { console.error(e); process.exit(1); });

