"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const octokit_1 = require("octokit");
const octokit = new octokit_1.Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const listPlugins = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield octokit.request('GET /orgs/{org}/repos', { org: 'lambda-plugins' });
    return data;
});
const pluginUtils = {
    listPlugins,
};
exports.default = pluginUtils;
//# sourceMappingURL=plugins.js.map