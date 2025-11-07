import hre from "hardhat";
import fs from "fs";

function extractSepoliaAddresses(tsPath) {
  const txt = fs.readFileSync(tsPath, "utf8");
  const section = txt.split("export const CONTRACT_ADDRESSES")[1] || "";
  const sepoliaBlockMatch = section.match(/sepolia:\s*\{([\s\S]*?)\}/);
  if (!sepoliaBlockMatch) return {};
  const block = sepoliaBlockMatch[1];
  const re = /(\w+):\s*"(0x[a-fA-F0-9]{40})"/g;
  const out = {};
  let m;
  while ((m = re.exec(block))) {
    out[m[1]] = m[2];
  }
  return out;
}

async function main() {
  const addresses = extractSepoliaAddresses("frontendnew/src/lib/contracts-updated.ts");
  let ethFaucet = undefined;
  if (fs.existsSync("eth-faucet-sepolia-deployment.json")) {
    try {
      const j = JSON.parse(fs.readFileSync("eth-faucet-sepolia-deployment.json", "utf8"));
      ethFaucet = j?.contract?.address;
    } catch {}
  }

  console.log("Verifying on-chain code presence for Sepolia addresses...\n");
  const provider = hre.ethers.provider;

  const report = [];
  for (const [key, addr] of Object.entries(addresses)) {
    const code = await provider.getCode(addr);
    report.push({ key, addr, hasCode: code && code !== "0x" });
  }
  if (ethFaucet) {
    const code = await provider.getCode(ethFaucet);
    report.push({ key: "ethFaucet", addr: ethFaucet, hasCode: code && code !== "0x" });
  }

  // Extra sanity calls for known contracts
  const extra = [];
  if (addresses.cbiomehToken) {
    try {
      const ercAbi = ["function totalSupply() view returns (uint256)", "function name() view returns (string)"]; 
      const token = new hre.ethers.Contract(addresses.cbiomehToken, ercAbi, (await hre.ethers.getSigners())[0]);
      const ts = await token.totalSupply();
      const nm = await token.name();
      extra.push({ key: "cbiomehToken", ok: true, totalSupply: ts.toString(), name: nm });
    } catch (e) {
      extra.push({ key: "cbiomehToken", ok: false, error: e.message });
    }
  }
  if (addresses.cbiomehFaucet) {
    try {
      const fAbi = ["function claimAmount() view returns (uint256)", "function cooldown() view returns (uint256)", "function enabled() view returns (bool)"];
      const f = new hre.ethers.Contract(addresses.cbiomehFaucet, fAbi, (await hre.ethers.getSigners())[0]);
      const [amt, cd, en] = await Promise.all([f.claimAmount(), f.cooldown(), f.enabled()]);
      extra.push({ key: "cbiomehFaucet", ok: true, claimAmount: amt.toString(), cooldown: cd.toString(), enabled: en });
    } catch (e) {
      extra.push({ key: "cbiomehFaucet", ok: false, error: e.message });
    }
  }
  if (ethFaucet) {
    try {
      const efAbi = ["function canClaim(address) view returns (bool)"];
      const ef = new hre.ethers.Contract(ethFaucet, efAbi, (await hre.ethers.getSigners())[0]);
      const ok = await ef.canClaim("0x0000000000000000000000000000000000000001");
      extra.push({ key: "ethFaucet", ok: true, sampleCanClaim: ok });
    } catch (e) {
      extra.push({ key: "ethFaucet", ok: false, error: e.message });
    }
  }

  console.log("Code presence report:");
  for (const r of report) {
    console.log(`- ${r.key}: ${r.addr} => ${r.hasCode ? "OK" : "EMPTY"}`);
  }
  if (extra.length) {
    console.log("\nSanity call results:");
    for (const e of extra) {
      console.log("-", e);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });

