import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user", // name of the slice
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

// Export actions to use in components
export const { logIn,logOut } = userSlice.actions;

// Export reducer to add to store
export default userSlice.reducer;
