import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sitePlan: [
    {
      text: 'loremlorem loremlooremlorem loremlorem loremlorem',
      reference: 'angle.con',
      key: 1,
      visibleNote: false,
    },
  ],
  solarPlan: [
    {
      text: 'loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem',
      reference: 'angle.con',
      key: 1,
      visibleNote: false,
    },
    {
      text: 'merol merol mermerol merol merol merol merol merol ',
      reference: 'googl.com',
      key: 2,
      visibleNote: false,
    },
  ],
  diagram: [
    {
      text: 'merol merol merol merol merol merol merol merol merol ',
      reference: 'googl.com',
      key: 2,
      visibleNote: false,
    },
  ],
  assembly: [
    {
      text: 'merol merol meroerol merol merol merol merol merol merol ',
      reference: 'googl.com',
      key: 2,
      visibleNote: false,
    },
  ],
};

export const requirementsSlice = createSlice({
  name: 'requirements',
  initialState,
  reducers: {
    deleteRequirement: (state, { payload }) => {
      state[payload.note] = state[payload.note].filter((item) => item.key !== payload.key);
    },
    changeRequirementVisibility: (state, { payload }) => {
      state[payload.note][state[payload.note].findIndex((item) => item.key === payload.key)].visibleNote = !state[
        payload.note
      ][state[payload.note].findIndex((item) => item.key === payload.key)].visibleNote;
    },
    changeTextRequirement: (state, { payload }) => {
      const { key, text, note } = payload;
      state[note][state[note].findIndex((item) => item.key === key)].text = text;
    },
    changeReferenceRequirement: (state, { payload }) => {
      const { key, text, note } = payload;
      state[note][state[note].findIndex((item) => item.key === key)].reference = text;
    },
    changeRequestedRequirement: (state, { payload }) => {
      const { key, text, note } = payload;
      state[note][state[note].findIndex((item) => item.key === key)].requested = text;
    },
  },
});
export const {
  deleteRequirement,
  changeRequirementVisibility,
  changeTextRequirement,
  changeReferenceRequirement,
  changeRequestedRequirement,
} = requirementsSlice.actions;

export const actions = { ...requirementsSlice.actions };

export default requirementsSlice.reducer;
