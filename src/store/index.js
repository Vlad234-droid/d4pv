import { configureStore } from '@reduxjs/toolkit';
// import counter from '../features/counter/counterSlice';
import notes from '../core/notes/notesSlice';
import requirements from '../core/requirements/requirementsSlice';
import account from '../core/account/accountSlice';
import profile from '../core/profile/profileSlice';
import configuration from '../core/configurations/configurationsSlice';
import companies from '../core/companies/companiesSlice';

export const store = configureStore({
  reducer: {
    notes,
    requirements,
    account,
    profile,
    configuration,
    companies,
  },
  devTools: true,
});

// store.subscribe(() => {
//   console.log(store.getState());
// });
