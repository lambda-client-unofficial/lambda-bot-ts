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
const discord_js_1 = require("discord.js");
const bytes_1 = __importDefault(require("../utils/bytes"));
const octokit_1 = require("octokit");
const octokit = new octokit_1.Octokit({
    auth: process.env.GITHUB_TOKEN,
});
exports.default = {
    name: 'plugins',
    description: 'Check plugin list',
    timeout: (0, ms_1.default)('30s'),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: (interaction, _client) => __awaiter(void 0, void 0, void 0, function* () {
        const pluginList = [];
        /*const plugins: { name: any; stargazers: any; watchers: any; issues: string; url: string; size: any; }[] = await octokit.request('GET /orgs/{org}/repos', { org: 'lambda-plugins' }) // need fix
        plugins.forEach((plugin: { name: any; stargazers: any; watchers: any; issues: string; url: string; size: any; }[]) => {
          pluginList.push({
            name: plugin?.name,
            stargazers: plugin?.stargazers_count,
            watchers: plugin?.watchers_count,
            issues: `[Issues](${plugin?.issues_url})`,
            url: `[Repo URL](${plugin?.html_url}) ()`,
            size: plugin?.size,
          });
        });*/
        const pluginEmbed = new discord_js_1.EmbedBuilder().setTitle('Plugins Informations');
        pluginList.forEach((plugin) => {
            pluginEmbed.addFields([{
                    name: plugin.name,
                    value: `Stargazers: ${plugin.stargazers}\n
                Watchers: ${plugin.watchers}\n
                Issues: ${plugin.issues}\n
                Size: ${(0, bytes_1.default)(plugin.size)}\n
                ${plugin.url}`,
                    inline: true,
                }]);
        });
        return interaction.reply({ embeds: [pluginEmbed] });
    }),
};
//# sourceMappingURL=plugins.js.map