import Image from 'next/image';
import React, { FC } from 'react'
import {RiLockPasswordLine } from 'react-icons/ri'


type Props = {
  user:any;
  setActive:(active:number) => void
}



const ProfileInfo:FC<Props> = ({user, setActive}) => {

  const [showUpdatePassword, setShowUpdatePassword] = React.useState(false)

  

  return (
    <div className="w-full h-full bg-transparent mt-[80px] ">
      

      <div className="w-full items-center 800px:flex-row flex-col  justify-center 800px:pr-20 800px:gap-10 flex ">

      <div className='flex items-center 800px:p-0 p-20 justify-center 800px:w-[400px] 800px:h-[400px]'>
        <Image 
         src={user?.avatar?.url ? user?.avatar?.url :   'https://i.pravatar.cc/300'}
         alt="profile-image"
         className='w-full h-full rounded-full object-cover hover:border-[3px] transition-all ease-in hover:border-[#37a39a] cursor-pointer'
         title='Edit Profile Picture ?'
         onClick={() => setActive(2)}
         width={100}
         height={100}
          />
      </div>

      <div className='flex flex-col gap-10  justify-center'>

        <h1 className='text-[25px] dark:text-white text-black font-Poppins mb-[20px] mt-[30px] cursor-pointer' title="Update name ?" onClick={() => setActive(2)}>
          {user?.name}
        </h1>

          <p className='font-Poppins dark:text-white text-black'
            onMouseOver={() => setShowUpdatePassword(true)}
            onMouseLeave={() => setShowUpdatePassword(false)}
          >
            {user?.email}
          </p>

      </div>
     
      </div>


    </div>
  )
}

export default ProfileInfo