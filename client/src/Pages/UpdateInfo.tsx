import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import NavbarUI from '../Components/NavbarUI';

const UpdateInfo: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);

  // Handle successful login
  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google Login Response:', response);

    if (response?.profileObj?.email) {
      setEmail(response.profileObj.email);
      localStorage.setItem('userEmail', response.profileObj.email);
    } else if (response?.credential) {
      // If using an OAuth token, decode it to get user info
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
      setEmail(decodedToken.email);
      localStorage.setItem('userEmail', decodedToken.email);
    } else {
      console.error('Failed to retrieve email from response.');
    }
  };

  // Handle login error
  const handleGoogleLoginError = () => {
    console.error('Login failed.');
  };

  const handleLogout = () => {
    setEmail(null);
    localStorage.removeItem('userEmail');
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <div>
      <NavbarUI />
      <div className='flex justify-center items-center mt-20'>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <div>
            {!email ? (
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            ) : (
              <div>
                <p>Logged in as: {email}</p>
                <button onClick={handleLogout}>Switch Account</button>
              </div>
            )}
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default UpdateInfo;
