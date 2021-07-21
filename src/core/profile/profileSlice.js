import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../fetchApi';
import lockr from 'lockr';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  data: null,
};

const getProfile = createAsyncThunk('profile/getProfile', async () => {
  const token = lockr.get('auth-token');
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `bearer ${token}` };

  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/me`, null, headers, null);
    // thunkAPI.dispatch(update(response));
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const updateProfile = createAsyncThunk('profile/updateProfile', async (body) => {
  const token = lockr.get('auth-token');
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `bearer ${token}` };
  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/me`, 'PUT', headers, JSON.stringify(body));
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    update(state, { payload }) {
      for (let item in payload) {
        state.data[item] = payload[item];
      }
    },
    updateOrganisation(state, { payload }) {
      state.data.organisation.name = payload;
    },
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
    [getProfile.pending]: (state) => {
      state.getProfileStatus = 'loading';
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      state.getProfileStatus = 'succeeded';
      state.data = payload;
      // for (let item in payload) {
      //   state[item] = payload[item];
      // }
    },
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

const { update, updateOrganisation } = profileSlice.actions;

export const actions = {
  ...profileSlice.actions,
  getProfile,
  updateProfile,
};

export default profileSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
