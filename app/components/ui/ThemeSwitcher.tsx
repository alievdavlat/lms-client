'use client'
import React from 'react'
import { useTheme } from 'next-themes'
import { BiMoon , BiSun } from 'react-icons/bi'

type Props = {}

const ThemeSwitcher = (props: Props) => {
  
  const [mounted, setMounted] =  React.useState(false)
  const {theme , setTheme} = useTheme()

  React.useEffect(() => {
    setMounted(true)
  } , [])

  if (!mounted) {
    return null
  }


  return (
    <div className='flex items-center justify-center max-4'>
        {
          theme === 'light'  ? (
             
            <BiMoon
               className='cursor-pointer'
               onClick={() => setTheme('dark')}
               fill='black'
               size={25}
              /> 
          ) : (
                 
            <BiSun
            className='cursor-pointer'
            onClick={() => setTheme('light')}  
            size={25}   
            />
          )
        }
    </div>
  )
}

export default ThemeSwitcher