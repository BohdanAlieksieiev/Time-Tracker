export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
} 

export interface ITask {
  name: string;
  hour: number;
  minute: number;
  description: string;
  user: IUser;
}