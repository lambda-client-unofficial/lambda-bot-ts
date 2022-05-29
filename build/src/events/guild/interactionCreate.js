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
const ms_1 = __importDefault(require("ms"));
const commandsLoader_1 = require("../../commandsLoader");
const embed_1 = __importDefault(require("../../utils/embed"));
const Timeout = new Set();
exports.default = (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (commandsLoader_1.commands.has(interaction.commandName))
        return;
    if (!interaction.guild)
        return;
    const command = commandsLoader_1.commands.get(interaction.commandName);
    try {
        if (command.timeout) {
            if (Timeout.has(`${interaction.user.id}${command.name}`)) {
                yield interaction.reply({ embeds: [embed_1.default.error(`You need to wait **${(0, ms_1.default)(command.timeout, { long: true })}** to use command again`)], ephemeral: true });
            }
        }
        command.run(interaction, client);
        Timeout.add(`${interaction.user.id}${command.name}`);
        setTimeout(() => {
            Timeout.delete(`${interaction.user.id}${command.name}`);
        }, command.timeout, clearTimeout());
    }
    catch (e) {
        yield interaction.reply({ embeds: [embed_1.default.error(`An error occured: ${e.toString()}`)] });
    }
});
//# sourceMappingURL=interactionCreate.js.map