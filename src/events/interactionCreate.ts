import { BotClient } from "@client"
import { Events, Interaction, MessageFlags } from "discord.js"

export default
{
  name: Events.InteractionCreate,

  async execute ( client: BotClient, interaction: Interaction )
  {
    if ( !interaction.isChatInputCommand () )
    {
      return;
    }

    const command = client.commands.get ( interaction.commandName );

    if ( !command )
    {
      console.error ( `No command matching ${ interaction.commandName } was found.` );
      return;
    }

    try
    {
      await command.execute ( client, interaction );
    }
    
    catch ( error )
    {
      console.error ( error );

      if ( interaction.replied || interaction.deferred )
      {
        await interaction.followUp ( { content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral } );
      }

      else
      {
        await interaction.reply ( { content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral } );
      }
    }
  },
};
