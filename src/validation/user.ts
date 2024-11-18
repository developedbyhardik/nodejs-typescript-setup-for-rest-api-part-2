import { body } from "express-validator";

export const createUserValidator = [
  body("name").exists().isString(),
  body("email").exists().isEmail(),
];