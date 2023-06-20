import { body } from "express-validator";
export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};

export const typeOfAnimal = (animal) => {
  if (
    animal !== "pas" &&
    animal !== "macka" &&
    animal !== "zec" &&
    animal !== "ostalo"
  ) {
    return false;
  }
  return true;
};


export const validateAnimalInput=()=>{
    return [
        body("name")
          .isString()
          .isLength({ min: 2 })
          .trim()
          .withMessage("At least 2 characters"),
        body("years").isNumeric().withMessage("Enter valid number"),
        body("image")
          .custom((value, { req }) => {
            if (value !== "" && value !== null) {
              return isValidUrl(value);
            }
            return true;
          })
          .withMessage("Enter valid url"),
        body("type")
          .isString()
          .custom((value) => {
            return typeOfAnimal(value);
          })
          .withMessage("Wrong type of animal"),
        body("examination").isDate().withMessage("Enter date"),
      ]
}
export const validateAnimalEdit=()=>{
    return [
        body("name")
          .isString()
          .isLength({ min: 2 })
          .trim()
          .withMessage("At least 2 characters").optional({checkFalsy: true}),
        body("years").isNumeric().withMessage("Enter valid number").optional({checkFalsy: true}),
        body("image")
          .custom((value, { req }) => {
            if (value !== "" && value !== null) {
              return isValidUrl(value);
            }
            return true;
          })
          .withMessage("Enter valid url").optional({checkFalsy: true}),
        body("type")
          .isString()
          .custom((value) => {
            return typeOfAnimal(value);
          })
          .withMessage("Wrong type of animal").optional({checkFalsy: true}),
        body("examination").isDate().withMessage("Enter date").optional({checkFalsy: true}),
      ]
}