import { userSignupSchema, userSignupType } from "./schemas";
import { prisma } from "@repo/db-schema/client";

import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./lib";
dotenv.config();
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const body: userSignupType = req.body;
  const isValid = userSignupSchema.safeParse(req.body);
  if (isValid?.success) {
    const userExists = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (userExists?.id) {
      return res.status(409).json({ message: "User already Exists" });
    } else {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body?.name,
          password: body.password,
          photo: body?.photo ?? "",
        },
      });
      if (user.id) {
        return res.status(200).json({ message: "User Created Successfully" });
      }
      throw new Error();
    }
  } else {
    return res.status(403).json({ message: "Invalid details" });
  }
});
app.post("/signin", async (req, res) => {});

app.post("/room", async (req, res) => {});

app.use(errorHandler);

app.listen(process.env.HTTP_PORT, () => {
  console.log("Listening on : " + process.env.HTTP_PORT);
});
