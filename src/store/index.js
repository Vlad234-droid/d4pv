import { configureStore } from '@reduxjs/toolkit';
// import counter from '../features/counter/counterSlice';
import account from '../core/account/accountSlice';
import profile from '../core/profile/profileSlice';
import configuration from '../core/configurations/configurationsSlice';
import companies from '../core/companies/companiesSlice';
import visualization from '../core/visualization/visualizationSlice';

export const store = configureStore({
  reducer: {
    account,
    profile,
    configuration,
    companies,
    visualization,
  },
  devTools: true,
});

// store.subscribe(() => {
//   console.log(store.getState());
// });
