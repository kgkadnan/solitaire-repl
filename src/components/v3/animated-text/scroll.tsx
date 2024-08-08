'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { HTMLAttributes, useRef } from 'react';

interface ISectionProps extends HTMLAttributes<HTMLSelectElement> {}

const AnimationSection = ({ children, ...props }: ISectionProps) => {
  const contentRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start end', 'start start']
  });

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0]
  );

  return (
    <section {...props}>
      <motion.div ref={contentRef} style={{ opacity: contentOpacity }}>
        {children}
      </motion.div>
    </section>
  );
};

export default AnimationSection;
