import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";
import { requestValidator, BadRequestError } from "@linklab-test-p/common";
import { Password } from "../services/password";
import Cognito from "../services/cognito-service";
import { InitiateAuthResponse } from "aws-sdk/clients/cognitoidentityserviceprovider";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("username").notEmpty().isLength({ min: 5 }),
    body("password").isString().isLength({ min: 8 }),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;
    let cognitoService = new Cognito();
    const response: InitiateAuthResponse = await cognitoService.signInUser(
      username,
      password
    );

    const user = await User.findOne({ username: username });

    if (!user) {
      throw new BadRequestError("Invalid Credentials");
    }
    req.session = {
      access_token: response.AuthenticationResult?.AccessToken,
      email: user.email,
      id: user.id,
      username: user.username,
    };
    res.status(200).send({
      message: [`Signed in as ${user.username}`],
    });
  }
);

export { router as signinRouter };
