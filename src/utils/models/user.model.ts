import { BaseEntity } from '../../app/shared/classes/base.entity';
import { UserRoles } from '../../app/shared/enums/user-roles.enum';
import { IUser } from '../interfaces/user.interface';

export class User extends BaseEntity implements IUser {
  private _name: string;
  private _lastName: string;
  private _email: string;
  private _role: UserRoles;
  private _profilePicture?: string;
  private _address?: string;
  private _telephoneNumber?: string;

  constructor(
    id: string,
    version: number,
    name: string,
    lastName: string,
    email: string,
    role: UserRoles,
    profilePicture?: string,
    address?: string,
    telephoneNumber?: string
  ) {
    super(id, version);
    this._name = name;
    this._lastName = lastName;
    this._email = email;
    this._role = role;
    this._profilePicture = profilePicture;
    this._address = address;
    this._telephoneNumber = telephoneNumber;
  }

  get name(): string {
    return this._name;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get role(): UserRoles {
    return this._role;
  }

  get profilePicture(): string | undefined {
    return this._profilePicture;
  }

  get address(): string | undefined {
    return this._address;
  }

  get telephoneNumber(): string | undefined {
    return this._telephoneNumber;
  }
}
