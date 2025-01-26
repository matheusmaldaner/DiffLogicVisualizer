import { Node } from 'react-flow-renderer';
import Image from 'next/image';
import EmperorPenguinBabyImage from '../../pics/EmperorPenguinBaby.jpeg';

export const AndGate = () => (
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

export const OrGate = () => (
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

export const NotGate = () => (
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

export const XorGate = () => (
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

export const NorGate = () => (
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

export const XnorGate = () => (
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

export const ImplyGate = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main OR Gate Shape */}
    <path
      d="M 0 25 Q 25 25 50 0 L 50 50 Q 25 25 0 25 Z" // OR gate shape
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* NOT Gate for Input A */}
    <circle cx="10" cy="10" r="6" fill="white" stroke="black" strokeWidth="2" />
    <path
      d="M 10 4 V 16" // Vertical line for NOT gate
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

export const NotImplyGate = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main OR Gate Shape (IMPLY Gate) */}
    <path
      d="M 0 25 Q 25 25 50 0 L 50 50 Q 25 25 0 25 Z" // OR gate shape
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* NOT Gate for Input A */}
    <circle cx="10" cy="10" r="6" fill="white" stroke="black" strokeWidth="2" />
    <path
      d="M 10 4 V 16" // Vertical line for NOT gate
      stroke="black"
      strokeWidth="2"
    />
    {/* NOT Gate at Output (Small Circle) */}
    <circle cx="90" cy="25" r="6" fill="white" stroke="black" strokeWidth="2" />
  </svg>
);

export const ImpliedByGate = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main OR Gate Shape */}
    <path
      d="M 0 25 Q 25 25 50 0 L 50 50 Q 25 25 0 25 Z" // OR gate shape
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* NOT Gate for Input B */}
    <circle cx="10" cy="40" r="6" fill="white" stroke="black" strokeWidth="2" />
    <path
      d="M 10 34 V 46" // Vertical line for NOT gate
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);

export const NotImpliedByGate = () => (
  <svg
    width="100"
    height="50"
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Main OR Gate Shape (ImpliedBy Gate) */}
    <path
      d="M 0 25 Q 25 25 50 0 L 50 50 Q 25 25 0 25 Z" // OR gate shape
      fill="#ff0072"
      stroke="black"
      strokeWidth="2"
    />
    {/* NOT Gate for Input B */}
    <circle cx="10" cy="40" r="6" fill="white" stroke="black" strokeWidth="2" />
    <path
      d="M 10 34 V 46" // Vertical line for NOT gate
      stroke="black"
      strokeWidth="2"
    />
    {/* NOT Gate at Output (Small Circle) */}
    <circle cx="90" cy="25" r="6" fill="white" stroke="black" strokeWidth="2" />
  </svg>
);

export const PassThroughGate = () => (
  <svg
    width="50" // Adjust width as needed
    height="50" // Adjust height as needed
    viewBox="0 0 50 50" // Adjusted to fit the circle perfectly
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: 'block', margin: 'auto' }}
  >
    {/* Circle */}
    <circle
      cx="25" // Center X coordinate
      cy="25" // Center Y coordinate
      r="20"  // Radius of the circle
      fill="#6ede87" // Fill color
      stroke="black" // Border color
      strokeWidth="2" // Border thickness
    />
  </svg>
);

export const NandGate = () => (
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

export const FalseGate = () => (
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

export const TrueGate = () => (
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



export const defaultNodes: Node<any>[] = [
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
    // @ts-ignore to suppress TypeScript error for sourcePosition
    sourcePosition: 'right',
    // @ts-ignore to suppress TypeScript error for sourcePosition
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
    // @ts-ignore to suppress TypeScript error for sourcePosition
    sourcePosition: 'right',
    // @ts-ignore to suppress TypeScript error for sourcePosition
    targetPosition: 'left',
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 500, y: 50 },
    style: { backgroundColor: '#6865A5', color: 'white' },
    // @ts-ignore to suppress TypeScript error for sourcePosition
    sourcePosition: 'right',
    // @ts-ignore to suppress TypeScript error for sourcePosition
    targetPosition: 'left',
  },
];
