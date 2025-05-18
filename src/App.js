import React, { useState } from 'react';
import Header from './components/Header';
import AddItem from './components/AddItem';
import WishlistList from './components/WishlistList';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [items, setItems] = useLocalStorage('wishlist-items', []);
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode', false);

  // Add new item to the wishlist
  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  // Delete an item from the wishlist
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Apply dark mode on load
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 max-w-2xl pt-4 pb-8">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="mt-6">
          <AddItem onAddItem={handleAddItem} />
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium dark:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                My Wishlist
              </h2>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900/30 dark:text-blue-300">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            
            <WishlistList 
              items={items} 
              setItems={setItems} 
              onDelete={handleDeleteItem}
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
