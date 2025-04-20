import { BotClient } from "@client";
import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { config } from "@config";
import { fetchIp } from "@data/fetchIp";
import axios from "axios";
import https from "https";

export default
{
  data: new SlashCommandBuilder ()
    .setName ( "serverstatus" )
    .setDescription ( "Get the status of the Minecraft server." ),

  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction)
  {
    console.log ( `[INFO] User: ${ interaction.user.tag } require fetching server status from MCSS API...` );
    try
    {
      const apiUrl = `https://api.mcsrvstat.us/3/192.168.31.23`;

      if ( !config.mcssApiKey )
      {
        throw new Error ( "API key is missing. Please set MCSS_API_KEY in your .env file." );
      }

      const agent = new https.Agent
      (
        {
          rejectUnauthorized: false, // 忽略 SSL 憑證驗證
        }
      );

      const response = await axios.get
      ( apiUrl,
        {
          headers:
          {
            apiKey: `${ config.mcssApiKey }`,
          },

          httpsAgent: agent,
        }
      );

      const respond = response.data;
      let serverStatus;
      
      switch ( respond.online )
      {
        case true:
          serverStatus = "Online";
          break;

        case false:
          serverStatus = "Offline";
          break;

        default:
          break;
      };

      const statusMessage = 
      `
        > Server IP / Port: ${ respond.ip }:${ respond.port }
        > Server Version: ${ respond.version }
        > Server Status: ${ serverStatus }
        > Server Type: ${ respond.software }
        > Server Players: ${ respond.players.online }/${ respond.players.max }
      `
    /*  `
        
        **Server Name**: ${ serverStatus.name }
        **Status**: ${ serverStatus.status }
        **Players**: ${ serverStatus.players.online }/${serverStatus.players.max}
        **Uptime**: ${serverStatus.uptime}
        `
      `; */

      console.log ( statusMessage );
      await interaction.reply ( statusMessage );
    }
    
    catch ( error )
    {
      console.error ( "[ERROR] Failed to fetch server status:", error );
      await interaction.reply( "Failed to fetch server status. Please try again later." );
    }
  },
};