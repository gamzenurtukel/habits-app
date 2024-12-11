import { api } from "./api";

const createHabitApi = api.injectEndpoints({
  endpoints: (build) => ({
    createHabit: build.mutation<
      any, // Daha güçlü bir type kullanımı önerilir
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
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: "/Habit/Api/Habit/Create",
        body: body,
      }),
    }),
  }),
  overrideExisting: true,
});

// Hook ve endpoint exportları
export const { useCreateHabitMutation } = createHabitApi;

export const {
  endpoints: { createHabit },
} = createHabitApi;
