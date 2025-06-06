import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { fetchIp } from "@data/fetchIp"
import config from "@config";

export default
{
  data: new SlashCommandBuilder ()
    .setName ( 'ip' )
    .setDescription ( 'Get the IP of the server.' ),
    
  async execute ( _client:BotClient, interaction:ChatInputCommandInteraction)
  {
    if ( interaction.user.id === config.discordOwnerId )
    {
      try 
      {
        console.log ( `[INFO] ${ interaction.user.tag } request fetching the ip.` );
      
        console.log ( "[INFO] Fetching external ip..." );
        const ip = await fetchIp();
        
        console.log ( `[INFO] External ip fetched: ${ ip }` );
        await interaction.reply ( `Server IP: ${ ip } | harsh-server.duckdns.org` );
      }

      catch ( error )
      {
        console.error ( "Error fetching external IP:", error );
        await interaction.reply ( "Error fetching external IP." );
      }
    }

    else
    {
      await interaction.reply ( `Server Address: harsh-server.duckdns.org` );
    }
  }
};
