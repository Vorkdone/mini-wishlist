import React from 'react';
import { motion } from 'framer-motion';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center py-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          My Wishlist
        </motion.h1>
        <motion.p 
          className="text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Save and organize your wishlist items
        </motion.p>
      </motion.div>
      <motion.button 
        onClick={toggleDarkMode} 
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Toggle dark mode"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
        initial={{ opacity: 0, rotate: 180, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.div
          animate={{ rotate: darkMode ? 0 : 180 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </header>
  );
};

export default Header; 