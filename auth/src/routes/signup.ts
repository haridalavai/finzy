import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { BadRequestError, requestValidator } from "@linklab-test-p/common";
import { User } from "../models/user";
import Cognito from "../services/cognito-service";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("username").notEmpty().isLength({ min: 5 }),
    body("email").notEmpty().normalizeEmail().isEmail(),
    body("password").isString().isLength({ min: 8 }),
    body("birthdate").exists().isISO8601(),
    body("family_name").notEmpty().isString(),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { username, password, email, birthdate, family_name } = req.body;
    let userAttrs = [];
    userAttrs.push({ Name: "email", Value: email });
    userAttrs.push({ Name: "birthdate", Value: birthdate.toString() });
    userAttrs.push({ Name: "family_name", Value: family_name });

    const cognitoService = new Cognito();
    const response = await cognitoService.signUpUser(
      username,
      password,
      userAttrs
    );

    console.log(response);

    const user = User.build({
      email: email,
      username: username,
      email_verified: false,
    });

    await user.save();

    res
      .status(201)
      .send({ message: [`Verification code sent to ${user.email}`] });
  }
);

export { router as signupRouter };
