import { BotClient } from '@client';
import config from '@config';
import axios from 'axios';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import https from 'https';

export default {
  data: new SlashCommandBuilder()
    .setName("svrcmd")
    .setDescription("Send command to server")
    .addStringOption(option =>
      option
        .setName("command")
        .setDescription("Command to send to server")
        .setRequired(true)
    ),

  async execute(_client: BotClient, interaction: ChatInputCommandInteraction) {
    const command = interaction.options.getString("command") as string;
    console.log(`[INFO] User: ${interaction.user.tag} requested to control server: ${command}`);

    if (interaction.user.id !== config.discordOwnerId) {
      await interaction.reply("You do not have permissions for this command.");
      console.warn(`[WARN] User: ${interaction.user.tag} tried to control server: ${command}`);
      return;
    }

    try {
      await interaction.reply(`Command: ${command} sent to ${config.serverDdns}`);
      const message = await sendCommand(command);
      await interaction.editReply(message);
    } catch (error) {
      console.error('[ERROR] Failed to execute server command:', error);
      if (!interaction.replied) {
        await interaction.reply("An error occurred while executing the command. Please try again later.");
      }
    }
  }
};

async function sendCommand(command: string) {
  const apiUrl = `https://${config.serverDdns}:25560/api/v2/servers/${config.serverId}/stdin`;

  try
  {
    const response = await axios.post
    (
      apiUrl,
      command,
      {
        headers:
        {
          Authorization: `Bearer ${config.serverApiKey}`,
          "Content-Type": "text/plain",
        },

        httpsAgent: new https.Agent
        (
          {
            rejectUnauthorized: false,
          }
        ),
      }
    );

    return `${response.status}! Successfully sent command: ${command}`;
  }
  
  catch (error: any)
  {
    console.error("Failed to control server:", error);

    return `Failed to send command. ${error.response?.data?.message || error.message}`;
  }
}