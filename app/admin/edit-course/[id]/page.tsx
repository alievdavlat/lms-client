'use client'

import DashboardHeader from '../../../components/Admin/DashboardHeader'
import AdminSidebar from '../../../components/Admin/Sidebar/AdminSidebar'
import Heading from '../../../utils/Heading'
import EditCourses from '../../../components/Admin/Course/EditCourses'
import React from 'react'

type Props = {}

const Page = ({params}: any) => {
  const [open, setOpen] = React.useState(false)
  const id  = params?.id

  return (
    <div>
    <Heading
      title='Openhemier-admin'
      desciption='Openhemier is platform for students to learn and get help from teachers'
      keywords='Programing, MERN, PERN, Machine Learning , Javascript'
    />

    <div className='flex'>
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar/>
          </div>

          <div className='w-[85%]'>
            <DashboardHeader open={open} setOpen={setOpen}/>
            {/* <CreateCourse/> */}
            <EditCourses id={id}/>
         </div>

    </div>
</div>
  )
}

export default Page