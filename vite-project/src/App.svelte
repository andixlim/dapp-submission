<script lang="ts">
  import { ethers } from "ethers";
  import type { JsonRpcSigner } from "ethers";
  import { Contract } from "ethers";
  import { ABI } from "./abi";

  let token: number;
  let stakes: number;
  let acct: any;

  const connectWallet = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const account = await provider.send("eth_accounts", []);
    acct = account;
    console.log(account);
  };

  const mint = async () => {
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = await initializeContract(signer);
    await contract.mint(token);
  };  


  const stake = async () => {
    if (stakes > 0){
    try{
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = await initializeContract(signer);
    await contract.stake(stakes);}

    catch (error) {
      alert("Not enough WHC to stake")
    }}
    else {alert("You cannot stake 0 WHC")}
  };  

  const withdraw = async () => {
    try{
    const { ethereum } = window as any;
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = await initializeContract(signer);
    await contract.withdraw();
    }
    catch (error) {
      alert("You can only withdraw once you have staked WHC")
    }
  };  

  const initializeContract = async (signer: JsonRpcSigner) => {
    return new Contract(
      "0xEda5dbc7ED595dC273675F711c3E5e8a80c65C8b", 
      ABI,
      signer
    );
  };
</script>


<main>
  <h1> WhaleCoin </h1>
  <button on:click={connectWallet}>Connect Wallet</button>
  <br><br>
  <input type="number" bind:value={token} placeholder="enter the amount of coins"/> <br>
  <button on:click={mint}> Mint WHC </button>
  <br><br>
  <input type="number" bind:value={stakes} placeholder="enter the amount of coins"/> <br>
  <button on:click={stake}> Stake WHC </button> <br>
  <button on:click={withdraw}> Withdraw Tokens </button>
</main>
