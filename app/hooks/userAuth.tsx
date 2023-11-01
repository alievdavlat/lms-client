import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";



function UserAuth(){
// const {user} = useSelector((state:any) => state.auth)


const {data} = useLoadUserQuery(undefined,{})
if (data?.user) {
  return true
} else {
  return false
}

}

export default UserAuth