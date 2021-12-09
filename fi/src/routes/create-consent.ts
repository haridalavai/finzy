import express, { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { makeDetachedJWS, validateDetachedJWS } from "../util/request-signing";
import { createData } from "../util/consent-details";
import { config } from "../config";
import { currentUser, requireAuth } from "@linklab-test-p/common";
import { FI } from "../models/fi";
const router = express.Router();

router.get(
  "/api/fi/consent/:mobilenumber",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    // res.send(req.params.mobilenumber);
    const mobileNumber = req.params.mobilenumber;
    const privateKey = fs.readFileSync(
      path.join(__dirname, "../keys/private_key.pem"),
      {
        encoding: "utf8",
      }
    );

    let body = createData(mobileNumber);

    let detachedJWS = makeDetachedJWS(privateKey, body);
    let requestConfig = {
      method: "post",
      url: config.api_url + "/Consent",
      headers: {
        "Content-Type": "application/json",
        client_api_key: config.client_api_key,
        "x-jws-signature": detachedJWS,
      },
      data: body,
    };

    const response = await axios({
      method: "post",
      url: "https://aa-sandbox.setu.co/Consent",

      data: body,
      headers: {
        "Content-Type": "application/json",
        client_api_key: "8b9d8fdd-1fe2-4601-805d-17f2840d09ef",
        "x-jws-signature": detachedJWS,
      },
    });

    let url =
      config.app_url +
      "/" +
      response.data.ConsentHandle +
      `?redirect_url=http://linklab.dev/fi/userData/${response.data.ConsentHandle}`;

    const fi = await FI.findOne({ user_id: req.currentUser!.id });

    if (!fi) {
      const fi = FI.build({
        consent_handle: response.data.ConsentHandle,
        user_id: req.currentUser!.id,
      });

      await fi.save();
    }

    if (fi) {
      fi.set({ consent_handle: response.data.ConsentHandle });
      await fi.save();
    }

    res.send({ fi, url });
  }
);

export { router as createConsentRouter };
