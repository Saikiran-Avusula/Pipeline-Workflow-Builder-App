# VectorShift Assignment: Pipeline-Workflow-Builder-App

## Project Overview

This project is a **Pipeline-Workflow-Builder-App** built as part of the VectorShift Assignment. It allows users to create visual workflows by dragging and dropping different types of nodes onto a canvas. The application validates whether the created pipeline forms a valid **Directed Acyclic Graph (DAG)**, which is essential for workflow execution without cycles.

### What is a Pipeline?
A pipeline is a series of connected steps or processes that transform data or perform tasks in sequence. In this application, pipelines are built visually using nodes and connections.

### What is a Directed Acyclic Graph (DAG)?
- **Directed**: Connections have a direction (from source to target).
- **Acyclic**: No cycles or loops in the graph.
- **Graph**: A structure of nodes connected by edges.

DAGs are important because they ensure workflows can be executed in a linear order without infinite loops.

## Features

- **Drag-and-Drop Interface**: Easily add nodes to the canvas by dragging from the toolbar.
- **Multiple Node Types**: Support for various node types including Input, Output, Text, API, Note, Email, Timer, and LLM (Large Language Model).
- **Visual Connections**: Connect nodes with edges to define the flow.
- **Pipeline Validation**: Submit the pipeline to check if it's a valid DAG, along with node and edge counts.
- **Real-time Updates**: Changes are reflected immediately on the canvas.
- **Bootstrap-Inspired UI**: Modern dark theme with Bootstrap styling, Inter font, and icons.

## Technology Stack

### Frontend
- **React**: A JavaScript library for building user interfaces. It allows creating reusable UI components.
- **React Flow**: A library for building node-based UIs. It provides the canvas, nodes, and edge handling.
- **Zustand**: A small, fast state management library for React. It manages the application's state (nodes, edges, etc.).
- **Bootstrap Icons**: Icon library for consistent, professional iconography.
- **Google Fonts (Inter)**: Modern typography for clean, readable text.

### Backend
- **FastAPI**: A modern, fast web framework for building APIs with Python. It handles the pipeline parsing and validation.
- **NetworkX**: A Python library for creating, manipulating, and studying complex networks (graphs). Used to check if the pipeline is a DAG.
- **Pydantic**: A data validation library for Python. Used to define and validate the structure of incoming data.
- **CORS Middleware**: Allows the frontend (running on localhost:3000) to communicate with the backend (running on localhost:8000).

### Development Tools
- **Node.js and npm**: Node.js is a JavaScript runtime, and npm is its package manager. Used for managing frontend dependencies and scripts.
- **Python 3.11**: The programming language used for the backend.
- **pip**: Python's package manager for installing libraries.

## Project Structure

```
Pipeline-Builder-App/
├── backend/
│   ├── main.py              # Main FastAPI application
│   └── __pycache__/         # Python bytecode cache (auto-generated)
├── frontend/
│   ├── public/
│   │   ├── index.html       # Main HTML file with fonts and icons
│   │   ├── manifest.json    # Web app manifest
│   │   └── robots.txt       # Search engine crawling instructions
│   ├── src/
│   │   ├── App.js           # Main React component with header
│   │   ├── index.js         # Entry point for React app
│   │   ├── index.css        # Bootstrap-inspired global styles
│   │   ├── store.js         # Zustand state management
│   │   ├── ui.js            # React Flow canvas component
│   │   ├── toolbar.js       # Toolbar with draggable nodes
│   │   ├── submit.js        # Submit button and API call
│   │   ├── draggableNode.js # Draggable node component
│   │   └── nodes/           # Individual node components
│   │       ├── BaseNode.js  # Base class for all nodes
│   │       ├── inputNode.js # Data input node
│   │       ├── outputNode.js # Data output node
│   │       ├── textNode.js  # Text with variable interpolation
│   │       ├── apiNode.js   # HTTP API request node
│   │       ├── noteNode.js  # Notes/comments node
│   │       ├── emailNode.js # Email configuration node
│   │       ├── timerNode.js # Delay/timer node
│   │       └── llmNode.js   # LLM processing node
│   ├── package.json         # Frontend dependencies and scripts
│   └── README.md            # Create React App README
└── README.md                # Project README (this file)
```

## Quick Start

### Prerequisites
- **Node.js** (version 14 or higher): Download from [nodejs.org](https://nodejs.org/)
- **Python 3.11**: Download from [python.org](https://www.python.org/)
- **pip**: Usually comes with Python installation
- **npm**: Comes with Node.js

### Step 1: Install Backend Dependencies
```bash
pip install fastapi uvicorn pydantic networkx
```

### Step 2: Start the Backend Server
```bash
cd backend
py -3.11 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

> **Note**: If `py -3.11` doesn't work, try one of these alternatives:
> - `python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000`
> - `python3.11 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000`

The backend will be running at `http://localhost:8000`

### Step 3: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 4: Start the Frontend Server
```bash
npm start
```

The frontend will open automatically at `http://localhost:3000`

## Usage

1. **Open the Application**: Go to `http://localhost:3000` in your browser.

2. **Add Nodes**: Drag node types from the toolbar onto the canvas.

3. **Connect Nodes**: Click and drag from the output handle of one node to the input handle of another to create connections.

4. **Configure Nodes**: Some nodes have input fields or settings:
   - **Input**: Set name and data type (Text/File)
   - **Output**: Set name and output type (Text/Image)
   - **Text**: Enter text with `{{variables}}` for dynamic inputs
   - **API**: Configure HTTP method and endpoint URL
   - **Note**: Add comments or annotations
   - **Email**: Set recipient and subject
   - **Timer**: Set delay in milliseconds
   - **LLM**: Connect system prompt and user prompt

5. **Submit Pipeline**: Click the "Submit Pipeline" button to validate your pipeline.

6. **View Results**: An alert will show the number of nodes, edges, and whether the pipeline is a valid DAG.

## Node Types

| Node | Icon | Description |
|------|------|-------------|
| **Input** | 📥 | Starting point for data input |
| **LLM** | 🤖 | Large Language Model processing |
| **Output** | 📤 | Endpoint for pipeline results |
| **Text** | 📝 | Text with `{{variable}}` interpolation |
| **API** | ☁️ | HTTP requests (GET, POST, PUT, DELETE) |
| **Note** | 📋 | Comments and annotations |
| **Email** | ✉️ | Email configuration |
| **Timer** | ⏱️ | Delay/timing functionality |

## API Documentation

### Backend Endpoints

#### GET /
- **Description**: Health check endpoint.
- **Response**: `{"Ping": "Pong"}`

#### POST /pipelines/parse
- **Description**: Parses and validates the pipeline.
- **Request Body**:
  ```json
  {
    "nodes": [
      {
        "id": "1",
        "type": "customInput",
        "position": {"x": 100, "y": 100}
      }
    ],
    "edges": [
      {
        "source": "1",
        "target": "2"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "num_nodes": 2,
    "num_edges": 1,
    "is_dag": true
  }
  ```

## Development

### Running Tests
- **Frontend**: `npm test` in the frontend directory.
- **Backend**: No tests are currently implemented, but you can add them using pytest.

### Building for Production
- **Frontend**: `npm run build` in the frontend directory creates an optimized build in the `build` folder

## Troubleshooting

### Common Issues

1. **"uvicorn is not recognized"**:
   - Use `py -3.11 -m uvicorn` instead of just `uvicorn`
   - Or run `pip install uvicorn` first

2. **"Module not found: networkx"**:
   - Run `pip install networkx`
   - Make sure you're using Python 3.11: `py -3.11 -m pip install networkx`

3. **CORS Errors**:
   - Ensure the backend is running on port 8000
   - Check that the backend allows origins from localhost:3000

4. **Module Not Found (Frontend)**:
   - Run `npm install` in the frontend directory

5. **Port Already in Use**:
   - Change the port in the backend command or kill the process using that port
   - For Windows: `netstat -ano | findstr :8000` then `taskkill /PID <PID> /F`

### Debugging
- Check browser console for frontend errors.
- Check terminal for backend errors.
- Use browser developer tools to inspect network requests.

## Acknowledgments
- React Flow for the node-based UI library.
- FastAPI for the backend framework.
- Bootstrap for design inspiration.
- Create React App for the frontend boilerplate.
