import React, { FC } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useEditPasswordMutation, useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import Image from "next/image";

type Props = {
  avatar: string;
  user: any;
};

const EditProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [loadUser, setLoadUser] = React.useState(false)
  const [editProfile , { isSuccess, error}] = useEditProfileMutation()
  const [updateAvatar , {isSuccess:success, error: isError}] = useUpdateAvatarMutation()
  const [editPassword , {isSuccess:succesPass, error:errorPass}] = useEditPasswordMutation()
  const [showUpdateBtn, setShowUpdateBtn] = React.useState(false)
  const [avatarPicture, setAvatarPicture] = React.useState({
    avatar:''
  })

  const [passValues , setPassValues ] = React.useState({
    oldPassword:'',
    newPassword:''
  })
  
  const [updateInfo, setUpdateInfo] = React.useState({
    name:''
  })
  
  const {} = useLoadUserQuery(undefined, {skip: loadUser ? false : true})


  const handleChangeAvatar = (e:any) => {
      setAvatarPicture({ ...avatarPicture, [e.target.name]: e.target.files[0]});
      setShowUpdateBtn(true)
  }

  const handleChangeInfo = (e:any) => {
    setUpdateInfo({...updateInfo, [e.target.name]: e.target.value})
  }

  const handleChangePassword = (e:any) => {
    setPassValues({...passValues, [e.target.name]: e.target.value})
  }

  React.useEffect(() => {
    if (isSuccess) {
      setLoadUser(true)
      toast.success('username successfully updated')
    }

    if (success) {
      setLoadUser(true)
      toast.success('image successfully uploaded')
    }

    if (succesPass) {
      setLoadUser(true)
      toast.success('password successfully updated')
    }

    if (error || isError  || errorPass) {
        console.log(error);
    }
    
  }, [isSuccess, error, isError, success, succesPass, errorPass])


  const imageHandler = async (e: any) => {
    e.preventDefault();
    
    try {
      
     let formdata = new FormData();
     formdata.append('avatar', avatarPicture.avatar)
    
     await updateAvatar(formdata)

    setShowUpdateBtn(false)
  } catch (err) {  
    console.log(err);
    
   }
    

  };

  const handleSumbitInfo = async (e: any) => {
    e.preventDefault();
    if (updateInfo.name == '') {
      toast.error('Please fill all the fileds ')
      return
    }

   await editProfile({
      name: updateInfo.name,
    })

    setUpdateInfo({
      name:''
    })

  
  };



  const handleSumbitPassword = async (e:any) => {
    e.preventDefault();
    
    if (passValues.newPassword == '' || passValues.newPassword == '') {
      toast.error('Please fill all the fileds ')
      return
    }

    await editPassword(passValues)

    setPassValues({
      oldPassword:'',
      newPassword:''
    })
  }


  return (
    <div className="w-full h-full bg-transparent mt-[80px] ">
      <div>
        
        <div className="w-full flex justify-center">
         
          <form className="relative" onSubmit={imageHandler}>
            <Image
              src={user?.avatar?.url || avatar || "https://i.pravatar.cc/300"}
              alt="avatar"
              width={120}
              height={120}
              title="Edit Profile Picture"
              className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
            />

            <input
              id="avatar"
              className="hidden"
              accept="image/png,image/jpg,image/jpeg,image/webp"
              type="file"
              name="avatar"
              onChange={handleChangeAvatar}
            />

            <label htmlFor="avatar">
              <div title="Edit Profile Picture"  className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                <AiOutlineCamera size={20} className='z-1' />
              </div>
            </label>
         
            {
              showUpdateBtn && <button className="rounded-xl p-1 border border-[#227870]">update</button>
            }
          </form>

        </div>

        <br />
        <br />

        <div className="w-full pl-6 800px:pl-10">
          <form data-gtm-form-interact-id="0" onSubmit={handleSumbitInfo}>
            <div className="w-full 800px:flex block pb-4">
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-white text-black">Full Name</label>
                <input
                  className=" bg-transparent border rounded dark:border-[#227870] border-[#aaa] h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-4 800px:mb-0"
                  type="text"
                  value={updateInfo.name}
                  name="name"
                  placeholder="enter your new username"
                  onChange={handleChangeInfo}
                />
              </div>

              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-white text-black">Email Address</label>
                <input
                  className="bg-transparent border text-[#aaa] dark:border-[#227870] border-[#aaa] rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-1 800px:mb-0"
                  type="text"
                  value={user?.email}
                />
              </div>
            </div>

           

            <button
              className="w-full 800px:w-[250px] h-[40px] border bg-[#227870] border-[#297670] text-center text-[#fff] rounded-[10px] mt-8 cursor-pointer"
              type="submit">
              Update
            </button>
          </form>

          <form className="mt-4 pt-4" onSubmit={handleSumbitPassword}>
            <div className="w-full 800px:flex block pb-4 gap-10" >

                  <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2 dark:text-white text-black">old password</label>
                  <input
                  className="bg-transparent border dark:border-[#227870] border-[#aaa] rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[100%] mb-4 800px:mb-0"
                  type="text"
                  value={passValues.oldPassword}
                  data-gtm-form-interact-field-id="1"
                  onChange={handleChangePassword}
                  name="oldPassword"
                  placeholder="enter old password"
                  />
                  </div>
                  
              <div className=" w-[100%] 800px:w-[50%]">
                <label className="block pb-2 dark:text-white text-black">new Password</label>
                <input
                  className="bg-transparent dark:border-[#227870] border-[#aaa] border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins !w-[95%] mb-1 800px:mb-0"
                  type="text"
                  name="newPassword"
                  value={passValues.newPassword}
                  onChange={handleChangePassword}
                  placeholder="enter new password"
                />
              </div>


            </div>

            <button
            className="w-full 800px:w-[250px] h-[40px] border bg-[#227870] border-[#297670] text-center text-[#fff] rounded-[10px] mt-8 cursor-pointer"
            type="submit">
            Update
            </button>


          </form>

          <br />
        </div>
      </div>
    </div>
  );
};

export default EditProfileInfo;
