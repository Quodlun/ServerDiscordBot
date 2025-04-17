"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(_client, interaction) {
        await interaction.reply('Pong!');
    },
};
