// const base64url = require("base64url");

import rs from "jsrsasign";
import base64url from "base64url";

const makeDetachedJWS = (privateKey: any, body: any) => {
  const header = { alg: "RS256", typ: "JWT" };
  let jwt = rs.KJUR.jws.JWS.sign(null, header, body, privateKey);
  // console.log(jwt);
  let splittedJWS = jwt.split(".");
  splittedJWS[1] = "";
  return splittedJWS.join(".");
};

const validateDetachedJWS = (detachedJWS: any, body: any, publicKey: any) => {
  console.log(body);
  let splitted_jws = detachedJWS.split(".");
  splitted_jws[1] = base64url(JSON.stringify(body));
  let jwt = splitted_jws.join(".");
  // console.log(jwt);
  let isValid = rs.KJUR.jws.JWS.verify(jwt, publicKey, ["RS256"]);
  console.log(isValid);
  return isValid; // boolean
};
export { makeDetachedJWS, validateDetachedJWS };
