// https://github.com/danielwerg/r6api.js

import { BotClient } from '@client';
import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';

export default
{
  data: new SlashCommandBuilder ()
    .setName ( "r6stats" )
    .setDescription ( "Find player stats." )

    .addStringOption
    ( option => option
      .setName ( "platform" )
      .setDescription(  "Action to perform" )
      .setRequired ( true )
      .addChoices
      (
        {
          name: "PC",
          value: "pc"
        },

/*      {
          name: "XBox",
          value: "xbox"
        },

        {
          name: "PlayStation",
          value: "playstation"
        },*/
      )
    )

    .addStringOption
    ( option => option
      .setName ( "name" )
      .setDescription(  "Play ID" )
      .setRequired ( true )
    ),

  async execute ( _client: BotClient, interaction: ChatInputCommandInteraction ) 
  {
    
  } 
}