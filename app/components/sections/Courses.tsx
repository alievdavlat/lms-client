import React from "react";
import { useGetAllUserCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../../components/ui/CourseCard";

type Props = {};

const Courses = () => {
  const { data, isLoading } = useGetAllUserCoursesQuery(
    {},
    { refetchOnReconnect: true }
  );

  const [courses, setCourses] = React.useState([]);

  React.useEffect(() => {
    setCourses(data?.data);
  }, [data]);

  return (
    <div>
      <div className="w-[90%] 800pxw-[80%] m-auto mt-[100px]">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black 800px:leading-[60px] font-[700] tracking-tight">
          Expand Your Carear <span className="text-gradient">Opportunity</span>{" "}
          <br />
          Opportunity With Our Courses
        </h1>

        <br />
        <br />

        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[25px] mb-12 border-0">
          {courses?.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
