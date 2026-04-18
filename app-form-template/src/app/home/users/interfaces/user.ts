export type IGender = 'male' | 'female';

export interface IUser {
  name: string;
  lastname: string;
  email: string;
  age: number;
  gender: IGender;
}
