'use client';

import { IErrorHandle } from '@/utils/types/common';
import { motion } from 'framer-motion';

export default function ErrorHandle({ id, title, description }: IErrorHandle) {
  return (
    <section id={id} className="py-20" data-testid={id}>
      <div className="mx-auto max-w-5xl px-4" data-testid="error-container">
        <motion.h2
          className="text-3xl font-semibold mb-8 gradient-text"
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.5 }}>
          {title}
        </motion.h2>
        <motion.div
          className="text-center text-red-400"
          initial={{ filter: 'blur(10px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}>
          <motion.p
            initial={{ filter: 'blur(10px)', opacity: 0 }}
            animate={{ filter: 'blur(0px)', opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}>
            {description}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
