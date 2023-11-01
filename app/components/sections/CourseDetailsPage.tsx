import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect } from 'react'
import CourseLoader from '../ui/courseLoader';
import Heading from '@/app/utils/Heading';
import Header from './Header';
import Footer from './Footer';
import CourseDetails from './CourseDetails'
import { useCreatePaymentIndentMutation, useGetStripePublishKeyQuery } from '../../../redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js'

type Props = {
  id:any;
}

const CourseDetailsPage:React.FC<Props> = ({id}) => {

    const [route, setRoute] = React.useState('Login')
    const [open , setOpen] = React.useState(false)
    const {data, isLoading} = useGetCourseDetailsQuery(id)
    const [createPaymentIndent, {data:payemenIntentData}] = useCreatePaymentIndentMutation()


    const {data:config} = useGetStripePublishKeyQuery({})
    const [stripePromise, setStripePromise] = React.useState<any>(null)
    const [clientSecret, setClientSecret] = React.useState('')
    
    

    useEffect(() => {
      if (config) {
          const publishKey = config?.publishKey
          setStripePromise(loadStripe(publishKey))
      }

      if (data) {
          const amount = Math.round(data.data.price * 100)
          createPaymentIndent(amount)
      }
    }, [config, data])


    useEffect(() => {
      if (payemenIntentData) {
          setClientSecret(payemenIntentData?.client_secret)
      }
    }, [payemenIntentData])
    

  return (
    <>
      {
        isLoading 
        ? <CourseLoader/>
        : (
          <div>
            <Heading
              title={`${data?.data?.name}- Openhemier`}
              desciption='Openhemier is a programming community which is developed by Aliev Davlatbek for helping programers'
              keywords={`${data?.data?.tags}`}
            />
            <Header
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
            />
           {
            stripePromise && (
              <CourseDetails
              data={data?.data}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              route={route}
              setRoute={setRoute}
              open={open}
              setOpen={setOpen}
              />
            )
           }
            <Footer/>
          </div>
        ) 
      }
    </>
  )
}

export default CourseDetailsPage