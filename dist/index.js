"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Running in:", __dirname);
const client_1 = __importDefault(require("./client"));
const config_1 = __importDefault(require("./config"));
client_1.default.run(config_1.default.discordToken);
