import { Client, Collection } from "discord.js"
import config from "./config"
import eventHendler from "./handlers/event"
import commandHandler from "./handlers/command"

class BotClient extends Client
{
  public config: typeof config;
  public commands: Collection < string, any > = new Collection ();

  constructor ()
  {
    super 
    (
      {
        intents:
        [
          "Guilds",
          "GuildMessages",
          "MessageContent",
          "GuildVoiceStates",
        ],
      }
    )

    this.config = config;
  };

  async run ( token: string ) 
  {
    // Load handlers
    await eventHendler ( this );
    await commandHandler ( this );
    // Login to Discord
    await this.login ( token ).then
    ( () =>
      {
        console.log ( "[INFO] Bot online" );
      }
    );
  }
}

const client = new BotClient ();

export default client;
export { BotClient, client };
