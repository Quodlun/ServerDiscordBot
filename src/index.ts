console.log ( "Running in:", __dirname );

import client from "./client"
import config from "./config"

client.run ( config.discordToken! );