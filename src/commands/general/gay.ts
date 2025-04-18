import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

var user_id = [ "842536747082317885", "766278007169351721", "851325296749707325", "956936107923243138", "857821833760079923", "869873944356876299" ];

export default
{
	data: new SlashCommandBuilder ()
		.setName ( 'gay' )
		.setDescription ( 'Who is gay?' ),
		
	async execute ( _client:BotClient, interaction:ChatInputCommandInteraction)
	{
		var random_num;

    do
    {
      random_num = Math.floor ( ( Math.random () * 10000 ) % 6 );
    } while ( user_id [ random_num ] === interaction.user.id );

    await interaction.reply ( `<@${ user_id [ random_num ] }> is gay.` );
	},
};
