import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { atk_ops, def_ops } from "@data/ops";

function randomOperator ( side: any )
{
  var random_num;

  switch ( side )
  {
    case "atk":
      random_num = Math.floor ( ( Math.random () * 10000 ) % atk_ops.length);
      return atk_ops [ random_num ];
      break;

    case "def":
      random_num = Math.floor((Math.random() * 10000) % def_ops.length);
      return def_ops [ random_num ];
      break;

    default:
      break;
  }
}

export default
{
  data: new SlashCommandBuilder ()
    .setName ( 'oproll' )
    .setDescription ( 'Pick an operator to play.' )

    .addStringOption
    (Option => Option.setName("side")
      .setDescription("Select which side to roll.")
      .setRequired(true)
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

  async execute(_client: BotClient, interaction: ChatInputCommandInteraction) 
  {
    await interaction.reply ( `Rolling operator at ${ interaction.options.getString ( "side" )?.toUpperCase () }` );
    console.log ( `[INFO] User: "${ interaction.user.username }" rolling operator at side "${ interaction.options.getString ( "side" )?.toUpperCase () }"` );
    const operator = randomOperator ( interaction.options.getString ( "side" ) );

    await interaction.editReply ( `Operator rolling result: ${ operator }` );
    console.log ( `[INFO] Roll result: ${ operator }` );
  }
};
