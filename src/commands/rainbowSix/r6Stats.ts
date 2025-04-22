// API Docs: https://github.com/danielwerg/r6api.js

import { BotClient } from '@client';
import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import config from '@config';
import R6API from 'r6api.js'

const r6api = new R6API
(
  { email: config.ubiEmail,
    password: config.ubiPassword
  }
);

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
          value: "uplay"
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

async function getPlayerStats ( platform: "uplay" | "psn" | "xbl" | "steam" | "epic" | "amazon", name: string )
{
  const { 0: player } = await r6api.findByUsername(platform, username);
  if (!player) return 'Player not found';

  const { 0: stats } = await r6api.getStats(platform, player.id);
  if (!stats) return 'Stats not found';
  const {
    pvp: { general }
  } = stats;

  return `${player.username} has played ${general.matches} matches.`;
}