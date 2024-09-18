import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import NavbarUI from '../Components/NavbarUI';
import axios from 'axios';
import Swal from 'sweetalert'; 

const UpdateInfo: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLoginSuccess = (response: any) => {
    console.log('Google Login Response:', response);

    if (response?.profileObj?.email) {
      setEmail(response.profileObj.email);
      localStorage.setItem('userEmail', response.profileObj.email);
    } else if (response?.credential) {
      const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
      setEmail(decodedToken.email);
      localStorage.setItem('userEmail', decodedToken.email);
    } else {
      console.error('Failed to retrieve email from response.');
    }
  };

  const handleGoogleLoginError = () => {
    console.error('Login failed.');
  };

  const handleLogout = () => {
    setEmail(null);
    localStorage.removeItem('userEmail');
    setUserData(null);
    setError(null);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  useEffect(() => {
    if (email) {
      setLoading(true);
      axios
        .get(`https://unicare.onrender.com/donor?email=${email}`)
        .then((response) => {
          setUserData(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('User does not exist!');
          console.error('Error fetching user data:', err);
          setLoading(false);
          setUserData(null);
        });
    }
  }, [email]);

  const handleUpdate = () => {
    if (!userData) return;
  
    // Data validation
    if (!userData.name || !userData.mobile || !userData.age || !userData.blood_group || !userData.availability) {
      Swal({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields.',
      });
      return;
    }
  
    if (!/^\d{10}$/.test(userData.mobile)) {
      Swal({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid 10-digit phone number.',
      });
      return;
    }
  
    if (isNaN(userData.age) || Number(userData.age) <= 0) {
      Swal({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter a valid age.',
      });
      return;
    }

    const updatedUserData = {
      ...userData,
      email, 
    };
  
    setLoading(true);
    axios
      .put(`https://unicare.onrender.com/donor/update`, updatedUserData)
      .then(() => {
        Swal({
          icon: 'success',
          title: 'Success',
          text: 'Information updated successfully!',
        });
        setLoading(false);
        handleLogout();
        
      })
      .catch((err) => {
        setError('Failed to update user data');
        console.error('Error updating user data:', err);
        setLoading(false);
      });
  };  
  
  const handleDelete = () => {
    Swal({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      buttons: ['Cancel', 'Yes, delete it!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        setLoading(true);
        console.log(email)
        axios
          .delete(`https://unicare.onrender.com/donor?email=${email}`) 
          .then(() => {
            Swal({
              icon: 'success',
              title: 'Deleted',
              text: 'The donor has been deleted.',
            });
            setLoading(false);
            handleLogout(); 
          })
          .catch((err) => {
            setError('Failed to delete donor');
            console.error('Error deleting donor:', err);
            setLoading(false);
          });
      }
    });
  };
  

  // Handle phone number input
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setUserData({ ...userData, mobile: value });
    }
  };

  return (
    <div className='bg-gradient-to-b from-red-100 to-orange-200 min-h-screen'>
      <NavbarUI />
      <div className='flex justify-center items-center mt-10'>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <div >
            {!email ? (
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            ) : (
              <div className='glass p-8 lg:w-[28rem] w-[21rem]'>
                <div className="flex lg:flex-row flex-col lg:gap-3 gap-2 items-center justify-center text-slate-600 ">
                  <p className='text-xl'>{email}</p>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-xl text-sm"
                    onClick={handleLogout}
                  >
                    Switch Account
                  </button>
                </div>

                {loading ? (
                  <p>Loading...</p>
                ) : (
                  userData && (
                    <div>
                      <h3 className='text-2xl flex justify-center items-center mb-4 mt-4 font-semibold'>Edit Information</h3>
                      <form className="space-y-4">
                        <input
                          required
                          className="w-full p-2 border border-gray-300 rounded glass"
                          type='text'
                          value={userData.name}
                          placeholder='Name'
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                        />
                        <input
                          required
                          className="w-full p-2 border border-gray-300 rounded glass"
                          type='text'
                          value={userData.mobile}
                          placeholder='Phone Number'
                          onChange={handlePhoneNumberChange}
                        />
                        <input
                          required
                          className="w-full p-2 border border-gray-300 rounded glass"
                          type='number'
                          value={userData.age}
                          placeholder='Age'
                          onChange={(e) =>
                            setUserData({ ...userData, age: e.target.value })
                          }
                        />
                        <select
                          required
                          className="w-full p-2 border border-gray-300 rounded glass"
                          value={userData.blood_group}
                          onChange={(e) =>
                            setUserData({ ...userData, blood_group: e.target.value })
                          }
                        >
                          <option value="" disabled>Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                        <select
                          required
                          className="w-full p-2 border border-gray-300 rounded glass"
                          value={userData.availability}
                          onChange={(e) =>
                            setUserData({ ...userData, availability: e.target.value })
                          }
                        >
                          <option value="" disabled>Select Willingness</option>
                          <option value="high">High</option>
                          <option value="low">Low</option>
                        </select>
                        <button
                          type='button'
                          className="w-full bg-red-500 text-white p-2 rounded-2xl"
                          onClick={handleUpdate}
                        >
                          Update
                        </button>
                        <button
                          type='button'
                          className="w-full bg-red-700 text-white p-2 rounded-2xl"
                          onClick={handleDelete}
                        >
                          Delete Account
                        </button>
                      </form>
                    </div>
                  )
                )}

                {error && <p className='text-red-500 flex justify-center items-center mt-3 font-semibold'>{error}</p>}
              </div>
            )}
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default UpdateInfo;
