import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sitePlan: [
    {
      text: 'loremlorem loremlooremlorem loremlorem loremlorem',
      reference: 'angle.con',
      key: 1,
      visibleNote: false,
      requested: 'Vlad',
    },
  ],
  solarPlan: [
    {
      text: 'loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem',
      reference: 'angle.con',
      key: 1,
      visibleNote: false,
      requested: 'Vlad',
    },
    {
      text: 'merol merol mermerol merol merol merol merol merol ',
      reference: 'googl.com',
      key: 2,
      visibleNote: false,
      requested: 'Vlad',
    },
  ],
  diagram: [
    {
      text: 'merol merol merol merol merol merol merol merol merol ',
      reference: 'googl.com',
      key: 1,
      visibleNote: false,
      requested: 'Vlad',
    },
  ],
  assembly: [
    {
      text: 'merol merol meroerol merol merol merol merol merol merol ',
      reference: 'googl.com',
      key: 1,
      visibleNote: false,
      requested: 'Vlad',
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
    addRequirement: (state, { payload }) => {
      const { keyTab, text, reference, requested } = payload;
      let arrKeys = Object.keys(state);
      const index = arrKeys.findIndex((_, i) => i == keyTab);
      state[arrKeys[index]] = [
        ...state[arrKeys[index]],
        {
          text,
          reference,
          requested,
          key: state[arrKeys[index]].length + 1,
          visibleNote: false,
        },
      ];
    },
  },
});
export const {
  deleteRequirement,
  changeRequirementVisibility,
  changeTextRequirement,
  changeReferenceRequirement,
  changeRequestedRequirement,
  addRequirement,
} = requirementsSlice.actions;

export const actions = { ...requirementsSlice.actions };

export default requirementsSlice.reducer;
