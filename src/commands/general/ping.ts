import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export default
{
	data: new SlashCommandBuilder ()
		.setName ( 'ping' )
		.setDescription ( 'Replies with Pong!' ),
		
	async execute ( _client:BotClient, interaction:ChatInputCommandInteraction)
	{
		await interaction.reply('Pong!');
	},
};
