import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { atk_ops, def_ops } from "@data/ops";

export default
{
	data: new SlashCommandBuilder ()
		.setName ( 'oproll' )
		.setDescription ( 'Pick an operator to play.' )
    .addStringOption 
    ( Option => Option.setName ( "side" )
      .setDescription ( "Select which side to roll." )
      . setRequired ( true )
      .addChoices
      (
        {
          name: "ATK",
          value: "atk"
        },

        {
          name: "DEF",
          value: "def"
        },
      )
    ),
		
	async execute ( _client:BotClient, interaction:ChatInputCommandInteraction)
	{
    var random_num;
		switch ( interaction.options.getString ( "side" ) )
    {
      case "atk":
        random_num = Math.floor ( ( Math.random () * 10000 ) % atk_ops.length );
        await interaction.reply ( `Operator: ${ atk_ops [ random_num ] }` );

        break;

      case "def":
        random_num = Math.floor ( ( Math.random () * 10000 ) % def_ops.length );
        await interaction.reply ( `Operator: ${ def_ops [ random_num ] }` );

        break;
        
      default:
        break;
    }
	},
};
