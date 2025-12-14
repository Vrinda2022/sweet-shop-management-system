import { Router, Request, Response, RequestHandler } from "express";
import { register, login } from "../controllers/authController";

const router = Router();
router.post("/register", register as unknown as RequestHandler);
router.post("/login", login as RequestHandler);
export default router;
