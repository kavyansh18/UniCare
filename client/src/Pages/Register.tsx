import React, { useState, useEffect, FormEvent } from "react";
import swal from "sweetalert";
import NavbarDL from "../Components/NavbaarRD";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("google-auth-token");
      if (token) {
        setShowForm(true);
        const tokenPayload = JSON.parse(atob(token.split(".")[1]));
        const email = tokenPayload.email;
        setUserEmail(email);
      } else {
        setShowForm(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleCheckboxChange = (value: string) => {
    setAvailability(value); 
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const donorData = {
      name,
      mobile: phone,
      age: parseInt(age, 10),
      blood_group: bloodGroup,
      availability, 
      email: userEmail
    };
    console.log('Form Data:', donorData);
  
    try {
      const response = await fetch('http://localhost:3000/donor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donorData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
  
        if (response.status === 400) {
          swal("Error", `Error: ${errorData.error}`, "error");
        } else if (response.status === 409) {
          if (errorData.error.includes('Mobile number already registered')) {
            swal("Conflict", "The mobile number you entered is already registered.", "warning");
          } else if (errorData.error.includes('Email already registered')) {
            swal("Conflict", "The email address you entered is already registered.", "warning");
          } else {
            swal("Conflict", "The provided data conflicts with existing records.", "warning");
          }
        } else {
          swal("Conflict", "The email address you entered is already registered.", "error");
        }
      } else {
        const result = await response.json();
        swal("Success", "Donor registered successfully!", "success");
        console.log(result.donor);
  
        setName("");
        setAvailability("");
        setAge("");
        setPhone("");
        setBloodGroup("");
        setUserEmail("");
        setShowForm(false); 
      }
    } catch (error) {
      console.error('Error:', error);
      swal("Unexpected Error", "An unexpected error occurred. Please try again later.", "error");
    }
  };
  
  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      localStorage.setItem("google-auth-token", credentialResponse.credential);
      const tokenPayload = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
      const email = tokenPayload.email;
      setUserEmail(email);
      setShowForm(true);
    } else {
      swal("Authentication Failed", "Unable to authenticate with Google. Please try again.", "error");
    }
  };

  const handleGoogleLoginError = () => {
    swal("Authentication Failed", "Unable to authenticate with Google. Please try again.", "error");
  };

  const handleLogout = () => {
    localStorage.removeItem("google-auth-token");
    setUserEmail("");
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-b from-red-100 to-orange-200 z-30">
      <NavbarDL />
      <div className="flex justify-center h-screen items-start lg:scale-100 scale-90">
        {!showForm ? (
          <div className="flex flex-col justify-center items-center mt-20">
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </GoogleOAuthProvider>
          </div>
        ) : (
          <motion.div
            className="container"
            initial={{ opacity: 0, y: -45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="heading mb-3">Be a hero!</div>
            <div className="mb-4 text-center text-xl">
              {userEmail && (
                <div className="flex items-center justify-center text-slate-600">
                  <p>{userEmail}</p>
                  <button
                    className="ml-4 bg-red-500 text-white py-1 px-3 rounded-xl text-sm"
                    onClick={handleLogout}
                  >
                    Switch Account
                  </button>
                </div>
              )}
            </div>
            <form className="form" action="#" onSubmit={handleSubmit}>
              <input
                required
                className="input"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <select
                className="input"
                name="bloodGroup"
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <input
                required
                className="input"
                type="text"
                name="age"
                id="age"
                placeholder="Age"
                value={age}
                onChange={handleAgeChange}
              />
              <input
                required
                className="input"
                type="text"
                name="phone"
                id="phone"
                placeholder="Contact Number"
                value={phone}
                onChange={handlePhoneChange}
              />
              <div className="ml-3 mt-1">
                <div className="availability-heading mb-2 font-semibold mt-4">
                Willingness:
                </div>
                <div className="flex space-x-4">
                  <div className="checkbox-wrapper-12 flex items-center">
                    <div className="cbx">
                      <input
                        type="checkbox"
                        id="checkbox-high"
                        checked={availability === "high"}
                        onChange={() => handleCheckboxChange("high")}
                      />
                      <label htmlFor="checkbox-high"></label>
                      <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                        <path d="M2 8.36364L6.23077 12L13 2" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <label htmlFor="checkbox-high" className="ml-2">
                      High
                    </label>
                  </div>
                  <div className="checkbox-wrapper-12 flex items-center">
                    <div className="cbx">
                      <input
                        type="checkbox"
                        id="checkbox-medium"
                        checked={availability === "low"}
                        onChange={() => handleCheckboxChange("low")}
                      />
                      <label htmlFor="checkbox-medium"></label>
                      <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                        <path d="M2 8.36364L6.23077 12L13 2" strokeWidth="2"></path>
                      </svg>
                    </div>
                    <label htmlFor="checkbox-medium" className="ml-2">
                      Low
                    </label>
                  </div>
                </div>
              </div>
              <input className="login-button" type="submit" value="Register" />
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Register;
