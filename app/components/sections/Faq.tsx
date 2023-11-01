import { styles } from '@/app/styles/style'
import { useGetFaqDataQuery } from '@/redux/features/layout/layoutApi'
import React from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi'

type Props = {}

const Faq = (props: Props) => {

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

  return (
     <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
        <div className='w-full flex items-center justify-center dark:text-white text-black'>
            <h1 className='800px:text-[50px] text-[25px] font-[700]'>
            Frequantly asked <span className='text-gradient'>questioons</span>
            </h1>
        </div>

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
                  <div
                   onClick={() => toggleQuestion(item?._id)}
                  className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
                  >
                      <h3 className={`${styles.input} border-none pb-5`}>
                      {item?.question}  
                      </h3> 

                       <span className='ml-6 flex-shrink-0'>
                        {
                          item?.active ? (
                            <HiMinus className="h-6 w-6 cursor-pointer"/>
                          ):(
                            <HiPlus className="h-6 w-6 cursor-pointer"/>
                          )
                        }
                       </span>
                  </div>
              </dt>

                  {
                    item?.active && (
                      <dd className='mt-2 pr-12'>
                          <h4 className={`${styles.input} border-none`}> 
                           {item.answer}
                           </h4>
                      </dd>
                    )
                  }
            </div>
          ))
        }
        </dl>
      </div>
     
  </div>
  )
}

export default Faq