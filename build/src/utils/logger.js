"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-console */
const colors_1 = __importDefault(require("colors"));
const log = (message) => {
    console.log(`${colors_1.default.gray(new Date().toLocaleString())} ${colors_1.default.cyan('[INFO]')} ${message}`);
};
const warn = (message) => {
    console.warn(`${colors_1.default.gray(new Date().toLocaleString())} ${colors_1.default.yellow('[WARN]')} ${message}`);
};
const error = (message) => {
    console.error(`${colors_1.default.gray(new Date().toLocaleString())} ${colors_1.default.red('[ERROR]')} ${message}`);
};
const logger = {
    log,
    warn,
    error,
};
exports.default = logger;
//# sourceMappingURL=logger.js.map