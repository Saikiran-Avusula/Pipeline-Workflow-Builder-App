from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    try:
        num_nodes = len(data.nodes)
        num_edges = len(data.edges)
        
        # Build graph for DAG check
        graph = nx.DiGraph()
        for node in data.nodes:
            graph.add_node(node['id'])
        for edge in data.edges:
            graph.add_edge(edge['source'], edge['target'])
        
        # Check if DAG (no cycles)
        is_dag = nx.is_directed_acyclic_graph(graph)

        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing pipeline: {str(e)}")
