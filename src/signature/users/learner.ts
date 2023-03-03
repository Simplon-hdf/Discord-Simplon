import {User} from "./user";


export class Learner extends User {
   constructor(learnerId: string) {
      super(learnerId);
   }
   codeRequest(trainerUuid: string) {
      return trainerUuid;
   }

}