import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React from 'react'
import CourseLoader from '../ui/courseLoader';
import Heading from '../../utils/Heading';
import CourseContentMedia from '../ui/CourseContentMedia'
import Header from './Header';
import toast from 'react-hot-toast';
import CourseContentList from '../ui/CourseContentList';

type Props = {
  id:string;
  user:any;
}

const CourseAccessContent:React.FC<Props> = ({id, user}) => {
  
  const {data , isLoading, error, refetch } = useGetCourseContentQuery(id, {refetchOnMountOrArgChange:true})
  const [activeVideo , setActiveVideo] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [route, setRoute ] = React.useState('Login')
  const [activeItem, setActiveItem] = React.useState(1)
  
  React.useEffect(() => {
    if (error) {
      if ('data' in error) {
        const errMessage = error as any
        toast.error(errMessage)
      } }
  }, [])

  return (
    <div>
      {
        isLoading  ? <CourseLoader/> : (
          <>
          <Header
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
          />
          <div className='w-full  grid 800px:grid-cols-10'>
             <Heading
             title={data?.content[activeVideo]?.title}
             desciption={`${data?.content[activeVideo]?.description}`}
             keywords='Nodejs, Reactjs, Mern stack , Ai, Machine Learning'
             />
 
             <div className='col-span-7'>
               <CourseContentMedia
               data={data?.content}
               id={id}
               activeVideo={activeVideo}
               setActiveVideo={setActiveVideo}
               user={user}
               refetch={refetch}
               />
             </div>
              <div className="hidden 800px:block 800px:col-span-3">
                <CourseContentList
                setActiveVideo={setActiveVideo}
                activeVideo={activeVideo}
                data={data.content}
                />
              </div>

           </div>
          </>
        )
      }
    </div>
  )
}

export default CourseAccessContent