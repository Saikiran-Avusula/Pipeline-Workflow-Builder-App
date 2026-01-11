// llmNode.js
// LLM (Large Language Model) node component
// Represents an AI processing step in the pipeline

import BaseNode from './BaseNode';
import { Position } from 'reactflow';

/**
 * LLMNode Component
 * 
 * A node representing a Large Language Model in the pipeline.
 * This node accepts system prompts and user prompts as inputs
 * and produces a response as output.
 * 
 * Handles:
 * - system (input): System prompt/instructions for the LLM
 * - prompt (input): User prompt/query
 * - response (output): Generated response from the LLM
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data (currently unused for this simple node)
 */
export const LLMNode = ({ id, data }) => {
  // Define handles for this node
  // Two inputs on the left (system prompt and user prompt)
  // One output on the right (response)
  const handles = [
    { id: 'system', type: 'target', position: Position.Left },
    { id: 'prompt', type: 'target', position: Position.Left },
    { id: 'response', type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      title='LLM'
      icon='bi-cpu'
      handles={handles}
    >
      {/* Description text explaining the node's purpose */}
      <div className='text-center'>
        <p className='text-muted mb-1' style={{ fontSize: '0.75rem', margin: 0 }}>
          Large Language Model
        </p>
        <span className='badge badge-primary'>AI Processing</span>
      </div>
    </BaseNode>
  );
};