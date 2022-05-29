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
require("dotenv/config");
const rest_1 = require("@discordjs/rest");
const v10_1 = require("discord-api-types/v10");
const logger_1 = __importDefault(require("./utils/logger"));
const commandsLoader_1 = require("./commandsLoader");
if (!process.env.TOKEN) {
    logger_1.default.error('[Discord API] No token found.');
    throw Error('No token found.');
}
const rest = new rest_1.REST({ version: '10' }).setToken(process.env.TOKEN);
const registerSlashCommands = (client) => __awaiter(void 0, void 0, void 0, function* () {
    (0, commandsLoader_1.scanCommands)();
    try {
        client.guilds.cache.forEach((guild) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!process.env.BOT_ID) {
                    logger_1.default.error('[Discord API] No bot ID found.');
                    throw Error('No bot ID found.');
                }
                yield rest.put(v10_1.Routes.applicationGuildCommands(process.env.BOT_ID, guild.id), { body: commandsLoader_1.commands });
            }
            catch (e) {
                logger_1.default.error(`[Discord API] Unable to refresh application (/) commands for ${guild.name}: ${e}`);
            }
        }));
        logger_1.default.log('[Discord API] Successfully registered all commands.');
    }
    catch (e) {
        logger_1.default.error(`[Discord API] Failed to reload application (/) commands: ${e}`);
    }
});
exports.default = registerSlashCommands;
//# sourceMappingURL=slash.js.map