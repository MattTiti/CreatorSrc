"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const FloatingCard = ({ index, rowIndex }) => {
  const direction = rowIndex % 2 === 0 ? 1 : -1;
  const yOffset = rowIndex * 160;

  // Calculate initial position to fill screen
  const cardsPerRow = 8;
  const cardWidth = 350;
  const totalWidth = cardsPerRow * cardWidth;
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const startOffset = (screenWidth - totalWidth) / 2;

  return (
    <motion.div
      initial={{
        x: startOffset + index * cardWidth, // Start evenly distributed
        y: yOffset,
        opacity: 0.4,
      }}
      animate={{
        x:
          direction > 0
            ? startOffset + index * cardWidth + screenWidth
            : startOffset + index * cardWidth - screenWidth,
        y: yOffset,
        opacity: 0.4,
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
      }}
      className="absolute pointer-events-none"
    >
      <Card className="w-[300px] backdrop-blur-lg bg-gray-400/40 border-gray-400/50 shadow-lg">
        <div className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10 bg-gray-500/50" />
            <div>
              <div className="h-4 w-24 bg-gray-500/50 rounded" />
              <div className="h-3 w-32 bg-gray-500/50 rounded mt-2" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full bg-gray-500/50 rounded" />
            <div className="h-3 w-3/4 bg-gray-500/50 rounded" />
          </div>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary" className="bg-gray-500/50" />
            <Badge variant="secondary" className="bg-gray-500/50" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const Row = ({ rowIndex }) => {
  return (
    <>
      {[...Array(22)].map((_, i) => (
        <FloatingCard key={i} index={i} rowIndex={rowIndex} />
      ))}
    </>
  );
};

export default function FloatingCards() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <Row key={i} rowIndex={i} />
      ))}
    </div>
  );
}
