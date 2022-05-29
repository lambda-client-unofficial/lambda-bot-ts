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
const axios_1 = __importDefault(require("axios"));
const profile = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield axios_1.default.get(`https://api.mojang.com/users/profiles/minecraft/${name}`).then((user) => { var _a; return (_a = user === null || user === void 0 ? void 0 : user.data) === null || _a === void 0 ? void 0 : _a.id; }).catch((user) => user);
    return user instanceof Error ? false : user;
});
const names = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const names = yield axios_1.default.get(`https://api.mojang.com/user/profiles/${name}/names`).then((names) => names === null || names === void 0 ? void 0 : names.data).catch((names) => names);
    return names instanceof Error ? false : names;
});
const textures = (name) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const req = yield axios_1.default.get(`https://sessionserver.mojang.com/session/minecraft/profile/${name}`).then((textures) => { var _a, _b; return (_b = (_a = textures === null || textures === void 0 ? void 0 : textures.data) === null || _a === void 0 ? void 0 : _a.properties[0]) === null || _b === void 0 ? void 0 : _b.value; }).catch((textures) => textures);
    const textures = (_b = (_a = JSON.parse(Buffer.from(req, 'base64').toString()).textures) === null || _a === void 0 ? void 0 : _a.SKIN) === null || _b === void 0 ? void 0 : _b.url;
    return textures instanceof Error ? false : textures;
});
const minecraftUtils = {
    profile,
    names,
    textures,
};
exports.default = minecraftUtils;
//# sourceMappingURL=minecraftProfile.js.map