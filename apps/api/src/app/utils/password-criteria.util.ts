import { IsStrongPasswordOptions } from 'class-validator';

export const passwordCriteria: IsStrongPasswordOptions = {
  minSymbols: 0,
  minUppercase: 1,
};
