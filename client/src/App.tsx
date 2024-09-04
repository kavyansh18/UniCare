"use client";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "./Components/TypewriterEffect";
import drop from "./assets/drop.png";

export default function App() {
  const words = [
    {
      text: "Connecting",
    },
    {
      text: "Blood",
      className: "text-red-600 dark:text-red-600",
    },
    {
      text: "Donors",
      className: "text-red-600 dark:text-red-600",
    },
    {
      text: "in",
    },
    {
      text: "SRM.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-t from-red-200 to-red-600">
      {/* Animated Heading */}
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ y: -240, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3.2, ease: "easeOut" }}
        >
          <img className="w-[5.7rem] mr-3" src={drop} alt="" />
        </motion.div>
        <motion.div
          className="text-neutral-600 dark:text-neutral-200 text-9xl font-semibold "
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Uni<span className="text-red-200">Care</span>
        </motion.div>
      </div>

      {/* Animated Subheading */}
      <motion.h2
        className="text-neutral-600 dark:text-neutral-200 text-[2.7rem] mt-2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
      >
        Anyone can be a HERO!
      </motion.h2>

      {/* Animated Typewriter Effect */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      >
        <TypewriterEffectSmooth words={words} />
      </motion.div>

      {/* Animated Buttons */}
      <motion.div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
      >
        <button
          className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-red-600 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gray-50 hover:text-slate-600 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          type="submit"
        >
          Find a donor
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 19"
            className="w-8 h-8 justify-end group-hover:rotate-90 bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full  hover:border-gray-700 border-none p-2 rotate-45"
          >
            <path
              className="fill-gray-800 group-hover:fill-gray-800"
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            ></path>
          </svg>
        </button>

        <button
          className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-red-600 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
          type="submit"
        >
          Register as a donor
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 19"
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
          >
            <path
              className="fill-gray-800 group-hover:fill-gray-800"
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            ></path>
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
