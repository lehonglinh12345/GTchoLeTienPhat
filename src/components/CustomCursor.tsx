import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor bg-white fixed top-0 left-0 rounded-full z-[10000] pointer-events-none mix-blend-difference hidden lg:block"
        animate={{
          x: position.x - 10,
          y: position.y - 10,
          scale: isPointer ? 2.5 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.5 }}
      />
      <motion.div
        className="custom-cursor-glow fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        animate={{
          x: position.x - 150,
          y: position.y - 150,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 200, mass: 1 }}
      />
    </>
  );
}
