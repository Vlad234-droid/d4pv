import { configureStore } from '@reduxjs/toolkit';
// import counter from '../features/counter/counterSlice';
import notes from '../core/notes/notesSlice';
import requirements from '../core/requirements/requirementsSlice';

export const store = configureStore({
  reducer: {
    notes,
    requirements,
  },
  devTools: true,
});

// store.subscribe(() => {
//   console.log(store.getState());
// });
