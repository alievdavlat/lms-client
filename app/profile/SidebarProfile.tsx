import Image from 'next/image';
import React, { FC } from 'react'
import { AiOutlineLogout, AiFillEdit } from 'react-icons/ai';
import { SiCoursera } from 'react-icons/si'
import { BiSolidDashboard} from 'react-icons/bi'
import Link from 'next/link';

type Props = {
  user:any,
  active:number,
  avatar:string;
  setActive:(active:number) => void;
  logoutHandler:() => void
}

const SidebarProfile:FC<Props> = ({user, active, avatar, setActive, logoutHandler}) => {

  
  return (
    <div className='w-full'>
        
        <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
        }`}
        onClick={() => setActive(1)}
        >
          <Image
          src={user?.avatar?.url || avatar  || 'https://i.pravatar.cc/300'}
          alt='avatar'
          width={40}
          height={40}
          className='rounded-full w-[40px] h-[40px]'
          />
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>{user?.name}
          <br />
          <span className='text-[13px]'>{user?.email}</span>
          </h5>
        </div>
      
        <div
        className={`w-full flex items-center px-5 py-6 cursor-pointer ${
          active === 2 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
        }`}
        onClick={() => setActive(2)}
        >
          <AiFillEdit size={20} className="dark:text-white text-black"/>
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
            Edit Profile Info
          </h5>
        </div>

        <div
        className={`w-full flex items-center px-5 py-6 cursor-pointer ${
          active === 3 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
        }`}
        onClick={() => setActive(3)}
        >
          <SiCoursera size={20}className="dark:text-white text-black"/>
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
            Enrolled Courses
          </h5>
        </div>

       {
        user?.role === 'admin' 
        &&
        <Link
        href={'/admin'}
        className={`w-full flex items-center px-5 py-6 cursor-pointer ${
          active === 5 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
        }`}
        onClick={() => setActive(5)}
        >
          <BiSolidDashboard size={20} className="dark:text-white text-black" />
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
            Admin Dashboard
          </h5>
        </Link> 
       }

        <div
        className={`w-full flex items-center px-5 py-6 cursor-pointer ${
          active === 4 ? 'dark:bg-slate-800 bg-white' : 'bg-transparent'
        }`}
         onClick={() => logoutHandler()}
        >
          <AiOutlineLogout size={20} className="dark:text-white text-black"/>
          <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
            Log Out
          </h5>
        </div>

    </div>
  )
}

export default SidebarProfile