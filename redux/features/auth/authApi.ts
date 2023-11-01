import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type registrationRespose = {
  message: string;
  activationToken:string;
}

type registrationData = {}


export const authApi = apiSlice.injectEndpoints({
  endpoints:(builder) => ({


    register: builder.mutation<registrationRespose, registrationData>({
      query: (data) => ({
        url:'register',
        method:'POST',
        body:data,
        credentials:'include' as const,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}){
          try {
              const result = await queryFulfilled;
              dispatch(userRegistration({
                token:result.data.activationToken
              }))
          } catch (err) {
            console.log(err);
         }
      }
    }),

    activation: builder.mutation({
        query:({activation_token, activation_code}) => ({
            url:'activate-user',
            method:"POST",
            body:{
              activation_code,
              activation_token
            }
        })
    }),

    login: builder.mutation({
      query:(data:any) => ({
        url: 'login',
        method:"POST",
        body: {...data},
        credentials:'include' as const,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try {
          const result = await queryFulfilled;

          dispatch(userLoggedIn({
            token:result.data.acessToken,
            user: result.data.user
          }))
        } catch (err) {
          console.log(err);
       }
      }

    }),

    socialAuth: builder.mutation({
      query:(data:any) => ({
        url: 'socialAuth',
        method:"POST",
        body: {...data},
        credentials:'include' as const,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try {
            const result = await queryFulfilled;
            console.log(result);
            
            dispatch(userLoggedIn({
              token:result.data.acessToken,
              user: result.data.user
            }))
        } catch (err) {
          console.log(err);
       }
      }

    }),

    logout: builder.query({
      query:() => ({
        url: 'logout',
        method:"GET",
        credentials:'include' as const,
      }),

      async onQueryStarted(arg, {queryFulfilled, dispatch}){
        try {
          
            dispatch(
              userLoggedOut()
            )
        } catch (err) {
          console.log(err);
       }
      }

    }),



  })

})


export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation, useLogoutQuery} = authApi