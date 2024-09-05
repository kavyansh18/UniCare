import "../index.css";
import React, { useState } from "react";
import swal from 'sweetalert';
import NavbarDL from "../Components/NavbaarRD";
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [availability, setAvailability] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const handleCheckboxChange = (value: string) => {
    setAvailability(value);
  };

  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow only positive integers
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow only 10 digit integers
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Basic form validation
    if (!name || !bloodGroup || !age || !phone || !availability) {
      swal("Oops!", "Please fill in all fields.", "warning");
      return;
    }

    if (age === "" || isNaN(Number(age)) || Number(age) <= 0) {
      swal("Invalid Age", "Please enter a valid positive integer for age.", "error");
      return;
    }

    if (phone.length !== 10) {
      swal("Invalid Phone Number", "Please enter a valid 10-digit phone number.", "error");
      return;
    }

    // All checks passed
    swal("Success!", "You have successfully registered.", "success");
  };

  return (
    <div className="bg-gradient-to-b from-red-100 to-orange-200 ">
      <NavbarDL />
      <div className="flex justify-center items-center h-screen pb-16">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: -45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="heading">Be a hero!</div>
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

            {/* Blood Group Dropdown with Default Text */}
            <select
              className="input"
              name="bloodGroup"
              id="bloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
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

            {/* Age Input with Validation */}
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

            {/* Contact Number Input with Validation */}
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
                Availability:
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
                      checked={availability === "medium"}
                      onChange={() => handleCheckboxChange("medium")}
                    />
                    <label htmlFor="checkbox-medium"></label>
                    <svg fill="none" viewBox="0 0 15 14" height="14" width="15">
                      <path d="M2 8.36364L6.23077 12L13 2" strokeWidth="2"></path>
                    </svg>
                  </div>
                  <label htmlFor="checkbox-medium" className="ml-2">
                    Medium
                  </label>
                </div>
              </div>
            </div>
            
            <input className="login-button" type="submit" value="Sign In" />
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
