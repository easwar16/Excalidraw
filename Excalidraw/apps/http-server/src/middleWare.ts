import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import type { Request, Response, NextFunction } from "express";

dotenv.config({ path: "../../.env" });

interface JwtUserPayload extends JwtPayload {
  name: string;
  id: string;
}
declare module "express" {
  interface Request {
    userId?: string;
  }
}
export const middleWare = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"] ?? "";

  const decoded: JwtUserPayload = jwt.verify(
    token,
    process.env.JWT_SECRET ?? ""
  ) as JwtUserPayload;
  console.log(decoded);

  if (decoded?.id) {
    req.userId = decoded.id;
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
};
