async function main() {
    const [deployer, addr1] = await ethers.getSigners();
  
    const initialSupply = ethers.parseUnits("1000", 18);
    const myTokenContract = await await hre.ethers.deployContract("WhaleCoin", [initialSupply, deployer.address]);
    await myTokenContract.waitForDeployment();
  
    const ethAmount = ethers.parseUnits("10", 18);
    await myTokenContract.connect(deployer).mint(addr1.address, ethAmount);
  
    const balance = await myTokenContract.balanceOf(addr1.address);
    console.log(`Balance of ${addr1.address}: ${balance.toString()} tokens`);
  }
  
  main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
  });