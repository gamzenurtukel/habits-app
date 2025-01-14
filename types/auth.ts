export interface ILogin {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegister {
  name: string;
  surname: string;
  email: string;
  countryId: number;
  password: string;
}
