import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchApi } from '../fetchApi';
import lockr from 'lockr';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  status: 'idle',
};

const inViteMemberToOrganisation = createAsyncThunk('configuration/inViteMemberToOrganisation', async (body) => {
  const token = lockr.get('auth-token');

  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  try {
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/members`,
      'POST',
      headers,
      JSON.stringify(body),
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const getMembersOfOrganisation = createAsyncThunk('configuration/getMembersOfOrganisation', async () => {
  const token = lockr.get('auth-token');

  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/me/organisation/members`, null, headers, null);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const updateMemberToOrganisation = createAsyncThunk('configuration/updateMemberToOrganisation', async (data) => {
  const token = lockr.get('auth-token');

  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  try {
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/members/${data.account_id}/role`,
      'PATCH',
      headers,
      JSON.stringify(data.body),
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const removeMembersOfOrganisation = createAsyncThunk(
  'configuration/removeMembersOfOrganisation',
  async (account_id) => {
    const token = lockr.get('auth-token');

    const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
    try {
      const response = await fetchApi(
        `${REACT_APP_API_URL}/me/organisation/members/${account_id}`,
        'DELETE',
        headers,
        null,
      );
      return response;
    } catch (err) {
      return Promise.reject(err);
    }
  },
);

const getConfCompanies = createAsyncThunk('configuration/getConfCompanies', async () => {
  const token = lockr.get('auth-token');

  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };

  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/me/organisation/companies`, null, headers, null);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const createCompany = createAsyncThunk('configuration/createCompany', async (body) => {
  const token = lockr.get('auth-token');

  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };

  try {
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/companies`,
      'POST',
      headers,
      JSON.stringify(body),
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {},
  extraReducers: {},
});

export const actions = {
  ...configurationSlice.actions,
  inViteMemberToOrganisation,
  getMembersOfOrganisation,
  removeMembersOfOrganisation,
  getConfCompanies,
  createCompany,
  updateMemberToOrganisation,
};

export default configurationSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
