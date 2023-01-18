import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

export interface IUser {
  id: string;
  email: string;
  username: string;
  status: boolean;
  registrationDate: string;
  lastVisit: string;
}

type IUsersApiResponse = IUser[];

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["User"],
  endpoints: (build) => ({
    authRefresh: build.query<IUser, void>({
      query() {
        return {
          url: "auth/refresh",
        };
      },
      providesTags: ["User"],
    }),
    getUsers: build.query<IUsersApiResponse, void>({
      query() {
        return {
          url: "/users",
        };
      },
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<void, string[]>({
      query(ids) {
        return {
          url: "/users/delete",
          method: "delete",
          body: { ids },
        };
      },
      invalidatesTags: ["User"],
    }),
    banUser: build.mutation<void, string[]>({
      query(ids) {
        return {
          url: "/users/ban",
          method: "post",
          body: { ids },
        };
      },
      invalidatesTags: ["User"],
    }),
    unBanUser: build.mutation<void, string[]>({
      query(ids) {
        return {
          url: "/users/unban",
          method: "post",
          body: { ids },
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBanUserMutation,
  useUnBanUserMutation,
  useAuthRefreshQuery,
} = usersApi;
