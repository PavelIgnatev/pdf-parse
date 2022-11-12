import cors from "cors";
import rateLimiter from "express-rate-limit";
import slowDown from "express-slow-down";
import { json } from "express";
import { Express } from "express";
import fileUpload from "express-fileupload";

import { disablePoweredBy } from "./disablePoweredBy";

const setupMiddlewares = (app: Express) => {
  app.use(json());

  app.use(fileUpload())

  app.use(disablePoweredBy);

  app.use(
    cors({
      origin: ["http://localhost:3001"],
    })
  );

  const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000,
    max: 120,
  });

  const speedLimiter = slowDown({
    windowMs: 1 * 60 * 1000,
    delayAfter: 100,
    delayMs: 1000,
  });

  app.use(limiter);
  app.use(speedLimiter);
};

export { setupMiddlewares };
