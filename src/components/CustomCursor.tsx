import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 600, mass: 0.2 };
  const glowSpringConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  const glowX = useSpring(cursorX, glowSpringConfig);
  const glowY = useSpring(cursorY, glowSpringConfig);

  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target) {
        const computedCursor = window.getComputedStyle(target).cursor;
        setIsPointer(computedCursor === 'pointer' || target.tagName === 'A' || target.tagName === 'BUTTON');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor-glow hidden lg:block"
        style={{ 
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 1.5 : 1
        }}
      />
      <motion.div
        className="custom-cursor fixed top-0 left-0 rounded-full z-[10001] pointer-events-none mix-blend-difference hidden lg:block"
        style={{ 
          width: '12px', 
          height: '12px',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          scale: isPointer ? 3 : 1
        }}
      />
    </>
  );
}