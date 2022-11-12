"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var express_slow_down_1 = __importDefault(require("express-slow-down"));
var express_1 = require("express");
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var disablePoweredBy_1 = require("./disablePoweredBy");
var setupMiddlewares = function (app) {
    app.use((0, express_1.json)());
    app.use((0, express_fileupload_1.default)());
    app.use(disablePoweredBy_1.disablePoweredBy);
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3001"],
    }));
    var limiter = (0, express_rate_limit_1.default)({
        windowMs: 1 * 60 * 1000,
        max: 120,
    });
    var speedLimiter = (0, express_slow_down_1.default)({
        windowMs: 1 * 60 * 1000,
        delayAfter: 100,
        delayMs: 1000,
    });
    app.use(limiter);
    app.use(speedLimiter);
};
exports.setupMiddlewares = setupMiddlewares;
