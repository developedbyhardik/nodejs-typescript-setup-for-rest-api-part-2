import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "./handlers/user";
import { createUserValidator } from "./validation/user";
import { handleInputErrors } from "./module/middleware";
import { ERROR_TYPE } from "./module/constant";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/user", createUserValidator,handleInputErrors, createUser);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.use((err, req, res, next) => {
  if (err.type === ERROR_TYPE.PRISMA) {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
