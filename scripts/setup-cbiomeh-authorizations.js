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
    cbiomehToken: "0xb6bB3d26CBEd7EE2c7AFe466A7C4cFD3A808b00a",
    cbiomehJoin: "0x0E2A86B206E99739c13aa90182Ce08fd12148cd4",
    cbiomehClipper: "0x75a372BE6bEbF3023add91557569C459246eFa7f"
  };

  console.log("Setting up authorizations for newly deployed CBiomaH contracts");

  // Get contract instances
  const vat = await hre.ethers.getContractAt("Vat", CONTRACTS.vat);
  const dog = await hre.ethers.getContractAt("Dog", CONTRACTS.dog);
  const spot = await hre.ethers.getContractAt("Spot", CONTRACTS.spot);
  const jug = await hre.ethers.getContractAt("Jug", CONTRACTS.jug);
  const cbiomeh = await hre.ethers.getContractAt("CBiomaHToken", CONTRACTS.cbiomehToken);

  // Authorization setup
  console.log("\n=== Setting up Authorizations ===");

  // Vat authorizations
  await vat.rely(CONTRACTS.cbiomehJoin);
  console.log("Vat authorization set for CBiomaHJoin");

  // Dog authorizations
  await dog.rely(CONTRACTS.cbiomehClipper);
  console.log("Dog authorization set for CBiomaHClipper");

  // CBiomaH authorizations
  await cbiomeh.rely(CONTRACTS.cbiomehJoin);
  console.log("CBiomaH authorization set for CBiomaHJoin");

  // Initialize CBiomaH collateral in Vat
  console.log("\n=== Initializing CBiomaH Collateral ===");
  const ilk = hre.ethers.encodeBytes32String("CBiomaH");
  await vat.init(ilk);
  console.log("CBiomaH collateral initialized in Vat");

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
  console.log("CBiomaH collateral is now fully configured in the Amaz ONEDOLLAR system");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
