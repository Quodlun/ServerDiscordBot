import { BotClient } from "@client"
import { Client, Events } from "discord.js"

module.exports =
{
  name: Events.ClientReady,
  once: true,

  execute ( _: BotClient, client: Client < true > )
  {
    console.log ( `[INFO] Logged in as ${ client.user.tag }` );
  },
};