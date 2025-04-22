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

if ( !process.env.MCSS_API_KEY )
{
  throw new Error ( 'MCSS_API_KEY is not set in the environment variables.' );
}

if ( !process.env.UBI_EMAIL )
{
  throw new Error ( 'UBIS_EMAIL is not set in the environment variables.' );
}

if ( !process.env.UBI_PASSWORD )
{
  throw new Error ( 'UBIS_PASSWORD is not set in the environment variables.' );
}

const config =
{
  discordToken: process.env.DISCORD_TOKEN,
  discordClientId: process.env.DISCORD_CLIENT_ID,
  discordGuildId: process.env.DISCORD_GUILD_ID,
  discordOwnerId: process.env.DISCORD_OWNER_ID,

  mcssApiKey: process.env.MCSS_API_KEY,
  mcssServerId: process.env.MCSS_SERVER_ID,
  serverIcon: "https://i.imgur.com/Ew7ugRv.png",

  ubiEmail: process.env.UBI_EMAIL,
  ubiPassword: process.env.UBI_PASSWORD,
}

export default config
export { config }