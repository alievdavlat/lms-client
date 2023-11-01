import React from 'react'
import UsersAnalytics from '../Analytics/UsersAnalytics';
import { PiUsersFourLight } from 'react-icons/pi'
import { BiBorderLeft } from 'react-icons/bi';
import { Box, CircularProgress } from '@mui/material';
import OrdersAnalytics from '../Analytics/OrdersAnalytics';
import AllInvoices from '../Order/AllInvoices'
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';

type Props = {
  open?:boolean;
  value?:number
}


const CircularProgressWithLabel:React.FC<Props> = ({value, open}) => {
  return (
    <>
      <Box sx={{position:'relative', display:'inline-block'}}>
            <CircularProgress
              variant="determinate"
              value={value}
              size={45}
              color={value && value > 90 ? 'info' : "error"}
              thickness={4}
              style={{zIndex:open ? -1 : 1}}
            />
            <Box 
              sx={{
                top:0,
                left:0,
                right:0,
                bottom:0,
                position:"absolute",
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
              }}
            >

            </Box>
      </Box>
    </>
  )
}

const DashboardWidgets:React.FC<Props> = ({open}) => {

  const [orderComparePercentage, setOrderComparePercentage] = React.useState<any>()
  const [userComparePercentage, setUserComparePercentage] = React.useState<any>()

  const {data, isLoading} = useGetUsersAnalyticsQuery({})
  const {data:OrdersAnalyticsData, isLoading:orderAnalyticsLoading} = useGetOrdersAnalyticsQuery({})

  React.useEffect(() => {
      if (isLoading && orderAnalyticsLoading) {
        return
      } else {
        if (data && OrdersAnalyticsData) {
            const usersLastTwoMonths = data?.users?.last12Months.slice(-2)
            const ordersLastTwoMonths = OrdersAnalyticsData?.orders?.last12Months.slice(-2)

            if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
                const usersCurrentMonth = usersLastTwoMonths[1].count
                const usersPreviusMonth = usersLastTwoMonths[0].count 

                const ordersCurrentMonth = ordersLastTwoMonths[1].count
                const ordersPreviusMonth = ordersLastTwoMonths[0].count 

                const usersPrecentChange = usersPreviusMonth !== 0 ? ( (usersCurrentMonth - usersPreviusMonth) / usersPreviusMonth) * 100 : 100
                const ordersPrecentChange = ordersPreviusMonth !== 0 ?   ( (ordersCurrentMonth - ordersPreviusMonth) / ordersPreviusMonth) * 100 : 100


                setUserComparePercentage({
                  currentMonth:usersCurrentMonth,
                  PreviusMonth:usersPreviusMonth,
                  precentChange:usersPrecentChange
                })

                setOrderComparePercentage({
                  currentMonth:ordersCurrentMonth,
                  PreviusMonth:ordersPreviusMonth,
                  precentChange:ordersPrecentChange
                })
            }
        }
      }


  }, [isLoading, orderAnalyticsLoading, data, OrdersAnalyticsData])



  return (
    <div className='mt-[100px] max-h-screen'>
        <div className='flex 800px:flex-row flex-col'>
          <div className='p-8 h-fit 800px:w-[75%]'>
              <UsersAnalytics isDashboard={true}/>
          </div>

            <div className='800px:pt-[80px] 800px:px-0 px-5 800px:pr-8 800px:w-[25%]'>
                <div className='w-full dark:bg-[#111C43] rounded-sm shadow'>
                    <div className='flex items-center 800px:p-5 justify-between'>
                          <div className=''>
                              <BiBorderLeft className="dark:text-[#45CBA0] text-black text-[30px] font-[400]"/>
                              <h5 className='pt-5 font-Poppins dark:text-white text-black text-[20px]'>
                              {orderComparePercentage?.currentMonth}
                              </h5>
                              <h5 className='py-5 font-Poppins dark:text-white text-black text-[20px]'>
                                  Sales Obtained
                              </h5>
                          </div>
                          <div>
                              <CircularProgressWithLabel value={
                                orderComparePercentage?.precentChange > 0
                                ? 100
                                : 0
                              } open={open}/>
                              <h5 className='text-center pt-4'>
                              {
                             orderComparePercentage?.precentChange > 0
                             ? "+"  + orderComparePercentage?.precentChange.toFixed(2) 
                             : '-'  + orderComparePercentage?.precentChange.toFixed(2)
                             }%
                              </h5>
                          </div>
                    </div>
                </div>


                <div className='w-full dark:bg-[#111C43] rounded-sm shadow my-8'>
                    <div className="flex items-center 800px:p-5 justify-between">
                        
                        <div className=''>
                              <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                              <h5 className='pt-2 font-Poppins dark:text-white text-black text-[20px]'>
                                  {userComparePercentage?.currentMonth}
                              </h5>
                              <h5 className='py-2 font-Poppins dark:text-white text-black text-[20px] font-[400]'>
                                New Users
                              </h5>
                        </div>

                        <div>
                              <CircularProgressWithLabel value={
                                userComparePercentage?.precentChange > 0
                                ? 100
                                : 0
                              } open={open}/>
                              <h5 className='text-center pt-4'>
                             {
                             userComparePercentage?.precentChange > 0
                             ? "+"  + userComparePercentage?.precentChange.toFixed(2) 
                             : '-'  + userComparePercentage?.precentChange.toFixed(2)
                             }%
                              </h5>
                        </div>
                    </div>
                </div>


            </div>
        </div>

        <div className='flex mt-[-20px] p-5'>
            <div className='dark:bg-[#111c43] w-[74%] mt-[30px] h-[40vh] shadow-sm m-auto'>
              <OrdersAnalytics isDashboard={true}/>
            </div>

            <div className='p-5 w-[25%]'>
                <h5 className='dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins'>
                  Recent Transactions
                </h5>
                <AllInvoices isDashboard={true}/>
            </div>  
        </div>
    </div>
  )
}

export default DashboardWidgets