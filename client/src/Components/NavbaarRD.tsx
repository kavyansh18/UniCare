// NavbarDL.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/drop.png';
import arrow from '../assets/arrow.png';

const MenuIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NavbarDL: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full h-full px-2 py-2 flex justify-between items-center lg:px-12">
      {/* Large Screen Navbar */}
      <div className="hidden lg:flex w-full h-full justify-between items-center">
        <NavLink to="/">
          <div className="flex flex-row items-center gap-2">
            <img className="w-12" src={logo} alt="UniCare Logo" />
            <div className="text-lg font-semibold text-red-500">UniCare</div>
          </div>
        </NavLink>

        <div className="text-4xl font-bold text-slate-700 ml-32">
          Register as a donor
        </div>

        <div className="flex flex-row gap-2">
          <NavLink to="/updateInfo">
            <button className="register-btn lg:scale-100 scale-[0.65]">
              <span>Update your info</span>
            </button>
          </NavLink>
          <NavLink to="/donors">
            <button className="register-btn lg:scale-100 scale-[0.65]">
              <span>Find a donor</span>
            </button>
          </NavLink>
        </div>
      </div>

      {/* Small Screen Navbar */}
      <div className="lg:hidden flex items-center w-full">
        <NavLink to="/">
          <div className="flex flex-row items-center gap-1">
            <img className="w-6" src={logo} alt="UniCare Logo" />
            <div className="text-sm font-semibold text-red-500">UniCare</div>
          </div>
        </NavLink>

        <div className="ml-auto text-lg font-bold text-slate-700">
          Register as a donor
        </div>

        <button onClick={toggleMenu} className="p-2 ml-auto">
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed top-0 right-0 w-[12rem] h-[8rem] bg-white z-50 glass"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative h-full">
                
                <div className="flex flex-col justify-start items-end pt-12 pr-4 h-full">
                <button 
                  onClick={toggleMenu} 
                  className="absolute top-2 right-4 p-1 text-white bg-red-500 rounded-full"
                >
                  <CloseIcon />
                </button>
                  <NavLink to="/updateInfo" onClick={toggleMenu}>
                    <button className="font-bold mb-4 flex justify-center items-center gap-1">
                      <span>Update your info</span>
                      <span><img className='w-5' src={arrow} alt="" /></span>
                    </button>
                  </NavLink>
                  <NavLink to="/donors" onClick={toggleMenu}>
                    <button className="font-bold flex justify-center items-center gap-1">
                      <span>Find a donor</span>
                      <span><img className='w-5' src={arrow} alt="" /></span>
                    </button>
                  </NavLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NavbarDL;
