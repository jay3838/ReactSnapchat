import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user:null,
    basket: [],
    selectimage:null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null
    },
    selectimage: (state, action) => {
      state.selectimage = action.payload;
    },
    resetimage: (state) => {
      state.selectimage = null;
    },
    addbasket:(state,action) =>{
      state.basket = action.payload; 
    }

  


}});

export const { login,logout,selectimage,resetimage,addbasket } = appSlice.actions;

export const selectuser = (state) => state.app.user;
export const selectSelectimage = (state) => state.app.selectimage;
export const selectbb = (state) => state.app.basket;

export default appSlice.reducer;
