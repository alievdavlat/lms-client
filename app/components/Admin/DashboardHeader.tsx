import React from "react";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { IoMdNotificationsOutline } from "react-icons/io";
import {BsCheck2All} from 'react-icons/bs'
import Link from "next/link";
import { styles } from "@/app/styles/style";
import socketIO from 'socket.io-client'
import { useGetAllNotificationsQuery, useUpdateNotificationsStatusMutation } from "../../../redux/features/notifications/notificationsApi"
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ''
const socketId = socketIO(ENDPOINT, {transports:['websocket']})



type Props = {
  open:boolean;
  setOpen:(open:boolean) => void;
};

const DashboardHeader:React.FC<Props> = ({open, setOpen}) => {


  const {data, refetch} = useGetAllNotificationsQuery(undefined, {refetchOnMountOrArgChange:true})

  const [updateNotificationsStatus, { isSuccess }] = useUpdateNotificationsStatusMutation()

  const [notifications, setNotifications] = React.useState<any>([])
  const [audio] = React.useState(
    new Audio(
      'https://firebasestorage.googleapis.com/v0/b/learning-platfrom-9b485.appspot.com/o/livechat-129007.mp3?alt=media&token=c3238efc-15b2-4c62-91e3-c0cd809a1eba&_gl=1*zfx25t*_ga*MTU4NjE2MDk5Ny4xNjk2NzU0MDMw*_ga_CW55HF8NVT*MTY5ODY0MzU2MC4zMy4xLjE2OTg2NDM3NjMuNTIuMC4w'
    )
  )

  
  const playerNotificationSound  = () => {
    audio.play()
  } 

  React.useEffect(() => {
    if (data) {
        setNotifications(
          data?.notifications?.filter((item:any) => item?.status === 'unread')
        )
    }

    if (isSuccess) {
        refetch()
    }

    audio.load();

  }, [isSuccess, data])

  React.useEffect(() => {
    socketId.on('newNotification', (data) => {
      refetch()
      playerNotificationSound()
    })
  }, [])


  const handleNoteficationStatusChange =  async (id:string) => {
    await updateNotificationsStatus(id)
  }



  return (
    <div className="w-full flex items-center justify-end p-10   fixed !z-[1000000] top-10 right-0">
      <Link
        href={"/profile"}
        className={`${styles.button}  mx-4 !bg-blue-800 !w-[120px] !h-[30px]`}>
        Go back
      </Link>
      <ThemeSwitcher />

      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}>
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications?.length}
        </span>
      </div>

      {open && (
        <div className="w-[350px] overflow-y-scroll dark:bg-[#111C43] h-[100vh] bg-white shadow-xl absolute top-16 z-10 rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notefications
          </h5>


          <div className="p-2 flex flex-col gap-5">
               {
                notifications?.map((item:any, index:number) => (
                <div key={item?._id} className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b  dark:border-b-[#ffffff47] border-b-[#0000000f]">
                  <div className="w-full flex  justify-between flex-col p-2">
                    <p className="text-black dark:text-white">
                     {item?.title}
                    </p>

                    <p className="text-black mt-4 dark:text-white cursor-pointer flex items-center gap-2" onClick={() => handleNoteficationStatusChange(item?._id)}>
                      Mark as read  <BsCheck2All className="text-blue-600" size={25} />
                    </p>

                  </div>

                  <p className="text-black dark:text-white px-2">
                    {item?.message}
                  </p>
                  <p className="p-2 text-black dark:text-white text-[14px]">
                    {format(item?.createdAt)}
                  </p>
                </div>
                ))
              }
              </div>



        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
