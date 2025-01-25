'use client';
import { Grid, Container } from '@mantine/core';
import Image from 'next/image';
import classes from './Main.module.css';
import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { ReactFlow, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';
import SouthernRockhopperPenguinImage from '../../pics/SouthernRockhopperPenguin.jpg';
import GentooPenguin from '../../pics/GentooPenguin.jpg';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

export function Main(props: any) {
  const [leftImagePosition, setLeftImagePosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
  const [centerImagePosition, setCenterImagePosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

  const leftImageRef = useRef<HTMLImageElement | null>(null);
  const centerImageRef = useRef<HTMLImageElement | null>(null);

  const [selectedImage, setSelectedImage] = useState(EmperorPenguinBabyImage);

  useEffect(() => {
    if (props.selectedImage === '/_next/static/media/EmperorPenguinBaby.7955bfc0.jpeg') {
      setSelectedImage(EmperorPenguinBabyImage);
    }
    if (props.selectedImage === '/_next/static/media/SouthernRockhopperPenguin.ae32a423.jpg') {
      setSelectedImage(SouthernRockhopperPenguinImage);
    }
    if (props.selectedImage === '/_next/static/media/GentooPenguin.8585d424.jpg') {
      setSelectedImage(GentooPenguin);
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

  const nodeColor = (node) => {
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
        <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
          <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        </ReactFlow>
      </div>
  );
}
