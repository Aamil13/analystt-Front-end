import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import { baseUrl } from '../baseUrl'


export const getUsers = createAsyncThunk(
    '/get/users',
    async(_, {rejectWithValue})=>{
        try{
        let res = await axios.get(`${baseUrl}/users`)
        return res?.data?.data
        }catch(error:any){
            return rejectWithValue(error?.response?.data?.message)
        }
    }
)


interface userState {
    loading: boolean;
    error: string | null;
    users: object[] | null;
    searchedUsers: object[] | null;
  }

const initialState = {
    loading:false, error:null,
    users: null, searchedUsers:null} as userState

const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        searchUser:(state,action)=>{
            state.searchedUsers= action.payload
        },
        resetUser: (state)=> {
            state.error = null
            state.users = null
            //state.searchedUsers = null
        }  
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state)=>{
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, action)=>{
            state.loading = false
            state.users = action.payload//under the hood it's not mutating it's using the dispatch
        })
        .addCase(getUsers.rejected, (state, action:PayloadAction<any>)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const {searchUser,resetUser} = userSlice.actions
export default userSlice.reducer