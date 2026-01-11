// draggableNode.js
// A reusable component for toolbar items that can be dragged onto the canvas
// Styled as Bootstrap buttons with icons

/**
 * DraggableNode Component
 * 
 * Represents a single node type in the toolbar that users can drag
 * onto the React Flow canvas. Uses HTML5 Drag and Drop API.
 * 
 * Props:
 * @param {string} type - The node type identifier (e.g., 'customInput', 'llm')
 * @param {string} label - Display text for the node button
 * @param {string} icon - Bootstrap Icons class name (e.g., 'bi-cpu')
 */
export const DraggableNode = ({ type, label, icon }) => {

  /**
   * Handle drag start event
   * Sets the data transfer with node type information that React Flow
   * will use when the node is dropped on the canvas
   */
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className='draggable-node'
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {/* Node icon - uses Bootstrap Icons */}
      {icon && <i className={`bi ${icon}`}></i>}

      {/* Node label */}
      <span>{label}</span>
    </div>
  );
};