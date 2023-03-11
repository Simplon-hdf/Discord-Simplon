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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const client_manager_1 = require("../utils/client_manager");
exports.default = async () => {
    var _a;
    const eventFiles = getAllFiles('./build/events/');
    function getAllFiles(dirPath, arrayOfFiles = []) {
        try {
            const files = fs.readdirSync(dirPath);
            files.forEach(function (file) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
                }
                else {
                    arrayOfFiles.push(path.join("events/", file));
                }
            });
        }
        catch (error) {
            console.log(error);
        }
        return arrayOfFiles;
    }
    for (const file of eventFiles) {
        if (file.includes("DiscordEvent"))
            continue;
        try {
            const event = (new (await (_a = `../${file}`, Promise.resolve().then(() => __importStar(require(_a))))).default);
            if (event.get_method() == 'once')
                client_manager_1.ClientManager.get_client().once(event.get_type(), () => event.execute());
            else
                client_manager_1.ClientManager.get_client().on(event.get_type(), () => event.execute());
            client_manager_1.ClientManager.add_event(event);
        }
        catch {
            console.log(`${file} command can't be load (maybe it's not a constructor)`);
        }
    }
};
