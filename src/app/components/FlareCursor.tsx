"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const FlareCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      if (window.matchMedia("(max-width: 750px)").matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 9);
    };

    const handleMouseEnter = () => {
      setIsPointer(true);
    };

    const handleMouseLeave = () => {
      setIsPointer(false);
    };

    const interactiveElements = document.querySelectorAll("button, a, .hover-cursor");

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [mouseX, mouseY]);

  return (
    !isMobile && (
      <motion.div
        className="fixed pointer-events-none z-[999999] rounded-full 
        border-2 border-white/15 bg-black/30 backdrop-blur-sm hidden md:block"
        style={{
          border: "2px solid rgba(255, 255, 255, 0.70)",
          x: mouseX,
          y: mouseY,
          width: isPointer ? 30 : 25,
          height: isPointer ? 30 : 25,
          transform: "translate(-50%, -50%)",
        }}
      />
    )
  );
};

export default FlareCursor;