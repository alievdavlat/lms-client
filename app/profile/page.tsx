"use client";

import React, { FC } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/sections/Header";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/sections/Footer";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {};

const Page: FC<Props> = () => {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(0);

  const [route, setRoute] = React.useState("Login");

  // const { user } = useSelector((state: any) => state.auth);
  const {data:userData, isLoading, refetch} = useLoadUserQuery(undefined, {})



  

  return (
    <div className="overflow-y-hidden">
      <Protected>
        <Heading
          title={`${userData?.user?.name} Profile = Openhemier`}
          desciption="lms is a platform for studnets to learn and get help from teacher"
          keywords="Programing. Pern, Mern, Redux-toolkit, Machine Learning, Java Script"
        />

        <Header
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          route={route}
        />

        <Profile user={userData?.user} />
        <Footer/>
      </Protected>
    </div>
  );
};

export default Page;
