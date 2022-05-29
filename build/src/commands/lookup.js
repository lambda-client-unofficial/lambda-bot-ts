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
const discord_js_1 = require("discord.js");
const embed_js_1 = __importDefault(require("../utils/embed.js"));
const minecraftProfile_1 = __importDefault(require("../utils/minecraftProfile"));
exports.default = {
    name: 'lookup',
    description: 'Lookup minecraft users',
    options: [
        {
            name: 'name',
            description: 'The name of the user to lookup',
            type: 1,
            options: [
                {
                    name: 'username',
                    description: 'The username of the user to lookup',
                    type: 3,
                },
            ],
        },
    ],
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        interaction.options.data.forEach((index) => __awaiter(void 0, void 0, void 0, function* () {
            switch (index.name) {
                case 'name': {
                    const username = interaction.options.get("username"); //need fix
                    let user = yield minecraftProfile_1.default.profile(username); //no need to check if the type is set to string bruh
                    if (!user)
                        return interaction.reply({ embeds: [embed_js_1.default.error('No user found.')] });
                    const namesRes = yield minecraftProfile_1.default.names(user);
                    if (!namesRes)
                        return interaction.reply({ embeds: [embed_js_1.default.error('Unknown error')] });
                    const texturesRes = yield minecraftProfile_1.default.textures(user);
                    if (!texturesRes)
                        return interaction.reply({ embeds: [embed_js_1.default.error('Unknown error')] });
                    const embed = new discord_js_1.EmbedBuilder()
                        .setTitle(`${username}'s Profile`)
                        .addFields([{ name: 'UUID:', value: user }])
                        .setImage(`https://crafatar.com/renders/body/${user}?overlay`)
                        .setColor('Blue');
                    try {
                        namesRes.forEach((name) => {
                            var _a;
                            let time = new Date(name.changedToAt).toString();
                            if (time.toString().toLowerCase().includes('nan'))
                                time = 'First Appeared Name';
                            embed.addFields([{ name: (_a = name.name) !== null && _a !== void 0 ? _a : 'Unknown', value: time !== null && time !== void 0 ? time : 'First Appeared Name' }]);
                        });
                    }
                    catch (e) {
                        return e;
                    }
                    const row = new discord_js_1.ActionRowBuilder().addComponents([
                        new discord_js_1.ButtonBuilder()
                            .setStyle(discord_js_1.ButtonStyle.Link)
                            .setURL(texturesRes)
                            .setLabel('Player skin'),
                    ]).addComponents([
                        new discord_js_1.ButtonBuilder()
                            .setStyle(discord_js_1.ButtonStyle.Link)
                            .setURL(`https://namemc.com/search?q=${username}`)
                            .setLabel('NameMC'),
                    ]);
                    return interaction.reply({ embeds: [embed], components: [row] }); //need fix
                }
                default:
                    return interaction.reply({ embeds: [embed_js_1.default.error('Please choose something.')] });
            }
        }));
    }),
};
//# sourceMappingURL=lookup.js.map