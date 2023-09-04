// pages/api/auth/google/callback.js

// import { signIn, getProviders, getSession } from 'next-auth/react';
// import { useRouter } from 'next/router';

// export default async (req, res) => {
//   const { provider } = req.query; // Extract the provider (e.g., 'google') from the query parameters
//   const router = useRouter();
//   const session = await getSession({ req });

//   if (!session) {
//     // User is not authenticated, handle the authentication flow
//     await signIn(provider, { callbackUrl: router.asPath });
//   }
  
//   useEffect(() => {
//     // Extract tokens from query parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const idToken = urlParams.get('id_token');
//     const accessToken = urlParams.get('access_token');



//     if (idToken && accessToken && session) {
//       // Update the user's session with the tokens
//       session.id_token = idToken;
//       session.access_token = accessToken;
//       mutate(session);

//       // Perform any authentication checks here

//       console.log("id_token...............", idToken);
//       console.log("access_token...............", accessToken);

//       // Redirect to the home page or an authenticated route
//       window.location.href = '/'; // Replace with the actual URL of your home page or authenticated route
//     } else {
//       console.error('Missing id_token, access_token, or session');
//       // Handle missing parameters or session
//     }
//   }, [session, mutate]);
//   // Redirect the user to the main page (you can customize this URL)
//   router.push('/'); // Replace '/' with your desired main page URL
// };


// import { getProviders, getSession, signIn } from "next-auth/react";

// export default async function googleCallback(req, res) {
//   const { id_token, access_token } = req.query;
//   // Ensure that the user is authenticated using a session
//   const session = await getSession({ req });

//   if (session) {
//     // Store the tokens securely, for example, in a session or a cookie
//     // You can also save them to your database for later use
//     // For simplicity, we store them in a session here
//     req.session.id_token = id_token;
//     req.session.access_token = access_token;

//     console.log('id_token:', id_token);
//     console.log('access_token:', access_token);
  
//     // Redirect to a different route or send a response as needed
//     // Example: res.redirect('/dashboard');
//     res.status(200).json({ message: 'Tokens stored successfully' });
//   } else {
//     const providers = await getProviders();
//     const googleProvider = providers.google;

//     if (googleProvider) {
//       await signIn("google", {
//         callbackUrl: "http://127.0.0.1:3000", // Redirect URL after successful login
//       });
//     } else {
//       // Google provider not available, handle error
//     }
//   }
// }
