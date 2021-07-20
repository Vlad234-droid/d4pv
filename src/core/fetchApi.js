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
    throw new Error(data.detail);
  }
  return data;
}
