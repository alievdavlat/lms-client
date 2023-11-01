import { useGetHeroLayoutByTypeQuery } from "@/redux/features/layout/layoutApi";
import SliderMain from '../ui/slider'
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import CourseLoader from "../ui/courseLoader";
import { styles } from "@/app/styles/style";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";

type Props = {};

const Hero = () => {

  const router = useRouter()

  const {isLoading, isSuccess, error, data, refetch} = useGetHeroLayoutByTypeQuery({}, {refetchOnMountOrArgChange:true})

  const [search, setSearch] = React.useState('')


  React.useEffect(() => {
    if (isSuccess) {
        refetch()
    }

   if (error) {
    if ('data' in error) {
      const errMessage = error as any
      toast.error(errMessage)
    }
   }

  }, [ isSuccess, error, isLoading, data])


  const handleSearch = () => {
    if (search === '') {
        return
    } else {
      router.push(`/courses?title=${search}`)
    }

  }


  return (
   <>
  {
    isLoading
    ? <CourseLoader/>
    : 
    <div className="relative h-[70vh] 800px:h-[85vh] w-[100%]">
    {  
     data?.layout?.banner?.show ==  'slider' ? (
         <SliderMain/>
     ): data?.layout?.banner?.show === 'banner' ?   (
       
  <div className="flex items-center 800px:flex-row flex-col justify-center 800px:gap-16  gap-5 pt-[100px]">

      <div className="800px:w-[600px] 800px:h-[600px] rounded-full hero_animation w-full h-full">
      <Image 
      src={data?.layout?.banner?.image} 
      alt="banner" 
      width={1000}
      height={1000}
      className="w-full h-full 800px:rounded-full object-cover "
      />
     </div>
     
     <div className="w-[40%]  h-full flex items-center justify-center flex-col z-[1000]  ">
    
      <h1 className="font-extrabold text-[25px] text-gradient leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center text-white font-Poppins 800px:!leading-[60px]">
        {data?.layout?.banner?.title} 
      </h1>
     
 
      <div className="w-full text-center ">
       
       <p className="800px:block hidden text-gradient2 font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#fff] mt-5 mb-10">
         {data?.layout?.banner?.subtitle.slice(0, 100)} <br />{data?.layout?.banner?.subtitle.slice(100, -1)}
       </p>
      
       <p className="800px:block hidden text-gradient2 font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#fff] mt-5 mb-10">
       {data?.layout?.banner?.subtitle.slice(0, 100)} <br /> {data?.layout?.banner?.subtitle.slice(100, -1)}
       </p>
       
       
      </div>
     
      <div className="1500px:w-[55%] 1100px:w-[78%] w-full h-[50px] bg-transparent relative">
        <input 
          type="search" 
          className={`${styles.input} w-full h-full outline-none dark:bg-[#575757] dark:border-none border bg-transparent dark:placeholder:text-[#ffffffdd] rounded-[5px] text-black`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Courses..."
          />
          <button 
          onClick={handleSearch}
          className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-2.5 bg-[#39c1f3] rounded-r-[5px]"
          >
            <BiSearch className="text-white"/>
          </button>
        
      </div>
 
     </div>

  </div>
     ) :  (
       <>
    <div className="w-full custoom-resize  h-full flex items-center justify-center flex-col z-[1000] ">
     <h1 className="font-extrabold text-[25px] text-gradient leading-[35px] sm:text-3xl lg:text-5xl tracking-tight text-center text-white font-Poppins 800px:!leading-[60px]">{data?.layout?.banner?.title} </h1>
     
 
       <div className="w-full text-center ">
       
       <p className="800px:block hidden text-gradient2 font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#fff] mt-5 mb-10">
         {data?.layout?.banner?.subtitle.slice(0, 100)} <br />{data?.layout?.banner?.subtitle.slice(100, -1)}
       </p>
      
       <p className="800px:block hidden text-gradient2 font-poppins 800px:text-[22px] 800px:leading-[32px] text-[16px] leading-[23px] font-normal text-[#fff] mt-5 mb-10">
       {data?.layout?.banner?.subtitle.slice(0, 100)} <br /> {data?.layout?.banner?.subtitle.slice(100, -1)}
       </p>
       
     <div className="flex w-full justify-center font-Poppins font-[600]">
         <Link href="/courses">
         <button className="flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold">Explore Courses</button>
         </Link>
       </div>
       
     </div>
 
     </div>
       </>
     )
    }

   
  </div>
  }
   </>
 );
};

export default Hero;




