'use client'
import React from 'react'
import CourseDetailsPage from '../../components/sections/CourseDetailsPage'

type Props = {}

const page = ({params}:any) => {
  const id  = params?.id
  return (
    <div>
      <CourseDetailsPage id={id}/>
    </div>
  )
}

export default page