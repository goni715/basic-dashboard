import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  CreateOwnerError: string;
  UpdateOwnerError: string;
  DeleteOwnerError: string;
};

const initialState: TInitialState = {
  CreateOwnerError: "",
  UpdateOwnerError: "",
  DeleteOwnerError: "",
};

const ownerSlice = createSlice({
  name: "owner",
  initialState,
  reducers: {
    SetCreateOwnerError: (state, action: PayloadAction<string>) => {
      state.CreateOwnerError = action.payload;
    },
    SetUpdateOwnerError: (state, action: PayloadAction<string>) => {
      state.UpdateOwnerError = action.payload;
    },
    SetDeleteOwnerError: (state, action: PayloadAction<string>) => {
      state.DeleteOwnerError = action.payload;
    },
  },
});

export const {
  SetCreateOwnerError,
  SetUpdateOwnerError,
  SetDeleteOwnerError,
} = ownerSlice.actions;

const ownerSliceReducer = ownerSlice.reducer;
export default ownerSliceReducer;
