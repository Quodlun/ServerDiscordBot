"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.BotClient = void 0;
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("./config"));
const event_1 = __importDefault(require("./handlers/event"));
const command_1 = __importDefault(require("./handlers/command"));
class BotClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                "Guilds",
                "GuildMessages",
                "MessageContent",
                "GuildVoiceStates",
            ],
        });
        this.commands = new discord_js_1.Collection();
        this.config = config_1.default;
    }
    ;
    async run(token) {
        // Load handlers
        await (0, event_1.default)(this);
        await (0, command_1.default)(this);
        // Login to Discord
        await this.login(token).then(() => {
            console.log("Bot is online!");
        });
    }
}
exports.BotClient = BotClient;
const client = new BotClient();
exports.client = client;
exports.default = client;
