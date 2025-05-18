import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import SimpleBackground from './components/SimpleBackground';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply dark mode on initial load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-dark-primary text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
        <SimpleBackground />
        
        <div className="max-w-screen-xl mx-auto w-full px-4 pt-4 pb-8 flex-grow">
          <div className="flex justify-end mb-2">
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              aria-label="Toggle dark mode"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: darkMode ? 0 : 360 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              {darkMode ? (
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </motion.svg>
              ) : (
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </motion.svg>
              )}
            </motion.button>
          </div>
          
          <Navbar />
          
          <main className="mt-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
        
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-transparent rounded-lg shadow-none m-4 dark:bg-transparent max-w-screen-xl mx-auto w-full"
        >
          <div className="w-full p-4 flex justify-center">
            <motion.span 
              whileHover={{ scale: 1.02 }}
              className="text-sm text-gray-500 text-center dark:text-gray-400"
            >
              © {new Date().getFullYear()} <a href="/" className="hover:underline">Listly</a>. All Rights Reserved.
            </motion.span>
          </div>
        </motion.footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
