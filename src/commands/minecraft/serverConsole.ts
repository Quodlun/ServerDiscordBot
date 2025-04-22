import { BotClient } from '@client';
import config from '@config';
import { fetchIp } from '@data/fetchIp';
import axios from 'axios';
import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default
{
  data: new SlashCommandBuilder ()
    .setName ( "svrcnsl" )
    .setDescription ( "Server control" )
    
    .addStringOption
    ( option => option
      .setName ( "command" )
      .setDescription( "Command to send to server console." )
      .setRequired ( true )
    ),

  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction ) 
  {
    console.log ( `[INFO] User: ${ interaction.user.tag } require to send command to the server: ${ interaction.options.getString ( "command" ) }` );
    
    if ( interaction.user.id !== config.discordOwnerId ) 
    {
      await interaction.reply ( "You got no permissions for this command." );
      console.warn ( `[WARN] User: ${ interaction.user.tag } tried to send command to the server: ${ interaction.options.getString ( "command" ) }` );

      return;
    }

    else
    {
      const message = await  commandServer ( String ( interaction.options.getString ( "command" ) ) )
      await interaction.reply ( message )
    }
  } 
}

async function commandServer ( command: string )
{
  try
  {
    const apiUrl = `https://${ await fetchIp () }:25560/api/v2/servers/${ config.mcssServerId }/execute/command`;
    console.debug ( `[INFO] Sending request to ${ apiUrl }` );

    const response = await axios.post  (
      apiUrl,
      {
        command: command,
      },

      {
        headers:
        {
          apiKey: `${ config.mcssApiKey }`,
          'Content-Type': 'application/json',
        },

        httpsAgent: new ( require ( 'https' ).Agent )
        (
          {
            rejectUnauthorized: false,
          }
        ),
      }
    );

    return "successfully sending command";
  }

  catch ( error: string | any )
  {
    console.error ( 'Failed to control, ', error );
    return `Failed to do the action. ${ error.response?.data?.message || error.message }`;
  }
}