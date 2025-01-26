"use client";

import { useEffect, useState } from "react";

const LOGIC_GATE_IMAGES = [
  "/pics/logic-gate-1.png",
  "/pics/logic-gate-2.png",
  "/pics/logic-gate-3.png",
  "/pics/logic-gate-4.png",
];

// Define grid area boundaries (in percentage)
const GRID_BOUNDS = {
  top: 20,    // Percentage from the top where the grid starts
  bottom: 80, // Percentage from the top where the grid ends
  left: 10,   // Percentage from the left where the grid starts
  right: 90,  // Percentage from the left where the grid ends
};

// Generate random positions, sizes, and rotation for the logic gates
const getRandomProperties = () => {
  let x, y;

  // Ensure the logic gates don't spawn inside the grid area
  do {
    x = Math.random() * 100; // Random x position (0-100%)
    // Place gates only above the grid (y < GRID_BOUNDS.top)
    y = Math.random() * GRID_BOUNDS.top; // Random y position above the grid (0 to top boundary)
  } while (
    x >= GRID_BOUNDS.left &&
    x <= GRID_BOUNDS.right &&
    y >= GRID_BOUNDS.top &&
    y <= GRID_BOUNDS.bottom
  );

  return {
    x,
    y,
    scale: 0.105, // Fixed scale for consistency
    rotation: Math.random() * 360, // Rotation degrees
  };
};

export default function AnimatedBackground() {
  const [gates, setGates] = useState<
    { id: string; src: string; x: number; y: number; scale: number; rotation: number }[]
  >([]);

  useEffect(() => {
    // Immediately add a gate
    setGates((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        src: LOGIC_GATE_IMAGES[Math.floor(Math.random() * LOGIC_GATE_IMAGES.length)],
        ...getRandomProperties(),
      },
    ]);

    // Add gates at regular intervals
    const interval = setInterval(() => {
      setGates((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          src: LOGIC_GATE_IMAGES[Math.floor(Math.random() * LOGIC_GATE_IMAGES.length)],
          ...getRandomProperties(),
        },
      ]);

      // Keep only the last 20 gates
      setGates((prev) => prev.filter((_, index) => index >= prev.length - 20));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        backgroundColor: "white",
      }}
    >
      {gates.map((gate) => (
        <img
          key={gate.id}
          src={gate.src}
          alt="Logic Gate"
          style={{
            position: "absolute",
            left: `${gate.x}%`,
            top: `${gate.y}%`,
            transform: `scale(${gate.scale}) rotate(${gate.rotation}deg)`,
            transformOrigin: "center",
            opacity: 0.6,
            animation: "fadeAndRotate 5s ease-in-out forwards", // Ensure 'forwards' to retain final state
          }}
        />
      ))}

      <style jsx>{`
        @keyframes fadeAndRotate {
          0% {
            transform: translateY(10%) scale(0.1) rotate(0deg); /* Initial state */
            opacity: 0; /* Start as transparent */
          }
          50% {
            transform: translateY(0%) scale(0.5) rotate(180deg); /* Halfway through rotation */
            opacity: 0.8; /* Become visible at mid-way */
          }
          100% {
            transform: translateY(-10%) scale(0.5) rotate(360deg); /* Finish rotation */
            opacity: 0; /* Fade out at the end */
          }
        }
      `}</style>
    </div>
  );
}
