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
    ( Option => Option.setName ("mode")
      .setDescription ( "Roll for team or solo?" )
      .setRequired ( true )
      .addChoices
      (
        {
          name: "Solo",
          value: "solo"
        },

        {
          name: "Team",
          value: "team"
        },
      )
    )

    .addStringOption
    ( Option => Option.setName ( "side" )
      .setDescription ( "Select which side to roll." )
      .setRequired ( true )
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

  async execute( _client: BotClient, interaction: ChatInputCommandInteraction ) 
  {
    switch ( interaction.options.getString ( "mode" ) )
    {
      case "solo":
        await interaction.reply ( `Rolling operator at ${ interaction.options.getString ( "side" )?.toUpperCase () }` );
        console.log ( `[INFO] User: "${ interaction.user.username }" rolling operator at side "${ interaction.options.getString ( "side" )?.toUpperCase () }"` );
        const operator = randomOperator ( interaction.options.getString ( "side" ) );

        await interaction.editReply ( `Operator rolling result: ${ operator }` );
        console.log ( `[INFO] Roll result: ${ operator }` );

        break;

      case "team":
        await interaction.reply ( `Rolling 5 operators for ${ interaction.options.getString ( "side" )?.toUpperCase () }` );
        console.log ( `[INFO] User: "${ interaction.user.username }" rolling 5 operators for side "${ interaction.options.getString ( "side" )?.toUpperCase () }"` );

        const operators = new Set < any > ();

        while ( operators.size < 5 )
        {
          operators.add ( randomOperator ( interaction.options.getString ( "side" ) ) );
        }

        const operatorList = Array.from ( operators ).join ( "\n" );
        await interaction.editReply ( `Team operator rolling result:\n${ operatorList }` );
        console.log ( `[INFO] Roll result:\n${ operatorList }` );

        break;

      default:
        await interaction.reply("Invalid mode selected.");
        console.error("[ERROR] Invalid mode provided.");

        break;
    }
  }
};
