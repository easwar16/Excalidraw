import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: "../../.env" });

console.log(process.env.DATABASE_URL);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
