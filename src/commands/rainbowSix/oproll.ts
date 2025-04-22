import { BotClient } from "@client"
import { AttachmentBuilder, ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { atk_ops, def_ops } from "@data/ops";
import { player_id } from "@data/memberDiscordId";
const Canvas = require('@napi-rs/canvas');



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

function randomPlayer ()
{
  var random_num;
  random_num = Math.floor ( ( Math.random () * 10000 ) % player_id.length);
  return player_id [ random_num ];
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

        const canvas = Canvas.createCanvas ( 300, 500 );
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage ( `src\\data\\opsImg\\background.png` );
        context.drawImage( background, 0, 0, canvas.width, canvas.height );
        const opPic = await Canvas.loadImage ( `src\\data\\opsImg\\${ interaction.options.getString ( "side" ) }\\${ operator }.avif` );
        context.drawImage ( opPic, 0, 0, canvas.width, canvas.height );
        
        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });


        await interaction.editReply
        (
          {
            content: `Operator rolling result: ${ operator }`,
            files: [ attachment ],
          }
        );

        console.log ( `[INFO] Roll result: ${ operator }` );

        break;

      case "team":
        await interaction.reply ( `Rolling 5 operators for ${ interaction.options.getString ( "side" )?.toUpperCase () }` );
        console.log ( `[INFO] User: "${ interaction.user.username }" rolling 5 operators for side "${ interaction.options.getString ( "side" )?.toUpperCase () }"\n` );

        const operators = new Set < any > ();
        const players = new Set < any > ();

        while ( operators.size < 5 )
        {
          operators.add ( randomOperator ( interaction.options.getString ( "side" ) ) );
        }

        while ( players.size < 5 )
        {
          players.add ( randomPlayer () );
        }

        // 將 players 和 operators 轉換為陣列
        const playerArray = Array.from(players);
        const operatorArray = Array.from(operators);

        // 將玩家與幹員配對並格式化為字串
        const resultList = playerArray.map
        ( ( player, index ) =>
          {
            const operator = operatorArray [ index ];
            return `<@${ player }>: ${ operator }`;
          }
        ).join( "\n" );

        // 使用 interaction.reply 輸出結果
        await interaction.editReply(`Team operator rolling result:\n${resultList}`);
        console.log(`[INFO] Roll result:\n${resultList}`);

        break;

      default:
        await interaction.reply("Invalid mode selected.");
        console.error("[ERROR] Invalid mode provided.");

        break;
    }
  }
};
