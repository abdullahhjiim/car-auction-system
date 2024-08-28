import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  play: true,
};

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playStart: (state) => {
      state.play = true;
    },
    playEnd(state) {
      state.play = false;
    },
  },
});

export const { playStart, playEnd } = audioSlice.actions;

export default audioSlice.reducer;
