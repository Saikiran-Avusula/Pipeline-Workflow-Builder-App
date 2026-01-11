// toolbar.js
// Toolbar component that displays draggable node types
// Users can drag these nodes onto the canvas to build their pipeline

import { DraggableNode } from './draggableNode';

/**
 * PipelineToolbar Component
 * 
 * Renders a horizontal toolbar containing all available node types.
 * Each node type is represented by a DraggableNode component that can
 * be dragged onto the React Flow canvas.
 * 
 * Node types include:
 * - Input: Starting point for data input
 * - LLM: Large Language Model processing node
 * - Output: Endpoint for pipeline results
 * - Text: Text manipulation node
 * - API: HTTP requests to external services
 * - Note: Comments and annotations
 * - Email: Email integration
 * - Timer: Delay/timing functionality
 */
export const PipelineToolbar = () => {

    return (
        <>
            {/* Section title with Bootstrap icon */}
            <div className='toolbar-title'>
                <i className='bi bi-collection'></i>
                <span>Components</span>
            </div>

            {/* Grid of draggable nodes */}
            <div className='toolbar-nodes'>
                <DraggableNode type='customInput' label='Input' icon='bi-box-arrow-in-right' />
                <DraggableNode type='llm' label='LLM' icon='bi-cpu' />
                <DraggableNode type='customOutput' label='Output' icon='bi-box-arrow-right' />
                <DraggableNode type='text' label='Text' icon='bi-fonts' />
                <DraggableNode type='api' label='API' icon='bi-cloud-arrow-up' />
                <DraggableNode type='note' label='Note' icon='bi-sticky' />
                <DraggableNode type='email' label='Email' icon='bi-envelope' />
                <DraggableNode type='timer' label='Timer' icon='bi-clock' />
            </div>
        </>
    );
};
