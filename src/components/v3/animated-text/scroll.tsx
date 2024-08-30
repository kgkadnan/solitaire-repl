'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import AnimateSectionText from './jmd';

const AnimationSection = ({ children, animationDelay = 0, ...props }: any) => {
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
        {typeof children === 'string' ? (
          <AnimateSectionText
            fgColor="var(--text-neutral-900)"
            animationDelay={animationDelay}
          >
            {children}
          </AnimateSectionText>
        ) : (
          children
        )}
      </motion.div>
    </section>
  );
};

export default AnimationSection;
