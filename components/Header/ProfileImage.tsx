'use client';

import { getImageUrl } from '@/sanity/lib/image';
import { BaseInfoResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProfileImageProps {
  baseInfo: BaseInfoResponse;
}

export default function ProfileImage({ baseInfo }: ProfileImageProps) {
  const { profilePicture, name } = baseInfo;
  return (
    <motion.div
      className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.div className="relative" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
        {profilePicture ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            <Image
              src={getImageUrl(profilePicture, 300, 300, 100)}
              width={300}
              height={300}
              className="rounded-full border-4 border-white/20 shadow-lg"
              alt={`${name} profile picture`}
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/20 shadow-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl font-bold"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}>
            {name.charAt(0)}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
