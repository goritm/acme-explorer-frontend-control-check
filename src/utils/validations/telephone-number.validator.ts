import validator from 'validator';

export const validateTelephoneNumber = (value: string): boolean => {
  if (!value) return false;

  return validator.isMobilePhone(value);
};
