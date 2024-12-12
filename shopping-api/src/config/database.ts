import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: `postgresql://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_NAME}`,
  entities: [__dirname + '/../**/models/*.{js,ts}'],
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
});