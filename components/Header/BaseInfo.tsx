'use client';

import { BaseInfoResponse } from '@/sanity/lib/types';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import SkillsIconsHeader from '@/components/Header/SkillsIconsHeader';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

interface BaseInfoProps {
  baseInfo: BaseInfoResponse;
}

export default function BaseInfo({ baseInfo }: BaseInfoProps) {
  const { name, bio, technologies } = baseInfo;
  return (
    <motion.div
      className="w-full lg:w-1/2"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.h1
        className="text-4xl lg:text-6xl font-bold gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        {name}
      </motion.h1>
      <motion.p
        className="text-text-secondary mt-4 text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}>
        <PortableText value={bio} />
      </motion.p>

      {/* Skills Icons */}
      <Suspense fallback={<Loading />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}>
          <SkillsIconsHeader technologies={technologies} />
        </motion.div>
      </Suspense>
    </motion.div>
  );
}
