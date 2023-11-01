import Ratings from '@/app/utils/Ratings';
import Image from 'next/image';
import React from 'react'

type Props = {
  item:any;

}

const ReviewCard:React.FC<Props> = ({item}) => {
  return (
    <div className='w-full h-max py-4 px-1 dark:bg-slate-500 dark:bg-opacity-[0.20] border border-[#00000028] dark:border-[#ffffff1d] backdrop-blur shadow-[bg-lsate700]'>

        <div className="w-full flex">
            <Image
            src={item?.avatar}
            alt='review'
            width={50}
            height={50}
            className='w-[50px] h-[50px] rounded-full object-cover'
            />
            <div className='800px:flex justify-between w-full hidden'>
                <div className='pl-4'>
                    <h5 className='text-[20px] text-black dark:text-white'>
                        {item?.name}
                    </h5>
                    <h6 className='tetx-[16px] text-black dark:text-[#ffffffab]'>
                      {item?.proffession}
                    </h6>
                </div>
                <Ratings rating={item?.rating}/>
            </div>

            {/* mobile */}

            <div className='800px:hidden justify-between w-full flex flex-col'>
              <div className="pl-4">
              <h5 className='text-[20px] text-black dark:text-white'>
                        {item?.name}
                    </h5>
                    <h6 className='tetx-[16px] text-black dark:text-[#ffffffab]'>
                      {item?.proffession}
                    </h6>
              </div>
              <Ratings rating={item?.rating}/>
            </div>

        </div>
        <p
        className='pt-2 px-3 font-Poppins text-black dark:text-white'
        >
          {item?.comment} 
        </p>
    </div>
  )
}

export default ReviewCard