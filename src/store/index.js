import { configureStore } from '@reduxjs/toolkit';
// import counter from '../features/counter/counterSlice';
import notes from '../core/notes/notesSlice';
import requirements from '../core/requirements/requirementsSlice';
import account from '../core/account/accountSlice';

export const store = configureStore({
  reducer: {
    notes,
    requirements,
    account,
  },
  devTools: true,
});

// store.subscribe(() => {
//   console.log(store.getState());
// });
