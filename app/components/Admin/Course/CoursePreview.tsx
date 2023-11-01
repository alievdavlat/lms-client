import React from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview: React.FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}) => {
  const dicountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData.estimatedPrice) *
    100;

  const dicountPercentagePrice = dicountPercentage.toFixed(0);

  const handlePrevBtn = () => {
    setActive(active - 1);
  };

  const createCourse = async (e: any) => {
   await handleCourseCreate()
  };

  return (
    <div className="w-[90%]  m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.name}
          />
        </div>

        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "free" : courseData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2  mlr-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>

          <h4>{dicountPercentagePrice}% OFF</h4>
        </div>

        <div className="flex items-center">
          <button
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}>
            Buy now {courseData?.price}$
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] border-[3px] border-[#376DD4] ml-3 !mt-0`}
          />
          <button
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}>
            Apply
          </button>
        </div>
        <p className="pb-1">* Source code included</p>
        <p className="pb-1">* Full lifetime access</p>
        <p className="pb-1">Certificate of Completion</p>
        <p className="pb-3 800px:pb-1">Premium support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[500]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              { 
              <Ratings rating={0} /> ? <Ratings rating={0} /> : ''
              }
              <h5>0 Students</h5>
            </div>
          </div>
        </div>

        <br />

        <h1 className="text-[25px] font-Poppins font-[600]">
          What you will lear from this course ?
        </h1>

        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] m4-1">
              <IoMdCheckmarkCircleOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className="text-[25px] font-Poppins font-[600]">
          What are the prerequisites for starting this course ?
        </h1>

        {courseData?.prerequisites?.map((item: any, index: number) => (
          <div className="w-full flex 800px:items-center py-2" key={index}>
            <div className="w-[15px] m4-1">
              <IoMdCheckmarkCircleOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />

        {/* description */}

        <div className="w-full">
          <h1 className="text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden'>
          {courseData?.description}
          </p>
        </div>

        <br />
        <br />
        <div className="w-full flex items-center justify-between">
          <button
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff]  rounded mt-8 cursor-pointer"
            onClick={() => handlePrevBtn()}>
            Prev
          </button>

          <button
            className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff]  rounded mt-8 cursor-pointer"
            onClick={(e) => createCourse(e)}>
            Create
          </button>
        </div>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default CoursePreview;
