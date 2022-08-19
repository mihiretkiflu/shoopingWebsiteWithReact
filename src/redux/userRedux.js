import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    users: [],
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //REGISTER USER
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      // state.users.push(action.payload);
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //FOLLOW
    followStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    followSuccess: (state, action) => {
    },
    followFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UNFOLLOW
    unfollowStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    unfollowSuccess: (state, action) => {
      // state.isFetching = false;
      // state.users.splice(
      //   state.users.findIndex((item) => item._id === action.payload),
      //   1
      // );
    },
    unfollowFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      console.log(state.users, "jdfks")
      state.currentUser = action.payload;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  followStart,
  followSuccess,
  followFailure,
  unfollowStart,
  unfollowSuccess,
  unfollowFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure, } = userSlice.actions;
export default userSlice.reducer;
