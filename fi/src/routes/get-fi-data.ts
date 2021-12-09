import express, { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { makeDetachedJWS, validateDetachedJWS } from "../util/request-signing";
import { createData } from "../util/consent-details";
import { config } from "../config";
import {
  currentUser,
  NotFoundError,
  requireAuth,
} from "@linklab-test-p/common";
import { FI } from "../models/fi";
const router = express.Router();

router.get(
  "/api/fi/get-fiData/:userId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    const fi = await FI.findOne({ user_id: userId });

    res.send({ fi: fi || null });
  }
);

export { router as getFiData };
