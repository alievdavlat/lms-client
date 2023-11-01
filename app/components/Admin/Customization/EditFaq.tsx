import { styles } from '@/app/styles/style'
import { useGetFaqDataQuery } from '@/redux/features/layout/layoutApi'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { HiMinus, HiPlus } from 'react-icons/hi'
import { IoMdAddCircleOutline } from 'react-icons/io'
import CourseLoader from '../../ui/courseLoader'

type Props = {}

const EditFaq = (props: Props) => {

  const { data, isLoading, isSuccess  , refetch} = useGetFaqDataQuery({}, {refetchOnMountOrArgChange:true})

  const [questions, setQuestions] = React.useState<any []>([])



  
  React.useEffect(() => {
    if (data) {
      setQuestions(data?.layout?.faq)
    }
  }, [data])


const toggleQuestion = (id:string) => {
setQuestions(p => p.map(q => q?._id === id ? {...q, active:!q.active} : q))
}


const handleChangeQuestion = (id:string, value:string) => {
setQuestions(p => p.map(q => (q._id === id ? {...q, question:value} : q )))
}


const handleAnswerChange = (id:string, value:string) => {
  setQuestions(p => p.map(q => (q._id === id ? {...q, answer:value} : q )))
}

const newFaqHandler = () => {
  setQuestions([
    ...questions, 
    {
      question:'',
      answer:''
    }
  ])

}

// checking

const areQuestionUnChanged  = (
  orginalQuestions:any[],
  newQuestions:any[]
) => {
  return JSON.stringify(orginalQuestions) === JSON.stringify(newQuestions)
}


const isAnyQuestionsEmpty = (questions:any[]) => {
  return questions.some((q) =>  q.question === '' || q.answer === '')
} 

const handleEdit = async () => {

  if (!areQuestionUnChanged(data?.layout?.faq, questions) && !isAnyQuestionsEmpty(questions)) {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}update-layout`, {type:'FAQ', faq:questions}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })

    if (res.status === 201 || res.status === 200) {
        toast.success('Faq updated')
        refetch()
    }
  }
  
}

  return (
    <>
    {
      isLoading 
      ? <CourseLoader/> 
      : <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
        <div className='mt-12'>
        <dl>
        {
          questions?.map((item:any, index:number) => (
            <div
            key={item._id}
            className={`${
            item._id !== questions[0]?._id && 'border-t'
            } border-gray-200 pt-8`}
            >
              <dt className='text-lg'>
                  <button
                  onClick={() => toggleQuestion(item?._id)}
                  className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
                  >
                      <input 
                      type="text"
                      className={`${styles.input} border-none pb-5`}
                      value={item?.question}
                      onChange={(e:any) => 
                      handleChangeQuestion(item?._id,  e.target.value)
                      }
                      placeholder='Add your Question...'
                       /> 

                       <span className='ml-6 flex-shrink-0'>
                        {
                          item?.active ? (
                            <HiMinus className="h-6 w-6" />
                          ):(
                            <HiPlus className="h-6 w-6"/>
                          )
                        }
                       </span>
                  </button>
              </dt>

                  {
                    item?.active && (
                      <dd className='mt-2 pr-12'>
                          <input 
                          type="text"
                          className={`${styles.input} border-none`}
                          value={item.answer}
                          onChange={(e:any) => 
                          handleAnswerChange(item?._id, e.target.value)
                        }
                        placeholder='Add your answers'
                           />
                           <span className='ml-6 flex-shrink-0'>
                            <AiOutlineDelete 
                            className="dark:text-white text-black text-[18px] cursor-pointer"
                            onClick={() => {
                              setQuestions(p => p.filter(a => a?._id !== item?._id))
                            }}
                            />
                           </span>
                      </dd>
                    )
                  }
            </div>
          ))
        }
        </dl>

        <br /><br />
        <IoMdAddCircleOutline
          className="dark:text-white text-black text-[25px] cursor-pointer"
          onClick={newFaqHandler}
        />
      </div>
      <div
      className='w-full flex justify-end'
      >
        <button onClick={() => handleEdit()} className={`${styles.button} w-[120px] h-[40px] bg-blue-700 rounded-md`}>
            Save
        </button>
      </div>
  </div>
    }
    </>
  )
}

export default EditFaq