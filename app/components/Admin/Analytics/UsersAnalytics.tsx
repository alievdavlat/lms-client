import { useGetUsersAnalyticsQuery } from '../../../../redux/features/analytics/analyticsApi'
import React from 'react'

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area
} from 'recharts'
import CourseLoader from '../../ui/courseLoader'
import { styles } from '../../../../app/styles/style'


type Props = {
  isDashboard?:boolean
}

const UsersAnalytics:React.FC<Props> = ({isDashboard}) => {

  const { data , isLoading} = useGetUsersAnalyticsQuery({})

  
  const analyticsData:any = []

  data &&
  data?.users?.last12Months?.forEach((item:any) => {
    analyticsData.push({name:item.month, count:item.count})
  });


  return (
    <div className='8000px:h-screen'>
    {
      isLoading ? (
        <CourseLoader/>
      ) : (

        <div className={`${!isDashboard ? 'mt-[50px]' : 'mt-[50px] dark:bg-[#111c43] shadow-sm  rounded-sm'}`}>

          <div className={`${isDashboard ? '!ml-8 mb-5' : ''}`}>
            <h1 className={`${styles.title} ${isDashboard && '!tex-[20px]'} px-5 !text-start`}>
              Users Analytics
            </h1>
            {
              !isDashboard && (
              <p className={`${styles.label} px-5`}>
                  Last 12 months analytics data {' '}
              </p>
              )
            }
          </div>

            <div className={`w-full ${isDashboard ? 'h-[30vh]' : 'h-screen'} flex items-center justify-center`}>
              <ResponsiveContainer width={isDashboard ? '100%' : '90%'} height={!isDashboard ? '50%' : '100%'}>
                  <AreaChart 
                  data={analyticsData}
                  margin={{
                    top:20,
                    right:30,
                    left:0,
                    bottom:0
                  }}
                  > 
                    <XAxis dataKey={'name'}/>
                    <YAxis/>
                    <Tooltip/>
                    <Area
                      type="monotone"
                      dataKey={'count'}
                      stroke='#4d62d9'
                      fill='#4d62d9'
                    />
                  </AreaChart>
              </ResponsiveContainer>
            </div>


        </div>
      )
    }
    </div>
  )
}

export default UsersAnalytics