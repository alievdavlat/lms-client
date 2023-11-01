import { apiSlice } from "../api/apiSlice";




export const ordersApi = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    createOrder: builder.mutation({
      query: ({courseId, payment_info}) => ({
        url:"create-order",
        method:"POST",
        body:{
          courseId,
          payment_info
        },
        credentials:'include' as const
          })
    }),

    createPaymentIndent: builder.mutation({
      query: (amount) => ({
        url:"payment",
        method:"POST",
        body:{
          amount
        },
        credentials:"include" as const
      })
    }),

    getStripePublishKey: builder.query({
      query: ({oldPassword, newPassword}) => ({
        url:"payment/stripepublishkey",
        method:"GET",
        credentials:'include' as const
      })
    }),

    getAllOrders: builder.query({
      query: () => ({
        url:'getall-orders',
        method:'GET',
        credentials:'include' as const
      })
    })


  })
})


export const {useCreateOrderMutation, useGetAllOrdersQuery, useCreatePaymentIndentMutation, useGetStripePublishKeyQuery} = ordersApi








