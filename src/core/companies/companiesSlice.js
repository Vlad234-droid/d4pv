import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../fetchApi';
import lockr from 'lockr';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  companieData: null,
};

const getCompanieData = createAsyncThunk('companies/getCompanieData', async (company_id) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(`${REACT_APP_API_URL}/me/organisation/companies/${company_id}`, 'GET', headers, null);
  return response;
});

const accountSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: {
    [getCompanieData.fulfilled]: (state, action) => {
      state.companieData = action.payload;
    },
    // [createAccount.fulfilled]: (state, action) => {
    //   state.status = 'succeeded';
    //   state.account_id = action.payload.account_id;
    // },
    // [createAccount.rejected]: (state, action) => {
    //   state.status = 'failed';
    // },
    // [createAccountInvite.fulfilled]: (state, { payload }) => {
    //   state.status = 'succeeded';
    //   state.account_id = payload.account_id;
    // },
    // [resetPassword.fulfilled]: (state, { payload }) => {
    //   state.passwordStatus = 'succeeded';
    // },
  },
});

const {} = accountSlice.actions;

export const actions = {
  ...accountSlice.actions,
  getCompanieData,
};

export default accountSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
