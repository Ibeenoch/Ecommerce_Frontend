import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import * as api from "./authAPI";
import { act } from "@testing-library/react";

const authUser = JSON.parse(localStorage.getItem("user") as any);
const allUser = JSON.parse(localStorage.getItem("alluser") as any);
export interface userState {
  user: any;
  users: any;
  status: "success" | "loading" | "failed" | "idle";
}

const initialState: userState = {
  user: authUser ? authUser : {},
  users: allUser ? allUser : [],
  status: "idle",
};

export const registerUser = createAsyncThunk("/user/new", async (user: any) => {
  try {
    const res = await api.signup(user);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

export const loginUser = createAsyncThunk("/user/login", async (user: any) => {
  try {
    const res = await api.login(user);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
});

export const userVerification = createAsyncThunk(
  "/user/verify",
  async (data: any) => {
    try {
      const res = await api.verifyUser(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const emailLink = createAsyncThunk(
  "/user/emaillink",
  async (data: any) => {
    try {
      const res = await api.sendEmailLink(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const passwordChange = createAsyncThunk(
  "/user/changepassword",
  async (data: any) => {
    try {
      const res = await api.passwordReset(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAUser = createAsyncThunk(
  "/user/getAUser",
  async (data: any) => {
    try {
      const res = await api.fetchAUser(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "/user/getAllUser",
  async (token: any) => {
    try {
      const res = await api.fetchAllUser(token);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "/user/delete",
  async (data: any) => {
    try {
      const res = await api.deleteuser(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUserPagination = createAsyncThunk(
  "/user/paginate",
  async (item: any) => {
    try {
      const res = await api.fetchuserPagination(item);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const uploadUserPhoto = createAsyncThunk(
  "/user/imageUpload",
  async (data: any) => {
    try {
      const res = await api.uploadProfilePics(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(userVerification.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(userVerification.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
          console.log("verified user ", state.user);
        }
      })
      .addCase(userVerification.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(emailLink.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(emailLink.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(emailLink.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(passwordChange.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(passwordChange.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      })
      .addCase(passwordChange.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          const findAllUser = JSON.parse(
            localStorage.getItem("alluser") as any
          );
          const filterUser = findAllUser.filter(
            (it: any) => it.id !== action.payload.id
          );
          localStorage.setItem("alluser", JSON.stringify(filterUser));

          const filterStateuser = state.users.filter(
            (it: any) => it.id !== action.payload.id
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAllUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("alluser", JSON.stringify(action.payload));
          state.users = action.payload;
        }
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getUserPagination.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserPagination.fulfilled, (state, action) => {
        state.status = "success";

        if (action.payload !== undefined) {
          localStorage.setItem("alluser", JSON.stringify(action.payload));
          state.users = action.payload;
        }
      })
      .addCase(getUserPagination.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(uploadUserPhoto.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(uploadUserPhoto.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          localStorage.setItem("user", JSON.stringify(action.payload));
          state.user = action.payload;
        }
      })
      .addCase(uploadUserPhoto.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth;

export default authSlice.reducer;
