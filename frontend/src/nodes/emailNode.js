// emailNode.js
// Email node component - configures email settings for pipeline notifications
// Allows setting recipient and subject for automated emails

import { useState } from 'react';
import { Position } from 'reactflow';
import BaseNode from './BaseNode';

/**
 * EmailNode Component
 * 
 * A node for configuring email notifications in the pipeline.
 * Users can specify:
 * - Email address: Recipient for the notification
 * - Subject: Email subject line
 * 
 * This node can be connected to receive data that will be included
 * in the email body.
 * 
 * Props:
 * @param {string} id - Unique node identifier
 * @param {object} data - Node data containing initial email/subject
 */
export const EmailNode = ({ id, data }) => {
  // State for email configuration
  const [email, setEmail] = useState(data?.email || '');
  const [subject, setSubject] = useState(data?.subject || '');

  /**
   * Handle email address change
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handle subject change
   */
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  // Define handles - input on left, output on right
  const handles = [
    { id: 'input', type: 'target', position: Position.Left },
    { id: 'output', type: 'source', position: Position.Right },
  ];

  return (
    <BaseNode
      id={id}
      title='Email'
      icon='bi-envelope'
      handles={handles}
    >
      {/* Email address input */}
      <div className='form-group'>
        <label className='form-label'>Recipient</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={handleEmailChange}
          placeholder='user@example.com'
        />
      </div>

      {/* Subject input */}
      <div className='form-group'>
        <label className='form-label'>Subject</label>
        <input
          type='text'
          className='form-control'
          value={subject}
          onChange={handleSubjectChange}
          placeholder='Email subject line'
        />
      </div>
    </BaseNode>
  );
};