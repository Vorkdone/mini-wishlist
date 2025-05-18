import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const PRIORITY_COLORS = {
  high: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/30",
  medium: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/30",
  low: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/30"
};

const PRIORITY_BADGES = {
  high: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
  low: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
};

const WishlistItem = ({ item, index, onDelete }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group p-4 mb-3 border rounded-xl shadow transition-all duration-200 ${
            snapshot.isDragging ? "shadow-lg scale-[1.02] rotate-1" : "hover:shadow-md hover:scale-[1.01]"
          } ${item.priority ? PRIORITY_COLORS[item.priority] : "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"}`}
        >
          <div className="flex items-start gap-3">
            {/* Drag handle icon */}
            <div className="mt-1.5 text-gray-400 dark:text-gray-600 opacity-50 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                  {item.price && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">₹{item.price.toLocaleString()}</span>
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {item.priority && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${PRIORITY_BADGES[item.priority]}`}>
                      {item.priority}
                    </span>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors dark:hover:bg-red-900/30"
                    aria-label="Delete item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {item.url && (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm flex items-center group-hover:underline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  View item
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default WishlistItem; 