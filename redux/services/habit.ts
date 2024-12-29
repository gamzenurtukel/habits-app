import { api } from "./api";

const habitApi = api.injectEndpoints({
  endpoints: (build) => ({
    createHabit: build.mutation<
      any,
      {
        name: string;
        description: string;
        isReminder: boolean;
        details: {
          color: string;
          icon: string;
          periodType: number;
          periodCount: number;
          startTime: string | null;
          endTime: string | null;
        };
      }
    >({
      query: (body) => ({
        method: "POST",
        url: "/Habit/Api/Habit/Create",
        body: body,
      }),
    }),
    habitGetList: build.query<any, any>({
      query: () => ({
        method: "GET",
        url: "/Habit/Api/Habit/GetList?Size=100&PageNumber=0&IsFailed=false",
      }),
    }),
    habitActionList: build.query<any, any>({
      query: ({ date }: { date: Date }) => ({
        method: "GET",
        url: `/Habit/Api/HabitAction/ActionGetList?Date=${date.toISOString()}`,
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateHabitMutation,
  useHabitGetListQuery,
  useHabitActionListQuery,
} = habitApi;
export const {
  endpoints: { createHabit, habitGetList, habitActionList },
} = habitApi;
