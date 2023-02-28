import {User} from "./user";


export class Learner extends User {
   constructor(Uuid: string, roleUuId: string, promoUuId: string ) {
      super(Uuid, roleUuId, promoUuId);
   }
   codeRequest(trainerUuid: string) {
      return trainerUuid;
   }

}