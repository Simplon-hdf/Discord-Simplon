import {User} from "./user";


export class Learner extends User {
   constructor(Uuid: string) {
      super(Uuid);
   }
   codeRequest(trainerUuid: string) {
      return trainerUuid;
   }

}