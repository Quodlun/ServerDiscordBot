import { BotClient } from "@client";
import { Events, Message } from "discord.js";

module.exports = {
  name: Events.MessageCreate,
  once: false,

  async execute(_: BotClient, message: Message) {
    try {
      // Ignore messages from bots
      if (message.author.bot) return;
      // Ignore messages not in guilds
      if (!message.guild) return;
      // Ignore messages not in channels
      if (!message.channel) return;
      // Ignore messages not in guild text channels
      if (!message.channel.isSendable()) return;

      if (message.mentions.has(message.client.user?.id)) {
        const replyMessage = [
          "We are checking...",
          "Copy.",
          "We'll come back to you.",
        ];

        await message.reply(
          replyMessage[
            Math.floor((Math.random() * 10000) % replyMessage.length)
          ]
        );
      }

      if (/\bwater\b/i.test(message.content)) {
        await message.reply("Must be the water.");
      }
    } catch (error) {
      console.error("Error in messageCreate event:", error);
    }
  },
};