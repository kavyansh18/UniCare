import React from "react";
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
  const donors: Donor[] = [
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: true, medium: false },
    },
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: false, medium: true },
    },
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: false, medium: true },
    },
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: true, medium: false },
    },
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: false, medium: true },
    },
    {
      name: "Kavyansh",
      bloodGroup: "O+",
      contact: "8851120943",
      age: 19,
      availability: { high: false, medium: true },
    },
  ];

  return (
    <div className="bg-gradient-to-b from-red-200 to-orange-200 h-auto min-h-screen">
      <Navbar />
      <motion.div
        className="p-10 grid lg:grid-cols-4 grid-cols-1 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {donors.map((donor, index) => (
          <DonorCard key={index} index={index} {...donor} />
        ))}
      </motion.div>
    </div>
  );
};

export default Donors;
