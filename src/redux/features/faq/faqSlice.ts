import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  CreateFaqError: string;
  UpdateFaqError: string;
  DeleteFaqError: string;
};

const initialState: TInitialState = {
  CreateFaqError: "",
  UpdateFaqError: "",
  DeleteFaqError: "",
};

const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    SetCreateFaqError: (state, action: PayloadAction<string>) => {
      state.CreateFaqError = action.payload;
    },
    SetUpdateFaqError: (state, action: PayloadAction<string>) => {
      state.UpdateFaqError = action.payload;
    },
    SetDeleteFaqError: (state, action: PayloadAction<string>) => {
      state.DeleteFaqError = action.payload;
    },
  },
});

export const {
  SetCreateFaqError,
  SetUpdateFaqError,
  SetDeleteFaqError,
} = faqSlice.actions;

const faqSliceReducer = faqSlice.reducer;
export default faqSliceReducer;
