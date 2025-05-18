import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative"
        >
          <div className="inline-block relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gray-600/10 backdrop-blur-sm rounded-lg px-10 py-6 mb-6 w-auto inline-block"
            >
              <h1 className="text-5xl md:text-6xl font-semibold text-gray-700 dark:text-gray-400 relative inline-flex items-center">
                Welcome 
                <span className="ml-4">to</span>
                <span className="ml-4">Listly</span>
              </h1>
            </motion.div>
          </div>

          <motion.p 
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A beautifully simple wishlist app — add, drag, stack & dream.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/projects" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Explore Wishlist</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/about" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 dark:text-blue-400 text-blue-600 font-medium border border-gray-700 hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <span>Meet the Developer</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div 
          className="bg-gray-800/50 dark:bg-gray-800/50 bg-gray-200/80 rounded-lg shadow-md p-6 border dark:border-gray-700 border-gray-200"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-6">
            <div className="dark:bg-blue-900/30 bg-blue-500/20 p-3 rounded-lg mr-4">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-blue-600 dark:text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </motion.svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Key Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard 
              title="Drag & Drop"
              description="Easily reorder your wishlist items with intuitive drag and drop functionality"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              }
              delay={0.7}
            />
            
            <FeatureCard 
              title="Priority Levels"
              description="Mark items with different priority levels for better organization"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              }
              delay={0.8}
            />
            
            <FeatureCard 
              title="Dark Mode"
              description="Easy on the eyes with automatic dark mode support"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
              delay={0.9}
            />
            
            <FeatureCard 
              title="Local Storage"
              description="Your items persist even when you close the browser"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
              }
              delay={1.0}
            />
          </div>
        </motion.div>
        
        <motion.div
          className="bg-gray-800/50 dark:bg-gray-800/50 bg-gray-200/80 rounded-lg shadow-md p-6 border dark:border-gray-700 border-gray-200" 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center mb-6">
            <div className="dark:bg-green-900/30 bg-green-500/20 p-3 rounded-lg mr-4">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-green-600 dark:text-green-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 4 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </motion.svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Getting Started</h2>
          </div>
          
          <ol className="space-y-4 flex flex-col items-center">
            <StepItem 
              number={1}
              title="Navigate to the Wishlist"
              description="Click on the 'Wishlist' tab in the navigation bar"
              delay={0.7}
            />
            
            <StepItem 
              number={2}
              title="Add Your First Item"
              description="Fill out the form with title, description, and priority"
              delay={0.8}
            />
            
            <StepItem 
              number={3}
              title="Organize Your List"
              description="Drag and drop items to rearrange them in your preferred order"
              delay={0.9}
            />
            
            <StepItem 
              number={4}
              title="Edit or Remove Items"
              description="Use the edit and delete buttons to manage your wishlist"
              delay={1.0}
            />
          </ol>
        </motion.div>
      </motion.section>
    </div>
  );
}

const FeatureCard = ({ title, description, icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="flex flex-col p-4 rounded-lg dark:bg-gray-700/50 bg-gray-100/80"
    whileHover={{ scale: 1.03 }}
  >
    <motion.div 
      className="p-2 dark:bg-blue-900/30 bg-blue-500/20 rounded-full w-10 h-10 flex items-center justify-center mb-3 dark:text-blue-400 text-blue-600"
      whileHover={{ rotate: 15 }}
    >
      {icon}
    </motion.div>
    <h3 className="font-semibold text-lg mb-2 dark:text-white text-gray-800">{title}</h3>
    <p className="text-sm dark:text-gray-300 text-gray-600">{description}</p>
  </motion.div>
);

const StepItem = ({ number, title, description, delay }) => (
  <motion.li 
    className="flex w-full max-w-md"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ x: 5 }}
  >
    <div className="flex items-start w-full">
      <div className="flex-shrink-0 mr-4">
        <motion.div 
          className="w-8 h-8 rounded-full dark:bg-green-900/30 bg-green-500/20 flex items-center justify-center dark:text-green-400 text-green-600 font-semibold"
          whileHover={{ scale: 1.2 }}
        >
          {number}
        </motion.div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-lg dark:text-white text-gray-800">{title}</h3>
        <p className="dark:text-gray-300 text-gray-600">{description}</p>
      </div>
    </div>
  </motion.li>
); 