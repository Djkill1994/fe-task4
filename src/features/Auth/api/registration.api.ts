import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IRegistrationApi {
  email: string;
}

export const registrationApi = createApi({
  reducerPath: "registrationApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  endpoints: (build) => ({
    registration: build.mutation<
      IRegistrationApi,
      { name: string; email: string; password: string; passwordConfirm: string }
    >({
      query(data) {
        return {
          url: "collections/users/records",
          method: "post",
          body: { ...data, emailVisibility: true },
        };
      },
    }),
  }),
});

export const { useRegistrationMutation } = registrationApi;
