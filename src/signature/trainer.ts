import {User} from "./user";

export class Trainer extends User {
    // TODO: Add reportForgottenSignature(id) : void
    // TODO: Add deactivateCodeRequest(id): void)

    reportForgottenSignature(id: string) {
        return id;
    }

    deactivateCodeRequest(id: string) {
        return id;
    }
}