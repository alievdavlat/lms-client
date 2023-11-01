"use client";

import React, { FC } from "react";
import Heading from "./utils/Heading";
import Header from "./components/sections/Header";
import Hero from "./components/sections/Hero";
import Courses from  './components/sections/Courses'
import Reviews from './components/sections/Reviews'
import Faq from './components/sections/Faq'
import Footer from './components/sections/Footer'

type Props  = {

}



const Page: FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(0)

  const [route, setRoute] = React.useState("Login");

  return (
    <div className="w-full">
      <Heading
        title="Lms"
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

      <div className="w-full h-fit">
        <Hero />
        <Courses/>
        <Reviews/>
        <Faq/>
        <Footer/>
      </div>
    </div>
  );
};

export default Page;
