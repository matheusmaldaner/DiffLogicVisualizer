import { Grid, Container, Table, Popover, Text, Group, Progress } from '@mantine/core';
import Image from 'next/image';
import classes from './Main.module.css';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';

import { ReactFlow, MiniMap, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';
import SouthernRockhopperPenguinImage from '../../pics/SouthernRockhopperPenguin.jpg';
import GentooPenguin from '../../pics/GentooPenguin.jpg';

import { AndGate, NorGate, OrGate, XorGate, NandGate, XnorGate, TrueGate, FalseGate, NotGate, PassThroughGate, ImplyGate, NotImplyGate, ImpliedByGate, NotImpliedByGate } from './nodes';
import { defaultEdges } from './edges';

import NodeGate from '../NodeGate';

import jsonData from '../../temp.json';
import { start } from 'repl';
import { input } from '@testing-library/user-event/dist/types/event';

import { ProbabilityTable } from '../ProbabilityPopup/ProbabilityPopup';

// Custom Node Component
const CustomNode = ({ id, data }) => {
  return (
    <div>
      {data.label}
      {/* Explicitly define source handles */}
      <div className="source-handle-a" data-handleid="a" />
      <div className="source-handle-b" data-handleid="b" />
    </div>
  );
};

export function Main(props: any) {
  const [leftImagePosition, setLeftImagePosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
  const [centerImagePosition, setCenterImagePosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

  const leftImageRef = useRef<HTMLImageElement | null>(null);
  const centerImageRef = useRef<HTMLImageElement | null>(null);

  const [defaultNodes, setDefaultNodes] = useState<any[]>([]);
  const [defaultEdges, setDefaultEdges] = useState<any[]>([]);

  const [hoveredNode, setHoveredNode] = useState<any | null>(null); // Track hovered node
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 }); // Position of popover

  const [startGate, setStartGate] = useState('');

  const onNodesChange = useCallback(
    // @ts-ignore to suppress TypeScript error
    (changes) => setDefaultNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    // @ts-ignore to suppress TypeScript error
    (changes) => setDefaultEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  
  const [selectedImage, setSelectedImage] = useState(EmperorPenguinBabyImage);
  const [modelInfo, setModelInfo] = useState<any | null>(null);
  const [predClasses, setPrediction] = useState<any | null>(null);
  const [connections, setConnections] = useState<any | null>(null);
  const [probabilities, setProbabilities] = useState<any | null>(null);

  const LAYER_SPACING = 300; // Horizontal spacing between layers
  const NODE_SPACING = 100; // Vertical spacing between nodes in the same layer

  useEffect(() => {
    if (props.selectedImage === '/_next/static/media/EmperorPenguinBaby.7955bfc0.jpeg') {
      setSelectedImage(EmperorPenguinBabyImage);
    }
    else if (props.selectedImage === '/_next/static/media/SouthernRockhopperPenguin.ae32a423.jpg') {
      setSelectedImage(SouthernRockhopperPenguinImage);
    }
    else if (props.selectedImage === '/_next/static/media/GentooPenguin.8585d424.jpg') {
      setSelectedImage(GentooPenguin);
    }
    else{
      setSelectedImage(props.selectedImage);
    }
  }, [props.selectedImage]);

  useEffect(() => {
    setModelInfo(props.modelInfo);
    setPrediction(props.predClasses);
    setConnections(props.connections);
    setProbabilities(props.probabilities);
    console.log(props.connections)
  }, [props.modelInfo, props.predClasses, props.connections, props.probabilities]);

  useEffect(() => {
    if (leftImageRef.current) {
      const leftImageRect = leftImageRef.current.getBoundingClientRect();
      setLeftImagePosition({ top: (leftImageRect.top + leftImageRect.bottom) / 2, left: leftImageRect.right });
    }

    if (centerImageRef.current) {
      const centerImageRect = centerImageRef.current.getBoundingClientRect();
      setCenterImagePosition({ top: (centerImageRect.top + centerImageRect.bottom) / 2, left: centerImageRect.left });
    }
  }, []);

  useEffect(() => {
    console.log("Before connections:", connections);
    if (!connections || !Array.isArray(connections) || connections === null || connections === undefined) {
      return;
    }

    // Map gate strings to corresponding components
    const gateMap = {
      'zero': <FalseGate />,
      'and': <AndGate />,
      'not_implies': <NotImplyGate />,
      'a': <PassThroughGate />,
      'not_implied_by': <NotImpliedByGate />,
      'b': <PassThroughGate />,
      'xor': <XorGate />,
      'or': <OrGate />,
      'not_or': <NorGate />,
      'not_xor': <XnorGate />,
      'not_b': <NotGate/>,
      'implied_by': <ImpliedByGate/>,
      'not_a': <NotGate />,
      'implies': <ImplyGate/>,
      'not_and': <NandGate/>,
      'one': <TrueGate />,
    };

    const newNodes = [];
    const newEdges = [];

    connections.forEach((layer, layerIndex) => {
      const layerX = layerIndex * LAYER_SPACING; // Fixed x position for this layer
    
      // Create nodes for this layer
      layer.forEach((node, nodeIndex) => {
        if (node.inputs === null || node.inputs === undefined) {
          console.log("No inputs for node", node.neuron_idx);
          return;
        }
    
        const [left, right] = node.inputs;
        const nodeGate = new NodeGate(
          `${layerIndex}-${node.neuron_idx}`, // Combine layerIndex and neuron_idx for a unique key
          node.gate,
          left.toString(),
          right.toString(),
          true,
          node.probabilities
        );
    
        // @ts-ignore
        const gateComponent = gateMap[node.gate] || <div>Unknown Gate</div>;
    
        // Calculate y position with constant spacing
        const nodeY = nodeIndex * NODE_SPACING;
    
        newNodes.push({
          id: nodeGate.index, // Ensure this is unique
          data: { label: gateComponent, probabilities: nodeGate.probabilities },
          position: { x: layerX, y: nodeY }, // Fixed x for the layer, spaced y
          style: {
            backgroundColor: 'transparent',
            border: 'none',
            boxShadow: 'none',
            width: 'auto',
            height: 'auto',
            padding: 0,
          },
          sourcePosition: 'right',
          targetPosition: 'right',
        });
    
        // Skip edges for the first layer
        if (layerIndex === 0) return;
    
        // Create edges for this layer
        node.inputs.forEach((inputIdx, inputIndex) => {
          let tar_han = 'a';
          if (
            inputIndex === 1 &&
            node.gate !== 'not_a' &&
            node.gate !== 'not_b' &&
            node.gate !== 'zero' &&
            node.gate !== 'one'
          ) {
            tar_han = 'b';
          }
    
          if (node.gate === 'not_a' && inputIndex === 1) return;
          if (node.gate === 'not_b' && inputIndex === 0) return;
          if (node.gate === 'one' && inputIndex === 0) return;
          if (node.gate === 'zero' && inputIndex === 1) return;
    
          newEdges.push({
            id: `e${layerIndex}-${inputIdx}-${node.neuron_idx}`, // Include layerIndex in the edge ID
            source: `${layerIndex - 1}-${inputIdx}`, // Match the node ID format of the previous layer
            target: `${layerIndex}-${node.neuron_idx}`, // Match the node ID format of the current layer
            targetHandle: tar_han,
            animated: true,
          });
        });
      });
    });

    newNodes.push({
      id: '-4097', // Already unique
      type: 'input',
      data: {
        label: (
          <div style={{ width: 'auto', height: 'auto' }}>
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Input Node"
                layout="intrinsic"
                width={500}
                height={500}
                style={{ width: 'auto', height: 'auto' }}
              />
            )}
          </div>
        ),
      },
      position: { x: 50, y: 50 },
      style: { backgroundColor: '#6ede87', color: 'white' },
      sourcePosition: 'right',
    });

    newEdges.push({
      id: `e-4097-${startGate}`, // Include startGate in the edge ID
      source: '-4097',
      target: `0-${startGate}`, // Match the node ID format of the first layer
      targetHandle: 'a',
      animated: true,
    });

    // Update state with generated nodes
    setDefaultNodes(newNodes);
    setDefaultEdges(newEdges);

    console.log(newNodes)
    console.log(newEdges)
  }, [connections, selectedImage, startGate]); // Empty dependency array to run once on mount

  useEffect(() => {
    // Draw the lines using D3
    const svg = d3.select('#lines-svg');
    svg.selectAll('*').remove(); // Clear previous lines

    if (leftImagePosition && centerImagePosition) {
      const midX = (leftImagePosition.left + centerImagePosition.left) / 2; // midpoint
      const controlPointOffset = 50; // Adjust this value to change the curve's shape

      svg.append('path')
        .attr(
          'd',
          `M${leftImagePosition.left},${leftImagePosition.top} 
           C${midX},${leftImagePosition.top - controlPointOffset}, 
            ${midX},${centerImagePosition.top + controlPointOffset}, 
            ${centerImagePosition.left},${centerImagePosition.top}`
        )
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr('fill', 'none');
    }
  }, [leftImagePosition, centerImagePosition]);

  const nodeColor = (node: any) => {
    switch (node.type) {
      case 'input':
        return '#6ede87';
      case 'output':
        return '#6865A5';
      default:
        return '#ff0072';
    }
  };

  const renderProbabilityTable = (probabilities: Record<string, number>) => {
    return (
      <Table verticalSpacing="2px" style={{ fontSize: '10px' }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ padding: '2px' }}>Gate</Table.Th>
            <Table.Th style={{ padding: '2px' }}>Probability</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {Object.entries(probabilities).map(([gate, prob], index) => (
  <Table.Tr key={`${gate}-${index}`} style={{ height: '20px' }}>
    <Table.Td style={{ padding: '2px' }}>{gate}</Table.Td>
    <Table.Td style={{ padding: '2px' }}>
      <Group justify="space-between" gap="4px">
        <Text fz="xs" c="teal" fw={700} style={{ fontSize: '8px' }}>
          {(prob * 100).toFixed(2)}%
        </Text>
        <Progress.Root size="xs" style={{ width: '80px', height: '6px' }}>
          <Progress.Section key={`${gate}-progress-${index}`} value={prob * 100} color="teal" />
        </Progress.Root>
      </Group>
    </Table.Td>
  </Table.Tr>
))}


        </Table.Tbody>
      </Table>
    );
  };

  return (
    <div style={{ height: '500px', width: '100%' }}> {/* Specify a height */}
    {/* @ts-ignore to suppress TypeScript error */}
    {defaultNodes.length > 0 && (
      <ReactFlow nodes={defaultNodes} edges={defaultEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} nodeTypes={{custom: CustomNode}} fitView   onNodeMouseEnter={(event, node) => {
        const nodeElement = event.currentTarget;
        const nodeRect = nodeElement.getBoundingClientRect();
        const nodeWidth = nodeRect.width;
        setHoveredNode(node);
        setPopoverPosition({ x: nodeRect.left + (nodeWidth * 0.75), y: nodeRect.top });
      }} onNodeMouseLeave={() => setHoveredNode(null)}>
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />

        {hoveredNode && hoveredNode.data.probabilities && (
          <Popover
            opened
            position="top"
            style={{
              position: 'absolute',
              top: popoverPosition.y,
              left: popoverPosition.x-200,
              pointerEvents: 'none',
              zIndex: 1000,
            }}
            shadow="sm"
          >
            <Popover.Target>
              <div />
            </Popover.Target>
            <Popover.Dropdown style={{ padding: '4px' }}> {/* Reduced padding */}
              <strong style={{ fontSize: '10px' }}>{hoveredNode.data.label}</strong> {/* Smaller font */}
              {renderProbabilityTable(hoveredNode.data.probabilities)}
            </Popover.Dropdown>
          </Popover>
        )}

      </ReactFlow>
    )}
  </div>
  );
}