import Ratings from '../../utils/Ratings'
import React from 'react'
import {  IoCheckmarkDoneOutline, IoCloseOutline} from 'react-icons/io5'
import { format } from 'timeago.js'
import CoursePlayer from '../..//utils/CoursePlayer'
import Link from 'next/link'
import { styles } from '../../styles/style'
import CourseContentList from '../ui/CourseContentList'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from '../ui/CheckOutForm'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { VscVerifiedFilled } from 'react-icons/vsc'

type Props = {
  data:any;
  stripePromise:any;
  clientSecret:any;
  route:string;
  setRoute:(route:string) => void;
  open:boolean;
  setOpen:(open:boolean) => void;
}

const CourseDetails:React.FC<Props> = ({data, clientSecret, stripePromise, open:openAuthModal, route, setOpen:setOpenAuthModal, setRoute}) => {

  const [open , setOpen] = React.useState(false)
  const { data:userData}  = useLoadUserQuery(undefined, {}) 
  const [user , setUser] = React.useState<any>()
  // const user = userData?.user


    React.useEffect(() => {
      setUser(userData?.user)
    }, [userData])

    
  const dicountPercentenge = 
    ((data?.estimatedPrice - data?.price) / 
      data?.estimatedPrice
    ) * 100;

    const dicountPercentengePrice = dicountPercentenge.toFixed(0)

    const isPurchased = 
    user && user?.courses?.find((item:any) => item._id === data._id)

    const handleOrder = (e:any) => {
      if (user) {
          setOpen(true)
      } else{
        setRoute('Login')
        setOpenAuthModal(true)
        }
    }


  return (
    <div className='my-5'>
        <div className='w-[90%] 800px:w-[90%] m-auto py-5'>
              <div className='w-full flex flex-col-reverse 800px:flex-row'>
                  
                  <div className='w-full 800px:w-[65%] 800px:pr-5'>
                        <h1 className='text-[25px] font-Poppins font-[500] text-black dark:text-white'>
                          {data?.name} 
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                            <Ratings rating={data?.ratings}/>
                            <h5 className='text-black dark:text-white'>{data?.reviews?.length} Reviews</h5>
                            </div>
                            <h5 className='text=black dark:text-white'>
                            {data?.purchased} Students
                            </h5>
                        </div>
                          <br />
                          <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                              What you will learn from this course?
                          </h1>

                            <div>
                              {
                                data?.benifits?.map((item:any, index:number) => (
                                  <>
                                  {
                                    item ? <div
                                    key={item?.title}
                                    className='w-full flex 800px:items-center py-2'
                                    > 
                                      <div className='w-[15px] mr-1'>
                                          <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                      </div>
                                      <p className='pl-3 text-black dark:text-white'>
                                      {item?.title}
                                      </p>
                                    </div>
                                    : null
                                  }
                                  </>
                                ))}
                                <br /><br />
                            </div>

                              <h1  className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                What  are the prerequisites for starting this course?
                              </h1>
                              {
                                data?.prerequisites?.map((item:any, index:any) => (
                                  <div
                                  key={item?.title}
                                  className='w-full flex 800px:items-center py-2'
                                  >
                                    <div className='w-[15px] mr-1'>
                                    <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                    </div>
                                    <p className='pl-3 text-black dark:text-white'>
                                      {item?.title}
                                    </p>
                                  </div>
                                ))}
                                <br /><br />

                                <div>
                                <h1  className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                  Course Overview
                                </h1>
                               
                                  <CourseContentList
                                  data={data?.courseData}
                                  isDemo={true}
                                  />
                                </div>

                                <br /><br />

                                <div className="w-full">
                                  <h1 className='text-[25px] font-Poppins font-[600] text-black dark:text-white'>
                                    Course Details
                                  </h1>
                                  <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                                    {data?.description}
                                  </p>
                                  <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                                    {Array.from(data?.tags.split(' ')).map((item:any) => (
                                      <span key={item}>
                                        #{item} { '    '}
                                      </span>
                                    ))
                                    
                                    }
                                  </p>
                                  
                                </div>

                                <br /><br />
                                
                                <div className="w-full">
                                  <div className="800px:flex flex-col ">
                                    
                                  <div className='mb-[40px] 800px:flex'>
                                      <Ratings rating={data?.ratings}/>
                                      <div className='mb-2 800px:mb-[unset]'>
                                        <h5>
                                          {Number.isInteger(data?.ratings)
                                            ? data?.ratings.toFixed(1)
                                            : data?.ratings.toFixed(2)
                                          } {' '}
                                          Course Rating ● {data?.reviews?.length} Reviews
                                        </h5>
                                      </div>
                                  </div>

                                    <br />

                                  {
                                    (
                                      data?.reviews && [...data.reviews].reverse()
                                    ).map((item:any, index:number) => (
                                      <div className='w-full pb-4' key={index}>
                                        <div className='flex'>

                                            <div className='w-[50px] h-[50px]'>
                                                <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                                                  <h1 className='uppercase text-[18px] text-black dark:text-white'>
                                                    {
                                                      item?.user.avatar.url ? <img src={item?.user.avatar.url} className='w-[50px] h-[50px] rounded-full object-cover'/> : 
                                                    <span>
                                                    {item?.user.name.slice(0,2)}
                                                    </span>
                                                    }
                                                  </h1>
                                                </div>
                                            </div>

                                            <div className="hidden 800px:block pl-2">
                                                <div className='flex -items-center'>
                                                    <h5 className='text-[18px] pr-2 text-black dark:text-white'>
                                                      {item.user.name}
                                                    </h5>
                                                    <Ratings rating={item.rating}/>
                                                </div>
                                                <p className='text-black dark:text-white'>{item.comment}</p>
                                                <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                                                    {format(item.createdAt)} ●
                                                </small>
                                            </div>
                                                
                                            


                                            <div className='pl-2 flex 800px:hidden items-center'>
                                                <h5 className='text-[18px] pr-2 text-black dark:text-white'>
                                                  {item.user.name}
                                                  <Ratings rating={item.rating}/>
                                                </h5>
                                            </div>

                                            
                                        </div>


                                        {
                      item?.commentReplies?.map((cRep:any, cRepindex:any) => (
                        <div className='w-full flex 800px:ml-16 my-5' >
                          <div className='w-[50px] h-[50px]'>
                            <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                                <h1 className='uppercase text-[18px]'>
                                  {cRep?.user?.name?.slice(0,2)}
                                </h1>
                            </div>

                          </div>

                          <div className="pl-2">
                           
                            <h5 className='flex items-center gap-1 text-[20px] dark:text-white text-black'>
                            {cRep?.user?.name && cRep?.user?.name}  {cRep?.user?.role === 'admin' &&  <VscVerifiedFilled className="text-blue-500 " />}
                            </h5>

                            <p className='text-black dark:text-white'>
                              {cRep?.comment}
                            </p>

                            <small className='dark:text-[#ffffff83] text-black'>
                              {format(cRep?.createdAt)} ●
                            </small>

                          </div>
                        </div>
                      ))
                    }       
                                      </div>
                                    ))
                                  }
                                  </div>

                                </div>
                  </div>

                  <div className="w-full relative 800px:w-[35%]">
                    <div className='sticky top-[100px] left-0 z-50 w-full'>
                        <CoursePlayer
                        videoUrl={data?.demoUrl}
                        title={data?.title}
                        />
                        
                        <div className="flex items-center">
                          <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                            {data?.price === 0 ? 'Free' : data?.price + '$'}
                          </h1>
                          <h5 className='pl-3 text-[20px] mt-2  line-through opacity-80 text-black dark:text-white'>
                            {data?.estimatedPrice}$
                          </h5>

                          <h4 className='pl-5 pt-4 tetx-[22px] text-black dark:text-white'>
                            {dicountPercentengePrice}% off
                          </h4>
                        </div>

                        <div className="flex items-center">
                          {
                            isPurchased ? (
                              <Link 
                              href={`/course-access/${data?._id}`}
                              className={`${styles?.button} !w-[180px]  my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                              >
                                Enter to Course
                              </Link>
                            ) : (
                              <button
                              className={`${styles?.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                              onClick={handleOrder}
                              > 
                                Buy Now {data?.price}$
                              </button>
                                )
                          }
                        </div>
                          <br />
                          <p className="pb-2 text-black dark:text-white">● Source code included</p>
                          <p className="pb-2 text-black dark:text-white">● Full lifetime access</p>
                          <p className="pb-2 text-black dark:text-white">● Certeficate of completation</p>
                          <p className="pb-2 text-black dark:text-white">● Premium Support</p>
                    </div>
                  </div>

              </div>
        </div>

        <>
        {
          open && (
            <div className='w-full h-screen bg-[#00000036] fixed top-0 z-50 flex items-center justify-center'>
              <div className='800px:w-[700px] w-[400px] min-h-[500px]  bg-white rounded-xl shadow p-3'>
                  <div className="flex w-full justify-end">
                      <IoCloseOutline
                      size={40}
                      className="text-black cursor-pointer"
                      onClick={() => setOpen(false)}
                      />
                  </div>
                  <div className="w-full">
                    {
                      stripePromise && clientSecret && (
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                          <CheckOutForm setOpen={setOpen} data={data} />
                        </Elements>
                      )
                    }
                  </div>
              </div>
            </div>
          )
        }
        </>
    </div>
  )
}

export default CourseDetails