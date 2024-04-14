import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store'; 
import * as api from './authAPI'
import { act } from '@testing-library/react';

export interface userState {
  user: any;
  users: any;
  status: 'success' | 'loading' | 'failed' | 'idle';
}

const initialState: userState = {
  user: {},
  users: [],
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

export const loginUser = createAsyncThunk('/user/login', async(user: any) => {
  try {

    const res =  await api.login(user);
    return res?.data
  } catch (error) {
    console.log(error)
  }
})

export const userVerification = createAsyncThunk('/user/verify', async(data: any) => {
  try {

    const res =  await api.verifyUser(data);
    return res?.data
  } catch (error) {
    console.log(error)
  }
})

export const emailLink = createAsyncThunk('/user/emaillink', async(data: any) => {
  try {
    const res =  await api.sendEmailLink(data);
    return res?.data
  } catch (error) {
    console.log(error)
  }
})

export const passwordChange = createAsyncThunk('/user/changepassword', async(data: any) => {
  try {
    const res =  await api.passwordReset(data);
    return res?.data
  } catch (error) {
    console.log(error)
  }
})

export const getAUser = createAsyncThunk('/user/getAUser', async(data: any) => {
  try {

    const res =  await api.fetchAUser(data);
    return res?.data
  } catch (error) {
    console.log(error)
  }
})

export const getAllUser = createAsyncThunk('/user/getAllUser', async() => {
  try {

    const res =  await api.fetchAllUser();
    return res?.data
  } catch (error) {
    console.log(error)
  }
})

export const uploadUserPhoto = createAsyncThunk('/user/imageUpload', async(data: any) => {
  try {

    const res =  await api.uploadProfilePics(data);
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
    .addCase(loginUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'success'
      state.user = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(userVerification.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(userVerification.fulfilled, (state, action) => {
      state.status = 'success'
      console.log('verified user data: ', action.payload)
    })
    .addCase(userVerification.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(emailLink.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(emailLink.fulfilled, (state, action) => {
      state.status = 'success'
      console.log('email link data: ', action.payload)
    })
    .addCase(emailLink.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(passwordChange.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(passwordChange.fulfilled, (state, action) => {
      state.status = 'success'
      console.log('changed user password: ', action.payload)
    })
    .addCase(passwordChange.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(getAUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(getAUser.fulfilled, (state, action) => {
      state.status = 'success'
      console.log('get a user: ', action.payload)
      state.user = action.payload
    })
    .addCase(getAUser.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(getAllUser.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(getAllUser.fulfilled, (state, action) => {
      state.status = 'success'
      console.log('all user password: ', action.payload)
      state.users = action.payload
    })
    .addCase(getAllUser.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(uploadUserPhoto.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(uploadUserPhoto.fulfilled, (state, action) => {
      state.status = 'success'
      console.log('all user photo: ', action.payload)
      state.users = action.payload
    })
    .addCase(uploadUserPhoto.rejected, (state, action) => {
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
