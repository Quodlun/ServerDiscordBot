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
      let apiUrl = `https://api.mcsrvstat.us/3/${ await fetchIp () }`;
      const response = await fetch ( apiUrl );

      const data = await response.json ();

      console.log ( data );

      let serverStatus = data.online ? "Online" : "Offline";

      const statusMessage = 
      `
        > Server IP / Port: ${ data.ip }:${ data.port }
        > Server Version: ${ data.version }
        > Server Type: ${ data.software }
        > Server Status: ${ serverStatus }
        > Server Players: ${ data.players.online }/${ data.players.max }
      `

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