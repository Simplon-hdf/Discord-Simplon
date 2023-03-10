export interface IUser {
  getUserUuid(): string;
  getUsername(): string;
  getMail(): string;
  getRoleUuid(): string;
  getPromoName(): string | undefined;
}

export class User implements IUser {
  private readonly user_uuid: string;
  private readonly username: string;
  private readonly mail: string;
  private readonly role_uuid: string;

  private readonly promo_name?: string | undefined;


  constructor(user_uuid: string, username: string, mail: string, role_uuid: string, promo_name?: string) {
    this.user_uuid = user_uuid;
    this.username = username;
    this.mail = mail;
    this.role_uuid = role_uuid;
    this.promo_name = promo_name;
  }

  getUserUuid(){
    return this.user_uuid;
  }

  getUsername(){
    return this.username;
  }

  getMail(){
    return this.mail;
  }

  getRoleUuid(){
    return this.role_uuid;
  }

  getPromoName(): string | undefined {
    return this.promo_name;
  }
}
