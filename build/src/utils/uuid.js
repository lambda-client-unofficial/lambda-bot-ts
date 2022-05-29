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
const format = (uuid) => {
    if (typeof uuid !== 'string')
        throw Error('Bad UUID');
    const part1 = uuid.slice(0, 8);
    const part2 = uuid.slice(8, 12);
    const part3 = uuid.slice(12, 16);
    const part4 = uuid.slice(16, 20);
    const part5 = uuid.slice(20, 32);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
};
const usernameToUUID = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = yield axios_1.default.get(`https://api.mojang.com/users/profiles/minecraft/${username}`).then((uuid) => uuid.data.id).catch((e) => console.log(e.data));
    return uuid !== null && uuid !== void 0 ? uuid : false;
});
const uuidUtils = {
    format,
    usernameToUUID,
};
exports.default = uuidUtils;
//# sourceMappingURL=uuid.js.map