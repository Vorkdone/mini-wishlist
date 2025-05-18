import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddItem = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({ name: '', price: '', url: '', priority: 'medium' });
  const [isExpanded, setIsExpanded] = useState(false);
  const formRef = useRef(null);

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
    setNewItem({ name: '', price: '', url: '', priority: 'medium' });
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

  return (
    <div className="mb-8">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Item
        </button>
      ) : (
        <form 
          ref={formRef}
          onSubmit={handleSubmit} 
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 animate-fade-in"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium dark:text-white">Add New Item</h2>
            <button 
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
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
                {['high', 'medium', 'low'].map((priority) => (
                  <label 
                    key={priority} 
                    className={`flex-1 flex items-center justify-center p-2 border rounded-md cursor-pointer transition-colors ${
                      newItem.priority === priority 
                        ? priority === 'high' 
                          ? 'bg-red-100 border-red-400 text-red-800' 
                          : priority === 'medium' 
                            ? 'bg-yellow-100 border-yellow-400 text-yellow-800'
                            : 'bg-green-100 border-green-400 text-green-800'
                        : 'bg-gray-50 border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    }`}
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
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="mr-2 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add to Wishlist
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddItem; 