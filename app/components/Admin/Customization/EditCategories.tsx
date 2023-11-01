import { useGetCategoriesDataQuery } from '@/redux/features/layout/layoutApi'
import React from 'react'
import CourseLoader from '../../ui/courseLoader'
import { styles } from '@/app/styles/style'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdAddCircleOutline } from 'react-icons/io'
import toast from 'react-hot-toast'
import axios from 'axios'

type Props = {}

const EditCategories = (props: Props) => {

  const { data , isLoading, error, refetch} = useGetCategoriesDataQuery({}, {refetchOnReconnect: true})
  const [categories , setCategories] = React.useState<any>([])


  React.useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories)
    }
  }, [data])

const hanldeCategoriesAdd = (id:string, value:string) => {
  setCategories((p:any) => p.map((q:any) => q?._id === id ? {...q, title:value} : q))
}

const newCategoriesHandler = () => {

  if (categories[categories.length - 1].title === '') {
    toast.error('Category can`t be empty! ')
  } else {  
    setCategories([
      ...categories,
      {title:""}
    ])
  
  }
}


const isAnyCategoryTitleEmpty = (categories:any) => {
return  categories.some((item:any) => item.title === '')
}


const areCategoriesUnChanged = (orginalCategories:any[], newCategores: any[]) => {
  return JSON.stringify(orginalCategories) ===  JSON.stringify(newCategores)
}

const EditCategoriesHandler = async () => {
  if (!areCategoriesUnChanged(data?.layout?.categories,  categories) && !isAnyCategoryTitleEmpty(categories)) {
    const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}update-layout`, {type:'Categories', categories:categories}, {
      withCredentials: true,
    })

    if (res.status === 201 || res.status === 200) {
        toast.success('Categories updated')
        refetch()
    }
  }
}


  return (
    <>
      {
        isLoading 
        ? <CourseLoader/> 
        : 
        <div className='mt-[120px] text-center'>
            <h1 className={`${styles.title}`}>
                All  Categories
            </h1>
          {
            categories  && categories?.map((item:any , index:number) => {
              return (
                <div
                key={item._id}
                className='p-3'
                >
                  <div className="flex items-center w-full justify-center">
                      <input 
                      type="text" 
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item?.title}
                      onChange={(e) => 
                      hanldeCategoriesAdd(item._id , e.target.value)
                      }
                      />
                      <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((p:any) => p.filter((q:any) => q?._id !== item?._id))
                      }}
                      />
                  </div>
                </div>
              )
            })
          }
          <br /><br />

            <div  className='w-full flex justify-center'>
              <IoMdAddCircleOutline
                className='dark:text-white text-black text-[25px] cursor-pointer'
                onClick={() => newCategoriesHandler()}
              />
            </div>

              <button className={`${styles.button} rounded-md !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
              ${
                areCategoriesUnChanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                ? '!cursor-not-allowed'
                : '!cursor-pointer !bg-[#1E40AF] '
              }
               !rounded absolute bottom-12 right-12` }
               onClick={
                areCategoriesUnChanged(data?.layout?.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                ? () => null
                : EditCategoriesHandler
               }
               >
                Save
              </button>


        </div>
      }
    </>
  )
}

export default EditCategories