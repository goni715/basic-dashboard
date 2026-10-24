import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  CreateHospitalError: string;
  UpdateHospitalError: string;
  DeleteHospitalError: string;
};

const initialState: TInitialState = {
  CreateHospitalError: "",
  UpdateHospitalError: "",
  DeleteHospitalError: "",
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    SetCreateHospitalError: (state, action: PayloadAction<string>) => {
      state.CreateHospitalError = action.payload;
    },
    SetUpdateHospitalError: (state, action: PayloadAction<string>) => {
      state.UpdateHospitalError = action.payload;
    },
    SetDeleteHospitalError: (state, action: PayloadAction<string>) => {
      state.DeleteHospitalError = action.payload;
    },
  },
});

export const {
  SetCreateHospitalError,
  SetUpdateHospitalError,
  SetDeleteHospitalError,
} = hospitalSlice.actions;

const hospitalSliceReducer = hospitalSlice.reducer;
export default hospitalSliceReducer;
