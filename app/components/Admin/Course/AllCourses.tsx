import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box , Button, Modal} from '@mui/material';
import { AiOutlineDelete, } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi'
import { useTheme } from 'next-themes';
import { useGetAlCoursesQuery } from '@/redux/features/courses/coursesApi';
import { format } from 'timeago.js';
import CourseLoader from '../../ui/courseLoader';
import { styles } from '@/app/styles/style';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';


type Props = {}

const AllCourses = (props: Props) => {
    const { theme , setTheme } = useTheme()
    const [open ,setOpen] = React.useState(false)
    const [courseId, setCourseId] = React.useState('')
    const {isLoading, data, error, refetch} = useGetAlCoursesQuery({}, {refetchOnMountOrArgChange:true})
    

    const columns = [
      {field:'id', headerName:'ID', flex:0.3},
      {field:'title', headerName:'Course Title', flex:1},
      {field:'ratings', headerName:'Ratings', flex:.5},
      {field:'purchased', headerName:'Purchased', flex:.5},
      {field:'created_at', headerName:'Created at', flex:0.5},
      {field:'updated_at', headerName:'Updated at', flex:0.5},
      {
        field:'  ',
        headerName:'Edit',
        flex:0.2,
        renderCell:(params:any) => {
          return (
            <>
              <Link
                href={`/admin/edit-course/${params.row.id}`}
              >
                <FiEdit2
                className="dark:text-white text-black"
                size={20}
                />
              </Link>
            </>
          )
        }
      },
      {
        field:' ',
        headerName:'Delete',
        flex:0.2,
        renderCell:(params:any) => {
          return (
            <>
              <Button
              onClick={() => {
                setOpen(true)
                setCourseId(params.row.id)
              }}
              >
                <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
                />
              </Button>
            </>
          )
        }
      },
    ]

    const rows:any = []

    

    {
      data && data?.courses?.forEach((item:any) => {
          rows.push({
            id: item?._id,
            title:item?.name,
            ratings:item?.ratings,
            purchased:item?.purchased,
            created_at: format(item?.createdAt) || 'unknown',
            updated_at: format(item?.updatedAt) || 'unknown'
          })
      });
    }

    const handleDelete = async() => {
        const id = courseId;

        const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}delete-course/${id}`, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        })



        if (res.status === 200) {
          toast.success('Course successfully deleted')

        }
        setOpen(false)
        refetch()
    }

  return (
    <div className='mt-[120px]'>
        {
          isLoading ? <CourseLoader/> :
          <Box m={20}>
          <Box
          m={'40px 0 0 0'}
          height={'80vh'}
          sx={{
            "& .MuiDataGrid-root": {
              border:'none',
              outline:'none'
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon":{
              color:theme === 'dark'? '#fff': '#000'
            },
            "& .MuiDataGrid-sortIcon":{
              color:theme === 'dark'? '#fff': '#000'
            },
            "& .MuiDataGrid-row":{
              color:theme === 'dark'? '#fff': '#000',
              borderBottom:
                theme === 'dark' 
                ? '1px solid #ffffff30 !important'
                : '1px solid #ccc !important'
            },
            "& .MuiTablePagination-root":{
              color:theme === 'dark'? '#fff': '#000',
            },
            "& .MuiDataGrid-cell":{
              borderBottom:'none'
            },
            "& .name-column--cell":{
              color:theme === 'dark'? '#fff': '#000',
            },
            "& .MuiDataGrid-columnHeaders":{
              color:theme === 'dark'? '#fff': '#000',
              borderTop:"none",
              backgroundColor:theme == 'dark' ? '#3e4396 !important' : '#A4A9FC !important'
            },
            "& .MuiDataGrid-virtualScroller":{
              backgroundColor:theme =='dark' ? '#1F2A40 ' : '#F2F0F0'
            },
            "& .MuiDataGrid-footerContainer":{
              color:theme === 'dark'? '#fff': '#000',
              borderTop:"none",
              backgroundColor:theme == 'dark' ? '#3e4386 !important' : '#A4A9FC !important'
            },
            "& .MuiCheckbox-root":{
              color:
                theme === 'dark'
                  ? '#b7ebde !important'
                  : '#000 !important'
            },
            "& .MuiaDataGrid-toolbarContainer .MuiButton-text":{
              color:'#fff !important'
            }
          }}
          >
              <DataGrid
              checkboxSelection 
              rows={rows}
              columns={columns}
              
              />

          </Box>
          {
            open && (
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-decription"
              > 
                <Box
                className="absolute top-[50%] left-[50%] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-slate-800 py-5 rounded-xl"
                >
                  <h1 className={styles.title}>
                    Are you sure want to delete course?
                  </h1>
                  
                  <div className='flex w-full items-center p-4 justify-between mb-6 mt-6'>
                    <button
                    className={`${styles.button} w=[120px] h-[40px] bg-green-500`}
                    onClick={() => setOpen(!open)}
                    > 
                      Cancel
                    </button>
                    <button
                    className={`${styles.button} w=[120px] h-[40px] bg-red-500`}
                    onClick={handleDelete}
                    > 
                      Delete
                    </button>
                  </div>
                </Box>

              </Modal>
            )
          }
        </Box>
        }
    </div>
  )
}

export default AllCourses