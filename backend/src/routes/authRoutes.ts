import { Router } from "express";
import {register, login} from "../controllers/authController.js"
import authenticate from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, (req, res) => res.json({message: "Protected route"}))

export default router;