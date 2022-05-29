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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const octokit_1 = require("octokit");
require("dotenv/config");
const config_1 = require("../../config");
const quickdb_1 = __importDefault(require("./quickdb"));
const octokit = new octokit_1.Octokit({
    auth: process.env.GITHUB_TOKEN,
});
const pull = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: config_1.capeRepo.owner,
        repo: config_1.capeRepo.repo,
        path: config_1.capeRepo.path,
        ref: config_1.capeRepo.branch,
    }).catch(((e) => (e)));
    JSON.parse(Buffer.from(res.data.content, 'base64').toString()).forEach((cape) => {
        quickdb_1.default.push('capes', cape);
    });
    quickdb_1.default.shaPush(res.data.sha);
});
const push = () => __awaiter(void 0, void 0, void 0, function* () {
    const capes = yield quickdb_1.default.get('capes');
    const sha = yield quickdb_1.default.get('sha');
    yield octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: config_1.capeRepo.owner,
        repo: config_1.capeRepo.repo,
        path: config_1.capeRepo.path,
        branch: config_1.capeRepo.branch,
        message: new Date().toISOString(),
        committer: {
            name: 'Cape Bot',
            email: 'cape@lamb.da',
        },
        content: Buffer.from(JSON.stringify(capes)).toString('base64'),
        sha,
    }).catch((e) => (e));
    return true;
});
const add = (discordId, uuid) => __awaiter(void 0, void 0, void 0, function* () {
    const capes = yield quickdb_1.default.get('capes');
    const template = {
        id: discordId,
        capes: [
            {
                cape_uuid: Number(JSON.stringify(capes.length + 1)),
                player_uuid: uuid,
                type: 'CONTRIBUTOR',
                color: {
                    primary: '272727',
                    border: '363636',
                },
            },
        ],
        is_premium: true,
    };
    try {
        capes.push(template);
    }
    catch (e) {
        return e;
    }
    quickdb_1.default.push('capes', template).catch((e) => e);
    return true;
});
const capeUtils = {
    pull,
    push,
    add,
};
exports.default = capeUtils;
//# sourceMappingURL=capes.js.map