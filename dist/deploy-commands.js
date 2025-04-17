"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const config_1 = __importDefault(require("./config"));
const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = node_path_1.default.join(__dirname, 'commands');
const commandFolders = node_fs_1.default.readdirSync(foldersPath).filter(folder => {
    const folderPath = node_path_1.default.join(foldersPath, folder);
    return node_fs_1.default.statSync(folderPath).isDirectory();
});
(async () => {
    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = node_path_1.default.join(foldersPath, folder);
        const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = node_path_1.default.join(commandsPath, file);
            const command = (await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)))).default;
            if (command.data && command.execute) {
                commands.push(command.data.toJSON());
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    // Construct and prepare an instance of the REST module
    const rest = new discord_js_1.REST({ version: '10' }).setToken(config_1.default.discordToken);
    // and deploy your commands!
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);
        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(v10_1.Routes.applicationGuildCommands(config_1.default.discordClientId, config_1.default.discordGuildId), { body: commands });
        console.log(`Successfully reloaded ${Array.isArray(data) ? data.length : 0} application (/) commands.`);
    }
    catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();
