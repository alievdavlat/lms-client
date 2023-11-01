import { styles } from "@/app/styles/style";
import React from "react";
import Image from "next/image";
import { useGetCategoriesDataQuery } from "@/redux/features/layout/layoutApi";


type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};


const CourseInformation: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {


  const { data } = useGetCategoriesDataQuery({}, {refetchOnReconnect: true})

  const [categories , setCategories] = React.useState<any>([])

  const [dragging, setDragging] = React.useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);

    
  };
  

  const handleChange = (e: any) => {
    setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
  };

  
   React.useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories)
    }
  }, [data])



  return (
    <div className="w-[80%] m-auto mt-24 mb-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Coure Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={courseInfo.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter course name..."
            className={`${styles.input} border-[3px] border-[#376DD4]`}
          />
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="description" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={8}
            placeholder="Write something amazing ..."
            className={`${styles.input} border-[3px] border-[#376DD4] py-2 !h-min`}
            value={courseInfo.description}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="price" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name="price"
              required
              value={courseInfo.price}
              onChange={handleChange}
              id="price"
              placeholder="20"
              className={`${styles.input} border-[3px] border-[#376DD4]`}
            />
          </div>

          <div className="w-[50%]">
            <label htmlFor="estimatedPrice" className={styles.label}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              required
              value={courseInfo.estimatedPrice}
              onChange={handleChange}
              id="estimatedPrice"
              placeholder="20"
              className={`${styles.input} border-[3px] border-[#376DD4]`}
            />
          </div>
        </div>
        <br />

        <div className="w-full flex justify-between">
          <div className="w-[45%]">
           <label htmlFor="tags" className={styles.label}>
            Coure tags
          </label>
          <input
            type="text"
            name="tags"
            required
            value={courseInfo.tags}
            onChange={handleChange}
            id="tags"
            placeholder=" React , Redux , Express, Mern, Postgres , Nodejs ..."
            className={`${styles.input} border-[3px] border-[#376DD4]`}
          />
          </div>

          <div className="w-[50%]">
            <label htmlFor="demoUrl" className={styles.label}>
              Course Categories{" "}
            </label>
            <select
                name='categories'
                value={courseInfo.categories}
                onChange={handleChange}
                className={`${styles.input}  border-[3px] border-[#376DD4]`}
              >

                <option value="" className="bg-black text-white">Select Category</option>
                {
                  categories?.map((item:any) => (
                    <option className="bg-black text-white" value={item.title} key={item._id}>{item.title}</option>
                  ))
                }
            </select>
          </div>
        </div>
        
        <br />
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label htmlFor="level" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              name="level"
              required
              value={courseInfo.level}
              onChange={handleChange}
              id="level"
              placeholder="Intermidete, Begginer, Advanced ..."
              className={`${styles.input} border-[3px] border-[#376DD4]`}
            />
          </div>

           <div className="w-[50%]">
            <label htmlFor="demoUrl" className={styles.label}>
              Demo Url{" "}
            </label>
            <input
              type="text"
              name="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={handleChange}
              id="demoUrl"
              placeholder="https://www.youtube.com/watch?v=w1fkGHGZs1Q"
              className={`${styles.input} border-[3px] border-[#376DD4]`}
            />
          </div> 
           {/* <div className="w-[50%]">
            <label htmlFor="demoUrl" className={styles.label}>
              Demo Video{" "}
            </label>
            <input
              type="file"
              name="demoUrl"
              required
              accept="video/*"
              onChange={(e:any) => setCourseInfo({...courseInfo, [e.target.name]:e.target.files[0]})}
              id="demoUrl"
              className={`${styles.input} border-[3px] border-[#376DD4]`}
            />
          </div> */}
        </div>
          <br /> <br />

          <div className={`w-full flex items-center justify-center box h-[400px] ${dragging ?  'bg-blue-500' : 'bg-transparent'  }`}
            onDragOver={() => setDragging(true)}
            onDragLeave={() => setDragging(false)}
            onDrop={() => setDragging(false)}
          >
              <div className="w-full h-full flex items-center justify-center relative">  
                  <Image src={require('../../../../public/cloud-upload-regular-240.png')} width={300} height={300}  alt="cloud" />
                  <input  
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    className="absolute opacity-0  bg-blue-200 w-full h-full cursor-pointer"
                    onChange={(e:any) => setCourseInfo({...courseInfo, [e.target.name]:e.target.files[0]})}
                  />
              </div>

              <div className="flex items-center justify-center w-full gap-5">
                <span>{courseInfo?.thumbnail.name || ''}</span>
                
              </div>
          </div>

          <br />

          <div className="w-full flex items-center justify-center">
                <button className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer">
                    Next 
                </button>
          </div>

          <br /><br />
      </form>
    </div>
  );
};

export default CourseInformation;
