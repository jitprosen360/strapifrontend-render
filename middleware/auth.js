import axios from 'axios';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function signIn({ email, password, username, id_token, access_token }) {
  const payload = {
    password,
  };

  if (email) {
    payload.identifier = email;
  } else if (username) {
    payload.identifier = username;
  } else {
    throw new Error('Email or username is required.');
  }

  // If id_token and access_token are provided, include them in the payload
  if (id_token && access_token) {
    payload.id_token = id_token;
    payload.access_token = access_token;
  }

  const res = await axios.post(`${strapiUrl}/api/auth/local`, payload);
  return res.data;
}


// export async function signIn({ email, password,username }) {
//   const res = await axios.post(`${strapiUrl}/api/auth/local`, {
//     identifier: email,
//     username,
//     password,
//   });
//   return res.data;
// }


// export async function register({ email, password,username }){
// axios
//   .post(`${strapiUrl}/api/auth/local/register`, {
//     username,
//     email ,
//     password
//   })
//   .then(response => {
//     console.log('User profile', response.data.user);
//     console.log('User token', response.data.jwt);
//   })
//   .catch(error => {
//     console.log('An error occurred:', error.response);
//   });
// }

