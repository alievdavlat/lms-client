import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics:builder.query({
      query: () => ({
        url:'courses-analytics',
        method:'GET',
        credentials:'include' as const
      })
    }),

    getUsersAnalytics:builder.query({
      query: () => ({
        url:'user-analytics',
        method:'GET',
        credentials:'include' as const
      })
    }),

    getOrdersAnalytics:builder.query({
      query: () => ({
        url:'orders-analytics',
        method:'GET',
        credentials:'include' as const
      })
    })
  })
})


export const {useGetCoursesAnalyticsQuery, useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery} = analyticsApi