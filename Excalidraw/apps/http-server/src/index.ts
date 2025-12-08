import { prisma } from "@repo/db-schema/client";

import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const body = req.body;
});
app.post("/signin", async (req, res) => {});

app.post("/room", async (req, res) => {});

app.listen(process.env.HTTP_PORT, () => {
  console.log("Listening on 3000");
});
