import { configureStore } from '@reduxjs/toolkit';
import counter from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter,
  },
  devTools: true,
});

store.subscribe(() => {
  console.log(store.getState());
});
