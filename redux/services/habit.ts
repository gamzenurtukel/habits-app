import { IServerResponse } from "@/types/server";
import { api } from "./api";
import {
  IHabit,
  IHabitActionListData,
  IHabitCreate,
  IHabitUpdate,
  IHabitUpdateAction,
} from "@/types/habit";

const habitApi = api.injectEndpoints({
  endpoints: (build) => ({
    createHabit: build.mutation<IServerResponse<any>, IHabitCreate>({
      query: (body) => ({
        method: "POST",
        url: "/Habit/Api/Habit/Create",
        body: body,
      }),
    }),
    habitGetList: build.query<IServerResponse<IHabit[]>, void>({
      query: () => ({
        method: "GET",
        url: "/Habit/Api/Habit/GetList?Size=100&PageNumber=0&IsFailed=false",
      }),
    }),
    habitActionList: build.query<IServerResponse<IHabitActionListData>, string>(
      {
        query: (date) => {
          const newDate = new Date(date).toISOString().slice(0, 10);
          // console.log("New Date:", newDate);
          console.log("Date:", date);
          return {
            method: "GET",
            url: "/Habit/Api/HabitAction/ActionGetList",
            params: {
              Date: date,
            },
            transformResponse: (
              response: any,
              meta: any,
              arg: any,
              date: any
            ) => {
              console.log("Response:", response);
              console.log("Meta:", meta);
              console.log("Arg:", arg);
              console.log("Date:", date);
              return response;
            },
            onQueryStarted: async (arg: any, { queryFulfilled }: any) => {
              console.log("Query started with arg:", arg); // Sorguya gönderilen argüman
              try {
                const { data } = await queryFulfilled;
                console.log("Query fulfilled with data:", data); // API'den gelen veri
              } catch (error) {
                console.log("Query failed with error:", error); // Hata durumu
              }
            },
          };
        },
      }
    ),
    habitGetById: build.query<IServerResponse<IHabit>, string>({
      query: (id) => ({
        method: "GET",
        url: `/Habit/Api/Habit/${id}`,
      }),
    }),
    updateHabit: build.mutation<IServerResponse<any>, IHabitUpdate>({
      query: (body) => ({
        method: "PUT",
        url: `/Habit/Api/Habit/Update`,
        body: body,
      }),
    }),
    deleteHabit: build.mutation<
      IServerResponse<any>,
      {
        id: string;
      }
    >({
      query: (body) => ({
        method: "DELETE",
        url: `/Habit/Api/Habit/Delete`,
        body: body,
      }),
    }),
    updateActionHabit: build.mutation<IServerResponse<any>, IHabitUpdateAction>(
      {
        query: (body) => ({
          method: "PUT",
          url: "/Habit/Api/HabitAction/UpdateAction",
          body: body,
        }),
      }
    ),
  }),
  overrideExisting: true,
});

export const {
  useCreateHabitMutation,
  useHabitGetListQuery,
  useHabitActionListQuery,
  useHabitGetByIdQuery,
  useUpdateHabitMutation,
  useDeleteHabitMutation,
  useUpdateActionHabitMutation,
} = habitApi;
export const {
  endpoints: {
    createHabit,
    habitGetList,
    habitActionList,
    habitGetById,
    updateHabit,
    deleteHabit,
    updateActionHabit,
  },
} = habitApi;
