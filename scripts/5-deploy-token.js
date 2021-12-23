import sdk from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule("0x6f751a098E817AF2f22dfb07abd0AcE4DCc43B99");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "LocalDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "LOCAL",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
