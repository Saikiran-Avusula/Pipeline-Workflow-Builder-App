// noteNode.js
// Note node component - adds comments/annotations to the pipeline
// Helpful for documenting workflow logic or leaving reminders

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * NoteNode Component
 * 
 * A simple node for adding notes or comments to the pipeline.
 * Think of it like sticky notes for your workflow - helps you
 * remember why you set things up a certain way.
 * 
 * No data flows through this node, it's purely for documentation.
 * The pass-through handles let you optionally route data around it.
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial note text
 */
export const NoteNode = ({ id, data }) => {
    // State for the note content
    const [note, setNote] = useState(data?.note || 'Add your notes here...');
    const textareaRef = useRef(null);

    /**
     * Handle note text change
     */
    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    // Auto-resize textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [note]);

    // Define handles - optional pass-through for data routing
    const handles = [
        { id: 'in', type: 'target', position: Position.Left },
        { id: 'out', type: 'source', position: Position.Right },
    ];

    return (
        <BaseNode
            id={id}
            title='Note'
            icon='bi-sticky'
            handles={handles}
        >
            {/* Note text area */}
            <div className='form-group'>
                <textarea
                    ref={textareaRef}
                    className='form-textarea'
                    value={note}
                    onChange={handleNoteChange}
                    placeholder='Write your notes here...'
                    style={{
                        minHeight: '50px',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)', // Subtle yellow tint like a sticky note
                        borderColor: 'rgba(255, 193, 7, 0.3)'
                    }}
                />
            </div>

            {/* Character count - just a nice touch */}
            <div className='text-muted text-center' style={{ fontSize: '0.625rem' }}>
                {note.length} characters
            </div>
        </BaseNode>
    );
};
