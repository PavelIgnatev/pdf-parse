"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("./middlewares");
var config_1 = require("./config");
var router_1 = require("./router");
var app = (0, express_1.default)();
(0, middlewares_1.setupMiddlewares)(app);
app.use("/api", router_1.apiRouter);
app.use("/", router_1.mainRouter);
app.listen(config_1.PORT, function () {
    console.log("\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 \u043F\u043E\u0440\u0442\u0443 ".concat(config_1.PORT));
});
