// export async function account(endpoint, method, { ...customConfig } = {}) {
//   const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

//   //for (var pair of formData.entries()) {
//   //  console.log('here', pair[0] + ', ' + pair[1]);
//   //}

//   console.log('body typoe', typeof body);

//   const config = {
//     method: customConfig.method,
//     // ...customConfig,
//     headers: {
//       ...headers,
//       ...customConfig.headers,
//     },
//     body,
//   };

//   //if (body) {
//   //  config.body = JSON.stringify(body);
//   //}
//   console.log('config', config);

//   try {
//     const response = await fetch(endpoint, config);
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     }
//     ////
//     console.log('data from services', data); // {detail: "some info with error"}
//     const msg = checkForEndPoints(endpoint, data);
//     throw new Error(msg);
//   } catch (err) {
//     return Promise.reject(err); // text
//   }
// }
// const checkForEndPoints = (endpoint, data) => {
//   const splitted = endpoint.split('/');
//   const { [splitted.length - 1]: lastEndpoint } = splitted;
//   switch (lastEndpoint) {
//     case 'accounts':
//       // return data.detail[0].msg;
//       return data.detail;

//     case 'invite':
//     case 'reset-password':
//       return data.detail;
//   }
// };

// // account.get = (endpoint, customConfig = {}) => {
// //   return account(endpoint, { ...customConfig, method: 'GET' });
// // };

// // account.post = function (endpoint, method, header, body) {
// //   return account(endpoint, method, header, body);
// // };
