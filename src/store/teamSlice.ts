import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { UserTeam } from "../api/userTeamApiClient";

const initialState: UserTeam = {
    teamUid: "",
    teamName: "",
    teamColour: "",
    accountUid: "",
};

const userTeamSlice = createSlice({
  name: "userTeam",
  initialState,
  reducers: {
    setUserTeam: (state, action: PayloadAction<{ userTeam: UserTeam }>) => {
      state.teamUid = action.payload.userTeam.teamUid;
      state.teamName = action.payload.userTeam.teamName;
      state.teamColour = action.payload.userTeam.teamColour;
      state.accountUid = action.payload.userTeam.accountUid;
      return state;
    },
    clearUserTeam: () => initialState,
  }
});

export const useUserTeam = () => useSelector((state: RootState) => state.userTeam);
export const { setUserTeam, clearUserTeam } = userTeamSlice.actions;
export default userTeamSlice.reducer;
