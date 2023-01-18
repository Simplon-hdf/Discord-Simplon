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
import { ActionRowBuilder, Events, StringSelectMenuBuilder } from "discord.js";
import { set, get } from "../utils/json_utils.js";
export default {
    name: Events.InteractionCreate,
    on: true,
    execute: function (interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var name, data, formation_data, template_id, channels, options, select_menu;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!interaction.isModalSubmit() || interaction['customId'] != 'name-modals-formation')
                            return [2 /*return*/];
                        name = interaction.fields.getTextInputValue('name-input-formations');
                        return [4 /*yield*/, get('./config_courses.json')];
                    case 1:
                        data = _c.sent();
                        formation_data = (_b = {},
                            _b[name] = name,
                            _b);
                        set('./config_courses.json', 'formations', formation_data);
                        template_id = data['template'];
                        channels = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.filter(function (channel) { return channel.type == 0 && channel.parentId == template_id; });
                        options = [];
                        channels === null || channels === void 0 ? void 0 : channels.forEach(function (element) {
                            options.push({
                                label: element.name,
                                description: "Channel de discussion",
                                value: element.id
                            });
                        });
                        select_menu = new ActionRowBuilder()
                            .addComponents(new StringSelectMenuBuilder()
                            .setCustomId('select-channels-formation')
                            .setPlaceholder('Liste de channels')
                            .addOptions(options)
                            .setMinValues(1)
                            .setMaxValues(options.length));
                        interaction.reply({ ephemeral: true, content: name, components: [select_menu] });
                        set('./config_courses.json', interaction.user.id, { 'state': true, 'formation_name': name });
                        return [2 /*return*/];
                }
            });
        });
    }
};
