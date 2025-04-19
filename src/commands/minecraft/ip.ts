import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export default
{
  data: new SlashCommandBuilder ()
    .setName ( 'ip' )
    .setDescription ( 'Get the IP of the server.' ),
    
  async execute ( _client:BotClient, interaction:ChatInputCommandInteraction)
  {
    try 
    {
      console.log ( `[INFO] ${ interaction.user.tag } request fetching the ip.` );
    
      console.log ( "[INFO] Fetching external ip..." );
      const respond = await fetch ( 'https://api.ipify.org?format=json' );
      const data = await respond.json ();
      
      console.log ( `[INFO] External ip fetched: ${ data.ip }` );
      await interaction.reply ( `Server IP: ${ data.ip }` );
    }

    catch ( error )
    {
      console.error ( "Error fetching external IP:", error );
      await interaction.reply ( "Error fetching external IP." );
    }
  },
};
