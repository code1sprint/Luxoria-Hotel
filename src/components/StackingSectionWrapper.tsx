/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface StackingSectionWrapperProps {
  children: React.ReactNode;
  id: string;
  zIndex: number;
  bgColor: string;
  roundedTop?: boolean;
}

export default function StackingSectionWrapper({
  children,
  id,
  zIndex,
  bgColor,
  roundedTop = true,
}: StackingSectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll position of this section relative to the viewport
  // "start start" defines when the top of the element hits the top of the screen (sticky activation)
  // "end start" defines when the bottom of the element reaches the top of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Gorgeous 3D layer shrinkage and fade-out as the next section overlaps
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "-25px"]);

  return (
    <div
      ref={containerRef}
      style={{ zIndex }}
      className={`sticky top-0 min-h-screen w-full flex flex-col justify-start overflow-hidden ${bgColor} ${
        roundedTop ? "rounded-t-[2.5rem] md:rounded-t-[3.5rem]" : ""
      } shadow-[0_-12px_30px_rgba(0,0,0,0.06)] border-t border-white/10`}
    >
      <motion.div
        style={{ scale, opacity, y, transformOrigin: "top center" }}
        className="w-full flex-1 flex flex-col transform-gpu"
      >
        {children}
      </motion.div>
    </div>
  );
}
