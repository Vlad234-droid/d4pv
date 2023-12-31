import { createSlice, createAsyncThunk, bindActionCreators } from '@reduxjs/toolkit';
import { fetchApi } from '../fetchApi';
import lockr from 'lockr';
import { actions as profileActions } from '../profile/profileSlice';

const { REACT_APP_API_URL } = process.env;

const initialState = {
  companieData: null,
};

const getCompanieData = createAsyncThunk('companies/getCompanieData', async (company_id, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${company_id}`,
    'GET',
    headers,
    null,
    logout,
  );
  return response;
});

const updateCompanieData = createAsyncThunk('companies/updateCompanieData', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}`, 'Content-Type': 'application/json' };
  const body = JSON.stringify(data.body);
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${data.company_id}`,
    'PUT',
    headers,
    body,
    logout,
  );
  return response;
});

const deleteCompany = createAsyncThunk('companies/deleteCompany', async (company_id, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${company_id}`,
    'DELETE',
    headers,
    null,
    logout,
  );
  return response;
});

const addCompanyNote = createAsyncThunk('companies/addCompanyNote', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}`, 'Content-Type': 'application/json' };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${data.company_id}/notes`,
    'POST',
    headers,
    JSON.stringify(data.body),
    logout,
  );
  return response;
});

const addCompanyRequirement = createAsyncThunk('companies/addCompanyRequirement', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}`, 'Content-Type': 'application/json' };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${data.company_id}/requirements`,
    'POST',
    headers,
    JSON.stringify(data.body),
    logout,
  );
  return response;
});

const updateCompanyNote = createAsyncThunk('companies/updateCompanyNote', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}`, 'Content-Type': 'application/json' };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/notes/${data.note_id}`,
    'PUT',
    headers,
    JSON.stringify(data.body),
    logout,
  );
  return response;
});

const updateCompanyRequirement = createAsyncThunk('companies/updateCompanyRequirement', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}`, 'Content-Type': 'application/json' };

  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/requirements/${data.requirement_id}`,
    'PUT',
    headers,
    JSON.stringify(data.body),
    logout,
  );
  return response;
});

const deleteCompanyNote = createAsyncThunk('companies/deleteCompanyNote', async (note_id, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/notes/${note_id}`,
    'DELETE',
    headers,
    null,
    logout,
  );
  return response;
});

const deleteCompanyRequirements = createAsyncThunk(
  'companies/deleteCompanyRequirements',
  async (requirement_id, { dispatch }) => {
    const { logout } = bindActionCreators(profileActions, dispatch);
    const token = lockr.get('auth-token');
    const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/requirements/${requirement_id}`,
      'DELETE',
      headers,
      null,
      logout,
    );
    return response;
  },
);

const visibilityCompanyNote = createAsyncThunk('companies/visibilityCompanyNote', async (note_id, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/notes/${note_id}/visibility`,
    'PATCH',
    headers,
    null,
    logout,
  );
  return response;
});

const visibilityCompanyRequirements = createAsyncThunk(
  'companies/visibilityCompanyRequirements',
  async (requirement_id, { dispatch }) => {
    const { logout } = bindActionCreators(profileActions, dispatch);
    const token = lockr.get('auth-token');
    const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/requirements/${requirement_id}/visibility`,
      'PATCH',
      headers,
      null,
      logout,
    );
    return response;
  },
);

const getCompanyPreferences = createAsyncThunk('companies/getCompanyPreferences', async (company_id, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}` };
  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${company_id}/preferences`,
    'GET',
    headers,
    null,
    logout,
  );
  return response;
});

const updateCompanyPreferences = createAsyncThunk('companies/updateCompanyPreferences', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = { Accept: 'application/json', Authorization: `bearer ${token}`, 'Content-Type': 'application/json' };

  const response = await fetchApi(
    `${REACT_APP_API_URL}/me/organisation/companies/${data.company_id}/preferences`,
    'PUT',
    headers,
    JSON.stringify(data.body),
    logout,
  );
  return response;
});

const uploadTempStorage = createAsyncThunk('companies/uploadTempStorage', async (file, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const formData = new FormData();
  formData.append('file', file);
  const token = lockr.get('auth-token');
  const headers = {
    Accept: 'application/json',
    Authorization: `bearer ${token}`,
  };
  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/me/temporary_storage`, 'POST', headers, formData, logout);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const uploadFileStorage = createAsyncThunk('companies/uploadFileStorage', async (file, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const formData = new FormData();
  formData.append('file', file);
  const token = lockr.get('auth-token');
  const headers = {
    Accept: 'application/json',
    Authorization: `bearer ${token}`,
  };
  try {
    const response = await fetchApi(`${REACT_APP_API_URL}/me/filestorage`, 'POST', headers, formData, logout);
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const updateCompanyImage = createAsyncThunk('profile/updateCompanyImage', async (data, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const formData = new FormData();
  formData.append('file', data.file);
  const token = lockr.get('auth-token');
  const headers = {
    Accept: 'application/json',
    Authorization: `bearer ${token}`,
  };
  try {
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/companies/${data.company_id}/image`,
      'PATCH',
      headers,
      formData,
      logout,
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
});

const removeCompanyImage = createAsyncThunk('profile/removeCompanyImage', async (company_id, { dispatch }) => {
  const { logout } = bindActionCreators(profileActions, dispatch);
  const token = lockr.get('auth-token');
  const headers = {
    Accept: 'application/json',
    Authorization: `bearer ${token}`,
  };
  try {
    const response = await fetchApi(
      `${REACT_APP_API_URL}/me/organisation/companies/${company_id}/image`,
      'DELETE',
      headers,
      null,
      logout,
    );
    return response;
  } catch (err) {
    return Promise.reject(err);
  }
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
  addCompanyRequirement,
  updateCompanyRequirement,
  visibilityCompanyRequirements,
  deleteCompanyRequirements,
  getCompanyPreferences,
  updateCompanyPreferences,
  uploadTempStorage,
  updateCompanyImage,
  removeCompanyImage,
  uploadFileStorage,
};

export default companiesSlice.reducer;

// export const selectPostById = (state, postId) => state.posts.posts.find((post) => post.id === postId);
