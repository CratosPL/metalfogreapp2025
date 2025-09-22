const { ethers } = require("hardhat");

async function main() {
  console.log("🤘 Deploying MetalForgeRegistry to Optimism...");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  // Get the ContractFactory
  const MetalForgeRegistry = await ethers.getContractFactory("MetalForgeRegistry");
  
  // Deploy the contract
  console.log("📤 Sending deployment transaction...");
  const metalForgeRegistry = await MetalForgeRegistry.deploy();
  
  // Wait for deployment
  console.log("⏳ Waiting for deployment confirmation...");
  await metalForgeRegistry.deployed();
  
  console.log("✅ MetalForgeRegistry deployed to:", metalForgeRegistry.address);
  console.log("🔗 View on Explorer:", `https://optimistic.etherscan.io/address/${metalForgeRegistry.address}`);
  
  // Transfer ownership od razu na main wallet
  const mainWallet = "0xAF9F66fD4f45ab1DD78eC63f2D469BE9789fc01D";
  console.log("🔄 Transferring ownership to main wallet...");
  await metalForgeRegistry.transferOwnership(mainWallet);
  console.log("✅ Ownership transferred to:", mainWallet);
  
  // Test the deployment
  console.log("🔍 Testing deployment...");
  const userBandCount = await metalForgeRegistry.userBandCount(mainWallet);
  console.log("User band count:", userBandCount.toString());
  
  console.log("\n🎉 Deployment successful!");
  console.log(`📋 Add this to your .env.local:`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${metalForgeRegistry.address}`);
  
  return metalForgeRegistry.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
