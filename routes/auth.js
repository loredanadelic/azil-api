import express from "express";
import bodyParser from "body-parser";
import { getSignup, postLoginIn, postSignUp, resetPass, setPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", bodyParser.json(), postLoginIn);

router.post("/signup", bodyParser.json(), postSignUp);

router.get("/signup/:confirmationCode", getSignup )

router.post('/reset', bodyParser.json(), resetPass);

router.post('/new-password', bodyParser.json(), setPassword);


export default router;
