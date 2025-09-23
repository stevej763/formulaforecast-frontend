import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

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
    authenticated: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{user: User}>) => {

      console.log('Setting user details in user slice:', action.payload.user);
      state.accountUid = action.payload.user.accountUid;
      state.email = action.payload.user.email;
      state.firstName = action.payload.user.firstName;
      state.lastName = action.payload.user.lastName;
      state.authenticated = true;
      return state;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
