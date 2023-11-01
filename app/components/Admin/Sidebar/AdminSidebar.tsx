'use client'
import React from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography } from '@mui/material'
import "react-pro-sidebar/dist/css/styles.css"

import {
  HomeOutlined,
  Quiz,
  ArrowBackIos,
  ArrowForwardIos,
  BarChartOutlined,
  ExitToApp,
  Groups,
  ManageHistory,
  MapOutlined,
  OndemandVideo, 
  PeopleOutlined,
  QuWysiwygiz,
  ReceiptOutlined,
  Settings,
  VideoCall,
  Web
} from './Icon'

import avatarDefault from '../../../../public/assets/avatar.png'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useLogoutQuery } from '@/redux/features/auth/authApi'
import axios from 'axios'
import toast from 'react-hot-toast'


interface ItemProps {
  title:string;
  to:string;
  icon:JSX.Element;
  selected:string;
  setSelected:(seleted:string) => void;

}

const Item:React.FC<ItemProps>  = ({title, to, icon, selected, setSelected}) => {
  return (
    <MenuItem
      active = { selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className='!text-[16px] !font-Poppins'>{title}</Typography>
      <Link href={to}/>
    </MenuItem>
  )
}


const AdminSidebar = () => {
  const { user } = useSelector((state:any) => state.auth)
  const [logOut, setLogOut] = React.useState(false)
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [selected, setSelected] = React.useState('Dashboard')
  const [mounted , setMounted] = React.useState(false)
  const {theme , setTheme } = useTheme()


  // const {} = useLogoutQuery(undefined, {
  //   skip: !logOut ? true : false
  // })

  
  

  const logoutHandler =  async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}logout`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })

    if (res?.data?.message) {
      toast.success(res?.data?.message)
    }
    setLogOut(true)
    await signOut();

}

  React.useEffect(() => {
    
    setMounted(true)
    
    if (window.screen.width <= 420) {
      setIsCollapsed(true)
    } else{
      setIsCollapsed(false)
    }

  }, [])


  if (!mounted) {
      return null
  }





  return (
   <Box
    sx={{
      "& .pro-sidebar-inner": {
        background: `${
          theme === 'dark' ? '#111C43 !important' : '#fff  !important'
        }`
      },
      '& .pro-icon-wrapper':{
        backgroundColor: 'transparent !important',
      },
      '& .pro-inner-item:hover': {
        color:'#868dfb !important'
      },
      '& .pro-menu-item.active':{
        color:'#6870fa !important'
      },
      '& .pro-inner-item':{
        padding:'5px 35px 5px 20px !important',
        opacity:1,
      },
      '& .pro-menu-item':{
        color:`${theme !== 'dark' && '#000'}`
      }

    }}

    className="!bg-white dark:bg-[##111C43] shadow-2xl"
   >

    <ProSidebar
    collapsed={isCollapsed}
    style={{
      position:"fixed",
      top:0,
      left:0,
      height:'100vh',
      width:isCollapsed ? '0%' : '16%'
    }}
    >
      <Menu
      iconShape='square'
      >
        <MenuItem
        onClick={() => setIsCollapsed(!isCollapsed)}
        icon={isCollapsed ? <ArrowForwardIos/> : undefined}
        style={{
          margin:"10px  20px 0",
        }}
        >
            {
              !isCollapsed ?  (
                <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                ml={'15px'}
                >
                    <Link href={'/'}>
                      <h3 className='text-[25px] font-Poppins uppercase dark:text-white text-black'>
                      Openhemier
                      </h3>
                    </Link>
                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className='inline-block'>
                      <ArrowBackIos className='text-black dark:text-[#ffffffc1]'/>
                    </IconButton>
                </Box>
              ) : ''
            }
        </MenuItem>

        {
          !isCollapsed && (
            <Box mb={'25px'}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <img
                      alt='profile picture'
                      className='w-[100px] h-[100px]'
                      src={user?.avatar ? user?.avatar?.url : avatarDefault}
                      style={{
                        cursor:'pointer',
                        borderRadius:"50%",
                        border:"3px solid #5b6fe6"
                      }}
                    />
                </Box>

                <Box textAlign={'center'}>
                      <Typography
                        variant='h4'
                        className='!text-[20px] text-black dark:text-[#ffffffc1]'
                        sx={{m:'10px 0 0 0'}}
                      >
                          {user?.name}
                      </Typography>
                      <Typography 
                      variant='h6'
                      sx={{m:'10px 0 0 0'}}
                      className='!text-[20px] text-black dark:text-[#ffffffc1]'
                      >
                        {user?.role}
                      </Typography>
                </Box>
            </Box>
          )
        }
        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Dashboard'
              to='/admin'
              icon={<HomeOutlined/>}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
            variant='h5'
            sx={{m:'15px 0 5px 25px'}}
            className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
                {!isCollapsed && "Data"}
            </Typography>

            <Item
              title='Users'
              to='/admin/users'
              icon={<Groups/>}
              selected={selected}
              setSelected={setSelected}
            />

          <Item
              title='Invoices'
              to='/admin/invoices'
              icon={<ReceiptOutlined/>}
              selected={selected}
              setSelected={setSelected}
            />

          <Typography
            variant='h5'
            sx={{m:'15px 0 5px 25px'}}
            className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
                {!isCollapsed && "Content"}
          </Typography>


          <Item
              title='Create course'
              to='/admin/create-course'
              icon={<VideoCall/>}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Item
              title='Live courses'
              to='/admin/courses'
              icon={<OndemandVideo/>}
              selected={selected}
              setSelected={setSelected}
            />    
            
            <Typography
            variant='h5'
            sx={{m:'15px 0 5px 25px'}}
            className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
                {!isCollapsed && "Customization"}
          </Typography>


          <Item
              title='Hero'
              to='/admin/hero'
              icon={<Web/>}
              selected={selected}
              setSelected={setSelected}
            />   

          <Item
              title='FAQ'
              to='/admin/faq'
              icon={<Quiz/>}
              selected={selected}
              setSelected={setSelected}
            /> 

            <Item
              title='Categories'
              to='/admin/categories'
              icon={<QuWysiwygiz/>}
              selected={selected}
              setSelected={setSelected}
            /> 

          <Typography
            variant='h5'
            sx={{m:'15px 0 5px 25px'}}
            className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
                {!isCollapsed && "Controllers"}
          </Typography>

          <Item
              title='Manage team'
              to='/admin/team'
              icon={<PeopleOutlined/>}
              selected={selected}
              setSelected={setSelected}
            /> 

        <Typography
            variant='h5'
            sx={{m:'15px 0 5px 25px'}}
            className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
                {!isCollapsed && "Analytics"}
          </Typography>

          
          <Item
              title='Courses Analytics'
              to='/admin/courses-analytics'
              icon={<BarChartOutlined/>}
              selected={selected}
              setSelected={setSelected}
            /> 

          <Item
              title='Orders Analytics'
              to='/admin/orders-analytics'
              icon={<MapOutlined/>}
              selected={selected}
              setSelected={setSelected}
            /> 

          <Item
              title='Users Analytics'
              to='/admin/users-analytics'
              icon={<ManageHistory/>}
              selected={selected}
              setSelected={setSelected}
            /> 

        <Typography
            variant='h5'
            sx={{m:'15px 0 5px 25px'}}
            className='!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]'
            >
                {!isCollapsed && "Extras"}
          </Typography> 

          {/* <Item
              title='Settings'
              to='/admin/settings'
              icon={<Settings/>}
              selected={selected}
              setSelected={setSelected}
            />  */}

              {/* <Item
              title='Logout'
              to='/admin/logot'
              icon={<ExitToApp/>}
              selected={selected}
              setSelected={setSelected}
            />  */}

            <br />
            
            <div className='flex gap-3 pl-1 cursor-pointer'  onClick={() => logoutHandler()}>

            <ExitToApp 
              className='dark:text-white text-black cursor-pointer text-[30px] ml-6' 
             
            
            />

            <span className='text-[18px]'>
            Logout
            </span>
            </div>

        </Box>
      </Menu>

    </ProSidebar>

   </Box>
  )
}

export default AdminSidebar