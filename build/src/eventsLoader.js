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
exports.events = exports.scanEvents = void 0;
const graceful_fs_1 = __importDefault(require("graceful-fs"));
const logger_1 = __importDefault(require("./utils/logger"));
const events = [];
exports.events = events;
const scanEvents = (client, dirs) => __awaiter(void 0, void 0, void 0, function* () {
    const scannedEvents = yield graceful_fs_1.default.readdirSync(__dirname + "/events/" + dirs + "/").filter((d) => d.endsWith('js'));
    scannedEvents.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const evt = yield Promise.resolve().then(() => __importStar(require(__dirname + "/events/" + dirs + "/" + file + "/")));
        const eName = file.split('.')[0];
        client.on(eName, evt.bind(null, client));
        events.push(evt);
        logger_1.default.log(`[EVENTS] Loaded event ${eName.green}.`);
    }));
});
exports.scanEvents = scanEvents;
//# sourceMappingURL=eventsLoader.js.map