import { api } from "./api";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      any,
      {
        username: string;
        password: string;
        rememberMe: boolean;
      }
    >({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/User/Login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          ...body,
          rememberMe: body.rememberMe.toString(),
        }),
      }),
    }),
    forgotPassword: build.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/User/ForgotPassword",
        body: body,
      }),
    }),
    logout: build.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/User/Logout",
        body: body,
      }),
    }),
    register: build.mutation<
      any,
      {
        name: string;
        surname: string;
        phoneNumber: string;
        email: string;
        password: string;
        countryId: number;
      }
    >({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/User/Register",
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
} = authApi;

export const {
  endpoints: { login, logout, forgotPassword, register },
} = authApi;
