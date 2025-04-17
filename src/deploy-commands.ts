import { REST } from 'discord.js'
import { Routes } from 'discord-api-types/v10'
import fs from 'node:fs'
import path from 'node:path'
import config from './config'


interface Command
{
  data:
  {
    toJSON: () => Record < string, unknown >;
  };

  execute: ( ...args: unknown [] ) => void;
}

const commands: Record < string, unknown > [] = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join ( __dirname, 'commands' );
const commandFolders = fs.readdirSync ( foldersPath ).filter
( folder =>
  {
    const folderPath = path.join ( foldersPath, folder );
    return fs.statSync ( folderPath ).isDirectory ();
  }
);

( async () =>
  {
    for ( const folder of commandFolders )
    {
      // Grab all the command files from the commands directory you created earlier
      const commandsPath = path.join ( foldersPath, folder );
      const commandFiles = fs.readdirSync ( commandsPath ).filter ( file => file.endsWith ( '.js' ) );
      // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
      for ( const file of commandFiles )
      {
        const filePath = path.join ( commandsPath, file );
        const command: Partial < Command > = ( await import ( filePath ) ).default;

        if ( command.data && command.execute )
        {
          commands.push ( command.data.toJSON () );
        }
        
        else
        {
          console.log ( `[WARNING] The command at ${ filePath } is missing a required "data" or "execute" property.` );
        }
      }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST ( { version: '10' } ).setToken ( config.discordToken );

    // and deploy your commands!
    try
    {
      console.log ( `Started refreshing ${ commands.length } application (/) commands.` );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put
      (
        Routes.applicationGuildCommands ( config.discordClientId, config.discordGuildId ),
        { body: commands },
      );

      console.log ( `Successfully reloaded ${ Array.isArray ( data ) ? data.length : 0 } application (/) commands.` );
    }
    
    catch ( error )
    {
      // And of course, make sure you catch and log any errors!
      console.error ( error );
    }
  }
) ();