import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import cors from "cors";
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from "@linklab-test-p/common";
import { createConsentRouter } from "./routes/create-consent";
import { consentNotificationRouter } from "./routes/consent-notification";
import { fetchConsentRouter } from "./routes/fetch-consent";
import { getFiData } from "./routes/get-fi-data";

const app = express();

app.use(json());
app.set("trust proxy", true);

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(cors());
app.use(currentUser);
app.use(createConsentRouter);
app.use(consentNotificationRouter);
app.use(fetchConsentRouter);
app.use(getFiData);

app.all("*", (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
