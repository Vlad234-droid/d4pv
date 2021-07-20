import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../fetchApi';

const { REACT_APP_API_URL } = process.env;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZDY5YzAzYS05ZjY2LTRjNzUtOGM1Yy1lODc2MGUyZDNmMTIiLCJleHAiOjE2MjY4NzY3MDV9.NkrAc3-A5Z9zClLRwoHg5VqumQz1Eox_fA0HpnuOZg0';

const initialState = {};

const getProfile = createAsyncThunk('profile/getProfile', async () => {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(`${REACT_APP_API_URL}/me`, null, headers, null);
  return response;
});

const profileSlice = createSlice({
  name: 'profile',
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
    // [createAccount.pending]: (state, action) => {
    //   state.status = 'loading';
    // },
    // [createAccount.fulfilled]: (state, action) => {
    //   state.status = 'succeeded';
    //   state.account_id = action.payload.account_id;
    // },
    // [createAccount.rejected]: (state, action) => {
    //   state.status = 'failed';
    //   console.log('payload fropmhere', action);
    //   state.error = action.error;
    // },
  },
});

const {} = profileSlice.actions;

export const actions = {
  ...profileSlice.actions,
  getProfile,
};

export default profileSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
