import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x8D44d661fbd8266c5451dfDb307E05963Ab5121E"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "LocalDAO Passport",
        description: "This NFT will give you access to LocalDAO!",
        image: readFileSync("scripts/assets/passport.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
