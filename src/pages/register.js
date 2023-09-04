import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const responseData = await response.json();
      console.log(responseData); // Add this line
  
      if (response.ok) {
        if (responseData.confirmed === false) {
          console.log('Registration successful but email not confirmed');
          // Handle email confirmation message.
        } else {
          console.log('Registration successful');
        //    const userResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: `Bearer ${responseData.jwt}`,
        //   },
        //   body: JSON.stringify({
        //     username: formData.username,
        //     email: formData.email,
        //     // Other fields you want to store
        //   }),
        // });
          // Handle successful registration, e.g., redirect to login page.
        }
      } else {
        if (responseData.message && responseData.message[0].messages && responseData.message[0].messages[0].message) {
          console.error('Registration error:', responseData.message[0].messages[0].message);
        } else {
          console.error('Unexpected error response:', responseData);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => signIn('google')}>Sign In with Google</button>
    <form onSubmit={handleSubmit}>
      {/* Your registration form fields */}
    </form>
    </div>
  );
};

export default Register;
