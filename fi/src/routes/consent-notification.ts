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

const router = express.Router();

router.post(
  "/Consent/Notification/",
  (req: Request, res: Response, next: NextFunction) => {
    var body = req.body;
    console.log(body);

    let headers = req.headers;
    let obj = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../keys/setu_public_key.json"),
        "utf8"
      )
    );
    let pem = jwkToPem(obj);

    if (validateDetachedJWS(headers["x-jws-signature"], body, pem)) {
      let consent_id = body.ConsentStatusNotification.consentId;
      let consent_status = body.ConsentStatusNotification.consentStatus;

      localStorage.setItem("consent_id", consent_id);
      localStorage.setItem("consent_status", consent_status);

      if (consent_status === "ACTIVE") {
        fetchSignedConsent(consent_id);
      }

      const dateNow = new Date();
      res.send({
        ver: "1.0",
        timestamp: dateNow.toISOString(),
        txnid: create_UUID(),
        response: "OK",
      });
    } else {
      res.send("Invalid Signature");
    }
  }
);

const fetchSignedConsent = (consent_id: any) => {
  const privateKey = fs.readFileSync(
    path.join(__dirname, "../keys/private_key.pem"),
    {
      encoding: "utf8",
    }
  );
  let detachedJWS = makeDetachedJWS(privateKey, "/Consent/" + consent_id);
  var requestConfig = {
    method: "get",
    url: config.api_url + "/Consent/" + consent_id,
    headers: {
      "Content-Type": "application/json",
      client_api_key: config.client_api_key!,
      "x-jws-signature": detachedJWS,
    },
  };

  axios({
    method: "get",
    url: config.api_url + "/Consent/" + consent_id,
    headers: {
      "Content-Type": "application/json",
      client_api_key: config.client_api_key!,
      "x-jws-signature": detachedJWS,
    },
  })
    .then(function (response) {
      fi_data_request(response.data.signedConsent, consent_id);
    })
    .catch(function (error) {
      console.log(error);
      console.log("Error");
    });
};

const fi_data_request = async (signedConsent: any, consent_id: any) => {
  let keys = await generateKeyMaterial();
  let request_body = requestDataBody(
    signedConsent,
    consent_id,
    keys["KeyMaterial"]
  );
  const privateKey = fs.readFileSync(
    path.join(__dirname, "./keys/private_key.pem"),
    {
      encoding: "utf8",
    }
  );
  let detachedJWS = makeDetachedJWS(privateKey, request_body);
  var requestConfig = {
    method: "post",
    url: config.api_url + "/FI/request",
    headers: {
      "Content-Type": "application/json",
      client_api_key: config.client_api_key,
      "x-jws-signature": detachedJWS,
    },
    data: request_body,
  };

  axios({
    method: "post",
    url: config.api_url + "/FI/request",
    headers: {
      "Content-Type": "application/json",
      client_api_key: config.client_api_key,
      "x-jws-signature": detachedJWS,
    },
    data: request_body,
  }).then(function (response) {
    // Ideally, after this step we save the session ID in your DB and wait for FI notification and then proceed.
    console.log(response);
  });
};

export { router as consentNotificationRouter };
