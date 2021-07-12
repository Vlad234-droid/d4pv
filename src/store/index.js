import { configureStore } from '@reduxjs/toolkit';
// import counter from '../features/counter/counterSlice';
import notes from '../core/notes/notesSlice';

export const store = configureStore({
  reducer: {
    notes,
  },
  devTools: true,
});

// store.subscribe(() => {
//   console.log(store.getState());
// });
