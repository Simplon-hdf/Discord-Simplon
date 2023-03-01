import {User} from "./user";


export class Learner extends User {
   constructor(Uuid: string, roleUuId: string) {
      super(Uuid, roleUuId);
   }
   codeRequest(trainerUuid: string) {
      return trainerUuid;
   }

}