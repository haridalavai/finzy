import { BadRequestError } from "@linklab-test-p/common";
import AWS from "aws-sdk";
import { String } from "aws-sdk/clients/acm";
import crypto from "crypto";

export default class Cognito {
  private config = {
    apiVersion: "2016-04-18",
    region: "ap-south-1",
  };
  private secretHash = "19prnof4t1fgfv66spb6ne9v1usbjmin6rutmetj5brqufvgm3pr";
  private clientId = "lp9s1aiibmik7gork3pgm0l5e";

  private cognitoIdentity;

  constructor() {
    this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
  }

  public async signUpUser(
    username: string,
    password: string,
    userAttr: Array<any>
  ): Promise<AWS.CognitoIdentityServiceProvider.SignUpResponse> {
    var params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
      UserAttributes: userAttr,
    };

    try {
      const data = await this.cognitoIdentity.signUp(params).promise();
      return data;
    } catch (err: any) {
      console.log(err);

      throw new BadRequestError(err.message);
    }
  }

  public async signInUser(
    username: string,
    password: string
  ): Promise<AWS.CognitoIdentityServiceProvider.InitiateAuthResponse> {
    var params = {
      AuthFlow: "USER_PASSWORD_AUTH" /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(username),
      },
    };

    try {
      let data = await this.cognitoIdentity.initiateAuth(params).promise();
      return data;
    } catch (error: any) {
      throw new BadRequestError(error.message);
    }
  }

  public async confirmSignUp(
    username: string,
    code: string
  ): Promise<AWS.CognitoIdentityServiceProvider.ConfirmSignUpResponse> {
    var params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      Username: username,
      SecretHash: this.hashSecret(username),
    };

    try {
      const cognitoResp = await this.cognitoIdentity
        .confirmSignUp(params)
        .promise();
      console.log(cognitoResp);
      return cognitoResp;
    } catch (error: any) {
      console.log("error", error);
      throw new BadRequestError(error.message);
    }
  }

  public async forgotPassword(username: string): Promise<boolean> {
    var params = {
      ClientId: this.clientId /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity.forgotPassword(params).promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async confirmNewPassword(
    username: string,
    password: string,
    code: string
  ): Promise<boolean> {
    var params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    try {
      const data = await this.cognitoIdentity
        .confirmForgotPassword(params)
        .promise();
      console.log(data);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private hashSecret(username: string): string {
    return crypto
      .createHmac("SHA256", this.secretHash)
      .update(username + this.clientId)
      .digest("base64");
  }
}
