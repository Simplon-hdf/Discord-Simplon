import {User} from "./user";

export class Trainer extends User {

    reportForgottenSignature(id: string) {
        return id;
    }

    deactivateCodeRequest(id: string) {
        return id;
    }
}