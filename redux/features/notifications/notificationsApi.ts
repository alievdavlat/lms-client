import { apiSlice } from "../api/apiSlice";




export const noificationsApi = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    
  getAllNotifications:builder.query({

    query: () => ({
      url:"get-all-notefications",
      method:"GET",
      credentials:"include" as const
    })
  }),


  updateNotificationsStatus:builder.mutation({
    query: (id) => ({
      url:`update-notefications/${id}`,
      method:"PUT",
      credentials:"include" as const
    })
  })

  })
})


export const { useGetAllNotificationsQuery,useUpdateNotificationsStatusMutation } = noificationsApi