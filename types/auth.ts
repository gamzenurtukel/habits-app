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
export interface IAppleWithSignIn {
  identityToken: string;
  authorizationCode: string;
  appleName?: string;
}

export interface IGoogleWithSignIn {
  idToken: string;
  accessToken: string;
  googleName?: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ICurrentUser {
  dateOfBirth: string | null;
  email: string | null;
  emailConfirmed: boolean;
  gender: number | null;
  id: string;
  name: string | null;
  phoneCountryId: number;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  profilePictureUrl: string | null;
  selectedLanguage: string;
  subscriptionStatus: number;
  surname: string | null;
  twoFactorEnabled: boolean;
}

export interface ICurrentUserUpdate {
  name: string;
  surname: string;
  gender: number;
  dateOfBirth: string;
  selectedLanguage: string;
}
