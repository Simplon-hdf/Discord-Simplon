import {YamlParser} from "../utils/parsers/yaml-parser";


export class TrainerChannel {

    private readonly _learnersList;

    static YamlConfig = new YamlParser('./config.yml');

    constructor(learnersList: any) {
        this._learnersList = learnersList;
    }

    // Add methods:
    // - reportToTrainer(id)
    // - get_learners(id)

}