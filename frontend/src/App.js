// App.js
// Main application component that brings together the toolbar, canvas, and submit button
// This file serves as the entry point for the Pipeline Builder UI

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

/**
 * App Component
 * 
 * The root component that structures the application layout.
 * Uses a Bootstrap-inspired dark theme with:
 * - Header with app branding
 * - Toolbar for draggable node components
 * - Canvas area for building pipelines
 * - Footer with submit functionality
 */
function App() {
  return (
    <div className='app'>
      {/* Header / Navbar - Bootstrap-style branding section */}
      <header className='app-header'>
        <div className='app-brand'>
          <i className='bi bi-diagram-3-fill'></i>
          <span>Pipeline Workflow Builder</span>
        </div>
      </header>

      {/* Toolbar section - contains draggable node components */}
      <div className='toolbar'>
        <PipelineToolbar />
      </div>

      {/* Main canvas area - React Flow workspace */}
      <div className='canvas'>
        <PipelineUI />
      </div>

      {/* Footer with submit button */}
      <SubmitButton />
    </div>
  );
}

export default App;
