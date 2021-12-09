import { create_UUID } from "./uuid";
import axios from "axios";
import { config } from "../config";

const decrypt_data = async (fi: any, privateKey: any, keyMaterial: any) => {
  const fi_dataArray: any = [];
  for (let i = 0; i < fi.length; i++) {
    const fi_data = fi[i];

    console.log(fi.length);
    console.log(fi[i].data.length);

    for (let j = 0; j < fi[i].data.length; j++) {
      const body = {
        base64Data: fi_data["data"][j]["encryptedFI"],
        base64RemoteNonce: fi_data["KeyMaterial"]["Nonce"],
        base64YourNonce: keyMaterial["Nonce"],
        ourPrivateKey: privateKey,
        remoteKeyMaterial: fi_data["KeyMaterial"],
      };
      console.log(body + "\n-----");

      const data = await axios({
        method: "post",
        url: config.rahasya_url + "/ecc/v1/decrypt",
        data: body,
      });

      let base64Data = data.data["base64Data"];
      let decoded_data = Buffer.from(base64Data, "base64").toString();
      console.log(decoded_data);

      fi_dataArray.push(JSON.parse(decoded_data));
    }
  }

  return fi_dataArray;
};

export { decrypt_data };
