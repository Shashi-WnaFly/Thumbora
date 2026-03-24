import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

const springConfig = { stiffness: 100, damping: 30, mass: 2 };

export default function TiltImage({ rotateAmplitude = 3 }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouseMove(e: any) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <motion.figure
      ref={ref}
      className="relative w-full h-140 perspective-midrange max-w-4xl mx-auto flex flex-col items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ y: 150, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
    >
      <motion.div
        className="relative transform w-full max-w-4xl overflow-hidden "
        style={{ rotateX, rotateY }}
      >
        <motion.img
          src={"/assets/Excited_duo_promoting_design_tool.png"}
          className="w-full rounded-[15px] will-change-transform transform-[translateZ(0)] mt-16 border-2 border-slate-300 p-4"
          alt="hero section showcase"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-linear-0 from-black to-transparent"></div>
      </motion.div>
    </motion.figure>
  );
}
