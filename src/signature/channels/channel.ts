import {YamlParser} from "../utils/parsers/yaml-parser";


export class Channel {

    private readonly _uuid: number;

    static YamlConfig = new YamlParser('./config.yml');

    constructor(id: number) {
        this._uuid = id;
    }

    get uuid(): number {
        return this._uuid;
    }

    SendConfirmation(channelId: number): void {
        console.log(channelId);

        //TODO: Implement function.
    }

}