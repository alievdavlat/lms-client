"use client";

import React, { FC } from "react";
import Heading from "../utils/Heading";
import Header from "../components/sections/Header";
import Courses from  '../components/sections/Courses'
import Footer from '../components/sections/Footer'
import { useSearchParams } from "next/navigation";
import { useGetAllUserCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetCategoriesDataQuery } from "@/redux/features/layout/layoutApi";
import CourseLoader from "../components/ui/courseLoader";
import { styles } from "../styles/style";
import CourseCard from "../components/ui/CourseCard";

type Props  = {

}



const Page: FC<Props> = (props) => {
  const {data ,isLoading} = useGetAllUserCoursesQuery({}, {refetchOnReconnect:true})
  const {data:categoriesData} = useGetCategoriesDataQuery({})
  const [activeItem, setActiveItem] = React.useState(1)

  const seacrhParams = useSearchParams()
  const search = seacrhParams?.get('title')
  
  const [open, setOpen] = React.useState(false);
  const [route, setRoute] = React.useState("Login");
  const [courses , setCourses] = React.useState([])
  const [category, setCategory] = React.useState('All')


  React.useEffect(() => {
    if (category === 'All') {
      setCourses(data?.data)
    }

    if (category !== 'All') {
      setCourses(
        data?.data?.filter((item:any) => item.categories === category)
      )
    }

    if (search) {
      setCategory((
        data?.data?.filter((item:any) => item.name.toLowerCase().includes(search.toLowerCase()))
      ))
    }

  }, [data,category,search])

  const categories = categoriesData?.layout.categories;

  

  return (
    <>
    {
      isLoading  

      ? <CourseLoader/>

      : <div className="w-full">
      <Heading
        title="courses"
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

      <div className="w-full flex items flex-wrap mt-10 mb-10">

        <div className="p-10 w-full flex items flex-wrap">
        <button
        className={`h-[35px] ${
          category === 'All' ? 'bg-[#1b1b5d]' : 'bg-[#5050cb]'
        } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
        onClick={() => setCategory('All')}
        >
          All
        </button>
        {
          categories && categories.map((item:any, index:number) => (
            <div key={item._id}>
              <button
              className={`h-[35px] ${
                category === item?.title ? 'bg-[#1b1b5d]' : 'bg-[#5050cb]'
              } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
              onClick={() => setCategory(item?.title)}
              > 
                {item?.title}
              </button>
            </div>
          ))
        }

        </div>

        <div className="flex items-center justify-center w-full">
        {
          courses && courses.length === 0 && (
            <p className={`${styles.label} justify-center  min-h-[50vh] flex items-center`}>
              {search ? 'No Courses found' : 'No Courses found in this category, Please try another one!'}
            </p>
          )
        }
        </div>

        <br /><br />
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[25px] mb-12 border-0 p-10'>
          {
            courses &&
              courses.map((item:any, index:number) => (
                <CourseCard
                item={item}
                  key={index}
                />
              ))
          }
        </div>
      </div>

      <Footer/>

    </div>

    }
    </>
  );
};

export default Page;
