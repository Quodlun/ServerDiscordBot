import { BotClient } from "@client";
import { ChatInputCommandInteraction } from "discord.js";
import { EmbedBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { config } from "@config";

export default
{
  data: new SlashCommandBuilder ()
    .setName ( "svrstat" )
    .setDescription ( "Get the status of the Minecraft server." ),

  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction)
  {
    console.log ( `[INFO] User: ${ interaction.user.tag } require fetching server status from MCSS API...` );
    try
    {
      let apiUrl = "https://api.mcsrvstat.us/3/harsh-server.duckdns.org";
      const response = await fetch ( apiUrl );

      const data = await response.json ();

      console.log ( data );

      let serverStatus = data.online ? "Online" : "Offline";

      const replyMessage = new EmbedBuilder()
        .setColor ( 0x7777AA )
        .setAuthor ( { name: "HARSH Server", iconURL: config.serverIcon } )
        .setTitle ( "Server Status" )
        .setThumbnail ( config.serverIcon )
        .setDescription ( "[Check Server Status Online](https://harsh-server.duckdns.org:25560/status)" )
        .addFields
        (
          {
            name: "Server Version",
            value: data.version,
            inline: true
          },

          {
            name: "Server Type",
            value: data.software,
            inline: true
          },
        )

        .addFields
        (
          {
            name: "Server Status",
            value: serverStatus,
            inline: true 
          },

          {
            name: "Server Players",
            value: `${data.players.online}/${data.players.max}`,
            inline: true
          },

          {
            name: "Server Link",
            value: `${ data.hostname }`,
            inline: true
          }
        )

      console.log ( replyMessage );
      await interaction.reply ( { embeds: [ replyMessage ] } );
    }
    
    catch ( error )
    {
      console.error ( "[ERROR] Failed to fetch server status:", error );
      await interaction.reply( "Failed to fetch server status. Please try again later." );
    }
  },
};