import express from "express";
import bodyParser from "body-parser";
import { postLoginIn, postLogout, postSignUp } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", bodyParser.json(), postLoginIn);

router.post("/signup", bodyParser.json(), postSignUp);

router.post("/logout", bodyParser.json(), postLogout);
export default router;
