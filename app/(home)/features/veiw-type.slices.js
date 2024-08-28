import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: true,
};

export const viewSlice = createSlice({
  name: "view-type",
  initialState,
  reducers: {
    veiwType: (state, actions) => {
      state.type = actions.payload;
    },
  },
});

export const { veiwType } = viewSlice.actions;

export default viewSlice.reducer;
