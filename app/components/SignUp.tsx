import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../styles/style'
import { useRegisterMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'

type Props = {
  setRoute:(route: string) => void;

};

const schema = Yup.object().shape({
  name:Yup.string().required('Please enter your name'),
  email:Yup.string().email('Invalid Email').required('Please enter your email'),
  password:Yup.string().required('Please enter your password').min(6)
})


const SignUp:React.FC<Props> = ({setRoute}) => {

  const [show , setSHow] = React.useState(false)

  const [ register , { isError, isLoading, data, isSuccess, error}] = useRegisterMutation()


  React.useEffect(() => {
    if (isSuccess) {
      const message  = data?.message || 'Registration successful'
      toast.success(message)
      setRoute('Verification')
    }

    if (error) {
      if ("data" in  error) {
          const errData = error as any 
          toast.error(errData.data.message)
      }
    }

  }, [isSuccess, error])
  

  const formik = useFormik({
    initialValues:{name: '', email:'', password:''},
    validationSchema: schema,
    onSubmit: async ({name, email, password}) => {
      const data = {
        name , email, password
      }
      await register(data)
    }
  });

  const { errors, touched, values , handleChange, handleSubmit} = formik



  return (
    <div className='w-full p-3'>
      <h1 className={`${styles.title}`}>Join Openhemier Learning Platform</h1>

      <form onSubmit={handleSubmit}>
        <div className='mb-5'>
        <label
         htmlFor="name"
         className={`${styles.label}`}
         >
            Enter your Name
        </label>

        <input 
        type="text" 
        name=''
        value={values.name}
        onChange={handleChange}
        id='name'
        placeholder='johndoe'
        className={`
          ${
            errors.name && touched.name && 'text-red-500'
          }
          ${styles.input}
        `}
        />

        {
          errors.name && touched.name && (
            <span className='text-red-500 pt-2 block'>{errors.name}</span>
          )
        }
        </div>
         
         <label
         htmlFor="email"
         className={`${styles.label}`}
         >
            Enter your Email
        </label>

        <input 
         type="email" 
        name=''
        value={values.email}
        onChange={handleChange}
        id='email'
        placeholder='loginmail@gmail.com'
        className={`
          ${
            errors.email && touched.email && 'text-red-500'
          }
          ${styles.input}
        `}
        />

        {
          errors.email && touched.email && (
            <span className='text-red-500 pt-2 block'>{errors.email}</span>
          )
        }

        <div className='w-full mt-5 relative mb-1'>
        <label
         htmlFor="password"
         className={`${styles.label}`}
         >
            Enter your Password
        </label>

        <input
         type={!show ? 'password' : 'text'}
         name='password'
         value={values.password}
         onChange={handleChange}
         id='password'
         placeholder='Enter your password'
         className={`${errors.password && touched.password && 'border-red-500'} ${styles.input}`} 
         />
         {!show ? (
          <AiOutlineEyeInvisible
          className="absolute bottom-3 right-3 z-1 cursor-pointer"
          size={20}
          onClick={() => setSHow(true)}
          />
         ): (
          <AiOutlineEye
          className="absolute bottom-3 right-3 z-1 cursor-pointer"
          size={20}
          onClick={() => setSHow(false)}
          />
         )}
         
        </div>
        {
          errors.password  && touched.password && (
            <span className='text-red-500 pt-2 block'>{errors.password}</span>
          )
         }

          <br />
         
         <div className='w-full mt-5'>
          <input 
          type="submit"
          value={'Sign Up'}
          className={`${styles.button}`}
          />
         </div>
          
           <br />

         <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
          Or join with
         </h5>

          <div className="flex items-center justify-center my-3">
            <FcGoogle  size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursor-pointer ml-2" />
          </div>
            
          <h5 className='text-center pt-4 font-Poppins text-[14px]'>
              Already have account ?  {'  '} 

              <span 
              className='text-[#2190ff] pl-1 cursor-pointer'
              onClick={() => setRoute('Login')}
              > 
                Sign In  
              </span>
          </h5>
            
            <br />
      </form>

    </div>
  )
}

export default SignUp