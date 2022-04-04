import { IBaseEntity } from '../intefaces/base-entity.interface';

export class BaseEntity implements IBaseEntity {
  private _id: string;
  private _version: number;

  constructor(id: string, version: number) {
    this._id = id;
    this._version = version;
  }

  get id(): string {
    return this._id;
  }

  get version(): number {
    return this._version;
  }
}
