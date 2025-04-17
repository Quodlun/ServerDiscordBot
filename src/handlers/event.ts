import { BotClient } from "@/client"
import path from "path"
import fs from "fs"

async function eventHendler ( client: BotClient )
{
  const eventsPath = path.join ( __dirname, '../events' );
  const eventFiles = fs.readdirSync ( eventsPath ).filter ( file => file.endsWith ( '.js' ) );

  for ( const file of eventFiles )
  {
    const filePath = path.join ( eventsPath, file );
    const event = ( await import ( filePath ) ).default;

    if ( event.once )
    {
      client.once ( event.name, ( ...args ) => event.execute ( client, ...args ) );
    }
    
    else
    {
      client.on ( event.name, ( ...args ) => event.execute ( client, ...args ) );
    }
  }
}

export default eventHendler