import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import { useAddReviewReplyMutation, useAddnewAnswerMutation, useAddnewQuestionMutation, useAddnewReviewMutation, useGetAllUserCoursesQuery, useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import Image from 'next/image';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';
import CommentReply from '../ui/CommentReply'
import Ratings from '@/app/utils/Ratings';
import { format } from 'timeago.js';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { BiMessage } from 'react-icons/bi';
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''
const socketId = socketIO(ENDPOINT, {transports:['websocket']})



type Props = {
  data:any;
  id:string;
  activeVideo:number;
  setActiveVideo:(activeVideo:number) => void;
  user:any;
  refetch:any
}


const CourseContentMedia:React.FC<Props> = ({activeVideo, data, id, setActiveVideo, user, refetch}) => {

  const [activeBar, setActiveBar] = React.useState(0)
  const [question, setQuestion] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [rating , setRating] = React.useState(1)
  const [answer, setAnswer] = React.useState('')
  const [questionId, setQuestionId] = React.useState('')
  const [isReviwReply, setIreviwReply] = React.useState(false)
  const [review, setReview] = React.useState('')
  const [reviewReply , setReviewReply] = useState('')
  const [reviewId, setReviewId] = React.useState('')

  const [addnewQuestion , {isSuccess, isLoading:questionCreationLoading, error}] = useAddnewQuestionMutation()
  const [addnewAnswer, {isSuccess:answerSuccess, error:answerError, isLoading:answerLoading,}] = useAddnewAnswerMutation()
  const [addnewReview, {isSuccess:reviewSuccess, error:reviewError, isLoading:reviewLoading}] = useAddnewReviewMutation()
  const [addReviewReply, {data:reviewReplyData, isLoading:reviewReplyLoading, isSuccess:reviewReplySuccess, error:reviewReplyEror}] = useAddReviewReplyMutation()
  const { data:coursedata, refetch:coursedataRefeatch} = useGetCourseDetailsQuery(id, {refetchOnMountOrArgChange:true})

  
  
  const isReviewExist = coursedata?.data?.reviews?.find((rev:any) => rev.user._id === user._id )


  

  const handleQuestion = async () => {     
    if (question.length === 0) {
        toast.error('question can`t be empty')
    } else {
      await addnewQuestion({question, courseId:id, contentId:data[activeVideo]?._id})
      
    }
  }

  const handleAnswerSubmit = async () => {    

    await addnewAnswer({answer, courseId:id, contentId:data[activeVideo]?._id, questionId})
  }


  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error('review can`t be empty')
    }

    else {
      
      await addnewReview({review, rating, courseId:id})
    }
  }

  const handleSubmitReviwReply  = async () => {
          if (reviewReply === '') {
              toast.error('Reviw reply can`t be empty')
          } else {
          await addReviewReply({comment:reviewReply, courseId:id, reviewId})
          }
  }

  React.useEffect(() => {
    if (isSuccess) {
      setQuestion('')
      refetch()
      toast.success('question  added successfully')
      socketId.emit('notification', {
        title:'New Question Received',
        message:`You have a new question in ${data[activeVideo]?.title}`,
        userId:user?._id
      })
    }

    if (answerSuccess) {
      setAnswer('')
      toast.success('Answer  added successfully')
      refetch()

      if (user?.role !== 'admin')  {
        socketId.emit('notification', {
          title:'New Reply Received',
          message:`You have a new question  reply  in ${data[activeVideo]?.title}`,
          userId:user?._id
        })
      }
    }

    if (reviewSuccess) {
      setReview('')
      setRating(1)
      refetch()
      coursedataRefeatch()
      toast.success('Review  added successfully')
      socketId.emit('notification', {
        title:'New Review Received',
        message:`You have a new Review in ${data[activeVideo]?.title}`,
        userId:user?._id
      })
    }

    if (reviewReplySuccess) {
      setReviewReply('')
      setIreviwReply(false)
      toast.success('Review reply   added successfully')
      refetch()
      coursedataRefeatch()
    }

    if (error) {
        if ("data" in error) {
            const err = error.data as any
            toast.error(err.message)
        }
    }

    if (reviewReplyEror) {
      if ("data" in reviewReplyEror) {
          const err = reviewReplyEror.data as any
          toast.error(err.message)
      }
  }

    if (reviewError) {
      if ("data" in reviewError) {
          const err = reviewError.data as any
          toast.error(err.message)
      }
  }

    if (answerError) {
      if ("data" in answerError) {
          const err = answerError.data as any
          toast.error(err.message)
      }
  }
  } , [isSuccess, error, answerError, answerSuccess, reviewSuccess, reviewError, reviewReplySuccess, reviewReplyEror])


  return (
    <div className='w-[95%] 800px:w-[86%]   py-4 m-auto'>
        <CoursePlayer
        title={data[activeVideo] ? data[activeVideo]?.title : ''}
        videoUrl={data[activeVideo].videoUrl ? data[activeVideo].videoUrl : ''}
        />

        <div className="flex w-full  items-center justify-between my-3">
          <button 
          className={`${styles.button} !w-[unset] bg-blue-900 !min-h-[40px] !py-[unset] ${ activeVideo === 0 && '!cursor-no-drop opacity-[.8]'}`}
          onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
          >
            <AiOutlineArrowLeft 
            className="mr-2"
            
            />
            Prev Lesson
          </button>

          <button 
          className={`${styles.button} !w-[unset] bg-blue-900  !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo &&'!cursor-no-drop opacity-[.8]'}`}
          onClick={() => setActiveVideo(
            data && data.length - 1 === activeVideo
              ? activeVideo
              : activeVideo + 1
          )}
          >
            Next Lesson
            <AiOutlineArrowRight
            className="ml-2"
            />
          </button>
        </div>

        <h1 className='pt-5 text-[25px] font-[600] text-black dark:text-white'>
              {data[activeVideo]?.title ? data[activeVideo]?.title : ''}
        </h1>
        <br />

        <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
          {
          ['Overview', 'Resources', 'Q&A', 'Reviews'].map((text:any, index:number) => (
            <h5
            key={index}
            className={`800px:text-[20px] dark:text-white text-black  cursor-pointer  ${
              activeBar === index && '!text-red-500  '
            }`}
            onClick={() => setActiveBar(index)}
            >
            {text}
            </h5>
          ))
          }
        </div>

        <br />

        {activeBar === 0 && (
         <div className='mb-32'>
           <p className='text-black dark:text-white pb-5'>
            {data[activeVideo] ? data[activeVideo].description : ''}
          </p>
         </div>
        )}

        {activeBar === 1 && (
        <div className='mb-32'>
          {
            data[activeVideo] && data[activeVideo]?.links?.map((item:any, index:number) => (
              <div className='mb-5' key={index}>
                  <h2 className='800px:text-[20px] 800px:inline-block dark:text-white text-black'>
                    {item?.title && item?.title + ' ;'}
                  </h2>
                  <a 
                  href={item.url}
                  className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-3'
                  >
                    {item.url ?  item.url : ''}
                  </a>
              </div>
            ))
          }
        </div>
        )}

        {activeBar === 2 && (
          <>
          <div className='flex w-full mb-24'>
              <Image src={user?.avatar?.url ? user?.avatar?.url :""} width={50} height={50}  alt='avatar' className='rounded-full w-[50px] h-[50px] object-cover'/>
              <textarea
                name=""
                id="" 
                cols={40}
                rows={5}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder='Write your questions ...'
                className='outline-none bg-transparent ml-3 border dark:border-[#ffffff57]  border-[#376DD4] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                 ></textarea>
          </div>
          <div className='w-full flex justify-end'>
              <button 
              className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionCreationLoading && 'cursor-not-allowed'}`}
              onClick={questionCreationLoading ?  () => {} : handleQuestion}
              >
                Submit
              </button>
          </div>
          <br /><br />

          <div className='w-full h-[1px] bg-[#ffffff3b]'>
            
          </div>
          <div>
              {/* question reply */}

              <CommentReply 
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              questionId={questionId}
              answerLoading={answerLoading}
              />
            </div>
          </>
        )}


          {
          activeBar === 3 && (
            <div className='w-full mb-24'>
              <>

              {
                !isReviewExist && (
                 <>
                <div className='flex w-full'>
                  <Image 
                  src={
                    user.avatar.url 
                    ? user.avatar.url
                    : require('../../../public/assets/avatar.png')
                  }
                  width={50}
                  height={50}
                  alt=''
                  className='w-[50px] h-[50px] rounded-full object-cover'
                  />
                  <div className='w-full'>
                      <h5 className='pl-3 text-[20px] font-[500] dark:text-white text-black'>
                        Give a Rating <span className='text-red-500'>*</span>
                      </h5>

                      <div className='flex w-full ml-2 pb-3'>
                      {
                        [1,2,3,4,5].map((i:any) => 
                        rating >= i ? (
                          <AiFillStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color='rgb(246,186,0)'
                          size={25}
                          onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                          key={i}
                          className="mr-1 cursor-pointer"
                          color='rgb(246,186,0)'
                          size={25}
                          onClick={() => setRating(i)}
                          />
                        )
                        )
                      }
                      </div>
                      <textarea
                      name="" 
                      id="" 
                      cols={40} 
                      rows={5}
                      placeholder='Write your comment...'
                      className='outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins'
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      ></textarea>
                  </div>
                </div>

                <div className="flex w-full justify-end">
                  <button 
                  onClick={handleReviewSubmit}
                  className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${reviewLoading ? 'cursor-no-drop' : ''}`}
                  >
                    Submit
                  </button>
                </div>
                 </>
                )
              }

              <br />

              <div className='w-full h-[1px] bg-[#ffffff3b]'>

              </div>

              <div className='w-full'>
                {(coursedata?.data?.reviews && [...coursedata?.data?.reviews].reverse())?.map((review:any, index:number) => (
                  <div className="w-full my-10" key={review?._id}>
                    <div className="w-full flex">
                      <div className='h-[50px] w-[50px]'>
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                          <h1 className="uppercase text-[18px]">
                              {review?.user?.avatar.url ? (
                                  <Image
                                  src={review?.user?.avatar?.url}
                                  alt="user"
                                  height={50}
                                  width={50}
                                  className="w-full h-full rounded-full"
                                  />
                              ) : (
                                <span>{review?.user && review?.user?.name.slice(0, 2)}</span>
                                )}
                          </h1>
                          </div>
                      </div>

                      <div className="ml-2">
                        <div className='flex flex-col '>
                       
                        <h1 className='text-[18px] dark:text-white text-black flex items-center gap-1'>
                        {review?.user?.name && review?.user?.name}  {review?.user.role === 'admin' &&  <VscVerifiedFilled className="text-blue-500 " />} <br />
                        </h1>
                        <span>{review?.user?.role === 'admin' && review?.user?.email}</span>


                      
                        </div>

                        <br />
                        
                        <Ratings rating={review.rating}/>
                        <p className='dark:text-white text-black mt-2'>{review?.comment && review?.comment}</p>
                        <small className='dark:text-white text-black'>
                          { review?.createdAt && format(review?.createdAt)}
                        </small>
                      </div>
                    </div>
                    <br />
                    
                    
                    <div>
                    {
                      user.role === 'admin' && (

                        <span className={`${styles.label} pl-14 cursor-pointer flex items-center gap-2`}
                        onClick={() => {
                            setReviewId(review._id)
                            setIreviwReply(!isReviwReply)
                          }                          
                        
                        }
                        >
                          Add Reply <BiMessage size={20} className='dark:text-white text-black cursor-pointer' />
                        </span>

                       

                      )
                    }

                    <br />

                    {
                      isReviwReply && reviewId === review._id && (
                       <div className="w-full flex relative">
                         <input 
                        type="text"
                        value={reviewReply}
                        onChange={(e) => setReviewReply(e.target.value)}
                        className={`${styles.input} !border-[0px] rounded-none w-[90%] border-[#000] dark:border-white ml-[10%] !border-b`} 
                        />
                        <button 
                        type="submit"
                        className='absolute right-0 bottom-1'
                        onClick={isLoading ? () => {} : handleSubmitReviwReply}
                        disabled={isLoading}
                        >
                          Submit
                        </button>
                       </div>
                      )
                    }

                    <br />

                    {
                      review?.commentReplies?.map((cRep:any, cRepindex:any) => (
                        <div className='w-full flex 800px:ml-16 my-5' key={cRepindex} >
                          <div className='w-[50px] h-[50px]'>
                            <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                                <h1 className='uppercase text-[18px]'>
                                  {cRep.user.name.slice(0,2)}
                                </h1>
                            </div>

                          </div>

                          <div className="pl-2">
                           
                            <h5 className='flex items-center gap-1 text-[20px] dark:text-white text-black'>
                            {cRep?.user?.name && cRep?.user?.name}  {cRep?.user.role === 'admin' &&  <VscVerifiedFilled className="text-blue-500 " />}
                            </h5>

                            <p className='text-black dark:text-white'>
                              {cRep.comment}
                            </p>

                            <small className='dark:text-[#ffffff83] text-black'>
                              {format(cRep?.createdAt)} ●
                            </small>

                          </div>
                        </div>
                      ))
                    }
                    </div>
                  </div>
                ))}
              </div>
              </>
            </div>
          )}
    </div>
  )
}

export default CourseContentMedia