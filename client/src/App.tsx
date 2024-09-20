import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { TypewriterEffectSmooth } from "./Components/TypewriterEffect";
import drop from "./assets/drop.png";
import { NavLink } from "react-router-dom";
import smallScreenImg from "./assets/landing-bg-smallb.png"; 
import largeScreenImg from "./assets/landing-bg.png";

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

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const backgroundImg = isSmallScreen ? smallScreenImg : largeScreenImg;

  return (
    <div className="flex flex-col items-center justify-start lg:pt-24 pt-12 h-screen bg-gradient-to-t from-red-200 to-red-600 relative overflow-hidden">
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

      <div className="flex justify-center items-center relative z-10">
        <motion.div
          initial={{ y: -240, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
          <img className="lg:w-[5.7rem] w-[3.4rem] mr-3" src={drop} alt="" />
        </motion.div>
        <motion.div
          className="text-white lg:text-9xl text-6xl font-semibold "
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          UniCare
        </motion.div>
      </div>

      <motion.h2
        className="text-red-600 font-semibold lg:text-[2.4rem] text-2xl lg:mt-2 mt-4 relative z-10"
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
        className="relative z-10 lg:pt-12 lg:pb-5 pb-0"
      >
        <TypewriterEffectSmooth words={words} />
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4 relative z-10"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
      >
        <NavLink to="donors">
          <button
            className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-red-600 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-gray-50 hover:text-slate-600 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group lg:scale-100 scale-[0.9]"
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
        </NavLink>

        <NavLink to="register">
          <button
            className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-red-600 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group lg:scale-100 scale-[0.8]"
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
        </NavLink>
      </motion.div>
    </div>
  );
}
