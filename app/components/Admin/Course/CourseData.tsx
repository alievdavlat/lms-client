import { styles } from '@/app/styles/style';
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import toast from 'react-hot-toast';
import {MdClear} from 'react-icons/md'

type Props = {
  benefits:{title:string}[];
  setBenefits: (benefits:{title:string}[]) => void;
  prerequisites:{title:string}[];
  setPrerequisites: (prerequisites:{title:string}[]) => void;
  active:number;
  setActive: (active:number) => void;
}

const CourseData:React.FC<Props> = ({benefits, setBenefits, prerequisites, setPrerequisites, active, setActive}) => {

  const [showClearBen, setShowClearBen] = React.useState(false)
  const [showCleaarPrereq, setShowPrereq] = React.useState(false)

  const handleBenefitChange = (index:number, value:any) => {
      const updatedBenefits =[...benefits]
      updatedBenefits[index] =  {title:""}
      updatedBenefits[index].title = value
      setBenefits(updatedBenefits)
  }

  const handlePrerequisitesChange = (index:number, value:any) => {
    
    const updatedPrerequisites = [...prerequisites]
  
    updatedPrerequisites[index] = {title:""}
    updatedPrerequisites[index].title = value
    
    setPrerequisites(updatedPrerequisites)
}




  const handleAddBenefits = () => {
    setBenefits([...benefits, {title:''}])
  }

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, {title:''}])
  }

  const handlePrevBtn = () => {
      setActive(active - 1)
  }

  const handleOption = () => {
      if (benefits[benefits?.length - 1]?.title !== '' && prerequisites[prerequisites?.length -  1].title !== '') {
          setActive(active + 1)
      } else {
        toast.error('Please fill the fields for go to next!')
      }
  }


  const handeleDeleteBenefitCol = (index:number, title:string) => {

      const newBenefits = benefits.filter((item:any, id:number) =>  id !== index)

      setBenefits(newBenefits)

  }

  const handeleDeletePrereqCol = (index:number, title:string) => {

    
    const newPrereq = prerequisites.filter((item:any, id:number) =>  id !== index)

    setBenefits(newPrereq)

}




  return (
    <div className='w-[80%] m-auto mt-24 block'>
          <div>
            <label 
            htmlFor="email"
            className={`${styles.label} text-[20px]`}
            >
                What are the benefits for students in this course ? 
            </label>
            <br /> <br />
            {
              benefits?.map((benefit:any, index) => (
                  <div 
                  key={index}
                  className='flex items-center gap-5'
                  onMouseOver={() => setShowClearBen(true)}
                  onMouseLeave={() => setShowClearBen(false)}
                  >
                  <input 
                  type="text" 
                  name='Benefits'
                  placeholder='You need basic knowleadge of mern stack...'
                  required
                  className={`${styles.input} my-4  border-[3px] border-[#376DD4]`}
                  value={benefit?.title}
                  onChange={(e) => handleBenefitChange(index,  e.target.value)}
                  />
                    {
                      showClearBen && <MdClear size={20} className="dark:text-white text-black cursor-pointer" onClick={() => handeleDeleteBenefitCol(index, benefit?.title)} />
                    }
                  </div>
              ))
            }
            <AddCircleIcon
              style={{margin:'10xp 0px', cursor:'pointer', width:'30px'}}
              onClick={handleAddBenefits}
            />
          </div>
          

          <br /> <br />

          <div>
            <label 
            htmlFor="email"
            className={`${styles.label} text-[20px]`}
            >
                What are the prerequisites for starting  this course ? 
            </label>
            <br /> <br />
            {
              prerequisites?.map((prereq:any, index) => (
                 <div
                 key={index}
                 className='flex items-center gap-5'
                 onMouseOver={() => setShowPrereq(true)}
                 onMouseLeave={() => setShowPrereq(false)}
                 >
                   <input 
                  type="text" 
                  name='Benefits'
                  placeholder='You will be able to to build a full stack Lms Platform...'
                  required
                  className={`${styles.input} my-4  border-[3px] border-[#376DD4]`}
                  value={prereq?.title}
                  onChange={(e) => handlePrerequisitesChange(index,  e.target.value)}
                  />
                   {
                      showCleaarPrereq && <MdClear size={20} className="dark:text-white text-black cursor-pointer" onClick={() => handeleDeletePrereqCol(index, prereq?.title)} />
                   }
                 </div>
              ))
            }
            <AddCircleIcon
              style={{margin:'10xp 0px', cursor:'pointer', width:'30px'}}
              onClick={handleAddPrerequisites}
            />
          </div>

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
              onClick={() => handleOption()}
             >
                Next
              </button>
          </div>
    </div>
  )
}

export default CourseData