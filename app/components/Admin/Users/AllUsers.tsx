import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useGetAlCoursesQuery } from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import CourseLoader from "../../ui/courseLoader";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import axios from "axios";
import toast from "react-hot-toast";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  isTeam: boolean;
};

const AllUssrs: React.FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [userRole, setUserRole] = React.useState('')

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [users, setUsers] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUsers(event.target.value);
  };
  const handleChangeRole = (e:SelectChangeEvent) => {
      setUserRole(e.target.value)
  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: .5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.2 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.3 },
    { field: "created_at", headerName: "Created at", flex: 0.3 },
    { field: "updated_at", headerName: "Updated at", flex: 0.3 },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.1,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => setActive(true)}>
              <FiEdit2 className="dark:text-white text-black" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.1,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
                onClick={() => {
                  setOpen(true);
                  setUserId(params.row.id);
                }}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "   ",
      headerName: "Email",
      flex: 0.1,
      renderCell: (params: any) => {
        return (
          <>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData = data?.users?.filter((item: any) => item.role === "admin");

    data &&
      newData?.forEach((item: any) => {
        rows.push({
          id: item?._id,
          name: item?.name,
          email: item?.email,
          role: item?.role,
          courses: item?.courses.length,
          created_at: format(item?.createdAt) || "unknown",
          updated_at: format(item?.updatedAt) || "unknown",
        });
      });
  } else {
    data &&
      data?.users?.forEach((item?: any) => {
        rows.push({
          id: item?._id,
          name: item?.name,
          email: item?.email,
          role: item?.role,
          courses: item?.courses.length,
          created_at: format(item?.createdAt) || "unknown",
          updated_at: format(item?.updatedAt) || "unknown",
        });
      });
  }

  const handleDelete = async () => {
    const id = userId;

    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}delete-user/${id}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status === 200) {
      toast.success("users successfully deleted");
    }

    setOpen(false);
    refetch();
  };

  const handlEditRoleUser = async () => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}updateuser-role`,
        {
          id: users,
          role: userRole,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
        
      if (res?.data.status === 200) {
        toast.success(res.data.msg || 'user successfully upated' )
        refetch();
      }

      refetch();
    } catch (error:any) {
      console.error('Error:', error);
      toast.error(error)
    }

    setUserRole('')
    setUsers('')
    setActive(false)

    
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <CourseLoader />
      ) : (
        <Box m={"20px"} className="max-400px:m-0">
          <div className="flex justify-end w-full">
            <button
              className={`${styles.button} !w-[250px] dark:bg-transparent dark:border dark:border-[#ffffff6c]`}
              onClick={() => setActive(!active)}>
              Add new Member
            </button>
          </div>
          <Box
            m={"40px 0 0 0"}
            height={"80vh"}
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
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-decription">
              <Box className="absolute top-[50%] left-[50%] w-[500px] -translate-x-1/2 -translate-y-1/2 bg-slate-800 py-5 rounded-xl">
                <h1 className={styles.title}>
                  Are you sure want to delete user?
                </h1>

                <div className="flex w-full items-center p-5 justify-between mb-6 mt-6">
                  <button
                    className={`${styles.button} w=[120px] h-[40px] bg-green-500`}
                    onClick={() => setOpen(!open)}>
                    Cancel
                  </button>
                  <button
                    className={`${styles.button} w=[120px] h-[40px] bg-red-500`}
                    onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </Box>
            </Modal>
          )}

          {active && (
            <Modal
              open={active}
              onClose={() => setActive(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-decription">
              <Box className="absolute top-[50%] left-[50%] w-[500px] -translate-x-1/2 -translate-y-1/2 dark:bg-slate-800  bg-white   py-5 rounded-xl flex 800px:flex-col gap-5 item-center justify-center">
               
                <FormControl sx={{ m: 1, width:'95%'}} >
                  <InputLabel id="demo-simple-select-helper-label" sx={{
                    color:theme === 'dark' ? '#fff' : '#000'
                  }}>
                    Users
                  </InputLabel>

                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={users}
                    label="Users"
                    sx={{ border: theme === 'dark' ? '1px solid white' : '1px solid black',  color:theme === 'dark' ? '#fff' : '#000' }}
                    onChange={handleChange}>
                    {
                      data?.users?.map((item:any, index:number) => (
                        <MenuItem key={index} sx={{background:theme === 'dark' ? '#fff' : '#00000'}} value={item?._id}>{item?.name}  <br /> {item?.email}</MenuItem>
                      ))
                    }
                  </Select>
``
                </FormControl>

                <FormControl sx={{ m: 1, width:'95%'}} >

                  <InputLabel id="demo-simple-select-helper-label" sx={{
                    color:theme === 'dark' ? '#fff' : '#000'
                  }}>
                    Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={userRole}
                    label="Users"
                    sx={{ border: theme === 'dark' ? '1px solid white' : '1px solid black',  color:theme === 'dark' ? '#fff' : '#000' }}
                    onChange={handleChangeRole}>

                   <MenuItem value={'user'}>User</MenuItem>
                   <MenuItem value={'admin'} >Admin</MenuItem>
                  </Select>

                </FormControl>
                  
                  <button className={`${styles.button} w-[130px] h-[45px] ml-3 rounded-md bg-blue-900`} onClick={handlEditRoleUser}>
                    send
                  </button>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUssrs;
