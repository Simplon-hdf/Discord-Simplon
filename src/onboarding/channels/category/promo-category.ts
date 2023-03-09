import { Channel } from '../channel';
import { Permission } from '../../permission';
import { User } from '../../users/user';

export class PromoCategory {
  private readonly _id: number;
  private readonly _channels: List<Channel> = new List<Channel>();
  private readonly _permissions: List<Permission> = new List<Permission>();
  private readonly _membersList: List<User> = new List<User>();

  private _invitationLink: string;

  constructor(id: number, invitation_link: string) {
    this._id = id;
    this._invitationLink = invitation_link;
  }

  get id(): number {
    return this._id;
  }

  get channels(): List<Channel> {
    return this._channels;
  }

  get permissions(): List<Permission> {
    return this._permissions;
  }

  get membersList(): List<User> {
    return this._membersList;
  }

  get invitationLink(): string {
    return this._invitationLink;
  }

  set invitationLink(value: string) {
    this._invitationLink = value;
  }
}
