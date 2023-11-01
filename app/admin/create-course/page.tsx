'use client'
import React from 'react'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import Heading from '../../utils/Heading'
import CreateCourse from '../../components/Admin/Course/CreateCourse'
import DashboardHeader from '../../components/Admin/DashboardHeader'


type Props = {
  
}


const Page:React.FC<Props> = () => {

  const [open, setOpen] = React.useState(false)

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
                <CreateCourse/>
             </div>

        </div>
    </div>
  )
}

export default Page