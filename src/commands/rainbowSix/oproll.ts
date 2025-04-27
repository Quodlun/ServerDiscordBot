import { BotClient } from "@client"
import { AttachmentBuilder, ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { atk_ops, def_ops } from "@data/ops"
import { player_id } from "@data/memberDiscordId"
import { createCanvas, loadImage } from "@napi-rs/canvas"
import config from "@config"

let opImgPath: string = "";
let playerId: string = "";

const playerIdMap: Record<string, string> = {
  "766278007169351721": "Saiki.HARSH",
  "851325296749707325": "Hsure.HARSH",
  "857821833760079923": "Checkmate.HARSH",
  "869873944356876299": "fAiLEX.HARSH",
  "842536747082317885": "BK.HARSH",
  "956936107923243138": "Oh0wardO.HARSH",
};

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

  async execute(_client: BotClient, interaction: ChatInputCommandInteraction) {
    const mode = interaction.options.getString("mode");
    const side = interaction.options.getString("side")?.toLowerCase();

    switch (mode) {
      case "solo":
        await interaction.reply(`Rolling operator at ${side?.toUpperCase()}`);
        console.log(`[INFO] User: "${interaction.user.username}" rolling operator at side "${side?.toUpperCase()}"`);
        const operator = randomOperator(side);

        opImgPath = operator === "Amaru"
          ? Math.random() < 0.5
            ? "res/opsImg/atk/amaru.avif"
            : "res/opsImg/atk/laiChingTe.png"
          : `res/opsImg/${side}/${operator}.avif`;

        playerId = playerIdMap[interaction.user.id] || "Unknown";

        await interaction.editReply({
          content: `Operator rolling result: ${operator}`,
          files: [await generateOperatorCard()],
        });

        console.log(`[INFO] Roll result: ${operator}`);
        break;

      case "team":
        await interaction.reply(`Rolling 5 operators for ${side?.toUpperCase()}`);
        console.log(`[INFO] User: "${interaction.user.username}" rolling 5 operators for side "${side?.toUpperCase()}"\n`);

        const operators = new Set<string>();
        const players = new Set<string>();

        while (operators.size < 5) {
          operators.add ( randomOperator ( side ) );
        }

        while (players.size < 5) {
          players.add(randomPlayer());
        }

        const resultList = Array.from(players).map((player, index) => {
          const operator = Array.from(operators)[index];
          return `<@${player}>: ${operator}`;
        }).join("\n");

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

function randomOperator(side: any) {
  let operator: string = "";

  switch (side) {
    case "atk":
      operator = atk_ops[Math.floor(Math.random() * atk_ops.length)];
      break; // Add break to prevent fall-through

    case "def":
      operator = def_ops[Math.floor(Math.random() * def_ops.length)];
      break; // Add break to prevent fall-through

    default:
      console.error("[ERROR] Invalid side provided.");
      break;
  }

  return operator;
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