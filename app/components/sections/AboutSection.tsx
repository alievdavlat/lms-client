import { aboutItems } from '@/app/constants'
import React from 'react'

type Props = {}

const AboutSection = (props: Props) => {
  return (
    <div className='p-5 flex items-center justify-center flex-col'>
        <h1 className='800px:text-5xl text-3xl break-words font-[500] 800px:font-[700] font-Poppins dark:text-white text-black mt-5 mb-10'>
        What is <span className='text-gradient'> Openhemier?</span>
        </h1>

        <div className='flex gap-10 justify-center flex-col p-3'>
         {
          aboutItems?.map((item:any) => (
            <p key={item.id} className='text-[20px] break-words font-[600] font-Poppins dark:text-[#ffffff83]'>
              {item.text}
            </p>
          ))
         }
        </div>
    </div>
  )
}

export default AboutSection