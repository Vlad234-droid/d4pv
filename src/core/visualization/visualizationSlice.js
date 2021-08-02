import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isBlur: false,
};

const visualizationSlice = createSlice({
  name: 'visualization',
  initialState,
  reducers: {
    blurModal(state, { payload }) {
      state.isBlur = payload;
    },
  },
});

const { blurModal } = visualizationSlice.actions;

export const actions = {
  ...visualizationSlice.actions,
};

export default visualizationSlice.reducer;
