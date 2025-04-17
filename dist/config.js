"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.DISCORD_TOKEN) {
    throw new Error('DISCORD_TOKEN is not set in the environment variables.');
}
if (!process.env.DISCORD_CLIENT_ID) {
    throw new Error('DISCORD_CLIENT_ID is not set in the environment variables.');
}
if (!process.env.DISCORD_GUILD_ID) {
    throw new Error('DISCORD_GUILD_ID is not set in the environment variables.');
}
const config = {
    discordToken: process.env.DISCORD_TOKEN,
    discordClientId: process.env.DISCORD_CLIENT_ID,
    discordGuildId: process.env.DISCORD_GUILD_ID,
};
exports.config = config;
exports.default = config;
