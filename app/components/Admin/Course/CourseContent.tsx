import { styles } from '@/app/styles/style';
import React from 'react'
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import {BsLink45Deg, BsPencil} from 'react-icons/bs'
import toast from 'react-hot-toast';

type Props = {
  courseContentData:any;
  setCourseContentData:(courseContentData:any) => void;
  active:number;
  setActive:(active:number) => void;
  handleSubmit:any
}

const CourseContent:React.FC<Props> = ({active, setActive, courseContentData, setCourseContentData, handleSubmit:handleCourseSubmit}) => {

const [isCollapsed, setIsCollapsed] = React.useState(
      Array(courseContentData.length).fill(false)
);

const [activeSection, setActiveSection] = React.useState(1)


const handleCollapsedToggle = (index:number) => {
  const updatedCollapsed = [...isCollapsed];
  updatedCollapsed[index] = !updatedCollapsed[index]
  setIsCollapsed(updatedCollapsed)

}

const handleRemoveLink = (index:number, Linkindex:number) => {
  const updatedData = [...courseContentData]
  updatedData[index].links.splice(Linkindex, 1)
  setCourseContentData(updatedData)
}

const handleAddLink  = (index:number) => {
  const updatedData = [...courseContentData]
  updatedData[index].links.push({title:'', url:''})
  setCourseContentData(updatedData)
}

const newContentHandler = (item:any) => {
  if (item.title === '' || item.description === '' || item.videoUrl == '' || item.links[0].title === '' || item.links[0].url === '') {
      toast.error('Please fill all the fields first!')
  } else {
    let newVideoSection = ''

    if (courseContentData.length > 0) {
        const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection

        // ohrgi video sectioon olish agar bor bosa else inout olish 

        if (lastVideoSection) {
            newVideoSection = lastVideoSection
        }
    } 

    const newContent = {
      videoUrl: '',
      title:'',
      description:'',
      videoSection:newVideoSection,
      links:[{title:'', url:''}]
    } 

    setCourseContentData([...courseContentData, newContent])
  }

}

const addNewSection = () => {
  if (
    courseContentData[courseContentData.length - 1].title === '' ||
    courseContentData[courseContentData.length - 1].description === '' ||
    courseContentData[courseContentData.length - 1].videoUrl === '' ||
    courseContentData[courseContentData.length - 1].links[0].title === '' ||
    courseContentData[courseContentData.length - 1].links[0].url === '' 
    ) {
      toast.error('Please fill all the fields first!')
  } else {
    setActiveSection(activeSection + 1)

    const newContent = {
      videoUrl: '',
      title:'',
      description:'',
      videoSection:`Untitled Section  ${activeSection}`,
      links:[{title:'', url:''}]
    } 
    setCourseContentData([...courseContentData, newContent])

  }

}


const handlePrevBtn = () => {
  setActive(active - 1)
}

const handleOptions = (e:any) => {
  if(
    courseContentData[courseContentData.length - 1].title === '' ||
    courseContentData[courseContentData.length - 1].description === '' ||
    courseContentData[courseContentData.length - 1].videoUrl === '' ||
    courseContentData[courseContentData.length - 1].links[0].title === '' ||
    courseContentData[courseContentData.length - 1].links[0].url === '' 
    ) {
      toast.error('Section cont`t be empty!')
  } else {
     setActive(active + 1)
     handleCourseSubmit(e)
  }


}


  return (
    <div className='w-[80%] m-auto mt-24 p-3'>

        <form>
              {
                courseContentData.map((item:any , index:number) => {

                  const showSectionInput = 
                    index === 0 || 
                    item.videoSection !== courseContentData[index - 1].videoSection

                  return (
                    <div key={index}>
                      <div
                        className={`w-full bg-[#cdc8c817] p-4 ${
                          showSectionInput ? 'mt-10' : 'mt-0'
                        }`}
                      >
                        {
                          showSectionInput &&  (
                            <>
                            <div className='w-full flex items-center'>

                            <input 
                            type="text" 
                            className={`text-[20px] ${
                              item.videoSection === 'Untitled Section' 
                              ? 'w-[170px]'
                              : 'w-max'
                            } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                            value={item.videoSection}
                            onChange={(e) => {
                              const updaateData = [...courseContentData]
                              updaateData[index].videoSection = e.target.value
                              setCourseContentData(updaateData)
                            }}
                            />

                            <BsPencil  className="cursor-pointer dark:text-white text-black"/>
                            </div>
                            <br />
                            </>
                          )
                        }

                          <div className='flex w-full items-center justify-between my-0'>
                              {
                                isCollapsed[index] ? (
                                  <>
                                    {
                                      item.title ? (
                                        <p className='font-Poppins dark:text-white text-black'>
                                          {index + 1}:{item.title}
                                        </p>
                                      ) : <></>
                                    }
                                  </>
                                ) : (
                                  <div>
                                    
                                  </div>
                                )}

                              {/* arrow button for collapsed vide content */}
                              <div className="flex items-center">
                                <AiOutlineDelete
                                  className={`dark:text-white text-[20px] mr-2 text-black ${
                                    index > 0 ? 'cursor-pointer' : "cursor-no-drop"
                                  }`}

                                  onClick={() => {
                                    if (index > 0) {
                                        const updaateData = [...courseContentData]
                                        updaateData.splice(index, 1)
                                        setCourseContentData(updaateData)
                                    }
                                  }}
                                />

                                <MdOutlineKeyboardArrowDown
                                  className = 'dark:text-white text-black text-3xl cursor-pointer'
                                  style={{
                                    transform: isCollapsed[index] 
                                    ? 'rotate(180deg)'
                                    : 'rotate(0deg)'
                                  }}
                                  onClick={() => handleCollapsedToggle(index)}
                                />
                              </div>
                          </div>

                              {
                                !isCollapsed[index] && (
                                  <>
                                    <div className='my-3'>
                                        <label className={styles.label}>Video Title</label>
                                        <input 
                                          type="text" 
                                          placeholder='Project Plan'
                                          className={`${styles.input} border-[3px] border-[#376DD4]`}
                                          value={item.title}
                                          onChange={(e) => {
                                          const updaateData = [...courseContentData]
                                          updaateData[index].title = e.target.value
                                          setCourseContentData(updaateData)
                                          }}
                                            />
                                    </div>
                                    {/* <div className='my-3'>
                                        <label className={styles.label}>Video Url</label>
                                        <input 
                                          type="file" 
                                          placeholder='sdder'
                                          className={`${styles.input} border-[3px] border-[#376DD4]`}
                                          accept='video/*'
                                          onChange={(e:any) => {
                                          const updaateData = [...courseContentData]
                                          updaateData[index].videoUrl = e.target.files[0]
                                          setCourseContentData(updaateData)
                                          }}
                                            />
                                    </div> */}
                                    <div className='my-3'>
                                        <label className={styles.label}>Video Url</label>
                                        <input 
                                          type="text" 
                                          placeholder='sdder'
                                          className={`${styles.input} border-[3px] border-[#376DD4]`}
                                          value={item.videoUrl}
                                          onChange={(e) => {
                                          const updaateData = [...courseContentData]
                                          updaateData[index].videoUrl = e.target.value
                                          setCourseContentData(updaateData)
                                          }}
                                            />
                                    </div>
                                    <div className='my-3'>
                                        <label className={styles.label}>Video Length ( in minutes)</label>
                                        <input 
                                          type="text" 
                                          placeholder='12:32'
                                          className={`${styles.input} border-[3px] border-[#376DD4]`}
                                          value={item.videoLength}
                                          onChange={(e) => {
                                          const updaateData = [...courseContentData]
                                          updaateData[index].videoLength = e.target.value
                                          setCourseContentData(updaateData)
                                          }}
                                            />
                                    </div>
                                    <div className='my-3'>
                                        <label className={styles.label}>Video Description</label>
                                        <textarea 
                                          rows={8}
                                          cols={30}
                                          placeholder='sdder'
                                          className={`${styles.input} border-[3px] border-[#376DD4] !h-min py-2`}
                                          value={item.description}
                                          onChange={(e) => {
                                          const updaateData = [...courseContentData]
                                          updaateData[index].description = e.target.value
                                          setCourseContentData(updaateData)
                                          }}
                                            />
                                            <br /><br /> 
                                    </div>
                                    {
                                      item?.links?.map((link:any, Linkindex:number) => (
                                        <div className='mb-3 block'>
                                          <div className="w-full flex items-center justify-between">
                                          <label className={styles.label}>Link {Linkindex + 1}</label>
                                          <AiOutlineDelete
                                             className={`dark:text-white text-[20px] mr-2 text-black ${
                                              Linkindex === 0 ? "cursor-no-drop" : 'cursor-pointer'
                                            }`}

                                            onClick={() => 
                                              Linkindex === 0 
                                              ? null
                                              : handleRemoveLink(index, Linkindex)
                                            }
                                          />

                                          </div>
                                          <input
                                           type="text"
                                           placeholder='Source Code... (Link title)'
                                           className={`${styles.input} border-[3px] border-[#376DD4]`}
                                           value={link.title}
                                           onChange={(e:any) => {
                                            const updatedData = [...courseContentData]
                                            updatedData[index].links[Linkindex].title = e.target.value
                                            setCourseContentData(updatedData)
                                           }}
                                           />
                                           <input
                                           type="url"
                                           placeholder='Source Code Url... (Link Url)'
                                           className={`${styles.input} mt-6 border-[3px] border-[#376DD4]`}
                                           value={link.url}
                                           onChange={(e) => {
                                            const updatedData = [...courseContentData]
                                            updatedData[index].links[Linkindex].url = e.target.value
                                            setCourseContentData(updatedData)
                                           }}
                                           />
                                        </div>
                                      ))
                                    }
                                    {/* add link buttton */}
                                    <div className='inline-block mb-4'>
                                        <p 
                                        className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                        onClick={() => handleAddLink(index)}
                                        >   
                                            <BsLink45Deg className="mr-2"/> Add Link
                                        </p>
                                    </div>
                                  </>
                                )}
                                <br />
                                {/* add new content */}
                                {
                                  index === courseContentData.length - 1 && (
                                    <div>
                                      <p
                                       className='flex items-center text-[18px] dark:text-white text-black cursor-pointer'
                                       onClick={(e:any) => newContentHandler(item)}
                                      >
                                        <AiOutlinePlusCircle className="mr-2"/> Add New Content
                                      </p>
                                    </div>
                                  )
                                }
                            </div>
                        </div>
                        )

                    })}
                    <br />
                    <div 
                    className='flex items-center text-[20px] dark:text-white text-black cursor-pointer'
                    onClick={() => addNewSection()}
                    > 
                      <AiOutlinePlusCircle className="mr-2"/> Add new Section
                    </div>
        </form>

        <br />

        <div className='w-full flex items-center justify-between'>
              <button
              className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff]  rounded mt-8 cursor-pointer'
              onClick={() => handlePrevBtn()}
             >
                Prev
              </button>

              <button
              className='w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff]  rounded mt-8 cursor-pointer'
              onClick={(e) => handleOptions(e)}
             >
                Next
              </button>
        </div>
          
        <br /><br /><br />
    </div>
  )
}

export default CourseContent