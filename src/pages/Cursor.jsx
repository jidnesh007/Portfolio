import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

export const Cursor = () => {
  const { position, isPointer } = useCursor();

  return (
    <>
      {/* Outer ring - Increased size */}
      <motion.div
        className="fixed pointer-events-none z-50 w-10 h-10 rounded-full border-2 border-cyan-500"
        animate={{
          x: position.x - 20, // Adjusted for new size
          y: position.y - 20,
          scale: isPointer ? 1.8 : 1, // Slightly larger on hover
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          mass: 0.1
        }}
      />
      
      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-50 w-2 h-2 bg-cyan-500 rounded-full"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 750,
          damping: 25,
          mass: 0.05
        }}
      />
    </>
  );
};
