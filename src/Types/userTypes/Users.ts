export interface IUserAuthRequest {
  login: string;
  password: string;
  language: string;
}

export interface IUserStatus {
  isAuth?: boolean;
  isLoading?: boolean;
  error?: string;
}
