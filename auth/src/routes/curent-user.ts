import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/currentuser", (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUser };
