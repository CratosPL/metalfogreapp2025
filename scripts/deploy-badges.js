const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying MetalForgeBadges to Base mainnet...");
  
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("🔑 Deploying with account:", deployer.address);
  
  // Check balance - ✅ ZMIENIONE
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.utils.formatEther(balance), "ETH");
  
  // Deploy contract
  const MetalForgeBadges = await hre.ethers.getContractFactory("MetalForgeBadges");
  const badges = await MetalForgeBadges.deploy();
  
  console.log("⏳ Waiting for deployment...");
  await badges.deployed(); // ✅ TAKŻE ZMIENIONE dla starszej wersji
  
  const contractAddress = badges.address; // ✅ ZMIENIONE
  console.log("✅ MetalForgeBadges deployed to:", contractAddress);
  console.log("📝 Transaction hash:", badges.deployTransaction?.hash);
  console.log("🔍 Verify on BaseScan:", `https://basescan.org/address/${contractAddress}`);
  
  console.log("\n📋 SAVE THIS INFO:");
  console.log("Contract Address:", contractAddress);
  console.log("Network: Base Mainnet");
  console.log("Chain ID: 8453");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });
