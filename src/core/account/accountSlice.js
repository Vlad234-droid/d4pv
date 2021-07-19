import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { account } from '../services/account';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  status: 'idle',
  error: null,
  account_id: '',
  passwordStatus: 'idle',
};

const createAccount = createAsyncThunk('account/createAccount', async (body) => {
  const response = await account.post(`${REACT_APP_API_URL}/accounts`, { ...body });
  return response;
});
const createAccountInvite = createAsyncThunk('account/createAccountInvite', async (body) => {
  const response = await account.post(`${REACT_APP_API_URL}/accounts/invite`, { ...body });
  return response;
});
const resetPassword = createAsyncThunk('account/resetPassword', async (body) => {
  const response = await account.post(`${REACT_APP_API_URL}/accounts/reset-password`, { ...body });
  return response;
});
const logInAcc = createAsyncThunk('account/authoriseAccount', async (body) => {
  const response = await account.post(
    `${REACT_APP_API_URL}/accounts/auth`,
    {
      ...body,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  return response;
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    // reactionAdded(state, action) {
    //   const { postId, reaction } = action.payload;
    //   const existingPost = state.posts.find((post) => post.id === postId);
    //   if (existingPost) {
    //     existingPost.reactions[reaction]++;
    //   }
    // },
    // postUpdated(state, action) {
    //   const { id, title, content } = action.payload;
    //   const existingPost = state.posts.find((post) => post.id === id);
    //   if (existingPost) {
    //     existingPost.title = title;
    //     existingPost.content = content;
    //   }
    // },
  },
  extraReducers: {
    [createAccount.pending]: (state, action) => {
      state.status = 'loading';
    },
    [createAccount.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.account_id = payload.account_id;
    },
    [createAccountInvite.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      state.account_id = payload.account_id;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.passwordStatus = 'succeeded';
    },
    // [createAccount.rejected]: (state, { payload }) => {
    //   state.status = 'failed';
    //   console.log('payload', payload);
    //   state.error = payload.detail;
    // },
  },
});

const {} = accountSlice.actions;

export const actions = { ...accountSlice.actions, createAccount, createAccountInvite, resetPassword, logInAcc };

export default accountSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
