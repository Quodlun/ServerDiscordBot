import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { setTimeout } from "timers/promises"


export default
{
  data: new SlashCommandBuilder ()
    .setName ( 'k1' )
    .setDescription ( 'Hey, press K1!' )

    .addUserOption
    ( option => option
      .setName ( 'driver' )
      .setDescription ( 'Remind someone to press K1 to overtake.' )
      .setRequired ( true )
    ),
    
  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction )
  {
    const driver = interaction.options.getUser("driver");
    if (!driver) return;
    
    await interaction.reply ( `${ driver } you can use K1 when you are close.` );
    await setTimeout ( 3000 );
    await interaction.followUp ( `${ driver } K1 available.` );
    await setTimeout ( 20000 );
    await interaction.followUp( `${ driver } try to hold the K1, just for practice. I know it's difficult.` );
  },
};
