import { Node } from 'react-flow-renderer';
import Image from 'next/image';
import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';

const AndGate = () => (
  <svg
    width="80"
    height="50"
    viewBox="0 0 74 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    <path
      d="M 0 0 L 50 0 A 25 25 0 0 1 50 50 L 0 50 Z"
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

const OrGate = () => (
  <svg
    width="65"
    height="50"
    viewBox="0 0 65 50" // Adjusted to fit the OR gate perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    <path
      d="M 0 0 Q 25 25 0 50 L 50 50 Q 75 25 50 0 Z"
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

const NotGate = () => (
  <svg
    width="60"
    height="50"
    viewBox="0 0 70 50" // Adjusted to fit the NOT gate perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Triangle for the NOT gate */}
    <path
      d="M 5 5 L 55 25 L 5 45 Z"
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* Circle for the NOT gate's negation */}
    <circle cx="60" cy="25" r="5" fill="#ffffff" stroke="black" strokeWidth="2" />
  </svg>
);

const XorGate = () => (
  <svg
    width="65"
    height="50"
    viewBox="0 0 60 50" // Adjusted to fit the XOR gate perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main XOR Gate Shape (similar to OR gate) */}
    <path
      d="M 0 0 Q 25 25 0 50 L 50 50 Q 75 25 50 0 Z"
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* Extra arc for XOR gate */}
    <path
      d="M 10 0 Q 35 25 10 50"
      fill="transparent"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

const NorGate = () => (
  <svg
    width="70"
    height="50"
    viewBox="0 0 85 50" // Adjusted to fit the NOR gate perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main NOR Gate Shape (similar to OR gate but negated) */}
    <path
      d="M 0 0 Q 25 25 0 50 L 50 50 Q 75 25 50 0 Z"
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* Inverted Circle for NOR gate */}
    <circle cx="75" cy="25" r="6" fill="white" stroke="black" strokeWidth="2" />
  </svg>
);

const XnorGate = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50" // Adjusted to fit the XNOR gate perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main XOR Gate Shape */}
    <path
      d="M 0 0 Q 25 25 0 50 L 60 50 Q 85 25 60 0 Z" // XOR gate shape
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
        <path
      d="M 10 0 Q 35 25 10 50"
      fill="transparent"
      stroke="black"
      strokeWidth="2"
    />
    {/* Inverted Circle for XNOR gate */}
    <circle cx="90" cy="25" r="6" fill="white" stroke="black" strokeWidth="2" />
  </svg>
);


const NandGate = () => (
  <svg
    width="80"
    height="50"
    viewBox="0 0 90 50" // Adjusted to fit the NAND gate perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main AND Gate Shape */}
    <path
      d="M 0 0 L 50 0 A 25 25 0 0 1 50 50 L 0 50 Z"
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* Inverted Circle for NAND gate */}
    <circle cx="80" cy="25" r="6" fill="white" stroke="black" strokeWidth="2" />
  </svg>
);

const FalseGate = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 40 40"  // Adjusted the viewBox to make the edges closer to the circle
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* A smaller circle to make it closer to the edges */}
    <circle cx="20" cy="20" r="10" fill="red" stroke="black" strokeWidth="2" />
    <text x="50%" y="50%" fontSize="14" textAnchor="middle" fill="white" dy=".3em">0</text>
  </svg>
);

const TrueGate = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 40 40"  // Adjusted the viewBox to make the edges closer to the circle
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* A circle with "True" label */}
    <circle cx="20" cy="20" r="10" fill="green" stroke="black" strokeWidth="2" />
    <text x="50%" y="50%" fontSize="14" textAnchor="middle" fill="white" dy=".3em">1</text>
  </svg>
);



export const defaultNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <div style={{ width: 'auto', height: 'auto' }}>
          <Image src={EmperorPenguinBabyImage} alt="Input Node" layout="intrinsic" />
        </div>
      ),
    },
    position: { x: 50, y: 50 },
    style: { backgroundColor: '#6ede87', color: 'white' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '2',
    data: { label: <XnorGate /> },
    position: { x: 300, y: 50 },
    style: {
      backgroundColor: 'transparent', // Make background transparent
      border: 'none', // Remove border
      boxShadow: 'none', // Remove shadow
      width: 'auto', // Fit to content
      height: 'auto', // Fit to content
      padding: 0, // Remove padding
    },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 500, y: 50 },
    style: { backgroundColor: '#6865A5', color: 'white' },
    sourcePosition: 'right',
    targetPosition: 'left',
  },
];
