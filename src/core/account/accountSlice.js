import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../fetchApi';
import lockr from 'lockr';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  status: 'idle', //succeddded
  error: null,
  account_id: '',
  passwordStatus: 'idle',
};

const createAccount = createAsyncThunk('account/createAccount', async (body) => {
  const response = await fetchApi(`${REACT_APP_API_URL}/accounts`, 'POST', null, JSON.stringify(body));
  return response;
});
const createAccountInvite = createAsyncThunk('account/createAccountInvite', async (body) => {
  const response = await fetchApi(`${REACT_APP_API_URL}/accounts/invite`, 'POST', null, JSON.stringify(body));
  return response;
});
const resetPassword = createAsyncThunk('account/resetPassword', async (body) => {
  const response = await fetchApi(`${REACT_APP_API_URL}/accounts/reset-password`, 'POST', null, JSON.stringify(body));
  return response;
});
const logInAcc = createAsyncThunk('account/authoriseAccount', async (body) => {
  const formData = new FormData();
  for (let i in body) {
    formData.append(i, body[i]);
  }
  const headers = { Accept: 'application/json' };
  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/accounts/auth`, 'POST', headers, formData);
    lockr.set('auth-token', response.token);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const getInviteInfo = createAsyncThunk('account/getInviteInfo', async (id) => {
  const response = await fetchApi(`${REACT_APP_API_URL}/accounts/invite/${id}`, null, null, null);
  return response;
});
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: {
    [createAccount.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createAccount.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      console.log('action', action);
      state.account_id = action.payload.account_id;
    },
    [createAccount.rejected]: (state, action) => {
      state.status = 'failed';
      console.log('payload fropmhere', action);
    },
    [createAccountInvite.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.account_id = payload.account_id;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.passwordStatus = 'succeeded';
    },
  },
});

const {} = accountSlice.actions;

export const actions = {
  ...accountSlice.actions,
  createAccount,
  createAccountInvite,
  resetPassword,
  logInAcc,
  getInviteInfo,
};

export default accountSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
