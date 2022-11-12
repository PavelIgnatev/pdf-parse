"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disablePoweredBy = void 0;
function disablePoweredBy(_, res, next) {
    res.removeHeader("X-Powered-By");
    next();
}
exports.disablePoweredBy = disablePoweredBy;
