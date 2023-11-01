import React from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { number } from 'yup';

type Props = {
  data:any;
  activeVideo?:number;
  setActiveVideo?:any;
  isDemo?: boolean;
}

const CourseContentList:React.FC<Props> = (props) => {

  const [visibleSections, setVisibleSections] = React.useState<Set<string>>( new Set<string>())


  const videoSections: string[] = [
    ...new Set<string>(props?.data?.map((item:any) =>  item.videoSection))
  ]

  let totalCouont:number = 0;

  const toggleSection = (section:string) => {
    
    const newVisibleSections =  new Set(visibleSections)
     if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section)
     } else {
      newVisibleSections.add(section)
     }

    setVisibleSections(newVisibleSections)
  }



  return (
    <div className={`mt-[20px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
        {videoSections.map((section:string, sectionIndex:number) => {
          const isSectionVisible = visibleSections.has(section);
          
          const sectionvvideos : any[] = props.data.filter(
            (item:any) => item.videoSection === section
          );

          const sectionVideoCount :number = sectionvvideos.length;
          const sectionVideoLegth: number = sectionvvideos.reduce(
            (totalLength:number , item:any ) => totalLength +  item.videoLength, 0
          );

          const sectionStartIndex:number = totalCouont;
           totalCouont += sectionVideoCount;

           const sectionContentHour:number = sectionVideoLegth / 60;

           return (
            <div className={`${!props.isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section}>
                <div className="w-full flex">
                    <div className="w-full flex justify-between items-center">
                        <h2 className='text-[25px] text-black dark:text-white'>
                            {section}
                        </h2>
                        <button
                        className='mr-4 cursor-pointer text-black dark:text-white'
                        onClick={() => toggleSection(section)}
                        > 
                          {
                            isSectionVisible ? (
                              <BsChevronUp size={20}/>
                            ) : (
                              <BsChevronDown size={20}/>
                            )
                          }
                        </button>
                    </div>
                </div>

                <h5 className='text-black dark:text-white text-[20px] mt-5'>
                        {sectionVideoCount} Lessons {' '}
                        {sectionVideoLegth < 60
                        ? sectionVideoLegth
                        : sectionContentHour.toFixed(2)
                        } {' '}
                        {sectionVideoLegth > 60 ? 'hours' : 'minutes'}
                </h5>
                <br />
                {isSectionVisible && (
                  <div className="w-full">
                    {sectionvvideos.map((item:any, index:number) => {
                      const videoIndex:number = sectionStartIndex + index;
                      const contentLength:number = item.videoLength / 60;

                      return (
                        <div className={`w-full ${
                          videoIndex === props.activeVideo ? 'bg-slate-800' : ''
                        } cursor-pointer transition-all p-2`}
                        key={item._id}
                        onClick={() => props.isDemo ? null : props.setActiveVideo(videoIndex)}
                        >
                          <div className='flex items-start'>
                              <div>
                                <MdOutlineOndemandVideo
                                size={25}
                                className="mr-2"
                                color="#1cdada"
                                />
                              </div>
                              <h1 className='text-[18px] inline-block break-words text-black dark:text-white'>
                                {item.title}
                              </h1>
                          </div>
                          <h5 className='pl-8 text-black dark:text-white'>
                          {item.videoLength > 60 ? contentLength.toFixed(2) : item.videoLength} {' '}
                          {item.videoLength > 60 ? 'hours' : 'minutes'}
                          </h5>
                        </div>
                      )
                    })}
                  </div>
                )}
            </div>
           )

        })}
    </div>
  )
}

export default CourseContentList