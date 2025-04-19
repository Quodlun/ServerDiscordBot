import { BotClient } from "@client";
import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import axios from "axios";
import { config } from "dotenv";
import https from "https";

config(); // 載入 .env 檔案中的環境變數

export default {
  data: new SlashCommandBuilder()
    .setName("serverstatus")
    .setDescription("Get the status of the Minecraft server."),

  async execute(_client: BotClient, interaction: ChatInputCommandInteraction) {
    try {
      const apiUrl = "https://localhost:25560/api/v2/server/status";
      const apiKey = process.env.MCSS_API_KEY; // 從環境變數讀取 API 金鑰

      if (!apiKey) {
        throw new Error("API key is missing. Please set MCSS_API_KEY in your .env file.");
      }

      const agent = new https.Agent({
        rejectUnauthorized: false, // 忽略 SSL 憑證驗證
      });

      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        httpsAgent: agent,
      });

      const serverStatus = response.data;
      const statusMessage = `
        **Server Name**: ${serverStatus.name}
        **Status**: ${serverStatus.status}
        **Players**: ${serverStatus.players.online}/${serverStatus.players.max}
        **Uptime**: ${serverStatus.uptime}
      `;

      await interaction.reply(statusMessage);
    } catch (error) {
      console.error("[ERROR] Failed to fetch server status:", error);
      await interaction.reply("Failed to fetch server status. Please try again later.");
    }
  },
};