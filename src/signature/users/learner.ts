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

   async hasReport(): Promise<any> {
      const hasReport = await new HttpUtils().get(Routes.GET_REPORT, this._Uuid)
      try {
         return hasReport;
      }
      catch (error) {
         console.log(hasReport.error.message)
         return false
      }
   }

   async getTrainers(): Promise<any> {
      const trainerList = await new HttpUtils().get(Routes.GET_TRAINERS, this._Uuid)
      try {
         return trainerList
      }
      catch(error) {
         console.log(trainerList.error.message)
         return 'fail'
      }
   }

   async codeRequest(trainerUuid: string): Promise<any> {
      const codeRequest = await new HttpUtils().post(Routes.POST_CODE_REQUEST, {
            "trainerUuid": trainerUuid

      }, this._Uuid);
      try {
         return codeRequest
      }
      catch (error) {
         console.log(codeRequest.error.message)
         return 'fail'
      }
   }


}