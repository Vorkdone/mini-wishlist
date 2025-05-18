import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import WishlistItem from './WishlistItem';

const WishlistList = ({ items, setItems, onDelete, onEdit }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    
    setItems(newItems);
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-8 text-center border border-dashed rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
      >
        <motion.div 
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4"
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            repeatType: "mirror",
            ease: "easeInOut"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </motion.div>
        <motion.h3 
          className="text-lg font-medium text-gray-900 dark:text-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your wishlist is empty
        </motion.h3>
        <motion.p 
          className="mt-1 text-gray-500 dark:text-gray-400 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Add some items to your wishlist by clicking the "Add New Item" button above.
        </motion.p>
      </motion.div>
    );
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="wishlist">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`space-y-3 ${snapshot.isDraggingOver ? "bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-2" : ""}`}
            >
              <AnimatePresence mode="wait" presenceAffectsLayout={false}>
                {items.map((item, index) => (
                  <WishlistItem 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                ))}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      <motion.p 
        className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span 
          className="inline-block mr-1"
          animate={{ 
            y: [0, -3, 0, 3, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            repeatDelay: 1
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </motion.span>
        Drag items to reorder your wishlist
      </motion.p>
    </div>
  );
};

export default WishlistList; 