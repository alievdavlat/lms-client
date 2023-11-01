"use client";
import React, { FC } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogoutQuery } from "../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import EditProfileInfo from "./EditProfileInfo";
import ProfileInfo from "./ProfileInfo";
import { useGetAllUserCoursesQuery } from "../../redux/features/courses/coursesApi";
import CourseCard from "../components/ui/CourseCard";
import CourseLoader from "../components/ui/courseLoader";
import { redirect } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const { data, isLoading } = useGetAllUserCoursesQuery(
    {},
    { refetchOnReconnect: true }
  );
  const [scroll, setScroll] = React.useState(false);
  const [active, setActive] = React.useState(1);
  const [avatar, setAvatar] = React.useState(user?.avatar?.url);
  const [courses, setCourses] = React.useState([]);

  const [logout, setLogout] = React.useState(false);

  // const {} = useLogoutQuery(undefined, {
  //   skip: !logout ? true : false
  // })

  React.useEffect(() => {
    // const enroledCourses = data?.data?.filter((item:any) => user?.courses?.filter((i:any) => i._id  === item._id))

    const enroledCourses = user?.courses?.map((userCourses: any) =>
      data?.data?.find((course: any) => course._id === userCourses._id)
    ).filter((c:any) => c !== undefined)

    setCourses(enroledCourses);
    
  }, [data]);

  const logoutHandler = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}logout`, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res?.data?.message) {
      toast.success(res?.data?.message);
    }

    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[100%] h-screen py-16 flex mx-auto">
      <div
        className={`w-[60px]  800px:w-[400px] h-[700px]  dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d]  rounded-[5px] shadow-sm mt-[80px] sticky
            ${scroll ? "top-[120px]" : "top-[30px]"} left-[20px]
          `}>
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} setActive={setActive} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <EditProfileInfo user={user} avatar={avatar} />
        </div>
      )}

      {active === 3 && (
        <>
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-3 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[25px] mb-12 border-0 p-10">
              {courses &&
                courses?.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} />
                ))}
            </div>
            {courses?.length === 0 && (
              <h1 className="text-cneter text-[18px] font-Poppins">
                You don`t have any purchased courses!
              </h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
