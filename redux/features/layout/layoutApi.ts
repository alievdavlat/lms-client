import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    getHeroLayoutByType:builder.query({
      query:() => ({
        url:'get-layout/Banner',
        method:'GET',
        credentials:'include' as const
      })
    }),
    getFaqData:builder.query({
      query:() => ({
        url:'get-layout/FAQ',
        method:'GET',
        credentials:'include' as const
      })
    }),

    getCategoriesData:builder.query({
      query:() => ({
        url:'get-layout/Categories',
        method:'GET',
        credentials:'include' as const
      })
    })
    
  })
})


export const {useGetHeroLayoutByTypeQuery, useGetFaqDataQuery, useGetCategoriesDataQuery} = layoutApi