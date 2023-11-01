'use client'
import React from 'react'
import CourseLoader from '@/app/components/ui/courseLoader'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { redirect } from 'next/navigation'
import CourseAccessContent from '../../components/sections/CourseAccessContent'

type Props = {
  params:any
}

const Page:React.FC<Props> = ({params}) => {

  const id = params.id

  const { isLoading, error, data} = useLoadUserQuery(undefined, {})

  

  React.useEffect(() => {
    if (data) {
      const isPurchased  = data.user.courses.find((item:any) => item._id === id)
      
      if (!isPurchased) {
        redirect('/')
      }

      if (error) {
        redirect('/')
      }
    }

    
  }, [data, error])



  return (

    <>
    {
      isLoading ? <CourseLoader/> : (
        <div>
          <CourseAccessContent id={id} user={data?.user} />
        </div>
      )
    }
    </>
  )
}

export default Page