import dotenv from 'dotenv'
dotenv.config ();

if ( !process.env.DISCORD_TOKEN )
{
  throw new Error ( 'DISCORD_TOKEN is not set in the environment variables.' );
}

if ( !process.env.DISCORD_CLIENT_ID )
{
  throw new Error ( 'DISCORD_CLIENT_ID is not set in the environment variables.' );
}

if ( !process.env.DISCORD_GUILD_ID )
{
  throw new Error ( 'DISCORD_GUILD_ID is not set in the environment variables.' );
}

const config =
{
  discordToken: process.env.DISCORD_TOKEN,
  discordClientId: process.env.DISCORD_CLIENT_ID,
  discordGuildId: process.env.DISCORD_GUILD_ID,
}

export default config
export { config }