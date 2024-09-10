import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/NavbarDL";
import { IoCopy } from "react-icons/io5";

interface Donor {
  id: number;
  name: string;
  blood_group: string;
  mobile: string;
  age: number;
  availability: 'high' | 'low'; // Ensuring alignment with backend data
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
    alert("Contact number copied to clipboard!");
  };

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="card2 w-[18rem] px-6 py-4 bg-white shadow-md rounded-lg">
        <div className="flex flex-col gap-2">
          {/* Donor Details */}
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
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch("http://localhost:3000/donors"); // Adjust based on actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Donor[] = await response.json();
        setDonors(data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const bloodGroups = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const filteredDonors = selectedBloodGroup
    ? donors.filter(
        (donor) =>
          donor.blood_group === selectedBloodGroup ||
          selectedBloodGroup === "All"
      )
    : donors;

  // Sort donors by availability (high -> medium) and then alphabetically by name
  const sortedDonors = filteredDonors.sort((a, b) => {
    if (a.availability === b.availability) {
      return a.name.localeCompare(b.name); // Sort alphabetically if availability is the same
    }
    return a.availability === 'high' ? -1 : 1; // Sort by availability: high first, then medium
  });

  return (
    <div className="bg-gradient-to-b from-red-200 to-orange-200 h-auto min-h-screen">
      <Navbar />

      <div className="p-4 flex justify-center lg:gap-3 gap-2 flex-wrap">
        {bloodGroups.map((group) => (
          <button
            key={group}
            onClick={() => setSelectedBloodGroup(group === "All" ? null : group)}
            className={`px-4 py-2 rounded-full font-semibold ${
              selectedBloodGroup === group || (!selectedBloodGroup && group === "All")
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 border border-red-600"
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      <div className="px-10 py-2">
        {sortedDonors.length === 0 ? (
          <div className="text-red-500 text-center font-semibold text-2xl mt-20">
            No donor found for the selected blood group
          </div>
        ) : (
          <motion.div
            className="grid lg:grid-cols-4 grid-cols-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {sortedDonors.map((donor, index) => (
              <DonorCard key={donor.id} index={index} {...donor} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Donors;
