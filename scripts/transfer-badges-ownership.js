const { ethers } = require("hardhat");

async function main() {
  console.log("🔄 Transferring Badge ownership...");
  
  const contractAddress = "0xFA45e05917c220116b58E043F1CE60a8b1C11365";
  const newOwner = "0xAF9F66fD4f45ab1DD78eC63f2D469BE9789fc01D";
  
  const MetalForgeBadges = await ethers.getContractAt("MetalForgeBadges", contractAddress);
  
  console.log("Current deployer:", (await ethers.getSigners())[0].address);
  console.log("Transferring to:", newOwner);
  
  const tx = await MetalForgeBadges.transferOwnership(newOwner);
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  
  console.log("✅ Badge ownership transferred successfully!");
}

main().catch(console.error);
