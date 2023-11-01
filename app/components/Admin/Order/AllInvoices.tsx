import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { useTheme } from 'next-themes'
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi'
import CourseLoader from '../../ui/courseLoader'
import { AiOutlineMail } from 'react-icons/ai'
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { useGetAlCoursesQuery } from '@/redux/features/courses/coursesApi'
import { format } from 'timeago.js'


type Props = {
  isDashboard?:boolean
}

const AllInvoices:React.FC<Props> = ({isDashboard}) => {

  const { theme , setTheme } = useTheme()
  const {isLoading, data} = useGetAllOrdersQuery({})
  const {data:userData} = useGetAllUsersQuery({})
  const {data:courseData} = useGetAlCoursesQuery({})

  const [orderData , setOrderData] = React.useState<any>([])


  React.useEffect(() => {

      if (data) {
          const temp = data.orders.map((item:any) => {

            const user = userData?.users?.find((user:any) => user?._id === item?.userId)
            const course = courseData?.courses?.find((course:any) => course?._id === item?.courseId)

            return  {
              ...item, 
              name:user?.name, 
              email:user?.email,
              title:course?.name,
              price: '$' + course?.price,
              created_at:item.createdAt,
            }
          })
          setOrderData(temp)
        
        }

  } , [data, courseData, userData])


  const columns:any = [
    {field:'id', headerName:'ID', flex:0.3},
    {field:'name', headerName:'Name', flex:isDashboard ? .6 : .5},
    {field:'id', headerName:'ID', flex:0.3},
    ...( isDashboard
        ? []
        : [
          {field:'email', headerName:'Email', flex:1},
          {field:'title', headerName:'Course Title', flex:1},
        ]),

        {field:'price', headerName:'Price', flex:0.5},

        ...( isDashboard
          ? [
            {field:'created_at', headerName:'Created At', flex:0.5}
          ]
          : [
            {
              field:' ', 
              headerName:'Email', 
              flex:0.2,
              renderCell:(params:any) => {
                return (
                  <a href={`mailto:${params.row.email}`}>
                    <AiOutlineMail
                      className='dark:text-white text-black'
                      size={20}
                    />
                  </a>
                )
              }
            },
          ]),
  ]




  const rows:any = []
    orderData && 
    orderData?.forEach((item:any) => {
      
          rows.push({
            id:item._id,
            name:item.name,
            email:item.email,
            title:item.title,
            price:item.price,
            created_at:format(item.createdAt)
          })
    });



  return (
    <div className={isDashboard ? 'mt-[20px]' : 'mt-0'}>
        {
          isLoading ? (
            <CourseLoader/>
          ) : (
            <Box m={isDashboard ? '0' : '40px'}>
                <Box
                m={isDashboard ? '0' : '40px 0 0 0'}
                height={isDashboard ? '35vh' : '90vh'}
                overflow={'hidden'}
              
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                    outline: "none",
                  },
                  "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-sortIcon": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-row": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderBottom:
                      theme === "dark"
                        ? "1px solid #ffffff30 !important"
                        : "1px solid #ccc !important",
                  },
                  "& .MuiTablePagination-root": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                  },
                  "& .name-column--cell": {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderTop: "none",
                    backgroundColor:
                      theme == "dark" ? "#3e4396 !important" : "#A4A9FC !important",
                  },
                  "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: theme == "dark" ? "#1F2A40 " : "#F2F0F0",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    color: theme === "dark" ? "#fff" : "#000",
                    borderTop: "none",
                    backgroundColor:
                      theme == "dark" ? "#3e4386 !important" : "#A4A9FC !important",
                  },
                  "& .MuiCheckbox-root": {
                    color:
                      theme === "dark" ? "#b7ebde !important" : "#000 !important",
                  },
                  "& .MuiaDataGrid-toolbarContainer .MuiButton-text": {
                    color: "#fff !important",
                  },
                }}
                >
                  <DataGrid
                    checkboxSelection={isDashboard ? false : true}
                    rows={rows}
                    columns={columns}
                    components={isDashboard ? {} : {Toolbar: GridToolbar}}
                  />
                </Box>
            </Box>
          )
        }
    </div>
  )
}

export default AllInvoices