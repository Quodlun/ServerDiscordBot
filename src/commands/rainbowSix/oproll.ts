import { BotClient } from "@client"
import { AttachmentBuilder, ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { atk_ops, def_ops } from "@data/ops"
import { player_id } from "@data/memberDiscordId"
import { createCanvas, GlobalFonts, loadImage } from "@napi-rs/canvas"
import config from "@config"

var opPicPath: string = "";

function randomOperator ( side: any )
{
  var random_num;

  switch ( side )
  {
    case "atk":
      random_num = Math.floor ( ( Math.random () * 10000 ) % atk_ops.length);
      return atk_ops [ random_num ];

    case "def":
      random_num = Math.floor ( ( Math.random () * 10000 ) % def_ops.length );
      return def_ops [ random_num ];

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

async function opImage ( opImgPath: string )
{
  const canvas = createCanvas ( 330, 540 );
  const returnImg = canvas.getContext ( '2d' );

  const background = await loadImage ( config.opBackgroundPath );
  returnImg.drawImage( background, 0, 0, canvas.width, canvas.height );

  const opImg = await loadImage ( opImgPath );
  returnImg.drawImage ( opImg, 0, 0, canvas.width, canvas.height );

  return canvas.encode('png');
}

async function nameplImage ()
{
  const canvas = createCanvas ( 330, 130 );
  const returnImg = canvas.getContext ( '2d' );

  const nameplBackground = await loadImage ( config.opNameplatePath );
  returnImg.drawImage( nameplBackground, 0, 0, canvas.width, canvas.height );

  console.log(GlobalFonts.families);
  returnImg.font = "30px ScoutCond";
  returnImg.fillStyle = "#FFFFFF";
  returnImg.fillText ( "Shane_JPK", 23, 76 );

  return canvas.encode('png');
}

async function finalImg ()
{
  const canvas = createCanvas ( 330, 670 );
  const returnImg = canvas.getContext ( '2d' );

  const opImgBuffer = await opImage ( opPicPath );
  const opImgOutput = await loadImage ( opImgBuffer );
  const nameplBuffer = await nameplImage();
  const nameplImgOutput = await loadImage(nameplBuffer);

  returnImg.drawImage ( opImgOutput, 0, 0, opImgOutput.width, opImgOutput.height );
  returnImg.drawImage ( nameplImgOutput, 0, 540, nameplImgOutput.width, nameplImgOutput.height );

  const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
  return attachment;
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

        if ( operator === "Amaru")
        {
          const amaruPicRandom = Math.floor ( ( Math.random () * 10000 ) % 2 );
          
          switch ( amaruPicRandom )
          {
            case 0:
              opPicPath = "src\\data\\opsImg\\atk\\amaru.avif";
              break;

            case 1:
              opPicPath = "src\\data\\opsImg\\atk\\laiChingTe.png";
              break;

            default:
              break;
          }
        }

        else
        {
          opPicPath = `src\\data\\opsImg\\${ interaction.options.getString ( "side" ) }\\${ operator }.avif`
        }
        
        await interaction.editReply
        (
          {
            content: `Operator rolling result: ${ operator }`,
            files: [ await finalImg () ],
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
