import Image from 'next/image';
import Ratings from '../../../app/utils/Ratings';
import Link from 'next/link';
import React from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
  item:any;
  isProfile?:boolean;
}

const CourseCard:React.FC<Props > = ({item, isProfile}) => {

    

  return (
    <Link href={!isProfile ?  `/course/${item._id}` : `course-access/${item._id}`}>
        <div className='w-full min-h-[35vh] dark:bg-slate-500 dark:bg-opacity-20 backdrop-blur border dark:border-[#111111cd] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
            <div className='w-full p-3'>
            <Image height={300} width={1000} src={item?.thumbnail} className='object-cover w-full h-[300px] rounded ' alt="demourl" />
            </div>
            <br />
            <h1 className='font-Poppins text-[16px] text-black dark:text-white'>
                {item?.name}
            </h1>
            <div className='w-full flex items-center justify-between pt-5'>
                <Ratings  rating={item?.ratings}/>
                <h5
                className={`text-block dark:text-white ${
                  isProfile &&'hidden 800px:inline'
                }`}
                >
                  {item?.purchased} Students
                </h5>
            </div>

            <div className='w-full flex items-center justify-between pt-5 '>
               
               <div className='flex'>
               <h3 className='text-block dark:text-white '>
                  ${item?.price == 0 ? 'Free' : item?.price}
                </h3>
                <h5
                className={`text-block dark:text-white pl-3 text-[14px] mt-[-5px] line-through opacity-80`}
                >
                  ${item.estimatedPrice}$
                </h5>
               </div>

               <div className='flex items-center pb-3'>
                <AiOutlineUnorderedList  size={20} fill="#fff"/>
                <h5>{item?.courseData?.lenght}</h5>Lectures
               </div>
                
            </div>

            <div className='flex items-center gap-4 pt-5 px-3 flex-wrap'>
                  {
                    Array.from(item?.tags?.split(' ')).map((items:any, index:number) => (
                      <p key={index} className='text-gradient2 text-[16px] ml-1'>
                          #{items}
                      </p>
                    ))
                  }
                </div>
        </div>
    </Link>
  )
}

export default CourseCard