import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const PRIORITY_COLORS = {
  high: "bg-red-100 border-red-300",
  medium: "bg-yellow-100 border-yellow-300",
  low: "bg-green-100 border-green-300"
};

const WishlistItem = ({ item, index, onDelete }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 border rounded-lg shadow transition-all ${
            snapshot.isDragging ? "shadow-lg" : ""
          } ${item.priority ? PRIORITY_COLORS[item.priority] : "bg-white border-gray-200"}`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{item.name}</h3>
              {item.price && (
                <p className="text-sm text-gray-600">${item.price}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {item.priority && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  item.priority === 'high' ? "bg-red-200 text-red-800" : 
                  item.priority === 'medium' ? "bg-yellow-200 text-yellow-800" : 
                  "bg-green-200 text-green-800"
                }`}>
                  {item.priority}
                </span>
              )}
              
              <button 
                onClick={() => onDelete(item.id)}
                className="ml-2 p-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
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
              className="mt-2 text-blue-600 hover:underline text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              View item
            </a>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default WishlistItem; 