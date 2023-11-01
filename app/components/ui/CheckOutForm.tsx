import { styles } from '@/app/styles/style';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useCreateOrderMutation } from '@/redux/features/orders/ordersApi';
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { redirect } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''
const socketId = socketIO(ENDPOINT, {transports:['websocket']})



type Props = {
  data:any;
  setOpen:(open:boolean) => void;

}

const CheckOutForm:React.FC<Props> = ({data, setOpen}) => {

  

  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage ] = React.useState('')

  const [createOrder , {data:orderData, error}] = useCreateOrderMutation()
  const [loaduser , setLoadUser] = React.useState(false)
  const {data:userData} = useLoadUserQuery({skip:loaduser ? false : true})

  const [isLoading , setIsLoading] = React.useState(false)

  
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    if (!stripe || !elements) {
        return
    }

    setIsLoading(true)

    
    const { error, paymentIntent} = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })

    if (error) {
      setMessage(error?.message)
      setIsLoading(false)

    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsLoading(false)
      setLoadUser(true)
      await createOrder({courseId:data._id, payment_info:paymentIntent})

    }


  }


  React.useEffect(() => {
    if (orderData) {
        toast.success('course usccessfully boughted')
        setLoadUser(true) 

        socketId.emit('notification', {
          title:'New Order',
          message:`You have a new order from  ${data.name}`,
          userId:userData?.user?._id
        })
        redirect(`/course-access/${data._id}`)
    }

    if (error) {
        if ('data'  in error) {
            const errMess = error as any;
            toast.error(errMess.data.message)
        }
    }
  }, [orderData, error])

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
    <LinkAuthenticationElement id="link-authentication-element"
      // Access the email value like so:
      // onChange={(event) => {
      //  setEmail(event.value.email);
      // }}
      //
      // Prefill the email field like so:
      // options={{defaultValues: {email: 'foo@bar.com'}}}
      />
    <PaymentElement id="payment-element" />
    <button disabled={isLoading || !stripe || !elements} id="submit">
      <span id="button-text" className={`${styles.button} mt-12`}>
        {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
      </span>
    </button>

    {/* Show any error or success messages */}
    {message && <div id="payment-message" className='text-red-500 font-Poppins pt-2'>{message}</div>}
  </form>
  )
}

export default CheckOutForm