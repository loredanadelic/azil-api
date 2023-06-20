import express from "express";
import bodyParser from "body-parser";
import { body } from "express-validator";
import {
  deleteAnimal,
  editAnimal,
  getAnimals,
  postAnimal,
} from "../controllers/animals.js";
import { validateAnimalEdit, validateAnimalInput } from "../util/validation.js";
const router = express.Router();
router.get("/", getAnimals);
router.post(
  "/",
  bodyParser.json(),
  validateAnimalInput(),
  postAnimal
);
router.put(
  "/:animalId",
  bodyParser.json(),
  validateAnimalEdit(),
  editAnimal
);
router.delete("/:animalId", bodyParser.json(), deleteAnimal);
export default router;
