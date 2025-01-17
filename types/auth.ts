export interface ILogin {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IConfirmEmail {
  token: string;
  email: string;
}
