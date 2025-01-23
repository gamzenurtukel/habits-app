import { IServerResponse } from "@/types/server";
import { api } from "./api";
import {
  IAppleWithSignIn,
  IChangePassword,
  IConfirmEmail,
  ICurrentUser,
  ILogin,
  IRegister,
} from "@/types/auth";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IServerResponse<any>, ILogin>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/Login",
        body: body,
      }),
    }),
    logout: build.mutation<IServerResponse<any>, void>({
      query: () => ({
        method: "POST",
        url: "/Nexus/Api/User/Logout",
      }),
    }),
    forgotPassword: build.mutation<IServerResponse<any>, string>({
      query: (email) => ({
        method: "POST",
        url: "/Nexus/Api/User/ForgotPassword",
        body: { email },
      }),
    }),
    register: build.mutation<IServerResponse<any>, IRegister>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/Register",
        body: body,
      }),
    }),
    confirmEmail: build.mutation<IServerResponse<any>, IConfirmEmail>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/ConfirmEmail",
        body: body,
      }),
    }),
    appleWithSignIn: build.mutation<IServerResponse<any>, IAppleWithSignIn>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/AppleTokenValidate",
        body: body,
      }),
    }),
    changePassword: build.mutation<IServerResponse<any>, IChangePassword>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/ChangePassword",
        body: body,
      }),
    }),
    getCurrentUser: build.query<IServerResponse<ICurrentUser>, void>({
      query: () => ({
        method: "GET",
        url: "/Nexus/Api/User/GetCurrentUser",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useConfirmEmailMutation,
  useAppleWithSignInMutation,
  useChangePasswordMutation,
  useGetCurrentUserQuery,
} = authApi;
export const {
  endpoints: {
    login,
    logout,
    forgotPassword,
    register,
    confirmEmail,
    appleWithSignIn,
    changePassword,
    getCurrentUser,
  },
} = authApi;
