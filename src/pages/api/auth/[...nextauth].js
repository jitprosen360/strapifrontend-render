import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from '../../../../middleware/auth';



export default NextAuth({
  session: {
    // Set the maximum duration for the session (in seconds)
    // For example, set it to 30 days (30 * 24 * 60 * 60 seconds)
    maxAge: 30 * 24 * 60 * 60,
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&prompt=consent",
      // Specify the access token URL
      accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
      profileUrl: "https://www.googleapis.com/oauth2/v3/userinfo", // URL to get user profile
      redirectUri: 'http://127.0.0.1:1337/api/auth/callback/google',
    }),
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        username: { label: 'Username', type: 'text' },
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {

        if (credentials == null) return null;
 
        try {
          const { user, jwt ,account } = await signIn({
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            
          });
          console.log(account)


          return { ...user, jwt };
        } catch (error) {
          // Sign In Fail
          return null;
        }
        
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user, account }) => {
      const isSignIn = user ? true : false;
      // If the user was authenticated with Google, fetch the JWT and user data from the OAuth redirect page
    
        if (isSignIn) {
        
        console.log("token-------------------", token)
          if (account.provider === 'google' && account?.id_token && account?.access_token) {
            token.id_token = account.id_token;
            token.access_token = account.access_token;
            token.jwt =user.jwt;
            token.id = user.id;
          }
          console.log("token-------------------", token)
          console.log('User signed in with Google:', user.email);
          console.log('User signed in with Google:', token.id_token);
        }
      return Promise.resolve(token);
    },
  }
});