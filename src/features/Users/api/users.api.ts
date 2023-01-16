import { createApi } from "@reduxjs/toolkit/query/react";
import { authFetchBaseQuery } from "../../../common/utils/authFetchBaseQuery";

export interface IUser {
  id: string;
  email: string;
  name: string;
  banned: boolean;
  admin: boolean;
}

type IUsersApiResponse = IUser[];

interface IAuthRefreshResponse {
  record: IUser;
}

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: authFetchBaseQuery,
  tagTypes: ["User"],
  endpoints: (build) => ({
    authRefresh: build.mutation<IAuthRefreshResponse, void>({
      query() {
        return {
          url: "collections/users/auth-refresh",
          method: "post",
        };
      },
    }),
    getUsers: build.query<IUsersApiResponse, void>({
      query() {
        return {
          url: "collections/users/records",
        };
      },
      providesTags: ["User"],
    }),
    deleteUser: build.mutation<void, string>({
      query(id) {
        return {
          url: `collections/users/records/${id}`,
          method: "delete",
        };
      },
      invalidatesTags: ["User"],
    }),
    banUser: build.mutation<void, string>({
      query(id) {
        return {
          url: `collections/users/records/${id}`,
          method: "PATCH",
          body: { banned: true },
        };
      },
      invalidatesTags: ["User"],
    }),
    unBanUser: build.mutation<void, string>({
      query(id) {
        return {
          url: `collections/users/records/${id}`,
          method: "PATCH",
          body: { banned: false },
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAuthRefreshMutation,
  useDeleteUserMutation,
  useBanUserMutation,
  useUnBanUserMutation,
} = usersApi;
