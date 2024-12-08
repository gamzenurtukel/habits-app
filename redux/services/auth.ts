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
        url: "/Nexus/Api/User/Login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:body,
      }),
    }),
    forgotPassword: build.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/ForgotPassword",
        body: body,
      }),
    }),
    logout: build.mutation<any, any>({
      query: (body) => ({
        method: "POST",
        url: "/Nexus/Api/User/Logout",
        // body: body,
      }),
    }),
    register: build.mutation<
      any,
      {
        name: string;
        surname: string;
        email: string;
        phoneNumber: string;
        countryId: number;
        password: string;
      }
    >({
      query: (body) => ({
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: "/Nexus/Api/User/Register",
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
