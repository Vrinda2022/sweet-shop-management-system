import { Router } from "express";
import * as c from "../controllers/sweetController";
import { protect, adminOnly } from "../middleware/auth";

const router = Router();

router.post("/", protect, c.addSweet);
router.get("/", protect, c.getSweets);
router.get("/search", protect, c.searchSweets);
router.put("/:id", protect, c.updateSweet);
router.delete("/:id", protect, adminOnly, c.deleteSweet);
router.post("/:id/purchase", protect, c.purchase);
router.post("/:id/restock", protect, adminOnly, c.restock);

export default router;
