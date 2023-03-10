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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
const UtilsManager_1 = require("../utils/UtilsManager");
exports.default = async (client, discord_token, discord_client_id) => {
    var _a;
    dotenv.config();
    const commandFiles = getAllFiles('./build/commands/');
    function getAllFiles(dirPath, arrayOfFiles) {
        arrayOfFiles = arrayOfFiles || [];
        try {
            const files = fs.readdirSync(dirPath);
            files.forEach(function (file) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
                }
                else {
                    arrayOfFiles.push(path.join("commands/", file));
                }
            });
        }
        catch (error) {
            console.log(error);
        }
        return arrayOfFiles;
    }
    client.commands = new discord_js_1.Collection();
    for (const file of commandFiles) {
        const cmd_import = await (_a = `../${file}`, Promise.resolve().then(() => __importStar(require(_a))));
        if (file.includes("SlashCommand"))
            continue;
        try {
            UtilsManager_1.UtilsManager.add_command(new cmd_import.default); // Link cmd name to complete module
        }
        catch {
            console.log(`${file} command can't be load (must because it's not a constructor)`);
        }
    }
    if (!discord_token || !discord_client_id) {
        throw new Error('Discord id or token is undefined');
    }
    const rest = new discord_js_1.REST({ version: '10' }).setToken(discord_token);
    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
            const serialized_commands = Array.from(UtilsManager_1.UtilsManager.get_commands().values())
                .map(slash_command => slash_command.data.toJSON());
            await rest.put(discord_js_1.Routes.applicationCommands(discord_client_id), { body: serialized_commands }); //Logging commands on RESTAPI (for each values in commands, get data.JSON() to register it
            console.log('Successfully reloaded application (/) commands.');
        }
        catch (error) {
            console.error(error);
        }
    })();
};
