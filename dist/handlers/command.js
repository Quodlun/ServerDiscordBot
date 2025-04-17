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
exports.default = commandHandler;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function commandHandler(client) {
    const foldersPath = path_1.default.join(__dirname, '../commands');
    const commandFolders = fs_1.default.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path_1.default.join(foldersPath, folder);
        // 檢查是否為目錄
        if (!fs_1.default.statSync(commandsPath).isDirectory()) {
            console.warn(`[WARNING] Skipping non-directory: ${commandsPath}`);
            continue;
        }
        console.debug(`[INFO] Loading commands from commandsPath: ${commandsPath}`);
        const commandFiles = fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path_1.default.join(commandsPath, file);
            const command = (await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)))).default;
            if ('data' in command && 'execute' in command) {
                console.debug(`[INFO] Loading command: ${command.data.name}`);
                client.commands.set(command.data.name, command);
            }
            else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}
