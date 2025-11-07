import hre from "hardhat";

// Usage:
//   NEW_CBIOMEH_JOIN=0x... NEW_CBIOMEH_CLIPPER=0x... npx hardhat run scripts/configure-cbiomeh-ilk.js --network sepolia

const CORE = {
  // Core referenced by deploy-cbiomeh-*-sepolia scripts
  vat:   "0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25",
  spot:  "0x8583bcD939571Eaa21D9BBfDCc82e7A0Fda2c38f",
  jug:   "0x1Db55dA3a3eD1BC092E297A5D166C9F1d4EC0283",
  dog:   "0x75af7fF5098beCBA8a8d483bEfd11ed12ad9525F",
  token: "0x9589B102eF9D61108B05F411e4d9F3c417F4c001", // token used by deploy-cbiomeh-join-sepolia.js
};

async function main() {
  const joinAddr = process.env.NEW_CBIOMEH_JOIN;
  const clipAddr = process.env.NEW_CBIOMEH_CLIPPER;
  if (!/^0x[a-fA-F0-9]{40}$/.test(joinAddr || "") || !/^0x[a-fA-F0-9]{40}$/.test(clipAddr || "")) {
    throw new Error("Provide NEW_CBIOMEH_JOIN and NEW_CBIOMEH_CLIPPER env vars.");
  }

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  const vat = await hre.ethers.getContractAt("Vat", CORE.vat, deployer);
  const spot = await hre.ethers.getContractAt("Spot", CORE.spot, deployer);
  const jug  = await hre.ethers.getContractAt("Jug", CORE.jug, deployer);
  const dog  = await hre.ethers.getContractAt("Dog", CORE.dog, deployer);

  const ilk = hre.ethers.encodeBytes32String("CBiomaH");

  console.log("Relying Join on Vat and Clipper on Dog");
  await (await vat.rely(joinAddr)).wait();
  await (await dog.rely(clipAddr)).wait();

  console.log("Initializing and configuring ilk CBiomaH");
  try {
    await (await vat.init(ilk)).wait();
  } catch (e) { console.log("vat.init already done"); }

  // Debt ceiling
  await (await vat["file(bytes32,bytes32,uint256)"](ilk, hre.ethers.encodeBytes32String("line"), hre.ethers.parseUnits("1000000", 45))).wait();
  // Stability fee ~1% APY
  try { await (await jug.init(ilk)).wait(); } catch (e) { console.log("jug.init already done"); }
  await (await jug["file(bytes32,bytes32,uint256)"](ilk, hre.ethers.encodeBytes32String("duty"), hre.ethers.parseUnits("1000000000315522921573372069", 27))).wait();
  // Liquidation params
  await (await spot["file(bytes32,bytes32,uint256)"](ilk, hre.ethers.encodeBytes32String("mat"), hre.ethers.parseUnits("150", 27))).wait();
  await (await dog["file(bytes32,bytes32,uint256)"](ilk, hre.ethers.encodeBytes32String("chop"), hre.ethers.parseUnits("113", 25))).wait();
  await (await dog["file(bytes32,bytes32,uint256)"](ilk, hre.ethers.encodeBytes32String("hole"), hre.ethers.parseUnits("50000", 45))).wait();
  await (await dog["file(bytes32,bytes32,address)"](ilk, hre.ethers.encodeBytes32String("clip"), clipAddr)).wait();
  // Mock price feed + poke
  await (await spot["file(bytes32,bytes32,address)"](ilk, hre.ethers.encodeBytes32String("pip"), "0x0000000000000000000000000000000000000000")).wait();
  await (await spot.poke(ilk)).wait();

  console.log("CBiomaH configured with Join:", joinAddr, "Clipper:", clipAddr);
}

main().catch((e) => { console.error(e); process.exit(1); });
