import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import "reflect-metadata";
import "@shared/containers";

import { AppError } from "@errors/AppError";

import router from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/v1", router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}.`);
});
