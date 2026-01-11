// ui.js
// Displays the drag-and-drop UI
// This is the main canvas component where users build their pipelines
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, MiniMap } from 'reactflow';
import { useStore } from './store';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { NoteNode } from './nodes/noteNode';
import { EmailNode } from './nodes/emailNode';
import { TimerNode } from './nodes/timerNode';

import 'reactflow/dist/style.css';

// Grid size for snap-to-grid functionality
const gridSize = 20;

// Hide React Flow attribution badge (pro feature)
const proOptions = { hideAttribution: true };

/**
 * Node type registry
 * Maps node type identifiers to their respective React components
 * Add new node types here when extending the application
 */
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  note: NoteNode,
  email: EmailNode,
  timer: TimerNode
};

// Zustand selector for accessing store state and actions
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

/**
 * PipelineUI Component
 * 
 * The main React Flow canvas component. Handles:
 * - Rendering nodes and edges
 * - Drag and drop of new nodes from toolbar
 * - Node connections via edges
 * - Canvas controls (zoom, pan, minimap)
 */
export const PipelineUI = () => {
  // Ref to the wrapper div for calculating drop positions
  const reactFlowWrapper = useRef(null);

  // React Flow instance for accessing internal methods
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Destructure store state and actions
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector);

  /**
   * Generate initial data for a new node
   * @param {string} nodeID - Unique identifier for the node
   * @param {string} type - Node type (e.g., 'customInput', 'llm')
   * @returns {object} Initial node data object
   */
  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  /**
   * Handle drop event when a node is dragged from toolbar onto canvas
   * Calculates the drop position and creates a new node at that location
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // Validate that we have a valid node type
        if (typeof type === 'undefined' || !type) {
          return;
        }

        // Convert screen coordinates to canvas coordinates
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        // Generate unique ID and create the new node
        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  /**
   * Handle drag over event to enable dropping
   * Sets the drop effect to 'move' for proper cursor feedback
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: '100%', height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
        >
          {/* Canvas controls - zoom, fit view, lock */}
          <Controls />

          {/* Minimap for navigation on large canvases */}
          <MiniMap
            nodeStrokeColor={() => '#0d6efd'}
            nodeColor={() => '#2b3035'}
            nodeBorderRadius={6}
          />
        </ReactFlow>
      </div>
    </>
  )
}
