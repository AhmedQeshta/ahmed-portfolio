'use client';

import { IErrorHandle } from '@/features/shard/types/common';

export default function ErrorHandle({ id, description }: IErrorHandle) {
  return (
    <section id={id} className="py-20 mt-20 lg:mt-20" data-testid={id}>
      <div className="mx-auto max-w-5xl px-4" data-testid="error-container">
        <div className="text-center text-red-400">
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
