import Animal from "../models/animal.js";
import { validationResult } from "express-validator";
import { getQuery } from "../util/helpers.js";
export const getAnimals = async (req, res, next) => {
  const type = req.query.type || '';
  const adopted = req.query.adopted || '';
  const name=req.query.name || ''
  const animals = await Animal.findAll({ where: getQuery({type, adopted, name}) });
  console.log(animals);
  res.status(200).json(animals);
};
export const postAnimal = async (req, res, next) => {
  const { name, type, examination, description, years, image } = await req.body;
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
    return;
  }
  const animal = await Animal.create({
    name,
    type,
    examination,
    description,
    years,
    image,
  });
  res.status(200).json(animal);
};

export const editAnimal = async (req, res, next) => {
  const animalId = req.params.animalId;
  console.log(animalId);
  const { name, type, examination, description, years, image, chip, adopted } =
    await req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed, entered data is incorrect.");
    error.statusCode = 422;
    next(error);
    return;
  }
  const animal = await Animal.update(
    { name, type, examination, description, years, image, chip, adopted },
    { where: { id: animalId } }
  );
  res.status(200).json(animal);
};

export const deleteAnimal = async (req, res, next) => {
  const animalId = req.params.animalId;
  const response = await Animal.destroy({ where: { id: animalId } });
  res.status(200).json(response);
};
