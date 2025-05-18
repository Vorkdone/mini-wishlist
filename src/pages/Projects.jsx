import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import AddItem from '../components/AddItem';
import WishlistList from '../components/WishlistList';
import useLocalStorage from '../hooks/useLocalStorage';
import EditItemModal from '../components/EditItemModal';

// Maximum number of panels allowed
const MAX_PANELS = 4;

// Simple FilterTab component
const FilterTab = ({ label, count, active, onClick, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  };
  
  return (
    <motion.button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-xs font-medium 
        ${active 
          ? `ring-2 ring-${color}-500 dark:ring-${color}-400 ${colorClasses[color]}` 
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`
      }
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label} {count > 0 && <span className="ml-1">({count})</span>}
    </motion.button>
  );
};

// Pagination button component
const PaginationButton = ({ onClick, active, disabled, children }) => (
  <motion.button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
      ${active 
        ? 'bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600' 
        : disabled
          ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`
    }
    whileHover={!disabled ? { scale: 1.05 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
  >
    {children}
  </motion.button>
);

// Panel Tab component
const PanelTab = ({ panel, active, onClick, onDelete }) => {
  return (
    <div 
      className={`flex items-center rounded-t-lg px-4 py-2 border-t border-l border-r border-b-0 cursor-pointer
        ${active 
          ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
          : 'bg-gray-100 dark:bg-gray-700 border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-750'
        }
      `}
      onClick={onClick}
    >
      <span className="font-medium text-sm text-gray-800 dark:text-gray-200">
        {panel.name}
      </span>
      {onDelete && (
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(panel.id);
          }}
          className="ml-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors dark:hover:bg-red-900/30"
          aria-label={`Delete panel ${panel.name}`}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      )}
    </div>
  );
};

const Projects = () => {
  // Store panels and their items
  const [panels, setPanels] = useLocalStorage('wishlist-panels', [
    { id: 'default', name: 'Main Wishlist', items: [] }
  ]);
  const [activePanel, setActivePanel] = useState('default');
  const [newPanelName, setNewPanelName] = useState('');
  const [isAddingPanel, setIsAddingPanel] = useState(false);

  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // Options: 'all', 'high', 'medium', 'low'
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Check if maximum number of panels is reached
  const isPanelLimitReached = panels.length >= MAX_PANELS;

  // Get items from the active panel
  const items = useMemo(() => {
    const panel = panels.find(p => p.id === activePanel);
    return panel ? panel.items : [];
  }, [panels, activePanel]);

  // Update items in the active panel
  const setItems = useCallback((newItems) => {
    setPanels(prevPanels => 
      prevPanels.map(panel => 
        panel.id === activePanel 
          ? { ...panel, items: newItems }
          : panel
      )
    );
  }, [activePanel, setPanels]);

  // Add a new panel if limit not reached
  const addPanel = useCallback(() => {
    if (newPanelName.trim() && panels.length < MAX_PANELS) {
      const newPanelId = `panel-${Date.now()}`;
      setPanels(prevPanels => [
        ...prevPanels,
        { id: newPanelId, name: newPanelName, items: [] }
      ]);
      setActivePanel(newPanelId);
      setNewPanelName('');
      setIsAddingPanel(false);
    }
  }, [newPanelName, panels.length, setPanels]);

  // Delete a panel
  const deletePanel = useCallback((panelId) => {
    if (panels.length > 1) {
      setPanels(prevPanels => prevPanels.filter(panel => panel.id !== panelId));
      // If the active panel is deleted, switch to the first available panel
      if (activePanel === panelId) {
        setActivePanel(panels.find(p => p.id !== panelId)?.id || '');
      }
    }
  }, [panels, activePanel, setPanels]);

  // Use memoization to calculate counts only when items change
  const { highCount, mediumCount, lowCount } = useMemo(() => {
    return {
      highCount: items.filter(item => item.priority?.toLowerCase() === 'high').length,
      mediumCount: items.filter(item => item.priority?.toLowerCase() === 'medium').length,
      lowCount: items.filter(item => item.priority?.toLowerCase() === 'low').length
    };
  }, [items]);

  // Filter items based on active tab
  const filteredItems = useMemo(() => {
    if (activeTab === 'all') return items;
    return items.filter(item => item.priority?.toLowerCase() === activeTab);
  }, [items, activeTab]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activePanel]);

  // Add new item to the wishlist
  const handleAddItem = useCallback((item) => {
    setItems([...items, item]);
  }, [items, setItems]);

  // Delete an item from the wishlist
  const handleDeleteItem = useCallback((id) => {
    setItems(items.filter(item => item.id !== id));
  }, [items, setItems]);
  
  // Open edit modal
  const handleEditItem = useCallback((item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  }, []);
  
  // Save edited item
  const handleSaveEdit = useCallback((updatedItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
  }, [items, setItems]);
  
  // Close edit modal
  const handleCloseEditModal = useCallback(() => {
    setIsEditModalOpen(false);
    setTimeout(() => setEditingItem(null), 300);
  }, []);

  // Handle moving to next or previous page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle reordering of items
  const handleItemsReorder = useCallback((reorderedItems) => {
    // Find where in the full list the paginated items are
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    
    // Create a new array with the updated items
    const newItems = [...items];
    for (let i = 0; i < reorderedItems.length; i++) {
      newItems[startIndex + i] = reorderedItems[i];
    }
    
    setItems(newItems);
  }, [items, currentPage, setItems]);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Your Wishlist
        </motion.h1>
        <motion.p 
          className="text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Organize your dreams and aspirations in one place.
        </motion.p>
      </motion.div>
    
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add new wishlist section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-1 flex flex-col"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 flex-grow flex flex-col">
            <AddItem onAddItem={handleAddItem} />
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex-grow">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Quick Stats
              </h3>
              
              <motion.div 
                className="grid grid-cols-2 gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center"
                  whileHover={{ y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <motion.p 
                    className="text-2xl font-bold text-gray-900 dark:text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    {items.length}
                  </motion.p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total Items</p>
                </motion.div>
                <motion.div 
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center"
                  whileHover={{ y: -3, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                >
                  <motion.p 
                    className="text-2xl font-bold text-green-600 dark:text-green-400"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 6 }}
                    key={`high-count-${highCount}`} // Force animation to reset when count changes
                  >
                    {highCount}
                  </motion.p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">High Priority</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Wishlist stack section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:col-span-2 flex flex-col"
        >
          {/* Panel selector */}
          <div className="flex flex-col mb-4">
            <div className="flex items-center overflow-x-auto pb-2 hide-scrollbar">
              {panels.map(panel => (
                <PanelTab 
                  key={panel.id}
                  panel={panel}
                  active={activePanel === panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  onDelete={panels.length > 1 ? deletePanel : null}
                />
              ))}
              
              {isAddingPanel ? (
                <div className="flex items-center ml-2 bg-white dark:bg-gray-800 rounded-t-lg px-3 py-1.5 border border-gray-200 dark:border-gray-700">
                  <input
                    type="text"
                    value={newPanelName}
                    onChange={(e) => setNewPanelName(e.target.value)}
                    placeholder="Panel name"
                    className="text-sm outline-none bg-transparent text-gray-800 dark:text-gray-200"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') addPanel();
                      if (e.key === 'Escape') setIsAddingPanel(false);
                    }}
                  />
                  <div className="flex ml-2">
                    <motion.button
                      onClick={addPanel}
                      className="p-1 rounded-full text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={() => setIsAddingPanel(false)}
                      className="p-1 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              ) : (
                !isPanelLimitReached && (
                  <motion.button
                    onClick={() => setIsAddingPanel(true)}
                    className="ml-2 p-2 rounded-t-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </motion.button>
                )
              )}
            </div>
            
            {isPanelLimitReached && !isAddingPanel && (
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 ml-1">
                Maximum of {MAX_PANELS} panels reached. Delete a panel to add a new one.
              </div>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <motion.div 
                  className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-3"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-indigo-600 dark:text-indigo-400" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </motion.svg>
                </motion.div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {panels.find(p => p.id === activePanel)?.name || "Wishlist Items"}
                </h2>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <FilterTab 
                  label="All" 
                  count={items.length}
                  active={activeTab === 'all'} 
                  onClick={() => setActiveTab('all')}
                />
                <FilterTab 
                  label="High" 
                  count={highCount}
                  active={activeTab === 'high'} 
                  onClick={() => setActiveTab('high')}
                  color="red"
                />
                <FilterTab 
                  label="Medium" 
                  count={mediumCount}
                  active={activeTab === 'medium'} 
                  onClick={() => setActiveTab('medium')}
                  color="yellow"
                />
                <FilterTab 
                  label="Low" 
                  count={lowCount}
                  active={activeTab === 'low'} 
                  onClick={() => setActiveTab('low')}
                  color="green"
                />
              </div>
            </div>
            
            {filteredItems.length === 0 ? (
              <motion.div 
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </motion.svg>
                <p className="text-gray-500 dark:text-gray-400 mb-2">No items found</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  {activeTab !== 'all' ? 'Try selecting a different filter or' : 'Start by'} adding a new item
                </p>
              </motion.div>
            ) : (
              <>
                <WishlistList 
                  items={paginatedItems} 
                  setItems={handleItemsReorder} 
                  onDelete={handleDeleteItem}
                  onEdit={handleEditItem}
                />

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-8 space-x-2">
                    <PaginationButton 
                      onClick={() => handlePageChange(1)} 
                      disabled={currentPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                    </PaginationButton>
                    
                    <PaginationButton 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </PaginationButton>
                    
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <PaginationButton 
                        key={index}
                        onClick={() => handlePageChange(index + 1)} 
                        active={currentPage === index + 1}
                      >
                        {index + 1}
                      </PaginationButton>
                    ))}
                    
                    <PaginationButton 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </PaginationButton>
                    
                    <PaginationButton 
                      onClick={() => handlePageChange(totalPages)} 
                      disabled={currentPage === totalPages}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </PaginationButton>
                  </div>
                )}
                
                <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length} items
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Edit Modal */}
      <EditItemModal 
        item={editingItem} 
        isOpen={isEditModalOpen} 
        onClose={handleCloseEditModal} 
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default Projects; 