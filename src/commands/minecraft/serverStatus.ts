import { BotClient } from "@client"
import { ChatInputCommandInteraction } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import config from "@config";

export default
{
  data: new SlashCommandBuilder ()
    .setName ( 'svrstat' )
    .setDescription ( 'Minecraft Server Status.' ),
    
  async execute ( _client:BotClient, interaction:ChatInputCommandInteraction )
  {}
};
