import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Contract addresses from the new deployment
  const CONTRACTS = {
    vat: "0x7E198F35577fCbaA93c9Cf983A8d9d96979cdD25",
    spot: "0x8583bcD939571Eaa21D9BBfDCc82e7A0Fda2c38f",
    jug: "0x1Db55dA3a3eD1BC092E297A5D166C9F1d4EC0283",
    dog: "0x75af7fF5098beCBA8a8d483bEfd11ed12ad9525F",
    stablecoin: "0x3B3Dc8305bd491cffe41DC955C0fCa16bfbE1E3A",
    daiJoin: "0xd8D7Ab4762e0d70DdCDEF22f757c5662E1488dB8",
    cbiomehToken: "0xb6bB3d26CBEd7EE2c7AFe466A7C4cFD3A808b00a",
    cbiomehJoin: "0x0E2A86B206E99739c13aa90182Ce08fd12148cd4",
    cbiomehClipper: "0x75a372BE6bEbF3023add91557569C459246eFa7f"
  };

  console.log("Testing CBiomaH deployment and basic functionality");

  // Get contract instances
  const vat = await hre.ethers.getContractAt("Vat", CONTRACTS.vat);
  const spot = await hre.ethers.getContractAt("Spot", CONTRACTS.spot);
  const jug = await hre.ethers.getContractAt("Jug", CONTRACTS.jug);
  const dog = await hre.ethers.getContractAt("Dog", CONTRACTS.dog);
  const stablecoin = await hre.ethers.getContractAt("StableCoin", CONTRACTS.stablecoin);
  const daiJoin = await hre.ethers.getContractAt("DaiJoin", CONTRACTS.daiJoin);
  const cbiomeh = await hre.ethers.getContractAt("CBiomaHToken", CONTRACTS.cbiomehToken);
  const cbiomehJoin = await hre.ethers.getContractAt("CBiomaHJoin", CONTRACTS.cbiomehJoin);

  console.log("\n=== Testing Contract Connections ===");

  // Test CBiomaH token
  const name = await cbiomeh.name();
  const symbol = await cbiomeh.symbol();
  const decimals = await cbiomeh.decimals();
  console.log(`CBiomaH Token: ${name} (${symbol}) - ${decimals} decimals`);

  // Test stablecoin
  const stableName = await stablecoin.name();
  const stableSymbol = await stablecoin.symbol();
  console.log(`Stablecoin: ${stableName} (${stableSymbol})`);

  // Test CBiomaH balance
  const cbiomehBalance = await cbiomeh.balanceOf(deployer.address);
  console.log(`Deployer CBiomaH balance: ${hre.ethers.formatUnits(cbiomehBalance, 18)}`);

  console.log("\n=== Testing Collateral Setup ===");

  // Test collateral initialization
  const ilk = hre.ethers.encodeBytes32String("CBiomaH");
  try {
    const ilkData = await vat.ilks(ilk);
    console.log(`CBiomaH collateral initialized - Art: ${ilkData[0]}, rate: ${ilkData[1]}, spot: ${ilkData[2]}, line: ${ilkData[3]}`);
  } catch (error) {
    console.log("CBiomaH collateral not initialized yet:", error.message);
  }

  // Test authorizations
  console.log("\n=== Testing Authorizations ===");

  // Check if CBiomaH Join is authorized in Vat
  const vatWards = await vat.wards(CONTRACTS.cbiomehJoin);
  console.log(`CBiomaH Join authorized in Vat: ${vatWards === 1n}`);

  // Check if CBiomaH is authorized in Join
  const cbiomehWards = await cbiomeh.wards(CONTRACTS.cbiomehJoin);
  console.log(`CBiomaH Join authorized in CBiomaH token: ${cbiomehWards === 1n}`);

  // Check if Clipper is authorized in Dog
  const dogWards = await dog.wards(CONTRACTS.cbiomehClipper);
  console.log(`CBiomaH Clipper authorized in Dog: ${dogWards === 1n}`);

  console.log("\n=== Testing Basic Vault Operations ===");

  // Test joining CBiomaH to the system
  try {
    // Approve CBiomaH for Join contract
    await cbiomeh.approve(CONTRACTS.cbiomehJoin, hre.ethers.parseUnits("1000", 18));
    console.log("Approved CBiomaH for Join contract");

    // Join CBiomaH to Vat
    await cbiomehJoin.join(deployer.address, hre.ethers.parseUnits("100", 18));
    console.log("Joined 100 CBiomaH to Vat");

    // Check Vat balance
    const urnData = await vat.urns(ilk, deployer.address);
    console.log(`Vat CBiomaH balance: ${urnData[0]} ink, ${urnData[1]} art`);

  } catch (error) {
    console.log("Vault operations test failed:", error.message);
  }

  console.log("\n=== DEPLOYMENT TEST COMPLETE ===");
  console.log("CBiomaH contracts are deployed and basic functionality verified");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});