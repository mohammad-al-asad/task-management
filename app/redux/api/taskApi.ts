import { baseApi } from "./baseApi";
import { Task } from "../../types/task";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/task/get-all-task",
      transformResponse: (response: any) => {
        if (response?.status === "Success") {
          return response.data.myTasks;
        }
        return [];
      },
      providesTags: ["Task"],
    }),
  }),
});

export const { useGetTasksQuery } = taskApi;
