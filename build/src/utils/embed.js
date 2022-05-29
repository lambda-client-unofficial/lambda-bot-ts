"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const error = (msg) => new discord_js_1.EmbedBuilder()
    .setTitle('Error')
    .addFields([{ name: 'Info', value: `${msg}` }])
    .setColor('Red');
const success = (msg) => new discord_js_1.EmbedBuilder()
    .setTitle('Success')
    .addFields([{ name: 'Info', value: `${msg}` }])
    .setColor('Green');
const embedUtils = {
    error,
    success,
};
exports.default = embedUtils;
//# sourceMappingURL=embed.js.map