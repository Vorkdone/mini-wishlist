import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EditItemModal = ({ item, isOpen, onClose, onSave }) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const modalRef = useRef(null);
  
  // Reset the form when a different item is being edited
  useEffect(() => {
    if (item) {
      setEditedItem({ ...item });
    }
  }, [item]);
  
  // Close modal on escape key press or outside click
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({
      ...editedItem,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create updated item with parsed price
    const updatedItem = {
      ...editedItem,
      price: editedItem.price ? parseFloat(editedItem.price) : '',
    };
    
    onSave(updatedItem);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Item</h3>
                <motion.button 
                  type="button" 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4">
                  <div>
                    <label 
                      htmlFor="edit-name" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Item Name*
                    </label>
                    <input
                      type="text"
                      id="edit-name"
                      name="name"
                      value={editedItem.name || ''}
                      onChange={handleChange}
                      required
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="edit-price" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      id="edit-price"
                      name="price"
                      value={editedItem.price || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="edit-url" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      URL
                    </label>
                    <input
                      type="url"
                      id="edit-url"
                      name="url"
                      value={editedItem.url || ''}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Priority
                    </label>
                    <div className="flex gap-2">
                      {['high', 'medium', 'low'].map((priority) => (
                        <motion.label 
                          key={priority} 
                          className={`flex-1 flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                            editedItem.priority === priority 
                              ? priority === 'high' 
                                ? 'bg-red-100 border-red-400 text-red-800' 
                                : priority === 'medium' 
                                  ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                                  : 'bg-green-100 border-green-400 text-green-800'
                              : 'bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                          }`}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <input
                            type="radio"
                            name="priority"
                            value={priority}
                            checked={editedItem.priority === priority}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="capitalize">{priority}</span>
                        </motion.label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditItemModal; 