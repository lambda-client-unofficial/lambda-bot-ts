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
const capes_js_1 = __importDefault(require("../utils/capes.js"));
const embed_js_1 = __importDefault(require("../utils/embed.js"));
const uuid_js_1 = __importDefault(require("../utils/uuid.js"));
Promise.resolve().then(() => __importStar(require("colors")));
exports.default = {
    name: 'capes',
    description: 'Edit capes',
    options: [
        {
            name: 'pull',
            description: 'Pull capes',
            type: 1,
            options: [
                {
                    name: 'force',
                    description: 'Force overwrite',
                    type: 5,
                },
            ],
        },
        {
            name: 'push',
            description: 'Push capes',
            type: 1,
        },
        {
            name: 'add',
            description: 'Add capes',
            type: 1,
            options: [
                {
                    name: 'user_id',
                    description: 'User ID',
                    type: 3,
                    required: true,
                },
                {
                    name: 'minecraft_username',
                    description: 'Minecraft username',
                    type: 3,
                    required: true,
                },
                /* {
                            name: "cape",
                            description: "Cape",
                            type: 3,
                            required: true,
                            choices: [
                                {
                                    name: "Contributor",
                                    name: "Contributor cape",
                                    value: ""
                                },
                            ]
                        } */
            ],
        },
    ],
    run: (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.isChatInputCommand())
            return;
        interaction.options.data.forEach((index) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            switch (index.name) {
                case 'pull': {
                    const isForced = (_a = interaction.options.get('force')) !== null && _a !== void 0 ? _a : false;
                    const pullResult = yield capes_js_1.default.pull( /*isForced*/);
                    //if (!pullResult && !isForced) return interaction.reply({ embeds: [embedUtils.error('Add `force:true` in the options to override local data.')] });
                    return interaction.reply({ embeds: [embed_js_1.default.success('Pulled!')] });
                }
                case 'push': {
                    const pushResult = yield capes_js_1.default.push();
                    if (!pushResult) {
                        yield capes_js_1.default.pull();
                        yield capes_js_1.default.push();
                    }
                    return interaction.reply({ embeds: [embed_js_1.default.success('Pushed to remote.')] });
                }
                case 'add': {
                    const minecraftUsername = interaction.options.getString('minecraft_username');
                    const user = interaction.options.getString('user_id').split("'")[0];
                    //if (!await checkuser(user)) return interaction.reply({ embeds: [embedUtils.error('Invalid user')] }); //need fix
                    const minecraftUUID = yield uuid_js_1.default.usernameToUUID(minecraftUsername);
                    if (!minecraftUUID)
                        return interaction.reply({ embeds: [embed_js_1.default.error('Invalid username or nonexistent player')] });
                    const addResult = yield capes_js_1.default.add(user, minecraftUUID);
                    if (!addResult)
                        return interaction.reply({ embeds: [embed_js_1.default.error('No local data found. Please pull first.')] });
                    return interaction.reply({ embeds: [embed_js_1.default.success(`Added <@${user}>, Info: \`\`\`Username: ${minecraftUsername}\nUUID: ${minecraftUUID}\`\`\``)] });
                }
                default: return interaction.reply({ embeds: [embed_js_1.default.error('Please choose something.')] });
            }
        }));
    }),
};
//# sourceMappingURL=capes.js.map