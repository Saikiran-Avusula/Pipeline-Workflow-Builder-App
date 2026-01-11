// BaseNode.js
// Base component that provides common styling and functionality for all node types
// This abstracts shared features like the card container, handles, and delete button

import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';

/**
 * BaseNode Component
 * 
 * A wrapper component that provides consistent Bootstrap-inspired styling
 * for all node types. Handles common features:
 * - Card-style container with shadow
 * - Dynamic connection handles
 * - Delete button functionality
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {string} title - Node title displayed in header
 * @param {string} icon - Bootstrap Icons class name (e.g., 'bi-cpu')
 * @param {ReactNode} children - Node-specific content
 * @param {Array} handles - Array of handle configurations
 * @param {object} style - Additional custom styles (optional)
 */
const BaseNode = ({ id, title, icon, children, handles = [], style = {} }) => {
  // Get the onNodesChange action from store for delete functionality
  const { onNodesChange } = useStore(selector => ({ onNodesChange: selector.onNodesChange }));

  /**
   * Handle node deletion
   * Dispatches a 'remove' change to the store to delete this node
   */
  const handleDelete = () => {
    onNodesChange([{ type: 'remove', id }]);
  };

  return (
    <div className='node-card' style={style}>
      {/* Node header with icon, title, and delete button */}
      <div className='node-header'>
        <div className='node-title'>
          {icon && <i className={`bi ${icon}`}></i>}
          <span>{title}</span>
        </div>

        {/* Delete button - positioned in header for easy access */}
        <button
          onClick={handleDelete}
          className='btn-danger-sm'
          title='Delete Node'
        >
          ×
        </button>
      </div>

      {/* Node body - contains child components (form controls, etc.) */}
      <div className='node-body'>
        {children}
      </div>

      {/* Render connection handles based on configuration */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          className='node-handle'
        />
      ))}
    </div>
  );
};

export default BaseNode;