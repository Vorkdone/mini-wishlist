import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

const AddItem = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({ name: '', price: '', url: '', priority: 'Medium' });
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const previousScrollPosition = useRef(0);
  
  // Handle scrolling when the form expands or collapses
  useEffect(() => {
    if (isExpanded && formRef.current) {
      // Store current scroll position
      previousScrollPosition.current = window.scrollY;
      
      // Add a delay to ensure the form is fully rendered and animated
      const scrollTimer = setTimeout(() => {
        if (formRef.current) {
          // Get updated measurements after the form is rendered
          const rect = formRef.current.getBoundingClientRect();
          const formTop = window.scrollY + rect.top;
          const formHeight = rect.height;
          const windowHeight = window.innerHeight;
          
          // Calculate position to center the form in the viewport
          const offset = windowHeight > formHeight ? (windowHeight - formHeight) / 2 : 100;
          const scrollToY = Math.max(0, formTop - offset);
          
          // Smooth scroll to center the form
          window.scrollTo({
            top: scrollToY,
            behavior: 'smooth'
          });
        }
      }, 250); // Longer delay to ensure form is fully rendered and animated
      
      return () => clearTimeout(scrollTimer);
    } else if (!isExpanded) {
      // Small delay to ensure animations have started before scrolling back
      const returnTimer = setTimeout(() => {
        window.scrollTo({
          top: previousScrollPosition.current,
          behavior: 'smooth'
        });
      }, 100);
      
      return () => clearTimeout(returnTimer);
    }
  }, [isExpanded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    // Create a new item with an ID
    const itemToAdd = {
      id: uuidv4(),
      ...newItem,
      price: newItem.price ? parseFloat(newItem.price) : '',
      createdAt: new Date().toISOString(),
    };

    onAddItem(itemToAdd);
    setNewItem({ name: '', price: '', url: '', priority: 'Medium' });
    formRef.current.reset();
    setIsExpanded(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  const toggleForm = (value) => {
    setIsExpanded(value);
  };

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <motion.div 
                  className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-md mr-2 flex-shrink-0"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-blue-600 dark:text-blue-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </motion.svg>
                </motion.div>
                Add New Item
              </h2>
            </div>
            
            <motion.button
              key="add-button"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ 
                scale: 1.01,
                backgroundColor: "rgba(59, 130, 246, 0.05)" 
              }}
              onClick={() => toggleForm(true)}
              className="w-full h-16 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 backdrop-blur-sm"
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Item
              </span>
            </motion.button>
          </div>
        ) : (
          <>
            {/* Invisible overlay - only used for structure, not visible */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-10 pointer-events-none"
            />
            <motion.div
              key="add-form"
              initial={{ opacity: 0, scale: 0.98, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ 
                duration: 0.35,
                type: "spring", 
                stiffness: 300, 
                damping: 25,
                exit: { duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }
              }}
              className="z-20 relative"
            >
              <motion.form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 15, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  bounce: 0.3,
                  exit: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium dark:text-white">Add New Item</h2>
                  <motion.button 
                    type="button"
                    onClick={() => toggleForm(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Item Name*
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newItem.name}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="PlayStation 5"
                      autoFocus
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="price" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="price"
                      name="price"
                      value={newItem.price}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="50000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label 
                      htmlFor="url" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      name="url"
                      value={newItem.url}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="https://example.com/product"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label 
                      htmlFor="priority" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Priority
                    </label>
                    <div className="flex gap-2">
                      {['High', 'Medium', 'Low'].map((priority) => (
                        <motion.label 
                          key={priority} 
                          className={`flex-1 flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                            newItem.priority === priority 
                              ? priority === 'High' 
                                ? 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/30 dark:border-red-800/30 dark:text-red-300' 
                                : priority === 'Medium' 
                                  ? 'bg-yellow-100 border-yellow-400 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-800/30 dark:text-yellow-300'
                                  : 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/30 dark:border-green-800/30 dark:text-green-300'
                              : 'bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={priority}
                            checked={newItem.priority === priority}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="capitalize">{priority}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => toggleForm(false)}
                    className="py-2 px-5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Wishlist
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddItem; 