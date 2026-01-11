// outputNode.js
// Output node component - defines the endpoint for data in a pipeline
// Allows users to configure output name and type

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * OutputNode Component
 * 
 * A node that represents data output in the pipeline. Users can configure:
 * - Output name: Identifier for this output
 * - Output type: Type of data (Text or Image)
 * 
 * This node has a single input handle on the left side for receiving
 * data from other nodes in the pipeline.
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial values
 */
export const OutputNode = ({ id, data }) => {
  // State for output configuration
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  /**
   * Handle name change
   * Updates the output name state when user types
   */
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  /**
   * Handle type change
   * Updates the output type state when user selects a new option
   */
  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  // Define handles for this node - only input on the left side
  const handles = [
    { id: 'value', type: 'target', position: Position.Left },
  ];

  return (
    <BaseNode
      id={id}
      title='Output'
      icon='bi-box-arrow-right'
      handles={handles}
    >
      {/* Name input field */}
      <div className='form-group'>
        <label className='form-label'>Name</label>
        <input
          type='text'
          className='form-control'
          value={currName}
          onChange={handleNameChange}
          placeholder='Enter output name'
        />
      </div>

      {/* Type selector dropdown */}
      <div className='form-group'>
        <label className='form-label'>Type</label>
        <select
          className='form-select'
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value='Text'>Text</option>
          <option value='File'>Image</option>
        </select>
      </div>
    </BaseNode>
  );
};