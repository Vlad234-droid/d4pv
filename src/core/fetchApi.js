import { notification } from 'antd';
export async function fetchApi(endpoint, method, headers, body, logout) {
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
    if (response.status === 401) {
      logout();
      notification.error({
        message: 'Session expired. Please login again.',
        duration: 3.5,
      });
    }

    throw new Error(data.detail);
  }
  return data;
}
