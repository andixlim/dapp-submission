async function main() {
    const [deployer] = await ethers.getSigners();
    const initialSupply = ethers.parseUnits("1000", 18);
    const myTokenContract = await await hre.ethers.deployContract("WhaleCoin", [initialSupply, deployer.address]);
    await myTokenContract.waitForDeployment();
  
    const ethAmount = ethers.parseUnits("10", 18);
    const ethAmountStake = ethers.parseUnits("10", 18);
    await myTokenContract.connect(deployer).mint(deployer.address, ethAmount);
    await myTokenContract.connect(deployer).stake(ethAmountStake)

    const initialbalance = await myTokenContract.balanceOf(deployer.address);
    console.log("Initial balance: ", initialbalance.toString());

    const stakedbalance = await myTokenContract.getStake(deployer.address);
    console.log(`Staking Balance of ${deployer.address}: ${stakedbalance.toString()} tokens`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    await myTokenContract.connect(deployer).withdraw();

    const stakeAfterWithdraw = await myTokenContract.getStake(deployer.address);
    console.log("Withdrawal successful. Staked balance after withdrawal: ", stakeAfterWithdraw.toString());

    const finalbalance = await myTokenContract.balanceOf(deployer.address);
    console.log("Address final balance after withdraw: ", finalbalance.toString());
    console.log(`Contract deployed to ${myTokenContract.target}`);
  }
  
  main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
  });