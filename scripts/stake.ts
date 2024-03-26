async function main() {
    const [deployer] = await ethers.getSigners();
  
    const initialSupply = ethers.parseUnits("1000", 18);
    const myTokenContract = await await hre.ethers.deployContract("WhaleCoin", [initialSupply, deployer.address]);
    await myTokenContract.waitForDeployment();
  
    const ethAmount = ethers.parseUnits("100", 18);
    const ethAmountStake = ethers.parseUnits("10", 18);
    await myTokenContract.connect(deployer).mint(deployer.address, ethAmount);
    await myTokenContract.connect(deployer).stake(ethAmountStake)

    const stakedbalance = await myTokenContract.getStake(deployer.address);
    console.log(`Balance of ${deployer.address}: ${stakedbalance.toString()} tokens`);
    
    const balance = await myTokenContract.balanceOf(deployer.address);
    console.log("Balance of Address", balance.toString());
  
  }
  
  main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
  });