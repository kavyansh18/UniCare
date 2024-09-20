import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import swal from "sweetalert";
import Navbar from "../Components/NavbarDL";
import { IoCopy } from "react-icons/io5";
import logout from "../assets/logout.png";
import { useMediaQuery } from "react-responsive";
import smallScreenImg from "../assets/donor-small.png";
import largeScreenImg from "../assets/donor.png";

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  mobile: string;
  age: number;
  availability: "high" | "low";
}

const cardVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.4,
    },
  }),
};

const DonorCard: React.FC<Donor & { index: number }> = ({
  name,
  blood_group,
  mobile,
  age,
  availability,
  index,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(mobile);
    swal("Copied!", "Contact number copied to clipboard!", "success");
  };

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="card2 w-[20rem] px-6 py-4 bg-white shadow-md rounded-lg">
        {/* Donor Details */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Name:</div>
            <div className="text-red-600 font-semibold">{name}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Blood Group:</div>
            <div className="text-red-600 font-semibold">{blood_group}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Contact No.:</div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="text-gray-600 hover:text-gray-800"
                title="Copy to clipboard"
              >
                <IoCopy />
              </button>
              <div className="text-red-600 font-semibold">{mobile}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Age:</div>
            <div className="text-red-600 font-semibold">{age}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Availability:</div>
            <div className="flex justify-center items-center">
              {availability === "high" && (
                <div className="relative group bg-green-500 px-[9px] py-1 text-sm rounded-full text-white cursor-pointer">
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 text-white text-xs rounded-2xl p-1 transition-opacity duration-300 -translate-x-12 px-[22px] pointer-events-none group-hover:pointer-events-auto">
                    High
                  </span>
                  H
                </div>
              )}
              {availability === "low" && (
                <div className="relative group bg-yellow-400 px-[10px] py-1 text-sm rounded-full text-white cursor-pointer">
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-70 text-white text-xs rounded-2xl p-1 transition-opacity duration-300 -translate-x-12 px-[22px] pointer-events-none group-hover:pointer-events-auto">
                    Low
                  </span>
                  L
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Donors: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://unicare.onrender.com/donors");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Donor[] = await response.json();
      setDonors(data);
      localStorage.setItem("totalDonors", data.length.toString());
    } catch (error) {
      swal("Error", "Error fetching donors. Please try again later.", "error");
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === adminUsername && password === adminPassword) {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      fetchDonors();
    } else {
      swal("Error", "Invalid username or password", "error");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    setUsername("");
    setPassword("");
  };

  const bloodGroups = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const filteredDonors = selectedBloodGroup
    ? donors.filter(
        (donor) =>
          donor.blood_group === selectedBloodGroup ||
          selectedBloodGroup === "All"
      )
    : donors;

  const sortedDonors = filteredDonors.sort((a, b) => {
    if (a.availability === b.availability) {
      return a.name.localeCompare(b.name);
    }
    return a.availability === "high" ? -1 : 1;
  });

  const totalDonorsString = localStorage.getItem("totalDonors");
  const totalDonors = totalDonorsString ? parseInt(totalDonorsString, 10) : 0;

  let message;
  if (totalDonors === 0) {
    message = "Be the first hero, register yourself now!";
  } else if (totalDonors === 1) {
    message = "hero ready to help!";
  } else {
    message = "heroes ready to help!";
  }


  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const backgroundImg = isSmallScreen ? smallScreenImg : largeScreenImg;

  return (
    <div className="relative bg-cover bg-center min-h-screen">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(1.05) saturate(1.1)",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      ></motion.div>

      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-50">
        <Navbar />
      </div>
      {!isLoggedIn ? (
        <div className="flex flex-col lg:items-end items-center justify-start mt-20 h-screen lg:mr-[14rem]">
          <div className="flex flex-col justify-center items-center">
          <h2 className="lg:text-3xl text-2xl font-semibold mb-6 lg:px-0 px-3 z-30">
            {totalDonors > 0 ? (
              <>
                <span>We have </span>
              </>
            ) : null}
            {totalDonors === 0 ? null : (
              <span className="text-red-600 font-semibold">{totalDonors} </span>
            )}
            {message}
          </h2>
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-md lg:w-[400px] w-[340px] glass"
          >
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mb-5 border rounded-lg glass placeholder-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mb-5 border rounded-lg glass placeholder-black"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg"
            >
              Login
            </button>
          </form>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center px-4">
            <div className="p-4 flex justify-center lg:gap-3 gap-2 flex-wrap z-30">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() =>
                    setSelectedBloodGroup(group === "All" ? null : group)
                  }
                  className={`px-4 py-2 rounded-full font-semibold ${
                    selectedBloodGroup === group ||
                    (selectedBloodGroup === null && group === "All")
                      ? "bg-red-600 text-white"
                      : "bg-white"
                  }`}
                >
                  {group}
                </button>
              ))}
              <div className="lg:flex justify-end items-center lg:ml-3 ml-1">
                <button onClick={handleLogout} className="relative">
                  <div className="bg-red-600 p-1 rounded-full flex items-center relative group">
                    <img
                      src={logout}
                      alt="Logout"
                      className="lg:h-8 lg:w-8 w-7 h-7 cursor-pointer"
                    />
                    <span className="absolute left-full font-semibold lg:flex hidden items-center justify-center opacity-0 group-hover:opacity-100  text-red-600 text-m rounded-2xl p-1 transition-opacity duration-300 transform translate-x-2 pointer-events-none group-hover:pointer-events-auto">
                      Logout
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="relative min-h-screen">
            {loading ? (
              <div className="flex space-x-2 justify-center items-start pt-44">
                <span className="sr-only">Loading...</span>
                <div className="h-6 w-6 bg-red-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-6 w-6 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-6 w-6 bg-red-600 rounded-full animate-bounce"></div>
              </div>
            ) : sortedDonors.length ? (
              <div className="p-4 grid gap-6 lg:grid-cols-4 lg:mt-0 mt-2 justify-center items-center">
                {sortedDonors.map((donor, index) => (
                  <DonorCard key={donor.id} {...donor} index={index} />
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex justify-center items-start mt-12">
                <p className="text-center text-gray-600 text-4xl">
                  No donors available.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Donors;
