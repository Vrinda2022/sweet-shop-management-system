import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  req.user = jwt.verify(token, process.env.JWT_SECRET!);
  next();
};

export const adminOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "ADMIN") return res.sendStatus(403);
  next();
};
