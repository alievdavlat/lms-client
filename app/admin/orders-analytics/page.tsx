'use client'

import DashboardHero from '../../components/Admin/DashboardHero'
import AdminSidebar from '../../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import Heading from '../../utils/Heading'
import React from 'react'
import OrdersAnalytics from '../../components/Admin/Analytics/OrdersAnalytics'

type Props = {}

const Page = (props: Props) => {
  return (
<div className='overflow-y-hidden'>
      <AdminProtected>
      <Heading
      title='Openhemier-admin'
      desciption='Openhemier is platform for students to learn and get help from teachers'
      keywords='Programing, MERN, PERN, Machine Learning , Javascript'
      />


      <div className="flex h-screen">

        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar/>
        </div>

        <div className='w-[85%]'>
            <DashboardHero/>
            <OrdersAnalytics />
        </div>

      </div>

      </AdminProtected>
    </div>
  )
}

export default Page