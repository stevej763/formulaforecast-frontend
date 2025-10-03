import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export interface User {
  accountUid: string;
  email: string;
  firstName: string;
  lastName: string;
  authenticated: boolean;
}

const initialState: User = {
  accountUid: "",
  email: "",
  firstName: "",
  lastName: "",
  authenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.accountUid = action.payload.user.accountUid;
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.authenticated = action.payload.user.authenticated;
      return state;
    },
    clearUser: () => initialState,
  },
});
export const useUser = () => useSelector((state: RootState) => state.user);
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
