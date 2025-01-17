import { IServerResponse } from "@/types/server";
import { api } from "./api";
import { IConfirmEmail, ILogin, IRegister } from "@/types/auth";

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
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useRegisterMutation,
  useConfirmEmailMutation,
} = authApi;
export const {
  endpoints: { login, logout, forgotPassword, register, confirmEmail },
} = authApi;
