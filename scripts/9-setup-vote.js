import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const voteModule = sdk.getVoteModule(
  "0x0746d39453F895F08A0b19c8eAcC0829fc938C62"
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0xD4F710d426371dBC6Cf746513f64716bf892fD3b"
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    console.log(voteModule.address);

    // Transfer 90% of the supply to our voting contract.
    const result = await tokenModule.transfer(voteModule.address, percent90);

    console.log("✅ Successfully transferred tokens to vote module");

    console.log(result);

    const ownedTokenBalanceAfter = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmountAfter = ethers.BigNumber.from(
      ownedTokenBalanceAfter.value
    );
    console.log(ownedAmountAfter);
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
