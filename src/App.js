import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import WishlistList from './components/WishlistList';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [items, setItems] = useLocalStorage('wishlist-items', []);
  const [newItem, setNewItem] = useState({ name: '', price: '', url: '', priority: 'medium' });
  const [darkMode, setDarkMode] = useState(false);
  const formRef = useRef(null);

  // Add new item to the wishlist
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    // Create a new item with an ID
    const itemToAdd = {
      id: uuidv4(),
      ...newItem,
      price: newItem.price ? parseFloat(newItem.price) : '',
    };

    setItems([...items, itemToAdd]);
    setNewItem({ name: '', price: '', url: '', priority: 'medium' });
    formRef.current.reset();
  };

  // Delete an item from the wishlist
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value,
    });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container mx-auto py-8 px-4 max-w-2xl">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <button 
            onClick={toggleDarkMode} 
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </header>

        {/* Add new item form */}
        <form 
          ref={formRef}
          onSubmit={handleAddItem} 
          className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-medium mb-4 dark:text-white">Add New Item</h2>
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
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <select
                id="priority"
                name="priority"
                value={newItem.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Wishlist
          </button>
        </form>

        {/* Wishlist items */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-medium mb-4 dark:text-white">
            My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})
          </h2>
          <WishlistList 
            items={items} 
            setItems={setItems} 
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
