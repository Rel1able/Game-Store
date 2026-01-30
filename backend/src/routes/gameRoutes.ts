import { Router } from "express";
import { purchaseGame } from "../controllers/gameController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = Router();
router.post("/purchase", authenticate, purchaseGame);

export default router;