import { BotClient } from "@/client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

var atk_ops = 
[
  "Striker",   "Sledge",    "Thatcher", "Ash",      "Thermite", "Twitch",   "Montagne",
  "Glaz",      "Fuze",      "Blitz",    "IQ",       "Buck",     "Blackbeard", "Capitao",
  "Hibana",    "Jackal",    "Ying",     "Zofia",    "Dokkaebi", "Lion",     "Finka",
  "Maverick",  "Nomad",     "Gridlock", "Nokk",     "Amaru",    "Kali",     "Iana",
  "Ace",       "Zero",      "Flores",   "Osa",      "Sens",     "Grim",     "Brava",
  "Ram",       "Deimos",    "Rauora"
];

var def_ops = 
[
  "Sentry",  "Smoke",    "Mute",        "Castle", "Pulse", "Doc",      "Rook",
  "Kapkan",  "Tachanka", "Jäger",       "Bandit", "Frost", "Valkyrie", "Caveira",
  "Echo",    "Mira",     "Lesion",      "Ela",    "Vigil", "Maestro",  "Alibi",
  "Clash",   "Kaid",     "Mozzie",      "Warden", "Goyo",  "Wamai",    "Oryx",
  "Melusi",  "Aruni",    "Thunderbird", "Thorn",  "Azami", "Solis",    "Fenrir",
  "Tubarão", "Skopós"
]

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
