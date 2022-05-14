export enum UserRoles {
  GUEST = 'GUEST',
  EXPLORER = 'EXPLORER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  SPONSOR = 'SPONSOR'
}

export const ALL_ROLES = [
  UserRoles.EXPLORER,
  UserRoles.MANAGER,
  UserRoles.ADMIN,
  UserRoles.SPONSOR
];

export const MANAGER = [UserRoles.MANAGER, UserRoles.ADMIN];

export const SPONSOR = [UserRoles.SPONSOR, UserRoles.ADMIN];
