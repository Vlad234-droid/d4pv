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

const updateCompanieData = createAsyncThunk('companies/updateCompanieData', async (data) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const body = JSON.stringify(data.body);
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${data.company_id}`,
    'PUT',
    headers,
    body,
  );
  return response;
});

const deleteCompany = createAsyncThunk('companies/deleteCompany', async (company_id) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${company_id}`,
    'DELETE',
    headers,
    null,
  );
  return response;
});

const addCompanyNote = createAsyncThunk('companies/addCompanyNote', async (company_id, data) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const body = JSON.stringify(data);
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${company_id}/notes`,
    'POST',
    headers,
    body,
  );
  return response;
});

const updateCompanyNote = createAsyncThunk('companies/updateCompanyNote', async (note_id, data) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const body = JSON.stringify(data);
  const response = await fetchApi(`${REACT_APP_API_URL}/me/organisation/notes/${note_id}`, 'PUT', headers, body);
  return response;
});

const deleteCompanyNote = createAsyncThunk('companies/deleteCompanyNote', async (note_id) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(`${REACT_APP_API_URL}/me/organisation/notes/${note_id}`, 'DELETE', headers);
  return response;
});

const visibilityCompanyNote = createAsyncThunk('companies/visibilityCompanyNote', async (note_id) => {
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(`${REACT_APP_API_URL}/me/organisation/notes/${note_id}/visibility`, 'PATCH', headers);
  return response;
});

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    clearCompanyData(state, { payload }) {
      state.companieData = null;
    },
  },
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

const {} = companiesSlice.actions;

export const actions = {
  ...companiesSlice.actions,
  getCompanieData,
  updateCompanieData,
  deleteCompany,
  addCompanyNote,
  updateCompanyNote,
  deleteCompanyNote,
  visibilityCompanyNote,
};

export default companiesSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
