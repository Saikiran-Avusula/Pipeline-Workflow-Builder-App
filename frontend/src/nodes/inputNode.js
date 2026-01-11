// inputNode.js
// Input node component - defines the starting point for data in a pipeline
// Allows users to configure input name and type

import React, { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * InputNode Component
 * 
 * A node that represents data input in the pipeline. Users can configure:
 * - Input name: Identifier for this input
 * - Input type: Type of data (Text or File)
 * 
 * This node has a single output handle on the right side for connecting
 * to other nodes in the pipeline.
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial values
 */
export const InputNode = ({ id, data }) => {
  // State for input configuration
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  // Define handles for this node - only output on the right side
  const handles = [
    { id: 'value', type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      title='Input'
      icon='bi-box-arrow-in-right'
      handles={handles}
    >
      {/* Name input field */}
      <div className='form-group'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control'
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          placeholder='Enter input name'
        />
      </div>

      {/* Type selector dropdown */}
      <div className='form-group'>
        <label className='form-label'>Type</label>
        <select
          className='form-select'
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value='Text'>Text</option>
          <option value='File'>File</option>
        </select>
      </div>
    </BaseNode>
  );
};