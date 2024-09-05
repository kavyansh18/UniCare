import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/NavbarDL";
import { IoCopy } from "react-icons/io5";

interface Donor {
  name: string;
  bloodGroup: string;
  contact: string;
  age: number;
  availability: { high: boolean; medium: boolean };
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
  bloodGroup,
  contact,
  age,
  availability,
  index,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(contact);
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
      <div className="card2 w-[18rem] px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Name:</div>
            <div className="text-red-600 font-semibold">{name}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Blood Group:</div>
            <div className="text-red-600 font-semibold">{bloodGroup}</div>
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
              <div className="text-red-600 font-semibold">{contact}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Age:</div>
            <div className="text-red-600 font-semibold">{age}</div>
          </div>

          <div className="flex justify-between items-center">
            <div className="font-semibold">Availability:</div>
            <div className="flex justify-center items-center">
              {availability.high && (
                <div className="bg-green-500 px-[9px] py-1 text-sm rounded-full">
                  H
                </div>
              )}
              {availability.medium && (
                <div className="bg-yellow-300 px-[9px] py-1 text-sm rounded-full">
                  M
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
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(
    null
  );

  const donors: Donor[] = [
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: true, medium: false },
    },
    {
      name: "Aarav",
      bloodGroup: "A+",
      contact: "8851120944",
      age: 21,
      availability: { high: false, medium: true },
    },
    {
      name: "Isha",
      bloodGroup: "B-",
      contact: "8851120945",
      age: 23,
      availability: { high: false, medium: true },
    },
    {
      name: "Rohit",
      bloodGroup: "AB+",
      contact: "8851120946",
      age: 22,
      availability: { high: true, medium: false },
    },
    {
      name: "Nisha",
      bloodGroup: "O-",
      contact: "8851120947",
      age: 24,
      availability: { high: false, medium: true },
    },
    {
      name: "Sanjana",
      bloodGroup: "A-",
      contact: "8851120948",
      age: 26,
      availability: { high: false, medium: true },
    },
    {
      name: "Ravi",
      bloodGroup: "B+",
      contact: "8851120949",
      age: 20,
      availability: { high: true, medium: false },
    },
    {
      name: "Kritika",
      bloodGroup: "AB+",
      contact: "8851120950",
      age: 25,
      availability: { high: true, medium: false },
    },
  ];

  const bloodGroups = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

  const filteredDonors = selectedBloodGroup
    ? donors.filter(
        (donor) =>
          donor.bloodGroup === selectedBloodGroup ||
          selectedBloodGroup === "All"
      )
    : donors;

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
        {filteredDonors.length === 0 ? (
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
            {filteredDonors.map((donor, index) => (
              <DonorCard key={index} index={index} {...donor} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Donors;
