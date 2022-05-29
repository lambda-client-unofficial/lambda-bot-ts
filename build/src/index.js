"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
const logger_1 = __importDefault(require("./utils/logger"));
const slash_1 = __importDefault(require("./slash"));
const events_1 = __importDefault(require("./events"));
const client = new discord_js_1.Client({
    intents: [
        v10_1.GatewayIntentBits.Guilds,
        v10_1.GatewayIntentBits.GuildMessages,
        v10_1.GatewayIntentBits.MessageContent,
    ],
});
client.on('ready', () => {
    var _a;
    logger_1.default.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
    (0, slash_1.default)(client);
    (0, events_1.default)(client);
});
client.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map