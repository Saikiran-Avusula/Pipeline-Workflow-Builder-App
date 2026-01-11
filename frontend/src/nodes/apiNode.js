// apiNode.js
// API node component - makes HTTP requests to external endpoints
// A common building block for integrating with external services

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * APINode Component
 * 
 * A node for making HTTP API requests in the pipeline.
 * Users can configure:
 * - HTTP method (GET, POST, PUT, DELETE)
 * - Endpoint URL
 * 
 * Super useful for fetching data or sending results to external services.
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial values
 */
export const APINode = ({ id, data }) => {
    // State for API configuration
    const [method, setMethod] = useState(data?.method || 'GET');
    const [url, setUrl] = useState(data?.url || '');

    /**
     * Handle method change
     */
    const handleMethodChange = (e) => {
        setMethod(e.target.value);
    };

    /**
     * Handle URL change
     */
    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    // Define handles - input for request body, output for response
    const handles = [
        { id: 'body', type: 'target', position: Position.Left },
        { id: 'response', type: 'source', position: Position.Right },
    ];

    return (
        <BaseNode
            id={id}
            title='API Request'
            icon='bi-cloud-arrow-up'
            handles={handles}
        >
            {/* HTTP Method selector */}
            <div className='form-group'>
                <label className='form-label'>Method</label>
                <select
                    className='form-select'
                    value={method}
                    onChange={handleMethodChange}
                >
                    <option value='GET'>GET</option>
                    <option value='POST'>POST</option>
                    <option value='PUT'>PUT</option>
                    <option value='DELETE'>DELETE</option>
                </select>
            </div>

            {/* URL input */}
            <div className='form-group'>
                <label className='form-label'>Endpoint URL</label>
                <input
                    type='text'
                    className='form-control'
                    value={url}
                    onChange={handleUrlChange}
                    placeholder='https://api.example.com/data'
                />
            </div>

            {/* Method badge for quick reference */}
            <div className='text-center mt-2'>
                <span className={`badge ${method === 'GET' ? 'badge-success' : method === 'POST' ? 'badge-primary' : method === 'DELETE' ? 'badge-secondary' : 'badge-info'}`}>
                    {method}
                </span>
            </div>
        </BaseNode>
    );
};
