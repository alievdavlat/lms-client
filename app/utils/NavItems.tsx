'use client'
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

export const navItemsData = [
  {
    name:"Home",
    url:"/"
  },
  {
    name:"Courses",
    url:"/courses"
  },
  {
    name:"About",
    url:"/about"
  },
  {
    name:"Policy",
    url:"/policy"
  },
  {
    name:"FAQ",
    url:"/faq"
  }
]


type Props = {
  isMobile:boolean;
  activeItem:number;
  setActiveItem:(activeItem:number) => void; 
}





const NavItems:FC<Props> = ({ isMobile, activeItem, setActiveItem}) => {

  const {theme , setTheme} = useTheme()
  return (
    <>
      <div className='hidden 800px:flex'>
          {
            navItemsData && navItemsData.map((item, index) => (
              <Link href={item.url} key={item.name + index} passHref>
                  <span
                  onClick={() => setActiveItem(index)}
                  className={`
                  ${
                    activeItem === index ? 
                    'dark:text-[#37a39a] text-[crimson]' :
                    'dark:text-white text-black'
                  } text-[18px] px-6 font-Poppins font-[400]
                  `}
                  >
                    {item.name}
                  </span>
              </Link>
            ))
          }
      </div>
      {
        isMobile  && (
          <div className="mt-5 80px:hidden">
            <div className='w-full text-center  mt-[100px] py-6'>
                <Link  
                href={'/'}
                className="text-[25px] flex gap-3 font-Poppins  justify-center items-center  font-[500] text-black dark:text-white"
                > 
                  {
                    theme === 'light' && <Image width={90} height={30} className='w-[90px] h-[30px] object-contain' src={'/logo2.png'} alt=' logo'/>
                  } 
                  {
                    theme === 'dark' && <Image width={150} height={80} src='/logo.png' className='w-[150px] h-[80px] object-contain'  alt="logo"/>
                  }
                </Link>
            </div>
              {
                navItemsData && navItemsData.map((item , index) => (
                  <Link key={index} href={'/'} passHref>
                <span
                onClick={() => setActiveItem(index)}
                 className={`
                 ${
                   activeItem === index ? 
                   'dark:text-[#37a39a] text-[crimson]' :
                   'dark:text-white text-black'
                 } block py-5  text-[18px] px-6 font-Poppins font-[400]
                 `}
                >

                {item.name}
                </span>
              </Link>
                ))
              }
            </div>
        )
      }
    </>
  )
}

export default NavItems