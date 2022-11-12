"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = exports.apiRouter = void 0;
var express_1 = __importStar(require("express"));
var path_1 = __importDefault(require("path"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var controllers_1 = __importDefault(require("./controllers"));
// api router
var apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
apiRouter.route("/pdf").post(controllers_1.default.pdf.post);
apiRouter.route("/word").get(controllers_1.default.word.get);
// main router
var mainRouter = (0, express_1.Router)();
exports.mainRouter = mainRouter;
if (process.env.NODE_ENV === "production") {
    mainRouter.use(express_1.default.static(path_1.default.join(__dirname, "../client", "build")));
    mainRouter.get("/*", function (_, res) {
        res.sendFile(path_1.default.join(__dirname, "../client", "build", "index.html"));
    });
}
else {
    mainRouter.use("/", (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: "http://localhost:3001",
        changeOrigin: true,
    }));
}
