import hre from "hardhat";
import fs from 'fs';

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // Deploy ETH Faucet
  console.log("\n=== Deploying ETH Sepolia Faucet ===");
  const EthFaucet = await hre.ethers.getContractFactory("EthFaucet");
  const ethFaucet = await EthFaucet.deploy();
  await ethFaucet.waitForDeployment();
  const ethFaucetAddress = await ethFaucet.getAddress();
  console.log("EthFaucet deployed:", ethFaucetAddress);

  // Fund the faucet with 0.01 ETH (small amount for testing)
  console.log("\n=== Funding Faucet with 0.01 ETH ===");
  const fundTx = await deployer.sendTransaction({
    to: ethFaucetAddress,
    value: hre.ethers.parseEther("0.01")
  });
  await fundTx.wait();
  console.log("Faucet funded with 0.01 ETH");

  // Output deployment summary
  console.log("\n=== DEPLOYMENT COMPLETE ===");
  console.log("Network: Ethereum Sepolia");
  console.log("EthFaucet deployed:", ethFaucetAddress);
  console.log("Claim amount: 0.001 ETH");
  console.log("Cooldown: 24 hours");

  const deployment = {
    network: "Ethereum Sepolia",
    deployer: deployer.address,
    deploymentDate: new Date().toISOString(),
    contract: {
      name: "EthFaucet",
      address: ethFaucetAddress,
      claimAmount: "0.001 ETH",
      cooldown: "24 hours",
      funded: "0.01 ETH"
    }
  };

  // Save deployment info to file
  fs.writeFileSync('eth-faucet-sepolia-deployment.json', JSON.stringify(deployment, null, 2));
  console.log("Deployment info saved to eth-faucet-sepolia-deployment.json");

  // Output for frontend update
  console.log("\n=== UPDATE FRONTEND CONTRACTS ===");
  console.log("Update frontendnew/src/lib/contracts.ts with:");
  console.log(`  ethFaucet: "${ethFaucetAddress}",`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});