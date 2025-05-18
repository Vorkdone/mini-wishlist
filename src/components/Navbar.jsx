import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-transparent border-gray-200 dark:bg-transparent rounded-lg shadow-none my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="text-blue-600 dark:text-blue-400 text-xl font-semibold">
            Listly
          </span>
        </NavLink>

        <button 
          onClick={() => setIsOpen(!isOpen)} 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default" 
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-transparent md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent dark:border-gray-700">
            <li>
              <NavItem to="/" label="Home" />
            </li>
            <li>
              <NavItem to="/projects" label="Wishlist" />
            </li>
            <li>
              <NavItem to="/about" label="About" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        `block py-2 px-3 ${
          isActive 
            ? 'text-blue-400 md:bg-transparent md:text-blue-400 md:p-0 dark:text-blue-400'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default Navbar; 