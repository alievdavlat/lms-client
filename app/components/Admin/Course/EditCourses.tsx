// 'use client'
import React from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from  './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation, useGetAlCoursesQuery } from '@/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import CourseLoader from '../../ui/courseLoader'
import axios from 'axios'
import { redirect } from 'next/navigation'

type Props = {
  id:string
}

const EditCourses:React.FC<Props> = ({id}) => {
  
  
  const {isLoading:coursesLoading, data, error:coursesERR, refetch} = useGetAlCoursesQuery({}, {refetchOnMountOrArgChange:true})

    

  const newData = data?.courses?.find((item:any) => item._id === id)

  

  const [createCourse, { isSuccess, error, isLoading}] = useCreateCourseMutation()
  
  const [loading ,setLoading] = React.useState(false)


  React.useEffect(() => {
    if (isSuccess) {
      toast.success('Course created successfully')
        redirect('/admin/courses')
    }

   if (error) {
    if ('data' in error) {
      const errMessage = error as any
      toast.error(errMessage)
    }
   }


  }, [isLoading, isSuccess, error])

  const [active , setActive] = React.useState(0)

  const [courseInfo, setCourseInfo] = React.useState({
    name:'',
    description:'',
    categories:'',
    price:'',
    estimatedPrice:'',
    tags:'',
    level:'',
    demoUrl:'',
    thumbnail:''
  })

  
  const [benefits, setBenefits] = React.useState([{title:''}])
  const [prerequisites ,setPrerequisites] = React.useState([{title:''}])



  const [courseContentData, setCourseContentData] = React.useState([
    {
      videoUrl:'',
      title:'',
      description:'',
      videoLength:'',
      videoSection:'Untitled Section',
      links:[
        {
          title:'',
          url:''
        }
      ],
      suggestion:'' || 'no content'
    }
  ])

  
  const [courseData, setCourseData] = React.useState({})


  React.useEffect(() => {
    if (newData) {
        setCourseInfo({
          name:newData.name,
          demoUrl:newData.demoUrl,
          description:newData.description,
          categories:newData.categories,
          estimatedPrice:newData.estimatedPrice,
          level:newData.level,
          price:newData.price,
          tags:newData.tags,
          thumbnail:newData.thumbnail
        })
       setBenefits(newData.benifits.length && newData.benifits ? newData.benifits : benefits) 
       setPrerequisites(newData?.prerequisites?.length && newData?.prerequisites ? newData?.prerequisites : prerequisites )
       setCourseContentData(
      newData?.courseData?.map((item:any, index:number) => 
       (
        {
          videoUrl:item?.videoUrl || '',
          title:item?.title || '',
          description:item?.description || '',
          videoSection:item?.videoSection || 'Untitled Section',
          videoLength:item?.videoLength || '',
          links:item?.links || [
            {
              title:'',
              url:''
            }
          ],
          suggestion:item?.suggestion || 'no content'
        }
       )
      )
       )
    }
  }, [newData])


  const handleSubmit = async (e:any) => {
      e.preventDefault()
      
      // format benefits 

      const fromatedbenefits = benefits.map((benefit) => ({title:benefit.title}))

      // formated prerequisites 

      const formatedPrerequsites = prerequisites.map((prereq) => ({title: prereq.title}))

      // formt course content dara array 

      const formatedCourseContentData = courseContentData.map((courseContent) => ({
        videoUrl:courseContent.videoUrl,
        title:courseContent.title,
        description:courseContent.description,
        videoSection: courseContent.videoSection,
        videoLength:courseContent.videoLength,
        links:courseContent.links.map((link) => ({
          title:link.title,
          url:link.url
        })),
        suggestion:courseContent.suggestion
      }))


    
      // prepare data obj  

      const data = {
        name:courseInfo.name,
        description: courseInfo.description,
        categories:courseInfo.categories,
        price:courseInfo.price,
        estimatedPrice:courseInfo.estimatedPrice,
        tags:courseInfo.tags,
        level:courseInfo.level,
        demoUrl:courseInfo.demoUrl,
        thumbnail:courseInfo.thumbnail,
        totalVideos:courseContentData.length,
        benifits:fromatedbenefits,
        prerequisites:formatedPrerequsites,
        courseData:formatedCourseContentData
      }

      setCourseData(data)

    }
    


  const handleCourseCreate = async (e:any) => {
    try {
      const data:any = courseData
      


      const formdata = new FormData();
  
      for (const key in data) {
        if (Array.isArray(data[key])) {
          for (let i = 0; i < data[key].length; i++) {
            for (const subKey in data[key][i]) {
              if (Array.isArray(data[key][i][subKey])) {
                for (let j = 0; j < data[key][i][subKey].length; j++) {
                  for (const subSubKey in data[key][i][subKey][j]) {
                    formdata.append(
                      `${key}[${i}][${subKey}][${j}][${subSubKey}]`,
                      data[key][i][subKey][j][subSubKey]
                    );
                  }
                }
              } else {
                formdata.append(`${key}[${i}][${subKey}]`, data[key][i][subKey]);
              }
            }
          }
        } else {
          formdata.append(key, data[key]);
        }
      }
  
      setLoading(true)
      const res = await axios.putForm(`${process.env.NEXT_PUBLIC_SERVER_URL}edit-course/${id}`, formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      setLoading(false)
      
      if (res.data.status === 201 || res.data.status === 200 ) {
        toast.success('Course updated successfully')
      } else {
        toast.error('somthing went error please try again')
      }
      setTimeout(() => {
        window.location.replace('http://localhost:3000/admin/courses')
      }, 3000);

      if (res.status === 400 || res.status === 401 || res.status == 404 || res.status === 201) {
        toast.error('somthing went error or jwt expired')
      }

    } catch (error:any) {
      setLoading(false)
      console.error('Axios so\'rovi xatosi:', error);
      toast.error(error)
    }
  };
  
  

if (loading)  <CourseLoader/>
  


  return (
    <div className='w-full flex min-h-screen'>
        <div className='w-[80%]'>
            {
              active === 0 && (
                <CourseInformation
                  courseInfo={courseInfo}
                  setCourseInfo={setCourseInfo}
                  active={active}
                  setActive={setActive}
                  
                />
              )
            }

            {
              active === 1 && (
                <CourseData
                  benefits={benefits}
                  setBenefits={setBenefits}
                  prerequisites={prerequisites}
                  setPrerequisites={setPrerequisites}
                  active={active}
                  setActive={setActive}
                />
              )
            }


            {
              active === 2 && (
                <CourseContent
                  courseContentData={courseContentData}
                  setCourseContentData={setCourseContentData}
                  active={active}
                  setActive={setActive}
                  handleSubmit={handleSubmit}
                />
              )
            }

            {
              active === 3 && (
                <CoursePreview
                  courseData={courseData}
                  handleCourseCreate={handleCourseCreate}
                  active={active}
                  setActive={setActive}
                />
              )
            }   

        </div>

        <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0'>
              <CourseOptions active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default EditCourses


