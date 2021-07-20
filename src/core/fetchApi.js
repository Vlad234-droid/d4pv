export async function fetchApi(endpoint, method, headers, body) {
  headers = headers || { 'Content-Type': 'application/json', Accept: 'application/json' };
  method = method || 'GET';

  const config = {
    method,
    headers,
  };

  if (body) config.body = body;

  try {
    const response = await fetch(endpoint, config);
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    ////
    console.log('data from services', data); // {detail: "some info with error"}
    const msg = checkForEndPoints(endpoint, data);
    throw new Error(msg);
  } catch (err) {
    return Promise.reject(err); // text
  }
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
