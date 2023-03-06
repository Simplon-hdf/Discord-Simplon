import {User} from "./user";
import {HttpUtils} from "../utils/http";
import {Routes} from "../utils/routes";


export class Learner extends User {
   constructor(learnerUuid: string) {
      super(learnerUuid);
   }

   async getCodeRequestStatus(): Promise<boolean> {
      const codeRequestStatus =  await new HttpUtils().get(Routes.GET_CODE_REQUEST_STATUS, this._Uuid)
      try {
         return codeRequestStatus;
      }
      catch (error) {
         console.log(codeRequestStatus.error.message)
         return false
      }
   }

   async hasReport(): Promise<boolean> {
      const hasReport = await new HttpUtils().get(Routes.GET_REPORT, this._Uuid)
      try {
         return hasReport;
      }
      catch (error) {
         console.log(hasReport.error.message)
         return false
      }
   }
   codeRequest(trainerUuid: string) {
      return trainerUuid;
   }

}