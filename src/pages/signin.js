import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function SignIn() {

  const router = useRouter();

  const onGoogleSignIn = async () => {
    
      await signIn('google', { callbackUrl: 'http://127.0.0.1:3000' }); // Use the correct callback URL

  };

  const { data: session } = useSession();
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (result.ok) {
      router.push('/');
      return;
    }
    alert('Credentials are not valid');
  };


  return (
    <div>
      <Head>
        <title>Sign In</title>
      </Head>

      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required />

        <button type="submit">Sign In</button>
      </form>

    {  session ? "" : <div>
        <button onClick={onGoogleSignIn}>Sign In with Google</button> 
      </div>}
    </div>
  );
}
