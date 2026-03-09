import { createSlice } from "@reduxjs/toolkit";


export const userClice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        
        }
    }
})

export const {setUser} = userClice.actions
export default userClice.reducer