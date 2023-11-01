import { styles } from '@/app/styles/style'
import { useGetHeroLayoutByTypeQuery } from '@/redux/features/layout/layoutApi'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineCamera } from 'react-icons/ai'

type Props = {}

const EditHero = (props: Props) => {

  const [image , setImage] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [subTitle, setSubTitle] = React.useState('')
  const [showHero , setSHowHero] = React.useState('')
  
  const { data, isSuccess, refetch} = useGetHeroLayoutByTypeQuery({}, {refetchOnMountOrArgChange:true})


  React.useEffect(() => {
    if (data) {
        setTitle(data?.layout?.banner?.title)
        setSubTitle(data?.layout?.banner?.subtitle)
        setImage(data?.layout?.banner?.image)
    }
  }, [data])

const handleUpdate  = async (e:any) => {

  const imageData:any = {
    type:"Banner",
    title:data?.layout?.banner?.title,
    subtitle:data?.layout?.banner?.subtitle,
    show: data?.layout?.banner?.show,
    bannerImage:e.target.files[0]
  }
  
  const formData = new FormData()
  for (const key in imageData) {
    formData.append(key, imageData[key])    
  } 

 try {
  const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}update-layout`,formData,{
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  })

  if (isSuccess) {
    toast.success('banner updated')
    refetch()
  }

 } catch (error:any) {
    toast.error(error)
 }

}


const handleEdit =  async(e:any) => {
  const newData:any = {
    type:"Banner",
    title,
    subtitle:subTitle,
    show: showHero.length ? showHero : data?.layout?.banner?.show,
  }

  const formData = new FormData()
  for (const key in newData) {
    formData.append(key, newData[key])    
  } 

 try {
  const res = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}update-layout`,formData,{
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  })

  if (isSuccess) {
    toast.success('hero text`s updated')
    refetch()
  }

 } catch (error:any) {
    toast.error(error)
 }


}

  return (
    <>
      <div className='w-full h-screen flex justify-between 800px:!flex-row  flex-col '>


          <div className='flex items-center !w-[170px] ml-14 800px:mt-[200px] 800px:p-[70px] mt-32 800px:ml-0 !h-[170px] 800px:justify-end  justify-center relative  rounded-full 800px:!w-[600px] 800px:!h-[600px]'>
                    <img 
                    src={image} 
                    alt={'banner'}
                    className='object-cover rounded-full !w-full !h-full z-10'
                    />
                    <input 
                      type="file" 
                      name=''
                      id='banner'
                      accept='image/*'
                      onChange={handleUpdate}
                      className='hidden '
                    />

                <label htmlFor="banner" className='absolute 800px:top-[80%] 800px:left-[15%] left-[17%] top-[70%] z-20'>
                  <AiOutlineCamera className='dark:text-white text-black text-[25px] cursor-pointer' />  
                </label>
          </div>

            <div className='1000px:w-[60%] 800px:mt-[300px] 800px:p-[150px]  pl-5 800px:pl-0 flex flex-col items-start 1000px:mt-0 text-center 1000px:text-left mt-[50px] '>
                <textarea 
                rows={4} 
                placeholder='some text...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='dark:text-white h-[120px]  800px:h-fit  outline-none hover:border border-[#1E40AF]   resize-none text-[#000000c7] 800px:text-[30px] text-[20px] px-3 w-full 1000px:text-[600px] 1500px:text-[70px] font-[600] bg-transparent'
                />

                <br />
                
                <textarea 
                value={subTitle}
                rows={8}
                placeholder='some text...'
                className='dark:text-white h-[120px]   hover:border border-[#1E40AF] resize-none p-2  outline-none w-full text-[#000000c7] text-[18px]  font-Josefin 1500px:!w-[55%] font-[600] 1100px:!w-[74%] bg-transparent'
                onChange={(e) => setSubTitle(e.target.value)}
                />
                <br />

                <select className={`${styles.input} p-0 m-0 custom-select `} onChange={(e) => setSHowHero(e.target.value)}>
                  <option value="slider"  className='text-black'>slider</option>
                  <option value="banner" className='text-black'>banner</option>
                  <option value="notbg" className='text-black'>not bg</option>
                </select>
                <br /><br /><br />

                <button
                className={`${styles.button} 
                !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34]
                ${
                  data?.layout.banner?.title !== title ||
                  data?.layout.banner?.subtitle !== subTitle ||
                  data?.layout.banner?.image !== image
                  ? '!cursor-pointer !bg-[]#42d383'
                  : '!cursor-not-allowed'
                } rounded absolute 800px:bottom-12   bottom-3
                `}
                onClick={
                  data?.layout.banner?.title !== title ||
                  data?.layout.banner?.subtitle !== subTitle ||
                  data?.layout.banner?.image !== image
                  ? handleEdit
                  : () => null
                }
                >

                  Save
                </button>
            </div>

      </div>
    </>
  )
}

export default EditHero


/* 


               
*/