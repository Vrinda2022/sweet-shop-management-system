import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req: any, res: any) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

export const login = async (req: any, res: any) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.sendStatus(401);

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.sendStatus(401);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET!
  );
  res.json({ token });
};
