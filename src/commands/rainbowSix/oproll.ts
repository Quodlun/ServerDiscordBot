import { BotClient } from "@client"
import { AttachmentBuilder, ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { atk_ops, def_ops } from "@data/ops"
import { player_id } from "@data/memberDiscordId"
import { createCanvas, loadImage } from "@napi-rs/canvas"
import config from "@config"

let opImgPath: string = "";
let playerId: string = "";

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
              opImgPath = "res/opsImg/atk/amaru.avif";
              break;

            case 1:
              opImgPath = "res/opsImg/atk/laiChingTe.png";
              break;

            default:
              break;
          }
        }

        else
        {
          opImgPath = `res/opsImg/${ interaction.options.getString ( "side" ) }/${ operator }.avif`
        }
  
        switch ( interaction.user.id )
        {
          case "766278007169351721":
            playerId = "Saiki.HARSH";
            break;

          case "851325296749707325":
            playerId = "Hsure.HARSH";
            break;

            case "857821833760079923":
            playerId = "Checkmate.HARSH";
            break;

          case "869873944356876299":
            playerId = "fAiLEX.HARSH";
            break;
          
            case "842536747082317885":
              playerId = "BK.HARSH";
              break;
        
            case "956936107923243138":
              playerId = "Oh0wardO.HARSH";
              break;

          default:
            playerId = "Unknown";
            break;
        }
        
        await interaction.editReply
        (
          {
            content: `Operator rolling result: ${ operator }`,
            files: [ await generateOperatorCard () ],
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
        await interaction.reply ("Invalid mode selected.");
        console.error("[ERROR] Invalid mode provided.");

        break;
    }
  }
};

function randomOperator ( side: any )
{
  let random_num;

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
  let random_num;
  random_num = Math.floor ( ( Math.random () * 10000 ) % player_id.length);
  return player_id [ random_num ];
}

async function generateOperatorCard ()
{
  const canvas = createCanvas(356, 720);
  const context = canvas.getContext('2d');

  const opBackground = await loadImage(config.opBackgroundPath);
  context.drawImage(opBackground, 0, 0, 356, 578);

  const opImg = await loadImage(opImgPath);
  context.drawImage(opImg, 0, 0, 356, 578);

  const nameplBackground = await loadImage(config.opNameplPath);
  context.drawImage(nameplBackground, 0, 578, 356, 142);

  context.font = "28px ScoutCond";
  context.fillStyle = "#FFFFFF";
  context.fillText(playerId, 23, 662);

  const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'operator-card.png' });
  return attachment;
}