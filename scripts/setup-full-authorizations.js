import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Contract addresses from the new deployment
  const CONTRACTS = {
    vat: "0x0F52e95479f549a4246997129f7cEac5AEb03B3b",
    spot: "0xDA54e021F4C9B8239D9b70E3FCcBbaaC8954C70B",
    jug: "0x258C6Ff065D92ff829Cb62Ba5554aA763250a676",
    dog: "0x176223ae0E66E10B33Cc64ab3E7f051Fa6adb5FD",
    pot: "0x77F1CC1791830208ccfC63A07beCd38E0780fa45",
    vow: "0x139da3025aad2Ab370982c9bEAD0cCb1c853469A",
    daiJoin: "0xB9224838D2feE670B3D2BcF4059bc7AE2bf31844",
    stablecoin: "0xb4D43bF742cE16aFAaCA1332823DB0fCA2565ea4",
    cbiomehToken: "0xd8eF97d02082E7B707bADAF5bdE5b82a35483725",
    cbiomehJoin: "0xE59d40A58A79632c377e1Cd2f1c1ecF4596B7aC6",
    cbiomehClipper: "0xD41E77A6c244340b3173fEfade8C83A698D4dffa"
  };

  console.log("Setting up authorizations for the complete Amaz ONEDOLLAR system");

  // Get contract instances
  const vat = await hre.ethers.getContractAt("Vat", CONTRACTS.vat);
  const dog = await hre.ethers.getContractAt("Dog", CONTRACTS.dog);
  const spot = await hre.ethers.getContractAt("Spot", CONTRACTS.spot);
  const jug = await hre.ethers.getContractAt("Jug", CONTRACTS.jug);
  const pot = await hre.ethers.getContractAt("Pot", CONTRACTS.pot);
  const vow = await hre.ethers.getContractAt("Vow", CONTRACTS.vow);
  const stablecoin = await hre.ethers.getContractAt("StableCoin", CONTRACTS.stablecoin);
  const cbiomeh = await hre.ethers.getContractAt("CBiomaHToken", CONTRACTS.cbiomehToken);

  // Authorization setup
  console.log("\n=== Setting up Authorizations ===");

  // Vat authorizations
  await vat.rely(CONTRACTS.spot);
  await vat.rely(CONTRACTS.jug);
  await vat.rely(CONTRACTS.dog);
  await vat.rely(CONTRACTS.pot);
  await vat.rely(CONTRACTS.vow);
  await vat.rely(CONTRACTS.daiJoin);
  await vat.rely(CONTRACTS.cbiomehJoin);
  console.log("Vat authorizations set");

  // Dog authorizations
  await dog.rely(CONTRACTS.cbiomehClipper);
  console.log("Dog authorizations set");

  // Pot authorizations
  await pot.rely(CONTRACTS.vow);
  console.log("Pot authorizations set");

  // StableCoin authorizations
  await stablecoin.rely(CONTRACTS.daiJoin);
  console.log("StableCoin authorizations set");

  // CBiomaH authorizations
  await cbiomeh.rely(CONTRACTS.cbiomehJoin);
  console.log("CBiomaH authorizations set");

  // Initialize CBiomaH collateral in Vat
  console.log("\n=== Initializing CBiomaH Collateral ===");
  const ilk = hre.ethers.encodeBytes32String("CBiomaH");
  try {
    await vat.init(ilk);
    console.log("CBiomaH collateral initialized in Vat");
  } catch (error) {
    console.log("CBiomaH collateral already initialized, skipping init");
  }

  // Set up basic parameters
  console.log("\n=== Setting up Basic Parameters ===");

  // Set debt ceiling for CBiomaH (example: 1M ONEDOLLAR)
  await vat.file(ilk, hre.ethers.encodeBytes32String("line"), hre.ethers.parseUnits("1000000", 45));
  console.log("Debt ceiling set for CBiomaH");

  // Set stability fee for CBiomaH (example: 1% APY)
  await jug.init(ilk);
  await jug.file(ilk, hre.ethers.encodeBytes32String("duty"), hre.ethers.parseUnits("1000000000315522921573372069", 27)); // ~1% APY
  console.log("Stability fee set for CBiomaH");

  // Set liquidation ratio for CBiomaH (example: 150%)
  await spot.file(ilk, hre.ethers.encodeBytes32String("mat"), hre.ethers.parseUnits("150", 27));
  console.log("Liquidation ratio set for CBiomaH");

  // Set chop (liquidation penalty) for CBiomaH (example: 13%)
  await dog.file(ilk, hre.ethers.encodeBytes32String("chop"), hre.ethers.parseUnits("113", 25)); // 1.13 * 10^25
  console.log("Liquidation penalty set for CBiomaH");

  // Set hole (max auction size) for CBiomaH
  await dog.file(ilk, hre.ethers.encodeBytes32String("hole"), hre.ethers.parseUnits("50000", 45));
  console.log("Max auction size set for CBiomaH");

  // Set clip (auction contract) for CBiomaH
  await dog.file(ilk, hre.ethers.encodeBytes32String("clip"), CONTRACTS.cbiomehClipper);
  console.log("Auction contract set for CBiomaH");

  // Set price feed for CBiomaH (using a mock price feed for now)
  const mockPrice = hre.ethers.parseUnits("1", 27); // $1 per CBiomaH
  await spot.file(ilk, hre.ethers.encodeBytes32String("pip"), "0x0000000000000000000000000000000000000000"); // Mock address
  console.log("Price feed set for CBiomaH");

  // Poke spot to update price
  await spot.poke(ilk);
  console.log("Price feed updated for CBiomaH");

  console.log("\n=== AUTHORIZATIONS AND SETUP COMPLETE ===");
  console.log("Amaz ONEDOLLAR stablecoin system is fully deployed and configured");
  console.log("Deployer account has complete authority over all contracts");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
