/// <reference path="../commands/ping_cmd.ts"/>
/// <reference path="../commands/add-learner-to-class.ts"/>
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { REST, Routes, Collection } from "discord.js";
import * as fs from "fs";
import * as dotenv from "dotenv";
export default (function (client, discord_token, discord_client_id) { return __awaiter(void 0, void 0, void 0, function () {
    var commandFiles, _i, commandFiles_1, file, cmd, rest;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dotenv.config();
                commandFiles = fs.readdirSync('./onboarding/dist/commands/');
                client.commands = new Collection();
                _i = 0, commandFiles_1 = commandFiles;
                _a.label = 1;
            case 1:
                if (!(_i < commandFiles_1.length)) return [3 /*break*/, 4];
                file = commandFiles_1[_i];
                return [4 /*yield*/, import("../commands/".concat(file))];
            case 2:
                cmd = _a.sent();
                //console.log(cmd.default);
                client.commands.set(cmd["default"].data.name, cmd["default"]); // Link cmd name to complete module
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                rest = new REST({ version: '10' }).setToken(discord_token);
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var error_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 2, , 3]);
                                console.log('Started refreshing application (/) commands.');
                                return [4 /*yield*/, rest.put(Routes.applicationCommands(discord_client_id), { body: client.commands.map(function (x) { return x.data.toJSON(); }) })];
                            case 1:
                                _a.sent(); //Logging commands on RESTAPI (for each values in commands, get data.JSON() to register it
                                console.log('Successfully reloaded application (/) commands.');
                                return [3 /*break*/, 3];
                            case 2:
                                error_1 = _a.sent();
                                console.error(error_1);
                                return [3 /*break*/, 3];
                            case 3: return [2 /*return*/];
                        }
                    });
                }); })();
                return [2 /*return*/];
        }
    });
}); });
