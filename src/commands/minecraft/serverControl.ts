import { BotClient } from '@client';
import config from '@config';
import axios from 'axios';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import https from 'https'; 

async function controlServer ( action: string )
{
  try
  {
    const apiUrl = `https://${ config.serverDdns }:25560/api/v2/servers/${ config.serverId }/action/${ action }`;
    console.log ( `[INFO] Sending request to ${ apiUrl }` );

    const response = await axios.post  (
      apiUrl, {},
      {
        headers:
        {
          "Authorization": `Bearer ${ config.serverApiKey }`,
          "Content-Type": 'application/json',
        },

        httpsAgent: new https.Agent
        (
          {
            rejectUnauthorized: false,
          }
        ),
      }
    );

    return `${ response.status }! Successfully doing server control action: "${ action }" `;
  }

  catch ( error: string | any )
  {
    console.error ( 'Failed to control, ', error );
    return `Failed to do the action. ${ error.response?.data?.message || error.message }`;
  }
}

export default
{
  data: new SlashCommandBuilder ()
    .setName ( "svrctrl" )
    .setDescription ( "Server console" )
    
    .addStringOption
    ( option => option
      .setName ( "action" )
      .setDescription(  "What to do with the server?" )
      .setRequired ( true )
      .addChoices
      (
        {
          name: "Start",
          value: "start_server"
        },

        {
          name: "Stop",
          value: "stop_server"
        },

        {
          name: "Kill",
          value: "kill_server"
        },

        {
          name: "Restart",
          value: "restart_server"
        }
      )
    ),

  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction ) 
  {
    console.log ( `[INFO] User: ${ interaction.user.tag } require control server: ${ interaction.options.getString ( "action" ) }` );
    
    if ( interaction.user.id !== config.discordOwnerId ) 
    {
      await interaction.reply ( "You got no permissions for this command." );
      console.warn ( `[WARN] User: ${ interaction.user.tag } tried to control server: ${ interaction.options.getString ( "action" ) }` );

      return;
    }

    else
    {
      const message = await  controlServer ( interaction.options.getString ( "action" ) as string );
      await interaction.reply ( message )
    }
  } 
}
