import React from 'react';
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="w-full">
      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <span className="text-4xl">👋</span>
          </div>
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            B.Tech CSE student passionate about full-stack development and AI/ML
          </p>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 max-w-4xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile section */}
          <div className="col-span-1">
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-6 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-xl">
                <div className="bg-white dark:bg-gray-800 p-1 rounded-lg">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <motion.span 
                      className="text-5xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      👨‍💻
                    </motion.span>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">CSE Student</h2>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">3rd Year B.Tech</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Skill name="React" />
                <Skill name="Tailwind CSS" />
                <Skill name="Framer Motion" />
                <Skill name="Flask" />
                <Skill name="Hugging Face" />
              </div>
            </div>
          </div>
          
          {/* Bio section */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              My Journey
            </h3>
            
            <div className="prose prose-blue dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I'm a 3rd-year B.Tech CSE student passionate about full-stack development and AI/ML. I work with React, Tailwind CSS, Framer Motion, Flask, and Hugging Face models.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                My projects include EmoWise, a sentiment analysis app integrated with Twilio, and a drag-and-drop Wishlist App. I'm also exploring tools like n8n, Cursor AI, and prompt engineering to build smarter, efficient applications.
              </p>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3 text-purple-600 dark:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  Projects
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ProjectCard 
                    title="Listly" 
                    description="A drag-and-drop wishlist app with multi-panel organization and priority filtering"
                    tags={["React", "Tailwind", "Framer Motion"]}
                  />
                  
                  <ProjectCard 
                    title="EmoWise" 
                    description="Sentiment analysis application with Twilio integration for text analysis"
                    tags={["Flask", "Hugging Face", "Twilio API"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const Skill = ({ name }) => (
  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900/30 dark:text-blue-300">
    {name}
  </span>
);

const ProjectCard = ({ title, description, tags }) => (
  <motion.div 
    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h4>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{description}</p>
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span 
          key={index} 
          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
); 