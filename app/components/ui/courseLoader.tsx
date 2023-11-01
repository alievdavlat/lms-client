import React from "react";

type Props = {};

const CourseLoader = (props: Props) => {
  return (
    <div className="w-screen relative h-screen flex items-center justify-center">
      <div className="loader JS_on">
        <span className="binary"></span>
        <span className="binary"></span>
        <span className="getting-there dark:text-white text-black">LOADING ...</span>
      </div>
    </div>
  );
};

export default CourseLoader;
