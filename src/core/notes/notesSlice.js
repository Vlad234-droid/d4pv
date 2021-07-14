import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sitePlan: [
    {
      text:
        'loremlorem loremlorem loremloremloremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem',
      reference: 'angle.con',
      requested: 'Vlad',
      key: 1,
      visibleNote: false,
    },
    {
      text: 'merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol ',
      reference: 'googl.com',
      requested: 'Dima',
      key: 2,
      visibleNote: false,
    },
    {
      text:
        'Dfwe.few.few  ewklfnwlkfnwlef felfnlwefn f3lfnwelfgfew fwfnwjfnwlf  fwejfnwjf wfjkwebfw flwebnf,mwe fkljw fkwebf ',
      reference: 'ljebwfl.com',
      requested: 'Alena',
      key: 3,
      visibleNote: false,
    },
  ],
  solarPlan: [
    {
      text:
        'loremlorem loremlorem loremloremloremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem',
      reference: 'angle.con',
      requested: 'Vlad',
      key: 1,
      visibleNote: false,
    },
    {
      text: 'merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol ',
      reference: 'googl.com',
      requested: 'Dima',
      key: 2,
      visibleNote: false,
    },
  ],
  diagram: [
    {
      text: 'merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol ',
      reference: 'googl.com',
      requested: 'Dima',
      key: 2,
      visibleNote: false,
    },
  ],
  assembly: [
    {
      text: 'merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol merol ',
      reference: 'googl.com',
      requested: 'Dima',
      key: 1,
      visibleNote: false,
    },
  ],
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    deleteNote: (state, { payload }) => {
      state[payload.note] = state[payload.note].filter((item) => item.key !== payload.key);
    },
    changeNoteVisibility: (state, { payload }) => {
      state[payload.note][state[payload.note].findIndex((item) => item.key === payload.key)].visibleNote = !state[
        payload.note
      ][state[payload.note].findIndex((item) => item.key === payload.key)].visibleNote;
    },
    changeTextNote: (state, { payload }) => {
      const { key, text, note } = payload;
      state[note][state[note].findIndex((item) => item.key === key)].text = text;
    },
    changeReferenceNote: (state, { payload }) => {
      const { key, text, note } = payload;
      state[note][state[note].findIndex((item) => item.key === key)].reference = text;
    },
    changeRequestedNote: (state, { payload }) => {
      const { key, text, note } = payload;
      state[note][state[note].findIndex((item) => item.key === key)].requested = text;
    },
    addNote: (state, { payload }) => {
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
  deleteNote,
  changeNoteVisibility,
  changeTextNote,
  changeReferenceNote,
  changeRequestedNote,
  addNote,
} = notesSlice.actions;

export const actions = { ...notesSlice.actions };

export default notesSlice.reducer;
