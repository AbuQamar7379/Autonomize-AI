import express, { Router, Request, Response, NextFunction } from "express";
import { userController } from "../controllers";

const router: Router = express.Router();

// Route to save a user
router.get(
  "/save-user/:username",
  (req: Request, res: Response, next: NextFunction) => {
    userController.saveUser(req, res, next);
  }
);

export default router;
