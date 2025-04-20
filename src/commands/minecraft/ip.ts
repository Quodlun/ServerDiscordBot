import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { fetchIp } from "@data/fetchIp"; // 匯入 fetchIp 模組

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
      const ip = await fetchIp(); // 使用 fetchIp 函式
      
      console.log ( `[INFO] External ip fetched: ${ ip }` );
      await interaction.reply ( `Server IP: ${ ip }` );
    }

    catch ( error )
    {
      console.error ( "Error fetching external IP:", error );
      await interaction.reply ( "Error fetching external IP." );
    }
  },
};
