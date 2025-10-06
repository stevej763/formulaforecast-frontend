import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./store/accountSlice";
import userTeamReducer from "./store/teamSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    userTeam: userTeamReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
