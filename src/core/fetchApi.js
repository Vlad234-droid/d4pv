export async function fetchApi(endpoint, method, headers, body) {
  headers = headers || { 'Content-Type': 'application/json', Accept: 'application/json' };
  method = method || 'GET';

  const config = {
    method,
    headers,
  };

  if (body) config.body = body;
  const response = await fetch(endpoint, config);
  const data = await response.json();
  if (!response.ok) {
    // console.log('data', data.detail);
    throw new Error(data.detail);
  }
  return data;
}

const checkForEndPoints = (endpoint, data) => {
  const splitted = endpoint.split('/');
  const { [splitted.length - 1]: lastEndpoint } = splitted;
  switch (lastEndpoint) {
    case 'accounts':
      // return data.detail[0].msg;
      return data.detail;
    case 'invite':
    case 'reset-password':
      return data.detail;
  }
};
