import express, { Request, Response, NextFunction } from "express";
import jwkToPem from "jwk-to-pem";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { makeDetachedJWS, validateDetachedJWS } from "../util/request-signing";
import { create_UUID } from "../util/uuid";
import { createData } from "../util/consent-details";
import { config } from "../config";
import { generateKeyMaterial, requestDataBody } from "../util/request-data";
import { NotFoundError, requireAuth } from "@linklab-test-p/common";
import { decrypt_data } from "../util/decrypt-data";
import { FI } from "../models/fi";
import FiAnaliser from "../services/fi-analiser";
const router = express.Router();

router.get(
  "/api/fi/fetch-consent/:consentHandle",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const consentId = req.params.consentId;
    const privateKey = fs.readFileSync(
      path.join(__dirname, "../keys/private_key.pem"),
      {
        encoding: "utf8",
      }
    );
    let detachedJWS = makeDetachedJWS(
      privateKey,
      "/Consent/handle" + req.params.consentHandle
    );

    try {
      const data = await axios({
        method: "get",
        url: `https://aa-sandbox.setu.co/Consent/handle/${req.params.consentHandle}`,

        headers: {
          "Content-Type": "application/json",
          client_api_key: "8b9d8fdd-1fe2-4601-805d-17f2840d09ef",
          "x-jws-signature": detachedJWS,
        },
      });

      const fi = await FI.findOne({ consent_handle: req.params.consentHandle });

      if (!fi) {
        throw new NotFoundError();
      }
      fi.set({ consent_id: data.data.ConsentStatus.id });
      await fi.save();

      const resp = await fetchSignedConsent(
        data.data.ConsentStatus.id,
        privateKey
      );
      console.log(resp);
      fi.set({ fi_raw: resp });
      await fi.save();

      const fiAnalyser = new FiAnaliser();
      const fi_structured = await fiAnalyser.analyseFi(fi);
      fi.set({
        fi: fi_structured,
      });
      await fi.save();

      res.send({ message: ["data fetch was successful"] });
    } catch (e) {
      console.log(e);
      throw new NotFoundError();
    }
  }
);

const fetchSignedConsent = async (consent_id: any, privateKey: any) => {
  let detachedJWS = makeDetachedJWS(privateKey, "/Consent/" + consent_id);

  const data = await axios({
    method: "get",
    url: config.api_url + "/Consent/" + consent_id,
    headers: {
      "Content-Type": "application/json",
      client_api_key: config.client_api_key!,
      "x-jws-signature": detachedJWS,
    },
  });

  const dataResp = await fi_data_request(
    data.data.signedConsent,
    consent_id,
    privateKey
  );
  //   console.log(dataResp);

  return dataResp;
};

const fi_data_request = async (
  signedConsent: any,
  consent_id: any,
  privateKey: any
) => {
  let keys = await generateKeyMaterial();
  let request_body = requestDataBody(
    signedConsent,
    consent_id,
    keys["KeyMaterial"]
  );

  let detachedJWS = makeDetachedJWS(privateKey, request_body);

  try {
    const datar = await axios({
      method: "post",
      url: config.api_url + "/FI/request",
      headers: {
        "Content-Type": "application/json",
        client_api_key: config.client_api_key,
        "x-jws-signature": detachedJWS,
      },
      data: request_body,
    });
    const dec_data = fi_data_fetch(
      datar.data.sessionId,
      keys["privateKey"],
      keys["KeyMaterial"],
      privateKey
    );
    return dec_data;
  } catch (e) {
    console.log(e);
    throw new NotFoundError();
  }
};

const fi_data_fetch = async (
  session_id: any,
  encryption_privateKey: any,
  keyMaterial: any,
  privateKey: any
) => {
  let detachedJWS = makeDetachedJWS(privateKey, "/FI/fetch/" + session_id);

  const de_data = await axios({
    method: "get",
    url: config.api_url + "/FI/fetch/" + session_id,
    headers: {
      "Content-Type": "application/json",
      client_api_key: config.client_api_key,
      "x-jws-signature": detachedJWS,
    },
  });
  console.log(de_data);

  const decrypted_data = await decrypt_data(
    de_data.data.FI,
    encryption_privateKey,
    keyMaterial
  );
  console.log(de_data.data.FI);

  return decrypted_data;
};
export { router as fetchConsentRouter };
