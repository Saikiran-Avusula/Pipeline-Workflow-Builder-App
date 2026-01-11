// submit.js
// Submit button component for validating and sending the pipeline to the backend
// Displays results in a user-friendly alert

import { useStore } from './store';

// Zustand selector to extract nodes and edges from the store
const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

/**
 * SubmitButton Component
 * 
 * Renders a Bootstrap-styled button that submits the current pipeline
 * to the backend API for validation. Checks if the pipeline forms a
 * valid DAG (Directed Acyclic Graph).
 */
export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);

  /**
   * Handle submit button click
   * Validates that nodes exist, then sends the pipeline data to the
   * backend API and displays the validation results to the user
   */
  const handleSubmit = async () => {

    // Basic validation - don't submit an empty canvas
    if (nodes.length === 0) {
      alert('Please add some nodes to the canvas before submitting.');
      return;
    }

    // Prepare the pipeline data for submission
    const pipelineData = { nodes, edges };

    try {
      // Send POST request to backend API
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pipelineData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit pipeline');
      }

      // Parse and display results
      const result = await response.json();
      const dagStatus = result.is_dag
        ? "✓ Valid DAG (no cycles)"
        : "✗ Invalid DAG (cycles detected)";

      alert(
        `Pipeline Analysis Results:\n\n` +
        `• Nodes: ${result.num_nodes}\n` +
        `• Edges: ${result.num_edges}\n` +
        `• DAG Check: ${dagStatus}`
      );
    } catch (error) {
      alert('Error submitting pipeline: ' + error.message);
    }
  };

  return (
    <footer className='app-footer'>
      <button className='submit-button' onClick={handleSubmit}>
        <i className='bi bi-play-fill'></i>
        Submit Pipeline
      </button>
    </footer>
  );
};