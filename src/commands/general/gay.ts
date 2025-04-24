import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { user_id } from "@data/memberDiscordId";


export default
{
	data: new SlashCommandBuilder ()
		.setName ( 'gay' )
		.setDescription ( 'Who is gay?' ),
		
	async execute ( _client:BotClient, interaction:ChatInputCommandInteraction)
	{
		let random_num;

    do
    {
      random_num = Math.floor ( ( Math.random () * 10000 ) % 6 );
    } while ( user_id [ random_num ] === interaction.user.id );

    await interaction.reply ( `<@${ user_id [ random_num ] }> is gay.` );
	},
};
