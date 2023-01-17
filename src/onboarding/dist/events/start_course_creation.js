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
import { ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { set, get } from "../utils/json_utils.js";
export default {
    name: Events.InteractionCreate,
    on: true,
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var channel, state, modal, inputName, action_row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!interaction.isButton() || interaction['customId'] != 'start_course_creation')
                            return [2 /*return*/];
                        channel = interaction.channelId;
                        state = get('./config_courses.json')[interaction.user.id];
                        if (!(state && state != undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, interaction.reply({ content: 'La configuration est déja en cours', ephemeral: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                    case 2:
                        modal = new ModalBuilder()
                            .setCustomId('name-modals-formation')
                            .setTitle('Nom de la formation');
                        inputName = new TextInputBuilder()
                            .setCustomId('name-input-formations')
                            .setLabel('Entrer le nom de la formation')
                            .setStyle(TextInputStyle.Short);
                        action_row = new ActionRowBuilder().addComponents(inputName);
                        modal.addComponents(action_row);
                        return [4 /*yield*/, interaction.showModal(modal)];
                    case 3:
                        _a.sent();
                        set('./config_courses.json', interaction.user.id, { 'state': true });
                        return [2 /*return*/];
                }
            });
        });
    }
};