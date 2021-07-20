export async function account(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    // ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = body;
  }

  console.log('config', config);

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    const msg = checkForEndPoints(endpoint, data);
    throw new Error(msg);
  } catch (err) {
    return Promise.reject(err);
  }
}
const checkForEndPoints = (endpoint, data) => {
  const splitted = endpoint.split('/');
  console.log('data', data);
  const { [splitted.length - 1]: lastEndpoint } = splitted;
  switch (lastEndpoint) {
    case 'accounts':
      return data.detail[0].msg;
    case 'invite':
    case 'reset-password':
      return data.detail;
  }
};

account.get = (endpoint, customConfig = {}) => {
  return account(endpoint, { ...customConfig, method: 'GET' });
};

account.post = function (endpoint, body, customConfig = {}) {
  return account(endpoint, { ...customConfig, body });
};
