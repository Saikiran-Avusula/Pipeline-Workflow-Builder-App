// timerNode.js
// Timer node component - adds a delay in the pipeline execution
// Useful for rate limiting or scheduled operations

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * TimerNode Component
 * 
 * A node that introduces a delay in the pipeline execution.
 * Users can configure the delay duration in milliseconds.
 * 
 * Use cases:
 * - Rate limiting API calls
 * - Scheduling operations
 * - Adding pauses between steps
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial delay value
 */
export const TimerNode = ({ id, data }) => {
  // State for delay configuration (in milliseconds)
  const [delay, setDelay] = useState(data?.delay || 1000);

  /**
   * Handle delay value change
   */
  const handleDelayChange = (e) => {
    setDelay(Number(e.target.value));
  };

  // Define handles - trigger input on left, output on right
  const handles = [
    { id: 'trigger', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ];

  /**
   * Convert milliseconds to human-readable format
   */
  const formatDelay = (ms) => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(1)}s`;
    }
    return `${ms}ms`;
  };

  return (
    <BaseNode
      id={id}
      title='Timer'
      icon='bi-clock'
      handles={handles}
    >
      {/* Delay input */}
      <div className='form-group'>
        <label className='form-label'>Delay (milliseconds)</label>
        <input
          type='number'
          className='form-control'
          value={delay}
          onChange={handleDelayChange}
          min='0'
          step='100'
        />
      </div>

      {/* Human-readable delay display */}
      <div className='text-center mt-2'>
        <span className='badge badge-secondary'>
          <i className='bi bi-clock-history' style={{ marginRight: '4px' }}></i>
          {formatDelay(delay)}
        </span>
      </div>
    </BaseNode>
  );
};