import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // server
    return axios.create({
      baseURL: process.env.BASE_URL_LOCAL,
      headers: req.headers,
    });
  } else {
    // browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export { buildClient };
