# ServerDiscordBot
A bot for Team HARSH

## Installation
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)。

2. Install packages：
   ```bash
   ./moduleInstall.bat
   ```

3. Create `.env` file：
     ```md
     DISCORD_TOKEN = "Discord Bot Token"
     DISCORD_CLIENT_ID = "Discord Client ID"
     DISCORD_GUILD_ID = "Discord Guild ID"

     MCSS_API_KEY = "MCSS API Key"
     MCSS_SERVER_ID = "MCSS Server ID"

     UBI_EMAIL = "UBISOFT ACCOUNT EMAIL"
     UBI_PASSWORD = "UBISOFT ACCOUNT PASSWORD"
     ```

## Run
1. Build The Project：
   ```bash
   npm run build
   ```

2. Deploy Slash Command:
   ```bash
   npm run deploy
   ```
   
3. Start The Bot：
   ```bash
   npm run start
   ```