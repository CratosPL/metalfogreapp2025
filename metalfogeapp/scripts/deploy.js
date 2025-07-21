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
  await metalForgeRegistry.deployed(); // v5 syntax
  
  console.log("✅ MetalForgeRegistry deployed to:", metalForgeRegistry.address);
  console.log("🔗 View on Explorer:", `https://goerli-optimism.etherscan.io/address/${metalForgeRegistry.address}`);
  
  // Test the deployment
  console.log("🔍 Testing deployment...");
  const totalBands = await metalForgeRegistry.getTotalBands();
  console.log("Total bands:", totalBands.toString());
  
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
