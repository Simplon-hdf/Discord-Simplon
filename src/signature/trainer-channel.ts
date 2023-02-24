import {YamlParser} from "./utils/parsers/yaml-parser";


export class TrainerChannel {

    private readonly _codeRequestSendable: boolean;

    static YamlConfig = new YamlParser('./config.yml');

    constructor(codeRequestSendable: boolean) {
        this._codeRequestSendable = codeRequestSendable;
    }

    // Add methods:
        // - selectLearners(id): void
        // - sendConfirmation(): void
        // - get_trainers(): array

}