"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
var user_id = ["842536747082317885", "766278007169351721", "851325296749707325", "956936107923243138", "857821833760079923", "869873944356876299"];
exports.default = {
    data: new builders_1.SlashCommandBuilder()
        .setName('gay')
        .setDescription('Who is gay?'),
    async execute(_client, interaction) {
        var random_num;
        do {
            random_num = Math.floor((Math.random() * 10000) % 6);
        } while (user_id[random_num] === interaction.user.id);
        await interaction.reply(`<@${user_id[random_num]}> is gay.`);
    },
};
