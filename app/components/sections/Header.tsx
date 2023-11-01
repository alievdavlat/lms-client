"use client";

import Link from "next/link";
import React, { FC } from "react";
import NavItems from "../../utils/NavItems";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useTheme } from "next-themes";
import CustomModal from "../ui/CustomModal";
import Login from "../Login";
import SignUp from "../SignUp";
import Verification from "../Verification";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";


type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
  activeItem:number;
  setActiveItem:(activeItem:number) => void; 
};

const Header: FC<Props> = ({  setOpen, route, setRoute, open , activeItem, setActiveItem}) => {
  const [active, setactive] = React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const { user } = useSelector((state: any) => state.auth);

  const {data:userData, isLoading, refetch} = useLoadUserQuery(undefined, {})
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = React.useState(false);

  
  
  // const {} = useLogoutQuery(undefined, {
  //   skip: !logout ? true : false,
  // });

  const { theme, setTheme } = useTheme();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setactive(true);
      } else {
        setactive(false);
      }
    });
  }


 

  
  React.useEffect(() => {
    
    if (!isLoading) {
      if (!userData) {
        if (data) {
  
          socialAuth({
            name: data?.user?.name,
            email: data?.user?.email,
            avatar: data?.user?.image,
          });
          refetch()
        }
      }
    }

    if (data === null) {
      if (isSuccess) {
        toast.success("successfull logged  in");
      }
    }

    if (data === null) {
      setLogout(true)
    }

    if (data === null && !isLoading && !userData) {
      setLogout(true)
    }

  }, [data, userData, isLoading]);




  const handleClose = (e: any) => {
    if (e.target.id == "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b  dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[100px] p-y-3 z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[100px] z-[80] dark:shadow"
        }`}>
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo */}
            <div>
              <Link
                href={"/"}
                className="text-[25px] flex gap-3 font-Poppins  font-[500] text-black dark:text-white">
                {theme === "light" && (
                  <img
                    className="object-contain w-[150px] h-[200px]"
                    src={"/logo2.png"}
                    alt=" logo"
                  />
                )}
                {theme === "dark" && (
                  <img
                    src="/logo.png"
                    className="w-[150px] h-[200px] object-contain"
                    alt="logo"
                  />
                )}
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex items-center">
              <span>
              </span>
              <NavItems  isMobile={false} activeItem={activeItem} setActiveItem={setActiveItem} />
              <ThemeSwitcher />

              <div className="800px:hidden ml-4">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <img
                    src={userData?.user?.avatar?.url || "https://i.pravatar.cc/300"}
                    className="w-[40px] h-[40px] rounded-full object-contain ml-3 cursor-pointer"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className={
                    "hidden 800px:block cursor-pointer dark:text-white text-black ml-4"
                  }
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile sidebar */}

        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen">
            <div className="w-[70%] fixed z-[9999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <CgClose
                size={25}
                className="cursor-pointer dark:text-white text- absolute left-1 top-4 right-0"
                onClick={() => setOpenSidebar(false)}
              />

              <NavItems  isMobile={true} activeItem={activeItem} setActiveItem={setActiveItem} />
              {userData ? (
                <Link href={"/profile"}>
                  <img
                    src={userData?.user?.avatar?.url || "https://i.pravatar.cc/300"}
                    className="w-[40px] h-[40px] rounded-full object-contain ml-5 cursor-pointer"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className={
                    "hidden 800px:block cursor-pointer dark:text-white text-black ml-4"
                  }
                  onClick={() => setOpen(true)}
                />
              )}

              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright © 2023 Lms
              </p>
            </div>
          </div>
        )}
      </div>

      {route === "Login" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}

      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={SignUp}
            />
          )}
        </>
      )}

      {route === "Verification" && (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;

/* 
 
  React.useEffect(() => {
    let newData;
    
    if (!isLoading) {
      if (!userData) {
        if (data) {
          newData = data?.user?.image
            ? {
                name: data?.user?.name,
                email: data?.user?.email,
                avatar: data?.user?.image,
              }
            : { name: data?.user?.name, email: data?.user?.email };
  
          socialAuth(newData);
          refetch()
        }
      }
    }

    if (data === null) {
      if (isSuccess) {
        toast.success("successfull logged  in");
      }
    }

    if (data === null) {
      setLogout(true)
    }

    if (data === null && !isLoading && !userData) {
      setLogout(true)
    }

  }, [data, userData, isLoading]);

*/