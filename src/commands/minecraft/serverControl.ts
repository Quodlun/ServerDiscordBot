import { BotClient } from '@client';
import config from '@config';
import { fetchIp } from '@data/fetchIp';
import axios from 'axios';
import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';

var actionName: string;

export default
{
  data: new SlashCommandBuilder ()
    .setName ( "svrctrl" )
    .setDescription ( "Server control" )
    .addStringOption
    ( option => option
      .setName ( "action" )
      .setDescription(  "What to do with the server?" )
      .setRequired ( true )
      .addChoices
      (
        {
          name: "Start",
          value: "2"
        },

        {
          name: "Stop",
          value: "1"
        },

        {
          name: "Kill",
          value: "3"
        },

        {
          name: "Restart",
          value: "4"
        }
      )
    ),

  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction ) 
  {
    switch ( interaction.options.getString ( "action" ) )
    {
      case "1":
        actionName = "Stop";
        break;

      case "2":
        actionName = "Start";
        break;

      case "3":
        actionName =  "Kill";
        break;

      case "4":
        actionName = "Restart";
        break;
    }

    console.log ( `[INFO] User: ${ interaction.user.tag } require control server: ${ actionName }` );
    
    if ( interaction.user.id !== config.discordOwnerId ) 
    {
      await interaction.reply ( "You got no permissions for this command." );
      console.warn ( `[WARN] User: ${ interaction.user.tag } tried to control server: ${ actionName }` );

      return;
    }

    else
    {
      const message = await  controlServer ( Number ( interaction.options.getString ( "action" ) ) )
      await interaction.reply ( message )
    }
  } 
}

async function controlServer ( action: number )
{
  try
  {
    const apiUrl = `https://${ await fetchIp () }:25560/api/v2/servers/${ config.mcssServerId }/execute/action`;
    console.log ( `[INFO] Sending request to ${ apiUrl }` );

    const response = await axios.post  (
      apiUrl,
      {
        action: action, // 將操作動作作為請求的資料
      },

      {
        headers:
        {
          apiKey: `${ config.mcssApiKey }`, // 正確地將 API 金鑰放入標頭
          'Content-Type': 'application/json',
        },

        httpsAgent: new ( require ( 'https' ).Agent )
        (
          {
            rejectUnauthorized: false, // 忽略 SSL 憑證驗證錯誤
          }
        ),
      }
    );

    return `successfully doing server control action: "${ actionName }" `;
  }

  catch ( error: string | any )
  {
    console.error ( 'Failed to control, ', error );
    return `Failed to do the action. ${ error.response?.data?.message || error.message }`;
  }
}