import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const OAuthRedirect = () => {
  const router = useRouter();
  const { access_token, provider } = router.query;
  const { data: session , mutate } = useSession();

  useEffect(() => {
    if (access_token && provider && session ) {
      axios
        .get(`https://127.0.0.1:1337/api/auth/${provider}/callback?access_token=${access_token}`)
        .then((response) => {
          const { jwt, user } = response.data;

                sessionStorage.setItem('jwt', jwt);
                sessionStorage.setItem('user', JSON.stringify(user));

          // Update the session with JWT and user data
          session.jwt = jwt;
          session.user = user;
          mutate({
            ...session,
            user: user,
            jwt: jwt,
          });

          console.log("user...............",)
          // Redirect to the home page
          router.push('/');
        })
        .catch((error) => {
          console.error('Error fetching JWT and user data:', error);
          // Handle error as needed
        });
    } else {
      console.error('Missing access_token or provider');
      // Handle missing parameters
    }
  }, [access_token, provider, router, session]);

  return <div>Redirecting...</div>;
};

export default OAuthRedirect;
