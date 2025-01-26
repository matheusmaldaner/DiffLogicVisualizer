'use client';

import { Grid, Container } from '@mantine/core';
import Image from 'next/image';
import classes from './Main.module.css';
import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';

import { ReactFlow, MiniMap, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';
import SouthernRockhopperPenguinImage from '../../pics/SouthernRockhopperPenguin.jpg';
import GentooPenguin from '../../pics/GentooPenguin.jpg';

import { AndGate, NorGate, OrGate, XorGate, NandGate, XnorGate, TrueGate, FalseGate, NotGate } from './nodes';
import { defaultEdges } from './edges';

import NodeGate from '../NodeGate';

import jsonData from '../../temp.json';
import { start } from 'repl';

export function Main(props: any) {
  const [leftImagePosition, setLeftImagePosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
  const [centerImagePosition, setCenterImagePosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

  const leftImageRef = useRef<HTMLImageElement | null>(null);
  const centerImageRef = useRef<HTMLImageElement | null>(null);

  const [defaultNodes, setDefaultNodes] = useState<any[]>([]);
  const [defaultEdges, setDefaultEdges] = useState<any[]>([]);

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
    // Map gate strings to corresponding components
    const gateMap = {
      'not': <NotGate />,
      'and': <AndGate />,
      'or': <OrGate />,
      'xnor': <XnorGate />,
      'true': <TrueGate />,
    };

    // Create new nodes based on jsonData
    const newNodes = jsonData.map((node: { neuron_idx: number; gate: string; inputs: number[] }) => {
      const [left, right] = node.inputs;
      const nodeGate = new NodeGate(node.neuron_idx.toString(), node.gate, left.toString(), right.toString());

      // @ts-ignore
      const gateComponent = gateMap[node.gate] || <div>Unknown Gate</div>;

      return {
        id: nodeGate.index, // Use index for id
        data: { label: gateComponent }, // Example label
        position: { x: Math.random() * 500, y: Math.random() * 500 }, // Random position
        style: {
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          width: 'auto',
          height: 'auto',
          padding: 0,
        },
        sourcePosition: 'right',
        targetPosition: 'left',
      };
    });

    const newEdges = jsonData.flatMap((node: { neuron_idx: number; inputs: number[] }) => {

      if (node.inputs.includes(-4096)) {
        setStartGate(node.neuron_idx.toString());
      }
      return node.inputs.map((inputIdx: number) => {
          // Handle other cases as before
          return {
            id: `e${inputIdx}-${node.neuron_idx}`,
            source: inputIdx.toString(),
            target: node.neuron_idx.toString(),
            animated: true, // Optional: you can toggle the animation
          };
        }
      );
    });
    

    newNodes.push({
      id: '-4097',
      type: 'input',
      data: {
        label: (
          <div style={{ width: 'auto', height: 'auto' }}>
            {selectedImage && <Image src={selectedImage} alt="Input Node" layout="intrinsic" width={500} height={500}  style={{ width: 'auto', height: 'auto' }}/>}
          </div>
        ),
      },
      position: { x: 50, y: 50 },
      style: { backgroundColor: '#6ede87', color: 'white' },
      // @ts-ignore to suppress TypeScript error for sourcePosition
      sourcePosition: 'right',
      // @ts-ignore to suppress TypeScript error for sourcePosition
      targetPosition: 'left',
    })

    newEdges.push({
      id: 'e-4097-start',
      source: '-4097',
      target: startGate,
      animated: true,
    })

    // Update state with generated nodes
    setDefaultNodes(newNodes);
    setDefaultEdges(newEdges);
  }, [selectedImage, startGate]); // Empty dependency array to run once on mount

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

  return (
    <div style={{ height: '500px', width: '100%' }}> {/* Specify a height */}
    {/* @ts-ignore to suppress TypeScript error */}
    {defaultNodes.length > 0 && (
      <ReactFlow nodes={defaultNodes} edges={defaultEdges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} fitView>
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      </ReactFlow>
    )}
  </div>
  );
}
