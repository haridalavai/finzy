import { NotFoundError, requestValidator } from "@linklab-test-p/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import Cognito from "../services/cognito-service";

const router = express.Router();

router.post(
  "/api/users/verify",
  [
    body("username").notEmpty().isLength({ min: 5 }),
    body("code").notEmpty().isString().isLength({ min: 6, max: 6 }),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { username, code } = req.body;

    const cognitoService = new Cognito();
    const response = await cognitoService.confirmSignUp(username, code);

    const user = await User.findOne({ username: username });

    console.log(username);

    if (!user) {
      throw new NotFoundError();
    }
    console.log(user);

    user.set({ email_verified: true });
    await user.save();
    res
      .status(200)
      .send({ message: [`email verified`, `account created successfully`] });
  }
);

export { router as verifyRouter };
