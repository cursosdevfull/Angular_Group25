export type IGender = 'male' | 'female';

export interface IUser {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  age: number;
  gender: IGender;
}
