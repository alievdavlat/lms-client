import { policy } from '../../constants'
import React from 'react'

type Props = {}

const PolicySection = (props: Props) => {
  return (
    <div>
      <div className='mt-5 p-5 flex flex-col justify-center'>
        <h1 className='800px:text-[40px] text-[25px] dark:text-white text-black mb-4 text-[700] font-Poppins'>
        Privacy Policy
        </h1>

          <p className='mb-10 tetx-[20px] leading-[30px] dark:text-[#ffffff83] text-black font-[500] font-Poppins 800px:w-[85%] 800px:pr-10 pr-5'>
          One of our main priorities at the Openhemier website (openhemier.com) is the privacy of our users information. This document contains detailed information about what information we collect from the Openhemier website and how we use it.
          </p>

          <p className='mb-10 tetx-[20px] leading-[30px] dark:text-[#ffffff83] text-black font-[500] font-Poppins w-[85%] pr-10'>
          If you have any questions or need more information about our privacy policy, please do not hesitate to contact us.
          </p>

          
          <p className='mb-10 tetx-[20px] leading-[30px] dark:text-[#ffffff83] text-black font-[500] font-Poppins w-[85%] pr-10'>
          This Privacy Policy applies only to our online activities and is valid for information shared by our website visitors and/or collected from the Becodemy website. This policy does not apply to any information collected offline or through channels other than this website.
          </p>
            
      </div>



      {
        policy.map((item:any) => (
        <div key={item.id} className='mt-5 p-5 flex flex-col justify-center'>
        <h1 className='800px:text-[25px] mb-4 text-[25px] text-[#37a39a] text-[700] font-Poppins'>
            ● {' '} {item.title}
        </h1>

          
          {
            item.texts.map((p:any) => (
            <p key={p} className='mb-10 tetx-[20px] leading-[30px] dark:text-[#ffffff83] text-black font-[500] font-Poppins w-[85%] pr-10'>
              {p}
            </p>
            ))
          }
            
      </div>
        ))
      }
    </div>
  )
}

export default PolicySection