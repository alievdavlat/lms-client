import { addToLocalStorage, getFromLocalStorage } from "@/app/helpers/locolStorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token : '',
  user:'' 
}

const autSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    userRegistration: (state, action:PayloadAction<{token: string}>) => {
      state.token = action.payload.token
    },
    userLoggedIn: (state, action:PayloadAction<{token: string, user:any}>) => {
      state.token = action?.payload?.token;
      state.user = action.payload.user;
      
      
    },

    userLoggedOut: (state) => {
      state.token = '';
      state.user = '';
    },
    


  }
})


export const  { userRegistration, userLoggedIn, userLoggedOut } = autSlice.actions

export default autSlice.reducer