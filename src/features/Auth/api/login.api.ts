import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IAuthRecord {
  banned: boolean;
}

interface ILoginApiResponse {
  token: string;
  record: IAuthRecord;
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (build) => ({
    login: build.mutation<
      ILoginApiResponse,
      { identity: string; password: string }
    >({
      query(data) {
        return {
          url: "collections/users/auth-with-password",
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
