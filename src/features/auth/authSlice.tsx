import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'; 
import * as api from './authAPI'

export interface userState {
  user: any;
  status: 'success' | 'loading' | 'failed' | 'idle';
}

const initialState: userState = {
  user: [],
  status: 'idle',
};

export const registerUser = createAsyncThunk('/user/new', async(user: any) => {
  try {

    const res =  await api.signup(user);
    return res?.data
  } catch (error) {
    console.log(error)
  }
})



export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
       
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers(builder) {
    builder
    .addCase(registerUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed'
    })
  }
  
});

export const {  } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.auth;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default authSlice.reducer;
