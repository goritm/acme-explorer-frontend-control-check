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
