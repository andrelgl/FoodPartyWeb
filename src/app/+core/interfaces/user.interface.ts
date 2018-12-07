import { IEnterprise } from "./enterprise.interface";

export interface IUser {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  key?: string;
  id?: number;
  is_enterprise?: boolean;
  is_consumer?: boolean;
  data?: IEnterprise;
}
