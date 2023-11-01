import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className='mt-[100px]'>
      <div className="border border-[#ffffff1e]">

       </div>

        <br/>

      <div className="w-[90%] 800px:w-full 800px:max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">

              <div className="space-y-3">
                  <h3 className="text-[20px] font-[600] dark:text-white text-black">About</h3>
                  <ul className="space-y-4">
                      <li className='dark:text-white text-black'><Link className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="/about">Our Story</Link></li>
                      <li className='dark:text-white text-black'><Link className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="/policy">Privacy Policy</Link></li>
                      <li className='dark:text-white text-black'><Link className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="/faq">FAQ</Link></li>
                  </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-[20px] font-[600] dark:text-white text-black">Quick Links</h3>
                <ul className="space-y-4">
                  <li className='dark:text-white text-black'><Link className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="/courses">Courses</Link></li>
                  <li className='dark:text-white text-black'><Link className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="/profile">My Account</Link></li>
                </ul>
              </div>
              
            <div className="space-y-3">
              <h3 className="text-[20px] font-[600] dark:text-white text-black">Social Links</h3>
              <ul className="space-y-4">
                <li className='dark:text-white text-black'><a className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="https://t.me/alievv_15">Telegram</a></li>
                <li className='dark:text-white text-black'><a className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="https://www.instagram.com/1.al1evv?igshid=MzRlODBiNWFlZA%3D%3D">Instagram</a></li>
                <li className='dark:text-white text-black'><a className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900" href="https://github.com/alievdavlat">github</a></li>
              </ul>
            </div>


          <div className="space-y-3">
              <h3 className="text-[20px] font-[600] dark:text-white text-black">Contact Info</h3>
              <ul className="space-y-4">
                <li className='dark:text-white text-black'>Call use : <a href="tel:+9989999331564" className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900">+9989999331564</a></li>
                <li className='dark:text-white text-black'>Address: <span className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900">Tashkent , Yangiyul city, 7 - home </span></li>
                <li className='dark:text-white text-black'>Mail us: <a href="mailto:alievgitd@gmail.com" className="text-base dark:text-gray-300 text-black dark:hover:text-white hover:text-gray-900">alievgitd@gmail.com</a></li>
              </ul>
          </div>
            
        
        </div>

        <br/>
        
        <p className="text-center dark:text-white text-black">Copyright © 2023 Openhemier | All Rights Reserved</p>
     </div>


    <br/>
  </footer>
  )
}

export default Footer