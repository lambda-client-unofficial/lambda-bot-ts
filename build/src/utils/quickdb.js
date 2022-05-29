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
const quick_db_1 = __importDefault(require("quick.db"));
const sha1_1 = __importDefault(require("sha1"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!quick_db_1.default.get('capes')) {
        quick_db_1.default.set('capes', []);
    }
});
const push = (key, ...data) => __awaiter(void 0, void 0, void 0, function* () {
    init();
    const array = [];
    data.forEach((i) => {
        array.push(i);
    });
    quick_db_1.default.set(key, array);
});
const shaPush = (data, origin, check) => __awaiter(void 0, void 0, void 0, function* () {
    init();
    if (data === '')
        throw Error('Empty data');
    if (check)
        if ((0, sha1_1.default)(origin) !== data)
            throw Error('Content does not match the sha1 hash');
    quick_db_1.default.set('sha', data);
});
const get = (key) => __awaiter(void 0, void 0, void 0, function* () {
    init();
    const data = yield quick_db_1.default.get(key);
    return data != null ? data : false;
});
const dbUtils = {
    push,
    get,
    shaPush,
};
exports.default = dbUtils;
//# sourceMappingURL=quickdb.js.map