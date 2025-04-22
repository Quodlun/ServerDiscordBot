import { BotClient } from '@client';
import { ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder } from 'discord.js';
const R6 = require('r6s-stats-api');

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
    let platform = interaction.options.getString ( "platform" );
    let name = interaction.options.getString ( "name" );

    let general = await R6.general(platform, name);
    console.log('general', general);
    await interaction.reply ( "Confirm" );
  } 
}