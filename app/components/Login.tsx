import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { styles } from '../styles/style'
import { useLoginMutation } from '@/redux/features/auth/authApi'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'


type Props = {
  setRoute:(route: string) => void;
  setOpen: (open: boolean) => void;
  refetch:any
};

const schema = Yup.object().shape({
  email:Yup.string().email('Invalid Email').required('Please enter your email'),
  password:Yup.string().required('Please enter your password').min(6)
})


const Login:React.FC<Props> = ({setRoute, setOpen, refetch}) => {

  const [show , setSHow] = React.useState(false)
  const [ login , { isSuccess,  error, data }] = useLoginMutation()


  const formik = useFormik({
    initialValues:{ email:'', password:''},
    validationSchema: schema,
    onSubmit: async ({email, password}) => {
      const loginData = {email, password}
      
      await login(loginData)
    }
  });

  
React.useEffect(() => {
  if (isSuccess && data) {
    toast.success('Login Successfully!')
    refetch()
    setOpen(false)
  } 
  

  if (error) {
    if ("data" in  error) {
        const errData = error as any 
        toast.error(errData.data.message)
    }
  }
}, [isSuccess, error])



  const { errors, touched, values , handleChange, handleSubmit} = formik



  return (
    <div className='w-full p-3'>
      <h1 className={`${styles.title}`}>Login with Openhemier Learning Platform</h1>

      <form onSubmit={handleSubmit}>
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
          value={'Login'}
          className={`${styles.button}`}
          />
         </div>
          
           <br />

          <h5 className='text-center pt-4 font-Poppins text-[14px] text-black dark:text-white'>
          Or join with
          </h5>

          <div className="flex items-center justify-center my-3">
          <FcGoogle
            size={30}
            className="cursor-pointer mr-2"
            onClick={() => signIn("google")}
           />
          <AiFillGithub 
          size={30} 
          className="cursor-pointer ml-2" 
          onClick={() => signIn("github")}
          />
          </div>

          <h5 className='text-center pt-4 font-Poppins text-[14px]'>
            Not have any account  {'  '} 

            <span 
            className='text-[#2190ff] pl-1 cursor-pointer'
            onClick={() => setRoute('Sign-Up')}
            > 
              Sign Up
            </span>
          </h5>

            <br />
      </form>
    </div>
  )
}

export default Login