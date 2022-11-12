"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pdf_1 = __importDefault(require("./pdf"));
var word_1 = __importDefault(require("./word"));
exports.default = {
    pdf: pdf_1.default,
    word: word_1.default,
};
