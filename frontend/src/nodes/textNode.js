// textNode.js
// Text node component - holds and displays text with variable interpolation
// Supports dynamic handles based on {{variable}} syntax

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * TextNode Component
 * 
 * A node for text manipulation with dynamic variable support.
 * Users can enter text containing {{variables}} and the node will
 * automatically create input handles for each unique variable.
 * 
 * Features:
 * - Auto-resizing textarea
 * - Dynamic handle creation from {{variable}} syntax
 * - Variable indicator badges
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial text value
 */
export const TextNode = ({ id, data }) => {
  // State for the text content
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  // Ref for auto-resizing textarea
  const textareaRef = useRef(null);

  /**
   * Handle text change
   * Updates the text state when user types
   */
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  /**
   * Auto-resize the textarea based on content
   * Also calculates appropriate node height
   */
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get accurate scrollHeight
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [currText]);

  /**
   * Parse text for variables
   * Extracts unique variable names from {{variable}} patterns
   * @param {string} text - Text to parse
   * @returns {string[]} Array of unique variable names
   */
  const parseVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = new Set();
    let match;
    while ((match = regex.exec(text)) !== null) {
      variables.add(match[1]);
    }
    return Array.from(variables);
  };

  // Get unique variables from current text
  const variables = parseVariables(currText);

  // Define handles - one output on right, dynamic inputs on left for each variable
  const handles = [
    { id: 'output', type: 'source', position: Position.Right },
    ...variables.map((variable) => ({
      id: variable,
      type: 'target',
      position: Position.Left,
    })),
  ];

  return (
    <BaseNode
      id={id}
      title='Text'
      icon='bi-fonts'
      handles={handles}
    >
      {/* Text input area */}
      <div className='form-group'>
        <label className='form-label'>Content</label>
        <textarea
          ref={textareaRef}
          className='form-textarea'
          value={currText}
          onChange={handleTextChange}
          placeholder='Enter text with {{variables}}'
          style={{ minHeight: '60px' }}
        />
      </div>

      {/* Variable indicators - shown as badges */}
      {variables.length > 0 && (
        <div className='mt-2' style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {variables.map((v) => (
            <span key={v} className='badge badge-info' style={{ fontSize: '0.625rem' }}>
              {v}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};