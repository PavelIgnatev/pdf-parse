import express, { Router, Request, Response } from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";

import api from "./controllers";

// api router
const apiRouter: Router = Router();

apiRouter.route("/pdf").post(api.pdf.post);
apiRouter.route("/word").get(api.word.get);

// main router
const mainRouter: Router = Router();

if (process.env.NODE_ENV === "production") {
  mainRouter.use(express.static(path.join(__dirname, "../client", "build")));
  mainRouter.get("/*", (_: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
} else {
  mainRouter.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
}

export { apiRouter, mainRouter };
