import { Request, Response, NextFunction } from "express";

function disablePoweredBy(_: Request, res: Response, next: NextFunction): void {
  res.removeHeader("X-Powered-By");
  next();
}
export { disablePoweredBy };
