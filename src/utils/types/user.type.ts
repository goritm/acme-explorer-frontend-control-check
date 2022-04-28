export type BaseUserInput = {
  email: string;
  password: string;
};

export type ExtendedUserInput = BaseUserInput & {
  name: string;
  lastName: string;
  telephoneNumber?: string;
  address?: string;
};
