export interface IUserAuthRequest {
  login: string;
  password: string;
  language: string;
}

export interface IUser {
  login?: string;
  password?: string;
  country?: string;
}

export interface IUserStatus {
  isAuth?: boolean;
  isLoading?: boolean;
  error?: string;
  data: IUser;
}
