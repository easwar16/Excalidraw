import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("🔥 GLOBAL ERROR:", err);

  // If the error already has a status code, use it
  const status = err.status || 500;

  return res.status(status).json({
    success: false,
    message:
      status === 500
        ? "Internal Server Error"
        : err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
