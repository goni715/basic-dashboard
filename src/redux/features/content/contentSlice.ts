import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  CreateUpdateContentError: string;
};

const initialState: TInitialState = {
  CreateUpdateContentError: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    SetCreateUpdateContentError: (state, action: PayloadAction<string>) => {
      state.CreateUpdateContentError = action.payload;
    },
    ClearContentErrors: (state) => {
      state.CreateUpdateContentError = "";
    },
  },
});

export const { SetCreateUpdateContentError, ClearContentErrors } =
  contentSlice.actions;

const contentSliceReducer = contentSlice.reducer;
export default contentSliceReducer;
