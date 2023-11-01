import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    updateAvatar: builder.mutation({
      query: (data) => ({
         url:'upload-profile-picture',
         method:'POST',
         body:data,
         credentials:'include' as const
      })
    }),

    editProfile: builder.mutation({
      query: ({name}) => ({
         url:'update-profile',
         method:'PUT',
         body:{name},
         credentials:'include' as const
      })
    }),

    editPassword: builder.mutation({
      query: ({oldPassword, newPassword}) => ({
         url:'update-password',
         method:'PUT',
         body:{oldPassword, newPassword},
         credentials:'include' as const
      })
    }),

    getAllUsers: builder.query({
      query: () => ({
        url:'getall-users',
        method:'GET',
        credentials:"include" as const
      })
    })


  })
})


export const {useUpdateAvatarMutation, useEditProfileMutation, useEditPasswordMutation, useGetAllUsersQuery} = userApi